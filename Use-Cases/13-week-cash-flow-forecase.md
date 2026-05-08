# Rolling 13-Week Cash Flow Forecast
### JDE EnterpriseOne → AI-Native Treasury Intelligence
**Epoch Frameworks LLC | Erwin Maurice McDonald | DACR v2.6**

[![Made by Erwin Maurice McDonald](https://img.shields.io/badge/Made%20by-Erwin%20Maurice%20McDonald-0A0A23?style=for-the-badge&logo=anthropic&logoColor=white)](https://epochframeworks.com)
[![Module](https://img.shields.io/badge/Module-FIN--01%20Cash%20Flow%20Forecast-FF6B35?style=for-the-badge)](https://epochframeworks.com)
[![JDE](https://img.shields.io/badge/JDE-EnterpriseOne%20Tools%209.2-FF6B35?style=flat-square)](https://oracle.com)
[![Tables](https://img.shields.io/badge/Tables-F03B11%20%7C%20F0411%20%7C%20F5116%20%7C%20F0902-orange?style=flat-square)](https://oracle.com)
[![TRAIGA](https://img.shields.io/badge/TRAIGA-Governance%20Flagged-darkred?style=flat-square)]()
[![License](https://img.shields.io/badge/License-DACR%20v2.6-critical?style=flat-square)](https://epochframeworks.com)

---

## What This Is

A CFO-grade rolling 13-week cash flow forecast built from **live JDE EnterpriseOne data** — not an Excel export from Friday afternoon.

This artifact demonstrates the gap between what JDE could do and what AI-native finance intelligence makes possible. It is part of the [10x Senior BSA Framework](https://github.com/emcdo411/10-x-bsa-framework), Module FIN-01.

---

## The Old World Problem

In JDE E1, a rolling 13-week cash forecast required:

1. A Controller or senior accountant pulling `R03B500` (A/R Aging) manually
2. A separate pull of `R04413` (A/P Aging) 
3. A custom extract from `F5116` (Job Cost committed costs)
4. Hand-stitching all three into an Excel model that was **48 hours stale** by Monday morning
5. No variance alerts — the bank balance told you when you were wrong

**When a construction draw was delayed or a subcontractor payment run hit early, nobody knew until the damage was done.**

---

## The AI-Native Solution

This system pulls continuously from four JDE tables and maintains a live, structured 13-week forecast:

| JDE Table | What It Supplies | Why It Matters |
|---|---|---|
| `F03B11` (Customer Ledger) | Open A/R invoices, due dates, pay status | Inflow timing |
| `F0411` (A/P Ledger) | Approved unpaid vouchers, due dates, payment method | Outflow timing |
| `F5116` (Job Cost Summary) | Committed costs not yet converted to A/P | Obligation forecast |
| `F0902` (Account Balances) | Current cash position by business unit | Opening balance |

---

## Key Features

### 1. Data Architecture (FIN-01 Spec)
- Exact field mappings from each JDE table
- Join and aggregation logic for weekly cash bands
- Pay status filters (`PST not in ('P','V','#')` for A/R; `PST = 'A'` for A/P)

### 2. Forecast Engine
- A/R bucketed by due date into 13 weekly bands
- Collection lag factors by customer segment:
  - Construction lender draw: 5–7 business day lag after submission
  - Homebuyer closing: 1–2 day lag
  - Other: historical average from `F03B14`
- A/P bucketed by due date; `F5116` committed costs estimated to convert within 30 days
- `F0902` current balance as Week 1 opening position
- **High-variance flags** on any week where a single inflow > 20% of weekly total

### 3. Variance Alert Agent
- Weekly comparison: actual cash (`F0902` period delta) vs. prior forecast
- Alert threshold: ±10% deviation
- Plain-language output:
  > *"Week 3 cash position is $84,000 below forecast. Primary driver: construction draw for Lot 14 (Job 5042) not received as scheduled. Projected receipt: 3 business days. Recommend: no discretionary A/P releases this week without CFO approval."*
- **Automation verdict: AUGMENT** — agent explains; CFO decides

### 4. Controller Handoff Package
- Delivery: **Monday 6 AM** — before the week's first A/P release
- Format: 3-sentence executive summary + 13-week table + flagged weeks
- Archive: 12-month retention for lender audit

### 5. Governance Flags (TRAIGA)
AI involvement in cash forecast that influences draw timing or A/P holds is a **consequential financial decision** under the Texas Responsible AI Governance Act.

Required documentation before production deployment:
- Named model owner with review cadence
- Exception override protocol (who can override AI recommendation, how it's logged)
- Audit trail for any draw submission timing influenced by the forecast
- Lender notification policy if AI is involved in draw package approval

---

## File Structure

```
/cash-flow-forecast
├── README.md                          ← This file
├── docs/
│   ├── FIN-01-data-architecture.md   ← JDE table spec + field mappings
│   ├── FIN-01-agent-spec.md          ← Variance alert agent specification
│   └── FIN-01-traiga-flags.md        ← TRAIGA governance documentation template
├── data/
│   └── sample-forecast-data.json     ← Synthetic 13-week dataset (no real client data)
└── src/
    └── CashFlowForecast.jsx          ← React dashboard component
```

---

## Who This Is For

| Role | What They Get |
|---|---|
| **CFO** | Monday 6 AM cash position they can trust without waiting for the Controller |
| **Controller** | Variance alerts before the week's A/P run — not after the bank balance surprises them |
| **BSA / AI Architect** | A portfolio artifact showing JDE table-level fluency + AI agent spec design |
| **Construction Lender** | 12-month forecast archive for draw audit documentation |

---

## Part of the 10x BSA Framework

This artifact maps to **FIN-01** in the [10x Senior BSA Prompt Library — Module 2](https://github.com/emcdo411/10-x-bsa-framework).

Related artifacts in the framework:
- `JDEHB-01` — Trade Partner Performance Score (TPPS)
- `JDEHB-02` — Subcontract Change Order Intelligence
- `JDEHB-03` — Permit Milestone Carry Cost Intelligence
- `FIN-02` — Fixed Asset Pre-Run Validation (R12855)
- `FIN-03` — A/R Collections Intelligence

---

> *DACR License v2.6 | McDonald (2026) | Epoch Frameworks LLC | All rights reserved*
>
> [![Epoch Frameworks](https://img.shields.io/badge/Epoch%20Frameworks%20LLC-AI%20Adoption%20Architecture-FF6B35?style=for-the-badge)](https://epochframeworks.com)
