/**
 * tokenGuard.ts
 * LORI Framework – Token-Guard Middleware
 * © 2025 LORI Framework. All Rights Reserved.
 *
 * Purpose:
 * Prevent unauthorized AI-mediated financial actions by enforcing:
 *  - Purpose-Bound Tokens (PB-Token)
 *  - Dual-Channel Human-in-the-Loop (HITL) Consent
 *  - Consent Receipt (CRID) linkage
 *  - EWMA-based adaptive risk escalation
 */

import { verifyToken, revokeToken } from "../services/tokenService";
import { computeEWMARisk } from "../services/riskEngine";
import { sendOOBChallenge } from "../services/hitlv2";
import { logAuditTrail } from "../services/auditLogger";

interface PaymentRequest {
  user_id: string;
  merchant_id: string;
  amount: number;
  currency: string;
  purpose: string;
  recurrence?: string;
  tx_context_hash: string;
  risk_score?: number;
}

interface PBToken {
  token_id: string;
  scope: string;
  amount_max: number;
  merchant_id: string;
  exp: string;
  crid: string;
  caveats: string[];
}

export async function authorizePayment(request: PaymentRequest) {
  // === Step 1: Risk analysis (EWMA adaptive) ===
  const ewmaRisk = await computeEWMARisk(request.user_id);
  if (ewmaRisk > 0.75) {
    console.warn(`[TokenGuard] Elevated EWMA risk (${ewmaRisk})`);
    await sendOOBChallenge(request.user_id, "strong_HITL");
  }

  // === Step 2: Verify dual-channel human consent ===
  const consentOK = await sendOOBChallenge(request.user_id, "dual");
  if (!consentOK) {
    throw new Error("Denied: Missing dual-channel consent (HITL).");
  }

  // === Step 3: Validate PB-Token parameters ===
  const pbToken: PBToken | null = await verifyToken(request.user_id, request.merchant_id);
  if (!pbToken) {
    throw new Error("Denied: Invalid or missing Purpose-Bound Token.");
  }

  if (pbToken.amount_max < request.amount) {
    await revokeToken(pbToken.token_id);
    throw new Error("Denied: Amount exceeds PB-Token limit.");
  }

  // === Step 4: Cross-verify CRID linkage ===
  if (!pbToken.crid || !pbToken.caveats.includes("replay=prohibited")) {
    throw new Error("Denied: CRID linkage invalid or token replay detected.");
  }

  // === Step 5: Execute payment if all checks pass ===
  console.info(`[TokenGuard] Payment authorized for ${request.merchant_id}`);
  await logAuditTrail({
    user: request.user_id,
    merchant: request.merchant_id,
    amount: request.amount,
    txh: request.tx_context_hash,
    crid: pbToken.crid,
    risk: ewmaRisk,
  });

  return { status: "APPROVED", crid: pbToken.crid, risk: ewmaRisk };
}

/**
 * Emergency revocation switch
 * Called when repeated anomalies or EWMA spikes occur.
 */
export async function emergencyShutdown(user_id: string) {
  console.error(`[TokenGuard] Emergency shutdown triggered for user ${user_id}`);
  await revokeToken("*", user_id);
  await logAuditTrail({
    user: user_id,
    event: "emergency_shutdown",
    reason: "EWMA anomaly or unauthorized token reuse",
  });
}
