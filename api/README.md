# LORI Safeguard API

A modular identity-verification and ethical-access system based on the **LORI AI-Identify-Safeguard Policy v2.0**.

---

## Overview
This API implements:
- Tiered verification (Tier0 → Tier3)
- Symbolic payment ($1.99) verification
- KYC upgrade and AI-Agent-Identifier enforcement
- Risk scoring and revocation automation
- Immutable audit ledger for evidence retention

---

## Quick Start (for reproducibility)
> For testing or patent demonstration only — not production deployment.

```bash
cd api
npm install
npm run dev
---

Then visit:
(http://localhost:8080/health)

----
Expected output:
{ "ok": true }
----
Tier Summary

Tier
Verification Type
Fee
Method
Scope
Revocation
Tier0
Human Identity
$1.99
3DS + AVS
Limited (100/day)
Auto-limit
Tier1
KYC Upgrade
—
Gov ID + Liveness
Full
Manual Review
Tier2
Corporate Integrity
$1,000
AI-Agent-Identifier + Deposit
Enterprise
Legal Revocation

Directory Map

src/
├─ index.ts
├─ routes/
│  ├─ register.ts
│  ├─ upgradeTier.ts
│  ├─ corporate.ts
│  └─ webhooks/stripe.ts
├─ middleware/
│  ├─ rateLimit.ts
│  ├─ deviceFingerprint.ts
│  ├─ paymentAuth.ts
│  ├─ kycGate.ts
│  ├─ ofacCheck.ts
│  ├─ aiAgentHeader.ts
│  └─ riskRecorder.ts
├─ services/
│  ├─ riskEngine.ts
│  └─ tokenService.ts
├─ utils/
│  ├─ auditLog.ts
│  └─ crypto.ts
└─ db/
   └─ schema.sql

Legal Reference
	•	Policy: policy/AI-Identify-Safeguard-Policy_v2.0.md
	•	License: LICENSE_LORI_CIL.md
	•	Record: docs/IP_Execution_Record.md

Copyright 2025 LORI Framework – All Rights Reserved.

