# API Access Control – High-Risk Features

## Access Scopes
- `low_risk`: default for all free-tier users.
- `high_risk`: restricted scope, only granted to paid + verified accounts.

---

## Flow
1. User requests scope via `/apply-scope`.
2. Submit KYC + billing proof.
3. Admin/auto-check validates documents.
4. If approved → user_token updated with `high_risk` scope.

---

## Example Enforcement
```http
POST /v1/generate/voice-clone
Authorization: Bearer <user_token>
X-Feature-Scope: high_risk

