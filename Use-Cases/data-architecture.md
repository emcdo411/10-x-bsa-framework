# FIN-01 Data Architecture
## Rolling 13-Week Cash Flow Forecast — JDE EnterpriseOne Field Specifications

**Epoch Frameworks LLC | DACR v2.6 | McDonald (2026)**

---

## Overview

This document defines the exact JDE EnterpriseOne table objects, fields, filters, and aggregation logic required to build a continuous rolling 13-week cash flow forecast. Every field reference is transaction-level — no module summaries, no guesswork.

This is the data architecture spec a BSA hands to the developer or AI integration engineer. The methodology mechanics are proprietary; the output spec is documented here.

---

## Source Table 1: F03B11 — Customer Ledger (A/R Inflows)

**Purpose:** Open receivables — construction lender draws, homebuyer closings, miscellaneous A/R.

| Field | Alias | Description | Use in Forecast |
|---|---|---|---|
| `AN8` | Address Book Number | Customer identifier | Segment classification (lender, buyer, other) |
| `AAP` | Open Amount | Open invoice balance | Inflow amount |
| `DDJ` | Due Date (Julian) | Invoice due date | Weekly band assignment |
| `PST` | Pay Status | Payment status code | Filter |
| `DCT` | Document Type | Invoice type (RI, RR, etc.) | Segment routing |
| `DOCO` | Document Number | Invoice number | Audit trail |
| `MCU` | Business Unit | Division / cost center | Multi-entity cash pooling |

**Filter:** `PST NOT IN ('P', 'V', '#')` — excludes paid, voided, and disputed invoices

**Collection Lag Factors (applied before bucketing):**
- Customer segment = Construction Lender → add 5–7 business days to `DDJ`
- Customer segment = Homebuyer Closing → add 1–2 business days to `DDJ`
- All other → apply historical average lag from `F03B14` (Receipts) by `AN8`

**Weekly Band Logic:** Group adjusted due dates into Week 1–13 relative to forecast run date. Sum `AAP` by week.

---

## Source Table 2: F0411 — A/P Ledger (A/P Outflows)

**Purpose:** Approved, unpaid vendor vouchers — subcontract payments, material invoices, overhead.

| Field | Alias | Description | Use in Forecast |
|---|---|---|---|
| `AN8` | Address Book Number | Vendor identifier | Vendor type classification |
| `AAAP` | Open Amount | Open voucher balance | Outflow amount |
| `DDJ` | Due Date (Julian) | Voucher due date | Weekly band assignment |
| `PST` | Pay Status | Payment status | Filter |
| `PYME` | Payment Method | Check, EFT, wire | Clearing time adjustment |
| `DOCO` | Document Number | Voucher number | Audit trail |
| `MCU` | Business Unit | Cost center | Entity allocation |

**Filter:** `PST = 'A'` — approved, unpaid vouchers only. Excludes `PST = 'P'` (paid), `PST = 'H'` (on hold), `PST = '%'` (manual payment scheduled).

**Payment Method Clearing Adjustment:**
- `PYME = 'C'` (Check) → add 2 business days to `DDJ` for clearing
- `PYME = 'E'` (EFT/ACH) → no adjustment (same-day)
- `PYME = 'W'` (Wire) → subtract 1 day (wire initiates day prior to settlement)

**Weekly Band Logic:** Group adjusted due dates into Week 1–13. Sum `AAAP` by week.

---

## Source Table 3: F5116 — Job Cost Summary (Committed Cost Obligations)

**Purpose:** Committed costs (approved subcontract POs and change orders not yet converted to A/P vouchers). These are real cash obligations absent from F0411 until the voucher is posted.

| Field | Alias | Description | Use in Forecast |
|---|---|---|---|
| `MCU` | Job Number | Job / cost center | Job-level commitment |
| `OBJ` | Object Account | Cost code | Category classification |
| `SUB` | Subsidiary | Sub-account | Detail allocation |
| `AC` | Committed Cost (AC Ledger) | Open commitment amount | Outflow estimate |
| `AA` | Actual Cost (AA Ledger) | Posted actual cost | Reconciliation check |
| `BA` | Budget Amount (BA Ledger) | Original budget | Overage flag |

**Ledger Filter:** Pull `AC` ledger type only — committed but not yet posted.

**Conversion to A/P Estimate:** If job phase schedule is available (external integration), use phase completion date as the conversion trigger. Default fallback: assume 30-day conversion lag from forecast run date. Flag any `AC` balance > $50,000 as high-impact and include in Week 1–4 outflow bands.

**Cross-Reference:** Compare `AC + AA` to `BA`. Flag any job where `(AC + AA) / BA > 1.05` as budget-at-risk. Surface to Controller handoff package.

---

## Source Table 4: F0902 — Account Balances (Opening Cash Position)

**Purpose:** Current cash account balances by business unit — the Week 1 opening position.

| Field | Alias | Description | Use in Forecast |
|---|---|---|---|
| `MCU` | Business Unit | Entity / cost center | Multi-entity aggregation |
| `OBJ` | Object Account | G/L account number | Cash account filter |
| `AN8` | Company | Company code | Multi-company consolidation |
| `GBAM01–12` | Period Balances | Month-to-date balance by period | Current period cash |
| `GBPYAM` | Prior Year Amount | Prior year balance | YoY comparison |

**Cash Account Filter:** Object account range = company-specific cash accounts (typically 1110–1199 range; confirm with COA documentation before deployment).

**Opening Balance Logic:** Sum `GBAM[current period]` across all cash accounts for all operating business units. This is the Week 1 starting balance. Do not include restricted cash accounts (confirm segregation with Controller).

---

## Aggregation and Join Logic

```sql
-- Conceptual aggregation (implement in AI data layer or Orchestrator)

-- Step 1: Build weekly A/R inflow schedule
SELECT
    WEEK_BAND(DDJ_adjusted, forecast_run_date) AS week_number,
    SUM(AAP) AS ar_inflow
FROM F03B11_filtered
WHERE PST NOT IN ('P', 'V', '#')
GROUP BY week_number;

-- Step 2: Build weekly A/P outflow schedule  
SELECT
    WEEK_BAND(DDJ_adjusted, forecast_run_date) AS week_number,
    SUM(AAAP) AS ap_outflow
FROM F0411_filtered
WHERE PST = 'A'
GROUP BY week_number;

-- Step 3: Layer in F5116 committed cost outflow estimate
SELECT
    COMMITMENT_WEEK(phase_date, 30_day_default) AS week_number,
    SUM(AC) AS committed_outflow
FROM F5116_filtered
WHERE ledger_type = 'AC'
GROUP BY week_number;

-- Step 4: Build 13-week schedule
SELECT
    w.week_number,
    COALESCE(ar.ar_inflow, 0) AS inflows,
    COALESCE(ap.ap_outflow, 0) + COALESCE(co.committed_outflow, 0) AS outflows,
    opening_balance + SUM(inflows - outflows) OVER (ORDER BY week_number) AS running_cash_position
FROM week_calendar w
LEFT JOIN ar_weekly ar ON w.week_number = ar.week_number
LEFT JOIN ap_weekly ap ON w.week_number = ap.week_number
LEFT JOIN committed_weekly co ON w.week_number = co.week_number;
```

---

## High-Variance Flag Logic

Apply after aggregation:

> Flag any week where a **single inflow source** accounts for more than **20% of that week's total inflow**.

This identifies weeks where the forecast is vulnerable to a single delayed draw or missed closing. These weeks are marked `⚠ HIGH VARIANCE` in the Controller handoff package and the CFO dashboard.

---

## Refresh Cadence

| Component | Frequency | Trigger |
|---|---|---|
| F03B11 + F0411 pull | Daily | Overnight batch or Orchestrator scheduled job |
| F5116 committed cost update | Daily | Tied to P4314 (change order) approval events |
| F0902 cash balance | Daily | Post-nightly G/L post (R09801) |
| Controller handoff package | Weekly | Monday 6 AM delivery |
| Variance alert | Weekly | Monday morning comparison to prior week forecast |

---

## Pre-Deployment Checklist

Before this data architecture goes to production, the BSA must verify:

- [ ] Cash account OBJ range confirmed with Controller (F0902 filter)
- [ ] Customer segment classification table built (lender vs. buyer vs. other) from Address Book categories
- [ ] Payment method clearing adjustments validated with AP Manager
- [ ] F5116 AC ledger confirmed as the committed cost source (not AA or BA)
- [ ] Job phase schedule integration assessed (Orchestrator REST or 30-day default)
- [ ] Multi-company consolidation scope confirmed (which BU codes are in scope)
- [ ] Restricted cash accounts excluded from F0902 opening balance
- [ ] TRAIGA documentation complete (see FIN-01-traiga-flags.md)

---

> *DACR License v2.6 | McDonald (2026) | Epoch Frameworks LLC*
> *Field specifications are provided for BSA documentation and AI integration planning purposes. Methodology mechanics are proprietary.*
