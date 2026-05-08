# 10x Senior BSA Prompt Library

[![Made by Erwin Maurice McDonald](https://img.shields.io/badge/Made%20by-Erwin%20Maurice%20McDonald-0A0A23?style=for-the-badge&logo=anthropic&logoColor=white)](https://epochframeworks.com)
[![Framework](https://img.shields.io/badge/Framework-Epoch%20Frameworks%20LLC-FF6B35?style=for-the-badge)](https://epochframeworks.com)
[![License](https://img.shields.io/badge/License-DACR%20v2.6-blue?style=for-the-badge)](https://epochframeworks.com)
[![Version](https://img.shields.io/badge/Version-1.1-success?style=for-the-badge)](https://epochframeworks.com)
[![Year](https://img.shields.io/badge/McDonald-2026-red?style=for-the-badge)](https://epochframeworks.com)

> **Lens:** Senior Business Systems Analyst — 10+ years inside SAP S/4HANA modules and JIRA pre-AI. These prompts are written from the floor of the system, not from a vendor deck. Every prompt is grounded in a real structural limitation that the legacy environment created, and calibrated to what AI can now do that those systems structurally never could.

---

## Table of Contents

- [SAP S/4HANA Prompts](#-sap-s4hana-prompts)
- [JIRA JQL Prompts](#-jira-jql-prompts)
- [How to Use This Library](#-how-to-use-this-library)

---

## 🔷 SAP S/4HANA Prompts

[![SAP](https://img.shields.io/badge/SAP-S%2F4HANA-0FAAFF?style=flat-square&logo=sap&logoColor=white)](https://sap.com)
[![Modules](https://img.shields.io/badge/Modules-FI%20%7C%20MM%20%7C%20SD%20%7C%20PP%20%7C%20BW-blue?style=flat-square)](https://sap.com)
[![Experience](https://img.shields.io/badge/Experience-10%2B%20Years-orange?style=flat-square)](https://epochframeworks.com)

> These prompts are written from the mindset of a BSA who has lived through SAP customization debt, multi-module reconciliation nightmares, and the weeks-long process of translating a business stakeholder's change request into something a Basis team would actually act on. These are not tutorial prompts. They are practitioner prompts.

---

### SAP-01 — Cross-Module Impact Analysis Before a Configuration Change

[![Module](https://img.shields.io/badge/Module-FI%20%7C%20MM%20%7C%20SD-0FAAFF?style=flat-square&logo=sap&logoColor=white)](https://sap.com)
[![Skill](https://img.shields.io/badge/Skill-Impact%20Analysis-critical?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Senior%20Analyst%20%2B%20Weeks%20of%20Lead%20Time-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Downstream%20Dependency%20Mapping%20Before%20Change-success?style=flat-square)]()

**The Old World:** Before you touched a payment term in SAP FI, you ran it past a senior MM analyst, prayed you weren't breaking an SD pricing procedure, and built a test script by hand. Cross-module impact analysis required three departments and two weeks minimum.

**The Prompt:**

```
You are a Senior SAP Business Systems Analyst with deep experience across FI, MM, and SD modules in an S/4HANA environment.

A business stakeholder has requested a change to payment terms configuration (OBB8) — specifically, extending the net due date from Net 30 to Net 45 for a subset of vendor accounts in Company Code 1000.

Before any transport request is created, I need a complete cross-module impact analysis. Your output must:

1. Identify every SAP module where payment term configuration has a downstream dependency — include FI-AP, MM-LIV (Logistics Invoice Verification), SD billing if applicable, and Cash Management (TR-CM).
2. Flag any automatic payment program (F110) logic or dunning procedures that reference payment terms by key.
3. Identify whether vendor master records (XK02) in this company code have the term hardcoded at the partner function level versus inherited from account group defaults.
4. Produce a structured pre-change checklist formatted as a BSA handoff document — not a Basis ticket. The audience is the change advisory board, not a developer.
5. State explicitly what cannot be safely automated and must remain a human decision.

Do not assume a clean system. Assume customization debt exists. Identify the questions I need to ask before I can close the impact analysis.
```

---

### SAP-02 — Process Mining Diagnostic for an SD Order-to-Cash Deviation

[![Module](https://img.shields.io/badge/Module-SD%20%7C%20FI%20%7C%20CO-0FAAFF?style=flat-square&logo=sap&logoColor=white)](https://sap.com)
[![Skill](https://img.shields.io/badge/Skill-Process%20Mining-informational?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Manual%20Trace%20Through%20VBAK%2FVBAP%2FBKPF-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Workflow%20Divergence%20Detection%20Without%20Code%20Changes-success?style=flat-square)]()

**The Old World:** Finding where the actual Order-to-Cash flow diverged from the designed flow meant pulling VBAK, VBAP, LIKP, VF01 — then manually cross-referencing with BKPF/BSEG to find where FI postings didn't match what SD generated. It was a week of SE16 queries and reconciliation in Excel.

**The Prompt:**

```
You are a Senior SAP BSA running a process mining diagnostic on an S/4HANA Order-to-Cash (O2C) cycle. The business has reported that Days Sales Outstanding (DSO) has increased 11 days over the past two quarters, but no configuration changes were made to the SD billing or FI-AR posting logic during that period.

Your task is to build a structured diagnostic framework that I can use to interrogate the process deviation without requiring a developer or a Basis transport.

Address the following:

1. Map the standard O2C event chain in S/4HANA: Sales Order (VA01) → Delivery (VL01N) → Goods Issue (VL02N) → Billing (VF01) → FI posting (automatic) → AR open item → Clearing (F-32 or F-28). Identify the timestamp-level data I need from each step to reconstruct the actual cycle time.

2. Identify the top five process deviation patterns that cause DSO inflation in SAP SD — including billing block codes, credit hold reasons, and incomplete document types — and the transaction or table where each is visible without SE16 access.

3. Produce a BSA-grade diagnostic interview guide: the seven questions I need to ask the SD configuration owner, the AR team lead, and the credit management lead before I can isolate the root cause.

4. Output a RACI recommendation for who owns the remediation decision if the deviation is found in: (a) SD pricing condition records, (b) FI posting keys, (c) credit management configuration, or (d) a user behavior pattern not captured in system configuration.

Assume I have S/4HANA standard reporting access (S_ALR reports, FBL5N, VF05N) but no custom ABAP access.
```

---

### SAP-03 — AI-Ready Requirements Gathering for a BW/4HANA Data Model Change

[![Module](https://img.shields.io/badge/Module-BW%2F4HANA%20%7C%20FI%20%7C%20CO-0FAAFF?style=flat-square&logo=sap&logoColor=white)](https://sap.com)
[![Skill](https://img.shields.io/badge/Skill-Requirements%20Gathering-yellow?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Facilitation%20Cycles%20%2B%20Informal%20Documentation-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Transaction%20Log%20Inference%20%2B%20Living%20Spec-success?style=flat-square)]()

**The Old World:** A BW data model change request would arrive as a vague email from finance. You'd spend three facilitation sessions trying to reverse-engineer what they actually needed from what they thought they wanted. The requirements document was obsolete before the transport was promoted to production.

**The Prompt:**

```
You are a Senior SAP BSA embedded with a finance transformation team. The Controller has submitted a change request: "We need better margin visibility at the profit center level." That is the entire specification as submitted.

Your task is to translate this into a structured requirements document suitable for handoff to a BW/4HANA modeling team — without going back to the Controller for clarification more than once.

Produce the following:

1. A requirements inference map: given the phrase "margin visibility at the profit center level," identify the five most likely data objects the Controller actually needs — using standard CO-PA and FI-CO terminology. For each, specify the SAP source table or InfoProvider, the key figure or characteristic, and the likely reporting grain (time period, profit center hierarchy level, cost element).

2. A structured requirements template with the following mandatory fields: Business Question (plain language), Data Source (SAP module + table/InfoProvider), Key Figures Required, Characteristics Required, Frequency of Refresh, Authorized Roles, and Acceptance Criteria.

3. A pre-handoff assumption register: list every assumption embedded in the inferred requirements, ranked by risk of invalidation. Flag which assumptions require a single clarification question to the Controller versus which require IT validation.

4. A one-question clarification brief: if I can only ask the Controller one follow-up question before drafting the full spec, what is that question and why does it eliminate the most downstream rework risk?

Format the output so it can be dropped directly into a project change request document without reformatting.
```

---

### SAP-04 — TRAIGA-Aligned AI Readiness Scoring for an SAP FI-AP Automation Initiative

[![Module](https://img.shields.io/badge/Module-FI--AP%20%7C%20MM--LIV-0FAAFF?style=flat-square&logo=sap&logoColor=white)](https://sap.com)
[![Skill](https://img.shields.io/badge/Skill-AI%20Readiness%20Assessment-blueviolet?style=flat-square)]()
[![Compliance](https://img.shields.io/badge/Compliance-TRAIGA%20Texas%202026-critical?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-No%20Governance%20Framework%20for%20AI%20Handoff-red?style=flat-square)]()

**The Old World:** AP automation meant a vendor selling you an OCR tool that didn't understand your GL account determination logic and broke on your first non-standard PO. There was no structured way to assess whether your SAP environment was ready to hand off a decision to a machine.

**The Prompt:**

```
You are a Senior SAP BSA and AI Governance Architect conducting a pre-deployment readiness assessment for a proposed AI-powered invoice matching automation initiative in SAP FI-AP (transaction MIRO / logistics invoice verification).

The initiative proposes that an AI agent will match incoming vendor invoices to purchase orders and goods receipts, and auto-post invoices below a $10,000 threshold without human review.

Score this initiative across four dimensions and produce a readiness verdict:

1. DATA GOVERNANCE (score 0–25): Assess readiness based on: vendor master data quality and deduplication status, consistency of GR/IR account assignment logic across purchasing orgs, document type configuration for automated postings, and audit trail completeness for AI-generated FI documents.

2. PROCESS DOCUMENTATION (score 0–25): Assess whether the current three-way match logic (PO-GR-Invoice) is documented at the exception level — not just the standard path. Flag any undocumented tolerance keys or manual override behaviors that would require encoding before AI deployment.

3. MODEL OVERSIGHT ARCHITECTURE (score 0–25): Define the human handoff criteria for this agent — specifically: which exception types must route to a human AP specialist, what the escalation SLA is, and how a human can override or reverse an AI-generated posting.

4. REGULATORY EXPOSURE — TRAIGA (score 0–25): Apply Texas Responsible AI Governance Act (effective January 2026) obligations. Flag whether automated invoice posting constitutes a consequential decision under TRAIGA, identify required documentation, and state what a designated AI governance contact must be able to demonstrate during an audit.

Produce a total score, a readiness verdict band, and a remediation priority stack of the top five items that must be resolved before the initiative goes to production.
```

---

### SAP-05 — Agent Specification Document for SAP MM Purchase Order Approval Workflow

[![Module](https://img.shields.io/badge/Module-MM%20%7C%20FI%20%7C%20WF-0FAAFF?style=flat-square&logo=sap&logoColor=white)](https://sap.com)
[![Skill](https://img.shields.io/badge/Skill-Agentic%20System%20Spec-important?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Rigid%20Approval%20Workflow%20Requiring%20Dev%20Resources-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Context--Aware%20Dynamic%20Routing%20Without%20a%20Dev%20Ticket-success?style=flat-square)]()

**The Old World:** SAP workflow (SWI) was a tomb. Changing an approval threshold from $25K to $50K required a developer, a transport, a Basis promotion, and two weeks. The business changed faster than the approval logic ever could. Every workaround lived in someone's inbox.

**The Prompt:**

```
You are a Senior SAP BSA writing an Agent Specification Document for an AI agent that will manage the Purchase Order approval routing workflow currently handled by SAP standard workflow (transaction SWI5 / WS20000075 or custom equivalent).

The current state: PO approval is routed by a static dollar threshold table maintained in a custom Z-table. Changes to thresholds require a developer transport. Approval history lives in SAP workflow inbox (SBWP) and is not surfaced to procurement leadership without a custom report.

The proposed AI agent will: evaluate new PO documents in real time, route approval based on dynamic criteria (dollar value, vendor risk score, commodity category, requester history), and generate an audit-ready approval record.

Produce a complete Agent Specification Document with all six sections:

1. AGENT PURPOSE STATEMENT — one sentence, decision-level precision.

2. FUNCTIONAL REQUIREMENTS — Inputs (what triggers the agent and from which SAP transaction/table), Processing Logic (what the agent evaluates — include the dynamic routing criteria and how they differ from the current static Z-table logic), Outputs (what it produces, to whom, in what format, and whether it writes back to SAP or operates in a parallel system).

3. HUMAN HANDOFF CRITERIA — Define the exact conditions that require human review before the agent proceeds. Include: dollar thresholds, new vendor flags, sole-source purchases, capital expenditure flags, and politically sensitive vendor categories. State the escalation path and SLA.

4. EDGE CASE REGISTER — Cover: split PO scenarios designed to avoid thresholds, retroactive POs, emergency purchase orders, blanket POs with release orders, and POs with partial goods receipts already posted.

5. FAILURE DEFINITION — What a bad output looks like beyond an error state. Include downstream harm scenarios: incorrect approvals that create budget overruns, vendor payments to unapproved vendors, and audit findings from missing approval documentation.

6. ACCEPTANCE CRITERIA — How the Procurement Director will verify the agent is working. Include test scenarios that must pass, and define success in operational terms (approval cycle time, exception escalation rate, audit trail completeness) not technical performance metrics.

Apply automation verdicts (AUTOMATE / AUGMENT / HUMAN-ONLY) to each functional requirement.
```

---

## 🟠 JIRA JQL Prompts

[![Jira](https://img.shields.io/badge/Jira-Advanced%20JQL-0052CC?style=for-the-badge&logo=jira&logoColor=white)](https://www.atlassian.com/software/jira)
[![JQL](https://img.shields.io/badge/JQL-Expert%20Level-FF5630?style=flat-square)](https://www.atlassian.com/software/jira)
[![Experience](https://img.shields.io/badge/Experience-Pre--AI%20JIRA%20Veteran-8777D9?style=flat-square)](https://www.atlassian.com/software/jira)

> These prompts are written by someone who remembers when Jira status reporting meant exporting a CSV, pivoting it in Excel, and emailing a stale summary to a VP who would ask three questions the data couldn't answer. Every prompt here is designed to close a gap that pre-AI Jira structurally could not.

---

### JIRA-01 — Sprint Capacity Planning with Complexity-Adjusted Velocity

[![Skill](https://img.shields.io/badge/Skill-Capacity%20Planning-0052CC?style=flat-square&logo=jira&logoColor=white)](https://www.atlassian.com/software/jira)
[![JQL%20Type](https://img.shields.io/badge/JQL-Historical%20Velocity%20%2B%20Story%20Point%20Audit-informational?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Velocity%20Averages%20That%20Ignored%20Team%20Composition-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Complexity--Aware%20Capacity%20Model-success?style=flat-square)]()

**The Old World:** Sprint planning was a velocity average applied to a story point total and called a commitment. Nobody accounted for the fact that the team's senior engineer was on PTO for half the sprint, or that three of the five stories were in a codebase nobody had touched in eight months.

**The Prompt:**

```
You are a Senior BSA and JIRA power user running sprint capacity planning for a software delivery team of 6 engineers. You have access to JIRA's advanced JQL and reporting features.

I need to build a complexity-adjusted capacity model for the upcoming sprint. Do the following:

1. Write the JQL to pull all completed stories from the last 6 sprints for this team:
   - Filter by: project = [PROJECT_KEY], issuetype in (Story, Bug), sprint in closedSprints(), status = Done
   - Return: summary, story points (custom field story_points), assignee, sprint name, resolution date, and label (if used for complexity tier)

2. From the JQL output, explain how to segment velocity by: (a) story type — feature vs. bug vs. technical debt, (b) assignee — individual throughput by engineer to identify capacity gaps when team composition changes, and (c) complexity label — if the team uses labels like "high-complexity" or "legacy-codebase," how to isolate velocity for those ticket types separately.

3. Write the JQL to identify any story that was moved OUT of a sprint before completion (sprint changed mid-sprint without resolution):
   - Use: project = [PROJECT_KEY] AND sprint = [SPRINT_NAME] AND status != Done AND sprint not in (openSprints())
   - Explain what this query surfaces and why chronic spillover stories distort velocity averages.

4. Produce a capacity planning template that adjusts committed story points based on: available engineer days (accounting for PTO and ceremonies), a complexity multiplier for stories tagged as legacy-system work, and a spillover risk flag for any story that has been in "In Progress" for more than one sprint cycle.

5. Write a JQL query that identifies stories currently "In Progress" for more than 5 business days without a status transition:
   - Use: project = [PROJECT_KEY] AND status = "In Progress" AND status changed to "In Progress" before -5d

Format the capacity template so it can be presented in a sprint planning meeting without modification.
```

---

### JIRA-02 — Dependency Mapping and Hidden Blocker Detection Across Epics

[![Skill](https://img.shields.io/badge/Skill-Dependency%20Mapping-0052CC?style=flat-square&logo=jira&logoColor=white)](https://www.atlassian.com/software/jira)
[![JQL%20Type](https://img.shields.io/badge/JQL-Issue%20Link%20%2B%20Blocker%20Pattern%20Analysis-informational?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Manual%20Linking%20That%20Broke%20Down%20Under%20Pressure-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Hidden%20Dependency%20Detection%20from%20Ticket%20Language-success?style=flat-square)]()

**The Old World:** Dependency mapping in pre-AI Jira was a manual linking exercise that lasted exactly until the first sprint review. After that, the links were stale, the blockers were in Slack, and the dependency matrix was a fiction maintained by a PM who was too busy to update it.

**The Prompt:**

```
You are a Senior BSA using JIRA advanced JQL to surface hidden dependencies and blocker patterns across three active epics in a single program.

The three epics are: [EPIC-KEY-1] (Data Migration), [EPIC-KEY-2] (API Integration Layer), [EPIC-KEY-3] (Front-End Delivery).

Produce the following:

1. Write JQL to find all stories in these three epics that have an issue link type of "is blocked by" and whose blocking issue is NOT in the same epic:
   - Query: project = [PROJECT_KEY] AND "Epic Link" in ([EPIC-KEY-1], [EPIC-KEY-2], [EPIC-KEY-3]) AND issue in linkedIssues("is blocked by")
   - Explain how to extend this to identify cross-team blockers (where the blocking issue belongs to a different project key).

2. Write JQL to find all stories that have been in "Blocked" status (or a custom "Impediment" status) for more than 3 business days:
   - Use: project = [PROJECT_KEY] AND status = "Blocked" AND status changed to "Blocked" before -3d
   - Explain the escalation trigger this query should feed — specifically, who in the program structure should be auto-notified when this threshold is crossed.

3. Write JQL to identify stories with no issue links at all in these epics (indicating they were created without dependency review):
   - Use: project = [PROJECT_KEY] AND "Epic Link" in ([EPIC-KEY-1], [EPIC-KEY-2], [EPIC-KEY-3]) AND issue not in linkedIssues()
   - Explain why unlinked stories in an integration-heavy program are a dependency risk even when the story author believes they are standalone.

4. Produce a dependency risk matrix template using the JQL outputs above. The matrix should have four columns: Story Key, Epic, Blocking Issue (and its epic), and Days Blocked. Include a risk flag column: flag any story where the blocking issue is in a different team's backlog and has no assignee.

5. Write the JQL for a weekly dependency health check that a BSA can run every Monday morning before stand-up to surface the top five highest-risk cross-epic blockers.
```

---

### JIRA-03 — Ticket Quality Enforcement and Acceptance Criteria Audit

[![Skill](https://img.shields.io/badge/Skill-Ticket%20Quality%20Governance-0052CC?style=flat-square&logo=jira&logoColor=white)](https://www.atlassian.com/software/jira)
[![JQL%20Type](https://img.shields.io/badge/JQL-Field%20Completeness%20%2B%20AC%20Audit-informational?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Inconsistent%20Requirements%20Buried%20in%20Comments-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Quality%20Enforcement%20at%20Creation%20%2B%20AC%20Drafting-success?style=flat-square)]()

**The Old World:** Acceptance criteria were either missing, buried in comment thread three, or written in a way that passed QA review but couldn't be tested. The BSA found out at sprint review — not at ticket creation.

**The Prompt:**

```
You are a Senior BSA building a ticket quality governance system in JIRA for a team that has chronic acceptance criteria gaps and inconsistent story structure.

The team uses a custom field "Acceptance Criteria" (field ID: customfield_10200) and a required field "Story Points." The current state: 40% of stories enter the sprint backlog without populated acceptance criteria.

Produce the following:

1. Write JQL to find all open stories in the active sprint that have an empty "Acceptance Criteria" custom field:
   - Use: project = [PROJECT_KEY] AND issuetype = Story AND sprint in openSprints() AND "Acceptance Criteria" is EMPTY
   - Explain how this query feeds a pre-sprint gate review.

2. Write JQL to find stories that were added to the sprint after sprint start (late additions that skipped backlog refinement and are likely to have quality gaps):
   - Use: project = [PROJECT_KEY] AND sprint = [SPRINT_NAME] AND created > [SPRINT_START_DATE]
   - Explain the quality risk profile of late-added stories versus stories that completed refinement.

3. Write JQL to identify stories with story points of 0 or null — which typically indicates they were created by a stakeholder bypassing the estimation process:
   - Use: project = [PROJECT_KEY] AND issuetype = Story AND sprint in openSprints() AND (story_points is EMPTY OR story_points = 0)

4. Write a JQL-based weekly quality audit that the BSA runs every Thursday (two days before sprint review) to identify the top 10 highest-risk stories for the upcoming review:
   - Criteria: open, in current sprint, missing acceptance criteria OR story points = 0 OR no assignee OR status = "To Do" (not yet started with 2 days remaining)
   - Combine these conditions with OR and sort by priority descending.

5. Produce an acceptance criteria template — in the Gherkin Given/When/Then format — for the three most common story types on a data migration project: (a) data extraction stories, (b) data transformation/mapping stories, (c) data validation and reconciliation stories. Each template should be ready to paste into the JIRA custom field without modification.
```

---

### JIRA-04 — Executive Status Report Generation from Live JIRA Data

[![Skill](https://img.shields.io/badge/Skill-Executive%20Reporting-0052CC?style=flat-square&logo=jira&logoColor=white)](https://www.atlassian.com/software/jira)
[![JQL%20Type](https://img.shields.io/badge/JQL-Program%20Status%20%2B%20RAG%20Generation-informational?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-BA%20or%20PM%20Manually%20Synthesizing%20Jira%20Data-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Stakeholder--Ready%20Status%20Summaries%20on%20Demand-success?style=flat-square)]()

**The Old World:** The Friday status report was a 45-minute exercise in manually counting tickets, checking completion percentages, and writing prose that diplomatically translated "the sprint is on fire" into "we are managing some delivery risks." The VP would read it Sunday and ask three questions that required another 30 minutes to answer Monday morning.

**The Prompt:**

```
You are a Senior BSA who has been asked to build an executive status reporting framework powered by live JIRA data — replacing the manual Friday status report.

The program has three active projects: [PROJECT_KEY_1], [PROJECT_KEY_2], [PROJECT_KEY_3]. The executive audience is a VP of Technology and a Steering Committee that meets biweekly.

Produce the following:

1. Write the JQL queries that populate each section of the executive status report:

   a. OVERALL PROGRAM HEALTH — total open stories by project, completion percentage per epic, and count of stories with a due date in the next 14 days:
      - project in ([PROJECT_KEY_1], [PROJECT_KEY_2], [PROJECT_KEY_3]) AND issuetype = Story AND status != Done ORDER BY project ASC

   b. RED FLAGS — stories that are overdue (due date passed, status not Done), blocked for more than 3 days, or unassigned with a due date in the next 7 days:
      - project in ([PROJECT_KEY_1], [PROJECT_KEY_2], [PROJECT_KEY_3]) AND due < now() AND status != Done
      - project in ([PROJECT_KEY_1], [PROJECT_KEY_2], [PROJECT_KEY_3]) AND status = "Blocked" AND status changed to "Blocked" before -3d

   c. VELOCITY TREND — story points completed in the last 3 sprints per project to show trajectory.

2. Produce a RAG (Red/Amber/Green) status framework tied to JIRA metrics — not subjective PM judgment:
   - GREEN: On-track definition (% complete vs. plan, no blockers older than 3 days, no unassigned high-priority stories)
   - AMBER: At-risk definition (1–3 blockers, completion rate 10–20% below plan, at least one story overdue)
   - RED: Off-track definition (3+ blockers, completion rate >20% below plan, epic-level risk to delivery date)

3. Write the executive summary prose template that the AI populates from the JQL outputs — formatted for a steering committee slide, not a JIRA export. Include: one sentence on program health, one sentence on the top risk, one sentence on the key decision needed from the Steering Committee (if any).

4. Define the five questions a VP will always ask at a steering committee review and write the JQL query that pre-answers each one.

Format everything so it can run as a repeatable Friday 15-minute process — not a 45-minute manual synthesis.
```

---

### JIRA-05 — Retrospective Pattern Analysis and Sprint Friction Quantification

[![Skill](https://img.shields.io/badge/Skill-Retrospective%20Intelligence-0052CC?style=flat-square&logo=jira&logoColor=white)](https://www.atlassian.com/software/jira)
[![JQL%20Type](https://img.shields.io/badge/JQL-Cross--Sprint%20Pattern%20%2B%20Friction%20Scoring-informational?style=flat-square)]()
[![Legacy%20Gap](https://img.shields.io/badge/Legacy%20Gap-Qualitative%20Retros%20That%20Were%20Never%20Acted%20On-red?style=flat-square)]()
[![AI%20Closes](https://img.shields.io/badge/AI%20Closes-Quantified%20Friction%20Patterns%20Across%20Sprints-success?style=flat-square)]()

**The Old World:** Retrospectives produced sticky notes. Sticky notes became action items. Action items were forgotten by the next sprint. The same friction patterns repeated for six months because no one had the data to prove they were systematic — they just felt it.

**The Prompt:**

```
You are a Senior BSA building a data-driven retrospective intelligence system using JIRA JQL — replacing the subjective sticky-note retrospective with quantified friction analysis.

The team runs two-week sprints. You have 8 completed sprints of history in JIRA.

Produce the following:

1. Write the JQL queries to identify the top four recurring friction patterns across the last 8 sprints:

   a. SPILLOVER RATE — stories that were in a sprint but not completed and moved to the next sprint:
      - project = [PROJECT_KEY] AND sprint in closedSprints() AND status != Done AND sprint changed during [SPRINT_DATE_RANGE]
      - Explain how to calculate spillover rate as a percentage and what a healthy versus unhealthy rate looks like.

   b. LATE STATUS TRANSITIONS — stories that moved from "To Do" to "In Progress" in the last 3 days of a sprint (indicating they were started too late):
      - project = [PROJECT_KEY] AND sprint = [SPRINT_NAME] AND status changed to "In Progress" after [SPRINT_END_DATE - 3 days]

   c. REOPENED BUGS — bugs that were marked Done and then reopened within 10 days (indicating insufficient QA at close):
      - project = [PROJECT_KEY] AND issuetype = Bug AND status changed from Done after -10d AND status != Done

   d. SCOPE ADDITIONS — stories added to a sprint after sprint start (mid-sprint scope creep):
      - project = [PROJECT_KEY] AND sprint = [SPRINT_NAME] AND created > [SPRINT_START_DATE]

2. Produce a Sprint Friction Score: a simple 0–100 index calculated from the four friction dimensions above. Assign weights: spillover rate (30%), late starts (25%), reopened bugs (25%), scope additions (20%). Explain how to normalize each metric to a 0–25 scale.

3. Write the retrospective data brief: a one-page summary that replaces the sticky-note retro opener. It presents: Sprint Friction Score vs. the 8-sprint average, the single highest-contributing friction pattern this sprint, and one data-supported hypothesis about root cause.

4. Produce a JQL-based early warning system: a query the Scrum Master runs on Day 7 of a 10-day sprint to identify the top three stories most likely to spill over, based on: status still = "To Do," story points >= 5, or no assignee.

5. Write the action item tracking JQL: a query that surfaces all JIRA tickets labeled "retro-action" that are more than 14 days old and still open — proving (or disproving) that retro commitments are being honored.

Format the Sprint Friction Score and data brief so they can open a retrospective meeting in under 5 minutes.
```

---

## 📘 How to Use This Library

[![Usage](https://img.shields.io/badge/Usage-Copy%20%E2%86%92%20Paste%20%E2%86%92%20Replace%20Brackets-lightgrey?style=flat-square)]()
[![Audience](https://img.shields.io/badge/Audience-Senior%20BSA%20%7C%20PM%20%7C%20Ops%20Practitioners-blue?style=flat-square)]()
[![Not%20For](https://img.shields.io/badge/Not%20For-Tutorials%20%7C%20Beginners%20%7C%20Vendor%20Demos-red?style=flat-square)]()

Each prompt is structured as a practitioner handoff document, not a conversational starter. Use them as follows:

**Replace all bracket placeholders** (`[PROJECT_KEY]`, `[EPIC-KEY-1]`, `[SPRINT_NAME]`, `[COMPANY_CODE]`) with your actual environment values before pasting into Claude or another AI interface.

**SAP prompts** assume S/4HANA with standard reporting access. They are written to produce outputs that go directly to a Change Advisory Board, a Steering Committee, or a technical handoff without reformatting.

**JIRA prompts** assume advanced JQL access and a Scrum or Kanban environment with custom fields enabled. The JQL queries are written to be run as-is or adapted with your project-specific field IDs.

**Methodology protection applies.** These prompts surface the capability gap and the business impact. The scoring mechanics, diagnostic frameworks, and Gap Map logic are proprietary to Epoch Frameworks LLC under DACR License v2.6.

---

> *DACR License v2.6 | McDonald (2026) | Epoch Frameworks LLC | All rights reserved*
>
> [![Epoch Frameworks](https://img.shields.io/badge/Epoch%20Frameworks%20LLC-AI%20Adoption%20Architecture-FF6B35?style=for-the-badge)](https://epochframeworks.com)
> [![TRAIGA](https://img.shields.io/badge/TRAIGA-Texas%20Responsible%20AI%20Governance-darkred?style=flat-square)]()
> [![DACR](https://img.shields.io/badge/DACR-v2.6%20Licensed%20Content-critical?style=flat-square)]()
