# JDE E1 + Homebuilder Extension Layer
## 10x Senior BSA Prompt Library — Module 2

[![Made by Erwin Maurice McDonald](https://img.shields.io/badge/Made%20by-Erwin%20Maurice%20McDonald-0A0A23?style=for-the-badge&logo=anthropic&logoColor=white)](https://epochframeworks.com)
[![Module](https://img.shields.io/badge/Module-JDE%20E1%20%2B%20Homebuilder-FF6B35?style=for-the-badge)](https://epochframeworks.com)
[![Extends](https://img.shields.io/badge/Extends-10x%20BSA%20Prompt%20Library%20v1.1-blue?style=for-the-badge)](https://epochframeworks.com)
[![License](https://img.shields.io/badge/License-DACR%20v2.6-critical?style=for-the-badge)](https://epochframeworks.com)
[![Year](https://img.shields.io/badge/McDonald-2026-red?style=for-the-badge)](https://epochframeworks.com)

---

> **Why this module exists.** The base 10x BSA skill names JDE E1 as a persona credential but carries no transaction-level depth. Anyone who actually ran P4210, wrote a DREAM Writer UBE, or managed a Tools 9.2 Orchestrator knows the difference. This extension fixes that gap — and goes further, layering in the construction and homebuilder-specific JDE E1 modules (Job Cost, Subcontract Management, Service Billing, Real Estate) that define the stack for mid-market and regional homebuilders running E1 as their system of record.
>
> Every prompt is written from inside the system. Not from a vendor overview. Not from a certification exam. From the floor.

---

## Table of Contents

- [JDE E1 Gap Map — Transaction-Level](#-jde-e1-gap-map--transaction-level)
- [Homebuilder Module Overlay](#-homebuilder-module-overlay)
- [JDE E1 Prompts](#-jde-e1-prompts)
- [JDE E1 × Homebuilder Prompts](#-jde-e1--homebuilder-prompts)
- [AI Readiness Scoring — JDE Homebuilder Edition](#-ai-readiness-scoring--jde-homebuilder-edition)

---

## 🔶 JDE E1 Gap Map — Transaction-Level

[![JDE](https://img.shields.io/badge/JDE-EnterpriseOne%20Tools%209.2-FF6B35?style=flat-square)](https://oracle.com)
[![Modules](https://img.shields.io/badge/Modules-FIN%20%7C%20SC%20%7C%20JC%20%7C%20HR%20%7C%20MFG-orange?style=flat-square)](https://oracle.com)
[![Depth](https://img.shields.io/badge/Depth-Transaction%20Level%20%2B%20UBE%20%2B%20Orchestrator-success?style=flat-square)](https://epochframeworks.com)

> This is the Gap Map the base skill was missing. Every row names the actual JDE object — the P-program, R-report, or UBE — not a module-level generalization. These are the friction points a BSA who lived inside E1 knows without looking them up.

| JDE E1 Limitation | JDE Object / Transaction | AI Capability That Closes It |
|---|---|---|
| Financial reporting required BI Publisher report layout knowledge or a custom DREAM Writer UBE (R-program); business users could not self-serve without IT | R03B500 (A/R Aging), R04413 (A/P Aging), custom R09xxx GL reports via DREAM Writer | Natural language querying surfaces the same output from the F0911 transaction ledger without a report layout or UBE job submission |
| Cross-module reconciliation between Job Cost (F5114/F5116) and G/L (F0911) was a manual SE/SQL exercise; discrepancies lived undiscovered until period close | F5114 (Job Cost Detail Ledger), F0911 (Account Ledger), P51901 (Job Cost Inquiry) | AI agents reconcile F5114 to F0911 continuously, surface cost code variance in real time, and flag root cause before close |
| Subcontract purchase order approval routing (P4310/P43101) was static by dollar threshold; changing a threshold required a workflow (P98806) configuration change and a CNC specialist | P4310 (Purchase Order Entry), P43101 (PO Detail Revisions), P98806 (Workflow Rules) | AI routes subcontract PO approvals dynamically by vendor risk score, contract type, cost code, and historical performance — no CNC ticket |
| Change order management for subcontracts (P4314) was manual, version-controlled in paper or Excel outside JDE; no automated impact-to-budget calculation | P4314 (Subcontract Change Orders), F4311 (PO Detail), F5116 (Job Cost Summary) | AI calculates downstream budget impact of each change order across cost codes before approval, and flags budget overage risk at the line level |
| Pay application processing (G/C draws) required manual matching of subcontractor invoices to PO receipts (P4312) and job cost budget lines; errors surfaced at audit | P4312 (PO Receipts), P0411 (A/P Standard Voucher Entry), F0411 (A/P Ledger) | AI three-way matches subcontractor pay applications to PO, receipt, and budget line — flags discrepancies before voucher entry |
| Business Rule exception identification in UBE batch processing (R-programs) required knowing which report to run and what the output meant; anomalies sat until someone looked | R42800 (Sales Update), R31802 (Work Order Completion), any R-program batch | AI monitors UBE job output logs for exception patterns and surfaces anomalies the BSA did not know to search for |
| Orchestrator Studio (Tools 9.2+) automations required a JDE-certified developer; business process logic could not be captured or modified by a BSA alone | Orchestrator Studio, REST Orchestrations, Notification Orchestrations | AI translates business process descriptions directly into Orchestrator logic specs — BSA authors the requirements, developer implements a tested spec |
| User adoption was chronically low because JDE's role-based menus (P09012 / Solution Explorer) did not surface the right transaction based on what the user was actually doing | Solution Explorer, Fast Path codes, P09012 (Menu Design) | AI copilots surface the right P-program, fast path code, or next step based on current user context — reducing dependency on trained power users |
| Period close (AAIs — Automatic Accounting Instructions) errors were discovered post-close; AAI misconfiguration (P00121) produced silent G/L posting errors | P00121 (AAI Revisions), F0012 (AAI Table), F0911 (Account Ledger) | AI validates AAI configuration against posting patterns before close runs, flags mismatches before the R09801 (G/L Post) executes |
| Forecasting required manual data pulls from F0902 (Account Balances), Excel modeling, and significant BSA time; no continuous forecast from live E1 data | F0902 (Account Balances), F5116 (Job Cost Summary), P51901 | AI-native forecasting runs continuously on F0902 and F5116 with configurable confidence intervals — no manual pull |

---

## 🏗️ Homebuilder Module Overlay

[![Vertical](https://img.shields.io/badge/Vertical-Construction%20%2F%20Homebuilder-8B4513?style=flat-square)](https://epochframeworks.com)
[![Archetypes](https://img.shields.io/badge/Archetypes-Custom%20Luxury%20%7C%20Semi--Custom%20Regional%20%7C%20Production%20National-orange?style=flat-square)](https://epochframeworks.com)
[![JDE%20Modules](https://img.shields.io/badge/JDE%20Modules-JC%20%7C%20SC%20%7C%20RE%20%7C%20SB%20%7C%20FA-brown?style=flat-square)](https://oracle.com)

> Most JDE BSAs know Finance, Distribution, and Manufacturing. Homebuilder is a different animal. The primary modules are Job Cost (JC), Subcontract Management (SC), Real Estate (RE), Service Billing (SB), and Fixed Assets (FA) — and the integration pain between them is where margin leaks live. This overlay maps the homebuilder-specific gap, by archetype.

### Homebuilder JDE Module Gap Map

| JDE Homebuilder Pain Point | JDE Module / Object | Archetype | AI Capability |
|---|---|---|---|
| Job cost budgets (P5101) are set at contract signing and never updated in real time as subcontract change orders accumulate | P5101 (Job Master), F5116 (Job Cost Summary), P4314 (SC Change Orders) | All three archetypes | AI maintains a live budget-vs-actual view at the cost code level, recalculating the at-completion forecast on every approved change order |
| Trade partner (subcontractor) performance data exists only in the superintendent's head — JDE SC module (P4310) tracks payments but not performance | P4310 (PO Entry), F4311 (PO Detail), F4316 (Subcontract Ledger) | Custom Luxury, Semi-Custom Regional | AI builds a Trade Partner Performance Score (TPPS) from payment history, change order frequency, inspection outcomes, and warranty claim attribution — surfaced from data already in E1 |
| Permit and inspection milestone tracking is external to JDE (spreadsheet, Buildertrend, or nothing); there is no native permit date field in the JDE Job Master | P5101 (Job Master), F5101 (Job Master Table) — no native permit date field | All three archetypes | AI creates a permit milestone intelligence layer that reads external permit data and maps it to JDE job numbers — surfacing carry cost impact from idle days between permit stages |
| Construction draw (pay application) reconciliation between the subcontractor's G702/G703 and JDE SC ledger (F4316) is manual and error-prone | F4316 (Subcontract Ledger), P0411 (Voucher Entry), P4312 (PO Receipts) | Semi-Custom Regional, Production National | AI performs automated draw reconciliation — matching G702 line items to F4316 open commitments and flagging overbilling before the voucher is posted |
| Warranty claim tracking lives in spreadsheets or a separate system; JDE Service Billing (SB) module is rarely configured for warranty in homebuilder environments | P1730 (Service Orders), F1301 (Service Order Master) — rarely implemented | All three archetypes | AI creates a warranty intelligence layer: categorizes claims by trade, cost code, and subdivision; identifies repeat-offender patterns; and routes warranty cost chargebacks back to the responsible subcontract PO |
| Real Estate (RE) module lot management (P1501) is often configured at go-live and never maintained; lot status, buyer contract, and closing date data is stale | P1501 (Property Master), F1501 (Property Master Table), P1521 (Unit Master) | Custom Luxury, Semi-Custom Regional | AI maintains a live lot status dashboard by reading closing schedule data and buyer contract milestones — flagging lots at risk of closing delay before the carry cost accumulates |
| Division benchmarking for production national builders requires manual data pulls from F5116 across multiple business units; no automated cross-division comparison | F5116 (Job Cost Summary) by Business Unit, P51901 | Production National | AI generates weekly division cycle time variance reports — comparing actual days per construction phase across divisions against the national company median |
| Cost code structure is set at implementation and never evolves; by year 3, the cost code tree (F5104) no longer reflects how the business actually builds | F5104 (Cost Code Master), P5101 (Job Master), F5116 | All three archetypes | AI analyzes posting patterns against the cost code structure to identify unused codes, miscoded transactions, and structural gaps — producing a cost code rationalization recommendation |

---

## 🔶 JDE E1 Prompts

[![JDE](https://img.shields.io/badge/JDE-EnterpriseOne-FF6B35?style=for-the-badge)](https://oracle.com)
[![Tools](https://img.shields.io/badge/Tools-9.2%20%2B%20Orchestrator%20Studio-orange?style=flat-square)](https://oracle.com)
[![Experience](https://img.shields.io/badge/Experience-10%2B%20Years%20Inside%20E1-success?style=flat-square)](https://epochframeworks.com)

---

### JDE-01 — AAI Validation and Pre-Close G/L Integrity Audit

[![Module](https://img.shields.io/badge/Module-FIN%20%7C%20G%2FL%20%7C%20AAI-FF6B35?style=flat-square)](https://oracle.com)
[![Object](https://img.shields.io/badge/Object-P00121%20%7C%20F0012%20%7C%20R09801-orange?style=flat-square)](https://oracle.com)
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-AAI%20Errors%20Discovered%20Post--Close-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Pre--Close%20Validation%20Before%20R09801%20Runs-success?style=flat-square)]()

**The Old World:** AAI (Automatic Accounting Instructions) errors in JDE were silent killers. The G/L Post UBE (R09801) would run, transactions would post to the wrong accounts, and nobody knew until reconciliation — or audit. Changing an AAI in P00121 required a CNC review and a test environment run. Most shops ran it in production and hoped.

**The Prompt:**

```
You are a Senior JDE EnterpriseOne BSA with deep experience in Financial Management — specifically AAI configuration (P00121), G/L posting logic, and period close procedures in a multi-company, multi-business-unit E1 environment.

The Controller has flagged that intercompany journal entries are posting to incorrect accounts during the R09801 (G/L Post) UBE run. The environment is JDE Tools 9.2, with AAIs configured across three company codes (Company 00001, 00100, 00200) and two business units per company.

Produce the following:

1. DIAGNOSTIC FRAMEWORK — A structured pre-close AAI validation checklist. For each of the following AAI item categories, specify: the AAI item name, the F0012 table field that controls it, the account object/subsidiary it should resolve to, and the test transaction type that will expose a misconfiguration:
   - GLC (G/L Class Code — default posting accounts)
   - GLG (Intercompany settlements)
   - GLRC (Retained earnings rollforward)
   - DMAAI items for A/P (PCxxxx series) and A/R (RCxxxx series)

2. PRE-CLOSE VALIDATION QUERY LOGIC — Describe the F0911 (Account Ledger) query logic I need to run before the period close R09801 to identify:
   a. Journal entries posted to accounts outside the expected account range for their document type
   b. Intercompany entries (GLBA document type or equivalent) where the offsetting company code is not reconciling to zero
   c. Unposted batches (F0011 Batch Control — ICST = 'D' or error status) that will block the period close

3. ORCHESTRATOR SPEC — Write the business requirements for a JDE Orchestrator notification that fires when an R09801 batch completes with errors. The spec must include:
   - Trigger: R09801 UBE completion with error status
   - Data retrieved: batch number (F0011.ICICU), error type, company code, business unit, and affected account
   - Output: email notification to the Controller and Accounting Manager with a structured summary — not a raw UBE log
   - Human handoff criteria: which error types require manual correction before re-run versus which can be auto-corrected by a follow-on UBE

4. REMEDIATION PRIORITY STACK — If the AAI audit surfaces five or more misconfigured items, produce a prioritization framework: which AAI errors produce silent mispostings (highest risk — catch before period close) versus which produce UBE errors that halt processing (visible — lower silent risk, higher operational disruption).

5. CHANGE CONTROL SPEC — Produce a BSA-grade AAI change request template suitable for a JDE Change Advisory Board. Include: current state, proposed state, affected transactions, test scenario required, and rollback procedure.

Do not produce generic JDE documentation. Every recommendation must reference a specific AAI item, F-table, or UBE by name.
```

---

### JDE-02 — Orchestrator Studio Business Requirements for A/P Payment Automation

[![Module](https://img.shields.io/badge/Module-A%2FP%20%7C%20FIN%20%7C%20Orchestrator-FF6B35?style=flat-square)](https://oracle.com)
[![Object](https://img.shields.io/badge/Object-P0411%20%7C%20P04571%20%7C%20R04570-orange?style=flat-square)](https://oracle.com)
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Rigid%20Payment%20Processing%20Requiring%20CNC%20Dev-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Context--Aware%20Payment%20Routing%20via%20Orchestrator-success?style=flat-square)]()

**The Old World:** The JDE Automatic Payment Processing UBE (R04570) ran on a schedule. It didn't care that a vendor's bank account had changed last Tuesday, that three invoices in the batch had disputed line items sitting in a comment field nobody checked, or that the payment terms on the voucher didn't match what was negotiated. You found out on the bank statement.

**The Prompt:**

```
You are a Senior JDE EnterpriseOne BSA with deep experience in A/P Financial Management — specifically P0411 (Standard Voucher Entry), P04571 (Speed Voucher Entry), the Automatic Payment Processing suite (P04571/R04570), and JDE Tools 9.2 Orchestrator Studio.

The AP Manager has requested an AI-augmented payment approval workflow that adds pre-payment validation logic without replacing the standard R04570 UBE run.

Produce a complete Orchestrator Business Requirements Document with the following sections:

1. ORCHESTRATION PURPOSE STATEMENT
   One sentence: what decision or validation this orchestration owns, and what it explicitly does NOT own (R04570 still runs; this orchestration gates it).

2. FUNCTIONAL REQUIREMENTS — INPUTS
   Specify every data field the orchestration must read before a payment batch is released:
   - From F0411 (A/P Ledger): vendor number (AN8), payment amount (AAAP), payment terms (PTC), due date (DDJ), pay status (PST), GL date (DGL)
   - From F0101 (Address Book Master): vendor bank account status, any hold flag
   - From F4311 (PO Detail — for 3-way match): receipt status (UREC), matched quantity vs. invoiced quantity
   - From a custom Z-table or processing option: dispute flag, manual hold reason

3. PROCESSING LOGIC — VALIDATION RULES
   Write the business rules the orchestration evaluates before releasing each voucher to the payment batch. For each rule, specify the data source, the condition that triggers a hold, and the automation verdict:
   - Rule 1: Vendor bank account change in last 30 days → HUMAN-ONLY (fraud risk; do not release without Treasury approval)
   - Rule 2: Voucher amount exceeds 110% of corresponding PO line → AUGMENT (flag for AP Supervisor review before batch)
   - Rule 3: Payment terms on voucher do not match vendor master (F0401) → AUGMENT (notify AP Coordinator; auto-correct if variance < 5 days)
   - Rule 4: Duplicate invoice number from same vendor in rolling 90-day window → HUMAN-ONLY (halt; route to AP Manager)
   - Rule 5: Voucher in dispute status (custom flag) → HUMAN-ONLY (exclude from batch; log in dispute register)
   - Add two additional rules calibrated to a construction/homebuilder subcontractor payment environment

4. HUMAN HANDOFF CRITERIA
   Define the escalation path for each hold type: who receives the notification, in what format (email / JDE workflow task / external system), within what SLA, and what the override protocol is.

5. EDGE CASE REGISTER
   Cover: split payment scenarios, partial payment releases, EFT vs. check payment method routing, foreign currency vouchers (if multi-currency enabled), and void/reissue scenarios.

6. ACCEPTANCE CRITERIA
   How the AP Manager will verify this orchestration is working. Include: three test scenarios that must pass before production activation, the success metric (payment exception rate pre- vs. post-deployment), and the audit log requirement for every hold decision made by the orchestration.

Format as a handoff document to a JDE developer who will build in Orchestrator Studio. Do not include Orchestrator syntax — include the business logic that the developer will translate.
```

---

### JDE-03 — DREAM Writer UBE Replacement: AI-Native Job Cost Variance Report

[![Module](https://img.shields.io/badge/Module-Job%20Cost%20%7C%20FIN%20%7C%20Reporting-FF6B35?style=flat-square)](https://oracle.com)
[![Object](https://img.shields.io/badge/Object-F5116%20%7C%20F5114%20%7C%20P51901-orange?style=flat-square)](https://oracle.com)
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-DREAM%20Writer%20UBEs%20Requiring%20IT%20%2F%20Power%20User-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Natural%20Language%20Cost%20Variance%20Reporting-success?style=flat-square)]()

**The Old World:** Job Cost variance reporting in JDE meant either learning to read P51901 (Job Cost Inquiry) — which most PMs never mastered — or submitting a request to IT to write a custom DREAM Writer UBE (R51xxx) and waiting two weeks. The PM needed to know the cost code. They needed to know the ledger type. They needed to know what "AAI-driven" meant when the budget column was wrong. Most of them went back to Excel.

**The Prompt:**

```
You are a Senior JDE EnterpriseOne BSA with deep experience in Job Cost (JC) — specifically the F5114 (Job Cost Detail Ledger), F5116 (Job Cost Summary), F5101 (Job Master), F5104 (Cost Code Master), and the P51901 (Job Cost Inquiry) application.

The VP of Construction has said: "I need to know which jobs are over budget and why, and I need to see it without calling IT." That is the entire specification.

Produce the following:

1. DATA ARCHITECTURE MAP — Translate the VP's request into the precise JDE data objects required:
   - F5116 fields needed: Business Unit (MCU), Cost Code (OBJ), Cost Type (SUB), Budget Amount (AB01 or ledger type BA), Actual Amount (AA01 or ledger type AA), Committed Amount (AC01 or ledger type AC)
   - F5114 fields needed for drill-down: Document Number (DOC), Document Type (DCT), Supplier/Vendor (AN8), Transaction Amount (AA), G/L Date (DGL)
   - F5101 fields for job context: Job Name (JBNM), Job Status (JBST), Project Manager (AN8), Estimated Completion Date
   - Define the join logic between these three tables by Business Unit and Cost Code

2. NATURAL LANGUAGE QUERY TRANSLATION — For each of the following plain-language questions a PM or VP would actually ask, write the underlying JDE data logic (the field, ledger type, and calculation) that answers it:
   - "Which jobs are over budget right now?"
     → F5116: WHERE (AA01 + AC01) > AB01 by Business Unit; sort by variance descending
   - "Which cost codes are burning the fastest this month?"
     → F5114: WHERE DGL in current period; GROUP BY OBJ + SUB; SUM AA; compare to F5116.AB01 prorated by period
   - "Which subcontractor is responsible for the most cost overruns this year?"
     → F5114: WHERE DCT in (OV, PV — subcontract voucher types); GROUP BY AN8; SUM AA vs. F4311 original PO amount
   - Add two additional PM-level questions calibrated to a homebuilder environment (permit delays, phase completion cost)

3. AI REPORT SPECIFICATION — Write the requirements for an AI-native job cost variance report that replaces the DREAM Writer UBE for this use case:
   - Data sources: F5116 (summary), F5114 (detail drill-down), F5101 (job context)
   - Refresh frequency: daily (not period-close dependent)
   - Output format: plain English exception list — "Job 5042 (Lot 14 — Ridgeline Estates) is $47,200 over budget in cost code 6200 (Framing). Three subcontract vouchers posted since last week account for 94% of the variance. Primary vendor: Apex Framing LLC."
   - Human handoff criteria: any job where actual + committed exceeds budget by more than 15% routes to the Controller for review before the next draw request

4. ORCHESTRATOR NOTIFICATION SPEC — Write the business requirements for a weekly Orchestrator notification that surfaces the top 5 over-budget jobs to the VP of Construction every Monday at 7 AM:
   - Data: pulled from F5116, filtered by job status = Active (JBST = A), sorted by budget variance percentage descending
   - Format: plain-language summary — not a UBE output file
   - Escalation: any job with variance > 20% triggers a separate notification to the CFO

5. TRAIGA COMPLIANCE FLAG — If this AI report is used to make draw approval decisions or subcontractor payment holds, identify the TRAIGA documentation obligations that apply and what the BSA must produce before this goes to production.
```

---

## 🏗️ JDE E1 × Homebuilder Prompts

[![Vertical](https://img.shields.io/badge/Vertical-Construction%20%2F%20Homebuilder-8B4513?style=for-the-badge)](https://epochframeworks.com)
[![JDE](https://img.shields.io/badge/JDE-E1%20Job%20Cost%20%7C%20Subcontract%20%7C%20RE-FF6B35?style=for-the-badge)](https://oracle.com)
[![Archetypes](https://img.shields.io/badge/Archetypes-All%20Three-orange?style=flat-square)](https://epochframeworks.com)

---

### JDEHB-01 — Trade Partner Performance Scoring System Built from JDE SC Module Data

[![Module](https://img.shields.io/badge/Module-Subcontract%20%7C%20Job%20Cost%20%7C%20A%2FP-FF6B35?style=flat-square)](https://oracle.com)
[![Object](https://img.shields.io/badge/Object-F4311%20%7C%20F4316%20%7C%20F5114%20%7C%20F0411-orange?style=flat-square)](https://oracle.com)
[![Archetype](https://img.shields.io/badge/Archetype-Custom%20Luxury%20%7C%20Semi--Custom%20Regional-8B4513?style=flat-square)](https://epochframeworks.com)
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Trade%20Scoring%20Lived%20in%20the%20Superintendent%27s%20Head-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-TPPS%20Built%20from%20Data%20Already%20in%20E1-success?style=flat-square)]()

**The Old World:** The superintendent knew which framing crew cut corners. The PM knew which plumber had caused two warranty callbacks last year. The owner had a gut feeling about the HVAC sub. None of that lived in JDE. The SC module tracked payments — not performance. When the superintendent left, the institutional memory walked out with him.

**The Prompt:**

```
You are a Senior JDE EnterpriseOne BSA and AI Adoption Architect working with a semi-custom regional homebuilder running JDE E1 as their primary ERP. The builder completes 60–90 homes per year across three subdivisions. Their subcontract management runs through P4310 (Purchase Order Entry — Subcontract type), with payments processed through P0411 and the F4316 (Subcontract Ledger).

The VP of Construction has said: "I want to know which subs are costing me money before I send them a bid." That is the specification.

Produce a complete Trade Partner Performance Scoring System (TPPS) built from data already in JDE E1:

1. DATA INVENTORY — Identify every JDE table that contains signal data for subcontractor performance. For each table, name the specific fields and explain what performance signal they carry:
   - F4311 (PO Detail): original committed amount vs. change order accumulation — measures scope creep by sub
   - F4316 (Subcontract Ledger): payment history, retention amounts held, lien waiver status (if tracked via processing option)
   - F5114 (Job Cost Detail Ledger): cost postings by vendor (AN8) within a cost code — maps which sub drove cost overruns by phase
   - F0411 (A/P Ledger): invoice submission pattern — subs who consistently invoice late or over the PO amount
   - F4801 (Work Orders — if Service Billing module is active): warranty service orders attributed to a specific sub
   - Custom Z-table or processing option: inspection failure flags, punchlist items by sub (if tracked)

2. SCORING MODEL DESIGN — Build a TPPS (Trade Partner Performance Score) on a 0–100 scale with five weighted dimensions:
   - COST DISCIPLINE (25 pts): ratio of approved change orders to original PO value by vendor across trailing 12 months (F4311/F4316). Score 25 = zero approved change orders; score 0 = change orders exceed 25% of original PO value.
   - SCHEDULE SIGNAL (25 pts): proxy measure — invoice submission timing relative to phase completion date. Early invoice without corresponding PO receipt = flag. Source: F0411 invoice date vs. F4312 receipt date.
   - WARRANTY EXPOSURE (20 pts): count of warranty service orders (F4801) attributed to this vendor in trailing 24 months. Score 20 = zero warranty callbacks; score 0 = 3 or more warranty events.
   - PAYMENT COMPLIANCE (15 pts): frequency of invoices submitted that exceed the PO line amount (overbilling) before change order approval. Source: F0411 gross amount vs. F4311 open amount.
   - RETENTION AND LIEN RISK (15 pts): percent of jobs where retention was withheld beyond standard release window, and any lien waiver exceptions. Source: F4316 retention fields and custom flag if tracked.

3. SCORING OUTPUT FORMAT — Produce the template for a weekly Trade Partner Scorecard delivered to the VP of Construction. The scorecard must:
   - List the top 10 active subcontractors by current open PO value
   - Show TPPS score for each with a score trend (up/flat/down vs. prior quarter)
   - Flag any vendor with TPPS below 65 as a bid restriction candidate
   - For each flagged vendor, produce a one-sentence plain-language summary: "Apex Framing LLC (Score: 58) — change orders have averaged 19% of original PO value across 4 active jobs. Two warranty callbacks in the last 18 months. Recommend bid restriction pending superintendent review."

4. ORCHESTRATOR NOTIFICATION SPEC — Write the business requirements for a JDE Orchestrator notification that fires when a new subcontract PO (P4310) is being created for a vendor with a TPPS below 65:
   - Trigger: new PO document entered in P4310 where vendor AN8 maps to a TPPS score below threshold
   - Output: warning notification to the entering user and VP of Construction — not a hard block
   - Message format: "Warning: [Vendor Name] has a Trade Partner Performance Score of [XX]. Last warning reason: [top scoring factor]. Proceed? Yes / Route to VP for approval."
   - Automation verdict: AUGMENT — system warns, human decides

5. TRAIGA AND DATA GOVERNANCE FLAGS — Identify the governance requirements if TPPS scores are used to exclude a vendor from bidding:
   - Is a TPPS-driven bid exclusion a consequential decision under TRAIGA?
   - What documentation must exist before an AI-generated score influences a procurement decision?
   - Who is the named owner of the TPPS model, and what is the review cadence?
```

---

### JDEHB-02 — Subcontract Change Order Intelligence and Budget Impact Cascade

[![Module](https://img.shields.io/badge/Module-Subcontract%20%7C%20Job%20Cost%20%7C%20FIN-FF6B35?style=flat-square)](https://oracle.com)
[![Object](https://img.shields.io/badge/Object-P4314%20%7C%20F4311%20%7C%20F5116%20%7C%20P5101-orange?style=flat-square)](https://oracle.com)
[![Archetype](https://img.shields.io/badge/Archetype-All%20Three-8B4513?style=flat-square)](https://epochframeworks.com)
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Change%20Orders%20Managed%20in%20Paper%20%2F%20Excel%20Outside%20JDE-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Real--Time%20Budget%20Impact%20Before%20Approval-success?style=flat-square)]()

**The Old World:** Change order management in a JDE homebuilder shop was a parallel universe. The subcontractor submitted a change order in writing. Someone entered it into P4314 (Subcontract Change Orders) — eventually. The budget in F5116 didn't update until the change order was approved and posted. By then, three more change orders had been submitted verbally, the job was $80K over budget, and the Controller found out at draw time.

**The Prompt:**

```
You are a Senior JDE EnterpriseOne BSA working with a production national homebuilder running JDE E1 across four divisions. The builder starts 200+ homes per year. Subcontract change orders are processed through P4314 (Subcontract Change Orders), with the job cost impact hitting F5116 (Job Cost Summary) only after approval and posting.

The CFO has said: "By the time I see the budget impact of a change order, the check has already been written." Build the system that fixes this.

Produce the following:

1. CHANGE ORDER DATA FLOW MAP — Document the complete data flow from change order submission to budget impact in JDE E1. For each stage, name the JDE object, the field that changes, and the timing gap the CFO is referring to:
   - Stage 1: Subcontractor submits change order (external — not yet in JDE). Gap: zero visibility.
   - Stage 2: PM enters change order in P4314. F4311 (PO Detail) open amount updates. F5116 committed column (AC ledger type) updates. Gap: entered late, often after work is done.
   - Stage 3: Change order approved (P4314 approval status). F5116 budget column does not update unless a budget revision is manually entered in P5101.
   - Stage 4: Subcontractor invoices. P0411 voucher entered. F5114 actuals post. F5116 actual (AA ledger) updates.
   - Identify: at which stage does the budget variance become visible to the Controller without a custom report?

2. PRE-APPROVAL BUDGET IMPACT CALCULATION — Write the business requirements for an AI agent that calculates the full budget impact of a change order before it is approved in P4314:
   - Inputs: change order amount from P4314 entry, cost code (OBJ/SUB) from F4311, job number (MCU) from F5101
   - Calculation: pull current F5116 BA (budget), AA (actual), AC (committed) for the affected cost code → calculate new at-completion forecast → compare to original job budget from F5101 → flag if new at-completion exceeds budget by >5%
   - Output: a pre-approval budget impact summary delivered to the approver before they act in P4314 — not after
   - Automation verdict: AUGMENT — agent calculates and surfaces; human approves or escalates

3. CROSS-JOB CHANGE ORDER PATTERN DETECTION — Write the logic for an AI agent that identifies when the same subcontractor is submitting similar change order types across multiple active jobs — a pattern that indicates a systemic pricing or scope definition problem, not a one-off event:
   - Data source: F4311 filtered by vendor AN8 + change order document type (CO or equivalent custom type)
   - Pattern: same sub, same cost code, change order amount > 10% of original PO line, across 3+ active jobs in rolling 90 days
   - Output: "Apex Framing LLC has submitted framing scope change orders on 4 active jobs in the last 60 days totaling $112,400. Average CO is 16% of original PO value. Recommend scope definition review before next bid cycle."

4. DRAW REQUEST PROTECTION — Write the business requirements for a pre-draw validation check that ensures no draw request is submitted to the construction lender while unapproved change orders in P4314 exceed 8% of the original job budget:
   - Trigger: draw request initiation (can be manual check or Orchestrator-triggered)
   - Check: F4314 open/unapproved change order total for the job → divide by F5101 original budget → if >8%, block draw and notify Controller and PM
   - Automation verdict: HUMAN-ONLY — do not release the draw package until the Controller clears the flag

5. DIVISION-LEVEL CHANGE ORDER BENCHMARKING — For production national builders, write the specification for a monthly change order benchmark report across divisions:
   - Metric: change order rate = total approved CO value ÷ total original subcontract PO value by division by trailing 3 months
   - Source: F4316 (Subcontract Ledger) grouped by Business Unit prefix that identifies the division
   - Output: division ranking with the national company median as the benchmark — flag any division where change order rate exceeds 1.5x the median
   - Audience: CFO and each Division VP — separate views by audience with role-appropriate detail level
```

---

### JDEHB-03 — Permit Milestone Intelligence Layer Mapped to JDE Job Numbers

[![Module](https://img.shields.io/badge/Module-Job%20Cost%20%7C%20Job%20Master%20%7C%20External%20Integration-FF6B35?style=flat-square)](https://oracle.com)
[![Object](https://img.shields.io/badge/Object-F5101%20%7C%20P5101%20%7C%20Orchestrator%20REST-orange?style=flat-square)](https://oracle.com)
[![Archetype](https://img.shields.io/badge/Archetype-All%20Three-8B4513?style=flat-square)](https://epochframeworks.com)
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Permit%20Dates%20Tracked%20in%20Spreadsheets%20Outside%20JDE-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Carry%20Cost%20Impact%20Mapped%20to%20Live%20JDE%20Job%20Data-success?style=flat-square)]()

**The Old World:** Permit tracking was a spreadsheet. Sometimes it was a column in the PM's personal Excel file. JDE's Job Master (F5101) has no native permit date fields — it never did. So the carry cost of sitting idle waiting for an inspection was invisible in the ERP. The Controller couldn't quantify it. The owner felt it. Nobody could prove it.

**The Prompt:**

```
You are a Senior JDE EnterpriseOne BSA and AI Adoption Architect working with a custom luxury homebuilder running JDE E1 as their ERP. The builder completes 18–22 custom homes per year. Average loan balance per home is $800,000 at a 7.5% construction loan rate. Every idle day waiting for a permit or inspection costs approximately $164 in carry interest per home.

The owner has said: "I want to know when a permit is about to hold up a job — before it does." Build it.

Produce the following:

1. JDE INTEGRATION ARCHITECTURE — The JDE Job Master (F5101/P5101) has no native permit date fields. Map the integration architecture for a permit milestone intelligence layer that links external permit data to JDE job numbers:
   - JDE anchor: Job Number (MCU) in F5101, linked to the physical address or lot number via a custom field or the Job Master description field (JBNM)
   - External permit data sources by market: county permit portals (most publish permit status via public API or downloadable feed), Buildertrend/CoConstruct permit fields if in use, manual entry workflow if no API available
   - Integration method options: Orchestrator REST API call to permit portal → write permit milestone dates to a custom Z-table linked to MCU; daily batch update via a custom UBE that reads from an integration staging table
   - For each option, state the JDE Tools version requirement and the CNC resources needed

2. PERMIT MILESTONE DATA MODEL — Define the data structure for a permit milestone Z-table that lives in JDE and links to the Job Master:
   - Fields required: Job Number (MCU), Permit Type (building / mechanical / electrical / plumbing / CO), Permit Application Date, Permit Approved Date, Inspection Scheduled Date, Inspection Passed Date, Days in Current Status, Idle Day Counter (calculated: today minus last status change date), Carry Cost Accumulator (Idle Days × daily carry cost rate from job loan balance)
   - Explain how the Idle Day Counter and Carry Cost Accumulator are calculated and refreshed daily

3. CARRY COST INTELLIGENCE REPORT — Write the specification for a weekly carry cost report by active job:
   - For each active home, surface: current permit stage, days in current stage, carry cost accumulated to date in the current stage, projected carry cost if current stage extends 7 more days
   - Sort by carry cost accumulator descending — the most expensive idle job at the top
   - Format: plain English for the owner — "Lot 7 (Ridgeline — Smith Residence) has been waiting for framing inspection for 11 days. Carry cost accumulated in this stage: $1,804. If inspection is not scheduled this week, projected carry cost through next Friday: $2,804."

4. EARLY WARNING SYSTEM — Write the business requirements for an AI agent that fires a warning when a job has been in the same permit stage for more than 5 consecutive business days without a status change:
   - Trigger: daily scan of the Z-table; flag any job where (Today − Last Status Change Date) > 5 business days
   - Output: morning notification to the owner and PM — specific to that job — with the permit stage, days idle, carry cost to date, and the single recommended action ("Call [Municipality] Permit Office — inspection was scheduled for [date] and has not been confirmed")
   - Automation verdict: AUGMENT — agent surfaces, owner or PM acts

5. ORCHESTRATOR SPEC — Write the business requirements for the Orchestrator notification that powers the early warning system:
   - Trigger: daily scheduled Orchestrator run (7 AM) reading from the permit milestone Z-table
   - Filter: jobs where Idle Day Counter > 5 AND Job Status in F5101 = Active (A)
   - Output: formatted email to the owner — maximum 5 flagged jobs per notification, sorted by carry cost accumulator descending
   - Human handoff: any job with carry cost accumulator > $5,000 routes to a separate CFO notification — this is now a finance decision, not just a PM decision

6. ROI ANCHOR — Produce the ROI calculation this system delivers at the 18-home-per-year scale:
   - Baseline assumption: average 2 permit delays per home per year, each averaging 8 idle days
   - Current state: delays discovered at the owner's weekly PM call — average discovery lag of 4 days
   - Future state: AI early warning catches delay at Day 5 — average intervention reduces idle time from 8 days to 5 days
   - Carry cost saved per home per year: 3 days × $164/day × 2 delays = $984 per home
   - At 18 homes per year: $17,712 annual carry cost savings — before accounting for schedule compression benefits
   - Format this as a one-paragraph executive summary the owner can share with their CFO or lender
```

---

## 📊 AI Readiness Scoring — JDE Homebuilder Edition

[![Assessment](https://img.shields.io/badge/Assessment-AI%20Readiness%20Scoring-blueviolet?style=for-the-badge)](https://epochframeworks.com)
[![Compliance](https://img.shields.io/badge/Compliance-TRAIGA%20Texas%202026-critical?style=flat-square)]()
[![Stack](https://img.shields.io/badge/Stack-JDE%20E1%20%2B%20Homebuilder%20Modules-FF6B35?style=flat-square)](https://oracle.com)

> The base 10x BSA skill carries a four-dimension AI Readiness Assessment (Data Governance, Process Documentation, Model Oversight Architecture, Regulatory Exposure). This section extends that framework with homebuilder-specific scoring criteria calibrated to JDE E1 environments and the three builder archetypes. Use this before any AI deployment conversation to establish a defensible readiness baseline.

### JDEHB-READINESS — Pre-Deployment Readiness Assessment: JDE E1 Homebuilder

**The Prompt:**

```
You are a Senior JDE EnterpriseOne BSA and AI Governance Architect conducting a pre-deployment AI readiness assessment for a homebuilder running JDE E1 as their system of record. The builder is considering deploying AI-assisted systems in the following areas: subcontractor payment processing, trade partner performance scoring, and job cost variance alerting.

Classify the builder's archetype first: Custom Luxury (under 25 homes/year) / Semi-Custom Regional (25–150) / Production National (150+). Apply the archetype to adjust the scoring weights where noted.

Score the builder across four dimensions (0–25 each, total 0–100):

---

DIMENSION 1: DATA GOVERNANCE (0–25)
JDE-specific scoring criteria:

- Is the JDE Job Master (F5101) consistently maintained — job numbers assigned at contract, status codes current, cost codes structured (not free-form)? (0–5)
- Is subcontract PO data in P4310/F4311 complete — every active sub has a current PO, no verbal commitments without a corresponding document? (0–5)
- Is F5116 (Job Cost Summary) reconciled to F0911 (G/L Account Ledger) at least monthly, and are discrepancies investigated before close? (0–5)
- Are vendor master records in F0101 maintained — no duplicate AN8 numbers for the same subcontractor, bank account information current? (0–5)
- Is there an audit trail for changes to subcontract POs (P4314 change order log complete and current)? (0–5)

DIMENSION 2: PROCESS DOCUMENTATION (0–25)
JDE + construction-specific criteria:

- Are the construction phases and corresponding cost codes documented in writing — not just configured in JDE and known by the cost accountant? (0–5)
- Is the subcontract change order approval process documented at the exception level — specifically, who approves a change order that pushes a job over budget, and what is the threshold? (0–5)
- Is the draw request process documented — who prepares it, what JDE reports it requires, and what the lender's submission requirements are? (0–5)
- Are warranty claim procedures documented and consistent — not handled differently by each superintendent? (0–5)
- Is there a documented process for onboarding a new subcontractor into JDE (vendor master setup, certificate of insurance tracking, PO template)? (0–5)

DIMENSION 3: MODEL OVERSIGHT ARCHITECTURE (0–25)

- If an AI system generates a trade partner performance score, is there a named owner who reviews the model output on a defined cadence? (0–5)
- Is there a documented process for a superintendent or PM to flag an AI-generated recommendation they believe is wrong — and a defined path for that flag to be investigated? (0–5)
- Are consequential decisions influenced by AI (bid restrictions, payment holds, draw blocks) logged in JDE or an external audit trail? (0–5)
- Is there a process for retraining or recalibrating an AI model when the underlying business changes (new subdivision, new cost code structure, new subcontractor pool)? (0–5)
- Does the owner or CFO have a single point of accountability for AI governance — someone who can answer an auditor's questions about how AI-generated decisions are made? (0–5)

DIMENSION 4: REGULATORY EXPOSURE — TRAIGA (0–25)
Texas-specific if applicable; apply general AI governance principles for non-Texas builders:

- Has the builder assessed whether AI-assisted subcontractor payment decisions or bid restrictions constitute consequential decisions under TRAIGA (effective January 2026 for Texas builders)? (0–5)
- Are trade partners informed when an AI system influences decisions affecting their payment status or bid eligibility? (0–5)
- Is there a vendor AI governance review process — specifically, if Buildertrend, Procore, or a third-party scheduling tool uses AI to influence project decisions, is the builder aware of and accountable for those decisions? (0–5)
- Is there a designated point of contact for AI governance accountability who is not also the system administrator? (0–5)
- If the builder's construction lender requires audit documentation of draw approval logic, can the builder produce evidence that any AI involvement in that decision is documented and explainable? (0–5)

---

SCORING OUTPUT:
- Total score and readiness verdict band (0–39: Not Ready / 40–59: Pre-Deployment Work Required / 60–79: Conditionally Ready / 80–100: AI-Ready)
- Remediation priority stack: top 5 lowest-scoring items, each with an owner, a completion criterion, and a TRAIGA flag where applicable
- Archetype adjustment note: for Custom Luxury builders, weight Model Oversight and TRAIGA dimensions more heavily — low volume means each AI decision has higher individual impact. For Production National, weight Data Governance and Process Documentation more heavily — scale amplifies data quality problems.
- A one-paragraph executive brief the owner can share with their construction lender or attorney summarizing their AI governance posture.
```

---

## 📘 Extension Usage Notes

[![Usage](https://img.shields.io/badge/Usage-Replace%20Brackets%20%E2%86%92%20Run-lightgrey?style=flat-square)]()
[![Requires](https://img.shields.io/badge/Requires-10x%20BSA%20Prompt%20Library%20v1.1-blue?style=flat-square)]()
[![Stack](https://img.shields.io/badge/Stack-JDE%20E1%20Tools%209.2%20%2B%20Orchestrator%20Studio-FF6B35?style=flat-square)](https://oracle.com)

This extension module is designed to be used alongside the base `10x-bsa-prompt-library.md`. It does not replace it — it fills the JDE-specific gap the base library acknowledged but did not close.

**Prompt routing by use case:**

- **Pre-deployment AI governance conversation with a homebuilder** → Start with `JDEHB-READINESS`, then route to `JDEHB-01` (TPPS) as the first proof point
- **Subcontractor cost overrun problem** → `JDEHB-02` (Change Order Intelligence), anchored to F4314/F5116
- **Permit delay and carry cost problem** → `JDEHB-03` (Permit Milestone Intelligence), ROI section pre-built
- **Period close G/L integrity issues** → `JDE-01` (AAI Validation)
- **AP payment automation request** → `JDE-02` (Orchestrator A/P spec)
- **Reporting self-service request from a VP or PM** → `JDE-03` (DREAM Writer replacement)

**All prompts assume JDE Tools 9.2+.** If the client is on an earlier Tools release, Orchestrator Studio is not available — flag this and substitute a workflow (P98806) spec or an external notification layer.

**Methodology protection applies.** TPPS scoring weights, the Permit Carry Cost model, and the Homebuilder Readiness Assessment scoring criteria are proprietary to Epoch Frameworks LLC under DACR License v2.6.

---

> *DACR License v2.6 | McDonald (2026) | Epoch Frameworks LLC | All rights reserved*
>
> [![Epoch Frameworks](https://img.shields.io/badge/Epoch%20Frameworks%20LLC-AI%20Adoption%20Architecture-FF6B35?style=for-the-badge)](https://epochframeworks.com)
> [![JDE E1](https://img.shields.io/badge/JDE-EnterpriseOne%20Vertical%20Intelligence-FF6B35?style=flat-square)](https://oracle.com)
> [![TRAIGA](https://img.shields.io/badge/TRAIGA-Texas%20Responsible%20AI%20Governance-darkred?style=flat-square)]()
> [![Homebuilder Engine](https://img.shields.io/badge/Integrates-Luxury%20Homebuilder%20AI%20Engine%20v3.0-brown?style=flat-square)](https://epochframeworks.com)
> [![DACR](https://img.shields.io/badge/DACR-v2.6%20Licensed%20Content-critical?style=flat-square)]()
