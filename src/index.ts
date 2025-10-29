import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import registerRouter from "./routes/register.js";
import upgradeRouter from "./routes/upgradeTier.js";
import corporateRouter from "./routes/corporate.js";
import stripeWebhook from "./routes/webhooks/stripe.js";

const app = express();
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));

// Health check
app.get("/health", (_, res) => res.json({ ok: true }));

// Routers
app.use("/v1/register", registerRouter);
app.use("/v1/upgrade", upgradeRouter);
app.use("/v1/corporate", corporateRouter);
app.use("/v1/webhooks/stripe", stripeWebhook);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`🚀 LORI Safeguard API running on port ${port}`));
