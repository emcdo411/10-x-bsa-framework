# FIN-01 TRAIGA Governance Documentation Template
## AI Cash Flow Forecast — Texas Responsible AI Governance Act Compliance

**Epoch Frameworks LLC | DACR v2.6 | McDonald (2026)**
**Applies to: Texas-domiciled homebuilders and contractors running JDE E1**

---

## TRAIGA Applicability Assessment

**System:** Rolling 13-week AI cash flow forecast (FIN-01)
**Effective date of TRAIGA:** January 2026
**Consequential decision threshold:** Does this AI system influence decisions that materially affect a person's financial standing or a business's operational continuity?

**Answer: YES.** This system influences:
1. **Draw submission timing** — delaying or accelerating a construction lender draw is a consequential operational and financial decision
2. **A/P release decisions** — holding or releasing a subcontractor payment run based on AI forecast output affects subcontractor payment status
3. **Cash position reporting to lenders** — if this forecast is included in lender-facing packages, it carries governance obligation

**TRAIGA documentation is required before production deployment.**

---

## Required Documentation Checklist

### Model Ownership
- [ ] Named model owner: _________________________ (title + name)
- [ ] Review cadence documented: ☐ Weekly ☐ Monthly ☐ Each forecast cycle
- [ ] Owner has authority to pause or override the system: ☐ Yes ☐ No

### Decision Documentation
- [ ] List of decision types influenced by this forecast:
  - [ ] A/P payment run release or hold
  - [ ] Construction draw submission timing
  - [ ] Cash position reporting to construction lender
  - [ ] Subcontractor payment sequencing
  - [ ] Other: _________________________

- [ ] For each decision type above: is human review required before action is taken?
  - A/P run: ☐ Human required ☐ Automated
  - Draw timing: ☐ Human required ☐ Automated
  - Lender reporting: ☐ Human required ☐ Automated

### Audit Trail
- [ ] Every forecast snapshot archived with timestamp: ☐ Yes ☐ No
- [ ] Every human override of an AI recommendation logged: ☐ Yes ☐ No
- [ ] Retention period for audit records: _____________ (minimum: 12 months)

### Vendor AI Governance
If using a third-party AI platform (Azure OpenAI, Anthropic, AWS Bedrock, etc.) to power this forecast:
- [ ] Third-party AI vendor identified: _________________________
- [ ] Vendor AI governance terms reviewed: ☐ Yes ☐ No
- [ ] Data residency and processing terms acceptable: ☐ Yes ☐ No

### Trade Partner / Subcontractor Notification
If AI forecast output influences subcontractor payment timing or hold decisions:
- [ ] Trade partners informed that AI systems may influence payment timing: ☐ Yes ☐ No
- [ ] Trade partner notification language documented in subcontract agreement: ☐ Yes ☐ No
- [ ] Dispute process documented for subcontractors who contest a payment hold: ☐ Yes ☐ No

### Construction Lender Disclosure
If this forecast is included in lender-facing reporting:
- [ ] Lender informed that forecast is AI-generated from ERP data: ☐ Yes ☐ No
- [ ] Lender has accepted AI-generated forecast as part of draw documentation: ☐ Yes ☐ No
- [ ] Manual review and Controller sign-off required before lender submission: ☐ Yes ☐ No

---

## AI Governance Summary (CFO/Owner Brief)

*Complete this section after the checklist above. This is the one-paragraph brief the owner can share with their construction lender or attorney.*

> **Organization:** _________________________
> **System:** AI-generated rolling 13-week cash flow forecast built from JD Edwards EnterpriseOne data (F03B11, F0411, F5116, F0902).
>
> **Governance posture:** This system [does / does not] make autonomous financial decisions. All A/P release decisions, construction draw timing decisions, and lender communications require human review and approval before action is taken. The forecast is used as an advisory input to the CFO and Controller — not as an automated payment trigger.
>
> **Model owner:** _________________________ reviews system output on a [weekly / per-cycle] basis and has authority to pause or override the system at any time.
>
> **Audit trail:** All forecast snapshots and human override decisions are retained for a minimum of 12 months. This documentation is available upon request for lender audit or regulatory review.

---

## BSA Certification

The following must be completed and signed before production deployment:

> I certify that the AI cash flow forecast system described in FIN-01 has been assessed for TRAIGA consequential decision scope, that all required governance documentation has been completed, and that no automated financial decisions will be made without the human review and override protocol described in the agent specification (FIN-01-agent-spec.md).

**BSA / AI Architect:** _________________________
**Date:** _________________________
**Epoch Frameworks engagement reference:** _________________________

---

> *This template is a BSA-produced governance artifact. It is not legal advice. Organizations with TRAIGA compliance questions should consult qualified legal counsel familiar with the Texas Responsible AI Governance Act.*
>
> *DACR License v2.6 | McDonald (2026) | Epoch Frameworks LLC*
