import { Router } from "express";
import { requireKYC } from "../middleware/kycGate.js";
import { riskRecorder } from "../middleware/riskRecorder.js";
import { upgradeToFullToken } from "../services/tokenService.js";

const router = Router();

// Upgrade from Tier1 (symbolic) to Tier2 (KYC verified)
router.post(
  "/kyc",
  requireKYC,
  riskRecorder("upgrade:kyc"),
  (req, res) => {
    const userId = req.body.user_id;
    const newToken = upgradeToFullToken(userId);
    res.json({ user_id: userId, token: newToken, scope: "full" });
  }
);

export default router;
