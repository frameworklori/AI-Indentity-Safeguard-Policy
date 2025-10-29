/**
 * LORI Safeguard Middleware – aiAgentHeader.ts
 * Purpose: ensure AI systems identify themselves via request headers.
 */
import { NextFunction, Request, Response } from "express";

export function requireAiAgentHeader(req: Request, res: Response, next: NextFunction) {
  const agent = req.headers["ai-agent-identifier"];
  if (!agent) {
    return res.status(403).json({ error: "AI-Agent-Identifier header required" });
  }
  next();
}
