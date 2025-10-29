/**
 * LORI Safeguard Middleware – paymentAuth.ts
 * Purpose: create a $1.99 symbolic verification payment via Stripe 3DS.
 */
import Stripe from "stripe";
import { NextFunction, Request, Response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

export async function createSymbolicAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const amount = Number(process.env.LORI_SYMBOLIC_USD || 199); // $1.99
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      confirmation_method: "automatic",
      capture_method: "manual",
      description: "LORI Symbolic Identity Verification",
      payment_method_options: { card: { request_three_d_secure: "any" } },
      metadata: {
        purpose: "identity_verification",
        device_fp: (req as any).device_fp || "",
      },
    });
    (req as any).payment_intent_id = paymentIntent.id;
    res.locals.client_secret = paymentIntent.client_secret;
    next();
  } catch (err) {
    console.error("Payment auth error:", err);
    res.status(400).json({ error: "failed_to_create_payment_intent" });
  }
}
