import express from "express";
import Stripe from "stripe";
import { writeAudit } from "../../utils/auditLog.js";

const router = express.Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch {
      return res.status(400).send("Webhook signature verification failed");
    }

    // Log all events
    writeAudit({ evt: event.type, id: event.id });

    // Potential automation triggers (optional future expansion)
    if (event.type === "charge.dispute.created") {
      writeAudit({ alert: "Chargeback detected", id: event.id });
    }

    res.json({ received: true });
  }
);

export default router;
