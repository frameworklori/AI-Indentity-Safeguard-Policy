# High-Risk Feature Access Policy

This document defines the **access rules and safeguards** for AI functions that manipulate or replicate human identity (face, voice, biometric likeness).

---

## 1. Access Levels

### Free Tier (Open Use)
- ✅ Allowed: Low-risk AI features (artistic filters, cartoonization, style transfer, fictional characters).
- ❌ Not Allowed: Face-swapping, deepfake voice, or any function that replicates **real people’s identity**.
- 🔒 Technical Restriction: API endpoints for high-risk functions return `403 – Restricted to verified accounts`.

---

## 2. API Flow (Example)

### Request

```http
POST /v1/generate/face-swap
Authorization: Bearer <user_token>
X-Feature-Scope: high_risk
Content-Type: application/json

{
  "input_image": "<hash>",
  "target_face": "<hash>",
  "consent_proof": "<doc_id>"
}
```

---

### Paid + Verified Tier

**Requirements:**
1. **KYC Verification** (passport, government ID, or enterprise registration).
2. **Active Payment Subscription** (credit card / verified enterprise billing).
3. **Consent Statement**: User must digitally sign agreement acknowledging legal responsibilities.

**Permissions:**
- ✅ Access to **high-risk functions** (face-swap, synthetic voice, identity recreation).
- ✅ Ability to request **template unlocking** for custom likeness generation.
- ✅ Audit logs linked to account & payment ID.

**Restrictions:**
- ❌ Mass-generation (>50 outputs/hour) triggers automatic review.
- ❌ Uploading third-party likeness requires **consent proof** (e.g., signed authorization).

---

### Validation Steps

- Verify `user_token` belongs to a Paid + Verified account.
- Check if `X-Feature-Scope = high_risk` and user has scope enabled.
- Validate `consent_proof` if a third-party likeness is detected.
- Generate output with embedded `watermark_id` + `audit_id`.
- Store request/response metadata in audit log.

---

### Response

```json
{
  "status": "success",
  "output_url": "https://cdn.ai/output/12345.mp4",
  "audit_id": "AUD-2025-09-26-XYZ",
  "watermark_id": "WMK-0987"
}
```
