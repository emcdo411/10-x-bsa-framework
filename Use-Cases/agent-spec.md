# FIN-01 Variance Alert Agent Specification
## Rolling 13-Week Cash Flow Forecast — AI Agent Requirements Document

**Epoch Frameworks LLC | DACR v2.6 | McDonald (2026)**
**Automation Verdict: AUGMENT**

---

## 1. AGENT PURPOSE STATEMENT

This agent monitors actual weekly cash movement against the prior week's 13-week forecast and fires a plain-language alert when the deviation exceeds a defined threshold — before the Controller or CFO makes that week's A/P release decision.

The agent explains the variance. The CFO decides the response.

---

## 2. FUNCTIONAL REQUIREMENTS

### Inputs
- Prior week's forecast file (Monday 6 AM snapshot, archived per retention policy)
- Current `F0902` period balance delta (actual cash movement, week over week)
- Open `F03B11` A/R status (any inflows that were forecast but not received)
- Open `F0411` A/P status (any outflows that posted earlier or later than forecast)
- Job draw status log (external: lender draw submission dates and receipt dates)

### Processing Logic
1. Calculate actual net cash position change for the completed week (`F0902` current period balance minus prior week balance)
2. Compare to the forecast net position for that same week (from archived forecast file)
3. Calculate deviation: `(actual - forecast) / |forecast| × 100`
4. If deviation exceeds ±10%: identify the largest single driver (missed inflow vs. unexpected outflow vs. timing shift)
5. Identify the job number, vendor AN8, or document number associated with the primary driver
6. Calculate updated Week 1–4 cash position based on actual starting balance
7. Draft plain-language alert output (see Output section)

### Outputs
- **Variance alert** (triggers when deviation ≥ 10%): plain-language explanation + recommendation
- **Updated forecast** (always): recalculated Weeks 1–13 from actual opening balance
- **Controller summary** (always): 3-sentence executive brief + updated table

---

## 3. HUMAN HANDOFF CRITERIA

| Condition | Handoff To | Timeframe | Override Protocol |
|---|---|---|---|
| Deviation > 10% in either direction | CFO + Controller | Monday AM before A/P run | CFO can release A/P with documented approval |
| Any week shows net negative cash position | CFO + Construction Lender contact | Immediate | CFO decision required before any disbursement |
| Single draw inflow > 20% of week's total and not received | CFO | Monday AM | CFO decides whether to delay that week's subcontractor payments |
| `F5116` committed cost conversion exceeds $500K in Week 1–2 | Controller | Monday AM | Controller reviews job-level breakdown before A/P run |

**Override Protocol:** CFO or Controller can mark any alert as "reviewed — proceed" or "reviewed — hold" with a timestamp. All override decisions are logged to the audit trail. No A/P release in a flagged week proceeds without a logged decision.

---

## 4. EDGE CASE REGISTER

| Exception Type | Agent Behavior |
|---|---|
| Construction draw received but not yet posted to F0902 (timing lag) | Flag as "receipt confirmed, posting pending" — do not treat as missed inflow |
| Subcontractor payment run processed early (cash leaves early) | Recalculate opening balance; flag week as "outflow timing variance — structural" |
| Multi-entity cash pooling transfers between BUs | Exclude intercompany transfers from inflow/outflow counts; apply to opening balance only |
| F5116 committed cost exceeds 30-day default conversion assumption | Escalate to Controller for manual phase schedule review |
| Negative F0902 balance in any operating account | Immediate alert — do not wait for Monday delivery cadence |
| New job added to F5116 after Monday snapshot | Include in next week's forecast; flag as "new commitment — not in prior forecast" |

**Ambiguity Threshold:** If the primary variance driver cannot be attributed to a specific document number (DOCO) with ≥70% confidence, the agent outputs "Driver: multi-source — Controller review required" rather than a specific attribution.

---

## 5. FAILURE DEFINITION

### What a bad output looks like
- Attributing a variance to the wrong document number or vendor
- Showing a positive cash position when an unposted intercompany transfer was included in the balance
- Missing a high-variance week flag because the 20% threshold was calculated against total outflows instead of total inflows

### Downstream harm scenarios
- CFO approves a full A/P run in a week where a major draw is delayed — cash shortfall results
- Controller presents a lender with a forecast that includes an unposted intercompany transfer as real operating cash — audit finding results
- Variance alert fires on a timing difference (draw received late but confirmed), causing unnecessary A/P hold — subcontractor relationship impact

### Audit Trail Requirements
- Every forecast snapshot archived with run timestamp, source table record counts, and opening balance used
- Every variance alert logged with: trigger condition, deviation %, primary driver attribution, and the human decision that followed
- Every override logged with approver, timestamp, and decision (proceed / hold)

---

## 6. ACCEPTANCE CRITERIA

### Test Scenarios (must pass before production)

| Scenario | Expected Output |
|---|---|
| Week 3 draw not received (simulated): $84K delayed inflow | Alert fires with correct driver attribution; updated forecast shows Week 3–4 cash compression |
| A/P run posts 2 days early (simulated): $120K outflow timing shift | Alert fires as outflow timing variance — structural; Week 1 opening balance updates correctly |
| No variance (simulated): actuals within 8% of forecast | No alert; controller summary shows "on forecast — no action required" |
| Negative cash position in Week 2 (simulated) | Immediate alert fires — does not wait for Monday delivery |
| New $400K subcontract PO entered in F5116 mid-week | Included in next Monday forecast; flagged as new commitment |

### Success Metrics (operational impact, not technical performance)
- CFO receives Monday forecast before 6 AM on 100% of weeks (delivery SLA)
- Zero A/P runs released in a flagged week without a logged CFO or Controller decision
- Forecast variance from actual at Week 4 is within ±15% on average over rolling 12 weeks
- Controller reports ≥ 80% reduction in manual cash model preparation time

---

## Automation Verdict Summary

| Requirement | Verdict | Rationale |
|---|---|---|
| Weekly forecast calculation | AUTOMATE | Arithmetic from defined tables — no judgment required |
| High-variance week flagging | AUTOMATE | Rule-based threshold — no judgment required |
| Variance alert drafting | AUTOMATE | Pattern matching + plain-language generation |
| A/P release recommendation | AUGMENT | Agent recommends; CFO decides |
| A/P hold in flagged week | HUMAN-ONLY | No automated payment hold without CFO logged decision |
| Draw submission timing | AUGMENT | Agent flags risk; Controller decides whether to accelerate |
| Lender communication | HUMAN-ONLY | All lender communication is human-originated |

---

> *DACR License v2.6 | McDonald (2026) | Epoch Frameworks LLC*
> *Agent specification is a BSA deliverable — not a developer implementation spec. Developer translates this spec into Orchestrator logic or an external AI agent layer.*
