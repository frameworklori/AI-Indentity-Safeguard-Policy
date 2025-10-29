import { Router } from "express";
import { accountCreateLimiter } from "../middleware/rateLimit.js";
import { deviceFingerprint } from "../middleware/deviceFingerprint.js";
import { ofacCheck } from "../middleware/ofacCheck.js";
import { createSymbolicAuth } from "../middleware/paymentAuth.js";
import { riskRecorder } from "../middleware/riskRecorder.js";
import { writeAudit } from "../utils/auditLog.js";
import { issueLimitedToken } from "../services/tokenService.js";

const router = Router();

// Step 1 – create payment intent for symbolic $1.99 verification
router.post(
  "/start",
  accountCreateLimiter,
  deviceFingerprint,
  ofacCheck,
  createSymbolicAuth,
  riskRecorder("register:start"),
  (req, res) => {
    writeAudit({ evt: "register_intent", pi: (req as any).payment_intent_id });
    res.json({ client_secret: res.locals.client_secret });
  }
);

// Step 2 – confirm and issue limited token
router.post(
  "/confirm",
  deviceFingerprint,
  riskRecorder("register:confirm"),
  async (req, res) => {
    const userId = "u_" + Date.now();
    const token = issueLimitedToken(userId);
    res.json({ user_id: userId, token, scope: "limited", daily_quota: 100 });
  }
);

export default router;
