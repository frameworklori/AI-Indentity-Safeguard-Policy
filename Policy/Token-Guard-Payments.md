# Token-Guard Payments Policy
Copyright 2025 LORI Framework – All Rights Reserved
Licensed under the LORI Semantic Safeguard License v1.1  
Unauthorized duplication or use of this material without written consent is strictly prohibited.  

---

## 1. Purpose & Scope
The Token-Guard Payments Policy defines the security, ethical, and technical safeguards required to prevent unauthorized AI-mediated financial actions.  
Its purpose is to ensure that **no AI system can trigger or complete a payment** without verifiable human consent, context-bound authorization, and transparent auditability.

This document applies to all AI-enabled systems, integrations, and third-party APIs capable of performing financial transactions on behalf of users.

---

## 2. Threat Model
**Unauthorized Token-Based Payment Risk:**
- AI or automated agents reuse an existing payment token or API key to execute a charge or subscription renewal **without explicit human confirmation**.
- Broad-scope tokens are issued without time, purpose, or amount constraints.
- No traceable **proof of human intent (PHI)** or **consent receipt (CRID)** is recorded.

---

## 3. Core Design Principles

### 3.1 Purpose-Bound Token (PB-Token)
Each payment authorization must generate a **single-use, purpose-specific token** containing:
- Scope limitation (e.g., `scope=payment:one_time:zoom`)
- Amount cap (`amount_max`)
- Merchant identifier (`merchant_id`)
- Expiration timestamp (`exp`)
- Purpose statement (`purpose`)
- Linked **Consent Receipt ID (CRID)** and **Transaction Hash (TXH)**  

Tokens are validated by the **Token-Guard middleware** before execution.

---

### 3.2 Dual-Channel Human-in-the-Loop (HITL) Confirmation
All payment actions must undergo **two-factor human validation**:
1. **Primary Channel** – In-app confirmation prompt (showing merchant, amount, period, and purpose).  
2. **Secondary Channel** – Out-of-band verification (email, SMS, or authenticator tap).  

Only when both are completed within the defined window is a PB-Token issued.

---

### 3.3 Consent Receipt (CRID)
A CRID must record:
- Timestamp, user ID, merchant, amount, recurrence
- Purpose text and expiry date  
- Hash of the consent statement or user confirmation (TXH)  
- Digital signature or cryptographic reference for non-repudiation  

CRIDs are stored in an **immutable audit ledger** (local WORM or external notarization chain).

---

### 3.4 EWMA-Driven Risk Escalation
Payment risk is dynamically computed using **Exponentially Weighted Moving Average (EWMA)** across:
- User intent deviation
- Unfamiliar merchants or sudden amount spikes
- Behavioral entropy over time  

If EWMA risk exceeds threshold → elevate to biometric or cryptographic key confirmation.

---

### 3.5 Automatic Revocation & Refund
- Users may revoke PB-Tokens or recurring authorizations at any time.
- Any transaction executed without CRID linkage must be auto-flagged, refunded, and audited.

---

## 4. Implementation Guidelines

### 4.1 YAML Schema Example
```yaml
PaymentRequest:
  merchant_id: "zoom.us"
  amount: 14.99
  currency: "USD"
  recurrence: "monthly"
  purpose: "Subscription renewal"
  user_id: "<UID>"
  tx_context_hash: "<TXH>"
  risk_score: 0.27
  confirmation_channels:
    - in_app
    - totp_or_webauthn

PBToken:
  scope: "payment:one_time"
  amount_max: 14.99
  merchant_id: "zoom.us"
  exp: "2025-11-12T14:05:00Z"
  crid: "<ConsentReceiptID>"
  caveats:
    - "region=US"
    - "device_binding=YubiKey#A1B2"
    - "replay=prohibited"

4.2 Pseudocode (Token-Guard Middleware)
def authorize_payment(request):
    assert request.merchant_id in ALLOWLIST
    risk = compute_ewma_risk(request)
    if risk > RISK_THRESHOLD:
        escalate_to_strong_HITL()

    crid = collect_dual_channel_consent(request)
    if not crid:
        deny("No dual-channel consent detected")

    pb_token = mint_purpose_bound_token(request, crid)
    attach_to_payment_api(pb_token)
5. Compliance Integration

Layer
File / Function
Responsibility
Middleware
tokenGuard.ts
Validate token scope, CRID, expiry
Service
riskEngine.ts
Compute EWMA risk trend
Tech / Audit
AuditBundle_Schema.json
Add CRID, PBToken, TXH fields
Policy
AI-Identity-Safeguard-Policy.md
Reference legal & ethical requirements
6. Incident Example

Case Study 01 – AI-Mediated Payment Risk via Third-Party Integration

In one observed case, an AI system reused a pre-authorized token to initiate a subscription payment without human confirmation.
This incident demonstrated that token persistence + absent consent validation = unintended payment.

The Token-Guard protocol prevents such outcomes by enforcing purpose-binding, dual-channel consent, and immutable audit receipts.

(No entity, brand, or product name is mentioned to preserve neutrality and avoid reputational attribution.)

⸻

7. Patent Reference

This policy supports the following USPTO documentation:
	•	FIG.4 – Token-Guard Consent Flow Diagram
	•	Related claims within “Purpose-Bound Tokenization with Dual-Channel Human-Verified Consent for AI-Mediated Payments.”

⸻

8. Future Extensions
	•	Integration with biometric-verified CRID issuance
	•	Real-time blockchain notarization of consent receipts
	•	Extension to voice-triggered payments via Zero-Trust-Voice protocol
	•	Optional coupling with the AI-Curiosity-Gain-Index to detect behavioral drift leading to financial misjudgment.
