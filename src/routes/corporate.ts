import { Router } from "express";
import { requireAiAgentHeader } from "../middleware/aiAgentHeader.js";
import { deviceFingerprint } from "../middleware/deviceFingerprint.js";
import { riskRecorder } from "../middleware/riskRecorder.js";
import Stripe from "stripe";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

// Corporate Integrity Deposit endpoint
router.post(
  "/init",
  requireAiAgentHeader,
  deviceFingerprint,
  riskRecorder("corp:init"),
  async (req, res) => {
    const amount = Number(process.env.LORI_CORPORATE_DEPOSIT_USD || 100000); // default $1,000
    const pi = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      capture_method: "manual",
      description: "LORI Corporate Integrity Deposit",
      payment_method_options: { card: { request_three_d_secure: "any" } },
      metadata: {
        purpose: "corporate_deposit",
        agent: String(req.headers["ai-agent-identifier"] || ""),
      },
    });
    res.json({ client_secret: pi.client_secret });
  }
);

export default router;
