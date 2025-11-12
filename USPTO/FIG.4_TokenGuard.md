** USPTO/FIG.4_TokenGuard.md`**

```markdown
# FIG.4 — Token-Guard Human-Verified Payment Consent Flow

---

## Title
Purpose-Bound Tokenization with Dual-Channel Human-Verified Consent for AI-Mediated Payments

---

## Overview
This figure illustrates a secure AI-mediated payment authorization architecture that requires explicit, dual-channel human verification before a Purpose-Bound Token (PB-Token) is issued.

The system prevents unintended or unauthorized payments triggered by AI systems using stored or pre-authorized tokens.

---

## Description of Elements

**(401)** — *User Device / Primary Interface*  
Displays payment confirmation prompt including merchant, amount, purpose, and expiration.

**(402)** — *Secondary Verification Channel*  
Independent out-of-band channel (e.g., SMS, email, or authenticator app) used for second-factor consent validation.

**(403)** — *Consent Verification Module (HITL Controller)*  
Validates both channels; issues a **Consent Receipt ID (CRID)** upon successful human verification.

**(404)** — *Purpose-Bound Token Generator*  
Binds payment parameters (scope, amount, merchant, purpose, expiry) to CRID; produces signed PB-Token.

**(405)** — *AI / Payment Service Layer*  
Attempts to execute transaction. The Token-Guard middleware intercepts the call, verifies PB-Token validity, CRID linkage, and EWMA-based risk threshold before approval.

**(406)** — *Audit Ledger / Immutable Log*  
Records CRID, transaction hash (TXH), timestamp, and system signature. Used for forensic auditing and non-repudiation.

---

## Figure Caption
**FIG.4** illustrates a human-verified consent loop for AI-mediated payment actions.  
When a payment intent is initiated, the AI service triggers the Token-Guard verification sequence:  
1. Prompt on user device (401).  
2. Dual confirmation via secondary channel (402).  
3. Issuance of consent receipt (403).  
4. Generation of purpose-bound token (404).  
5. Token verification at payment execution layer (405).  
6. Audit entry in immutable ledger (406).

---

## Notes
- All visual elements are represented in black-and-white line schematic per USPTO drawing standards.  
- Dashed lines indicate data flow; solid lines indicate control or verification sequence.  
- AI modules are represented as logic blocks; human actions as labeled triggers.  
- Figure demonstrates interoperability between AI ethics layer, human verification layer, and payment authorization control.
