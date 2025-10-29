/**
 * LORI Safeguard Middleware – rateLimit.ts
 * Purpose: prevent abuse and DDoS via frequency control.
 */
import rateLimit from "express-rate-limit";

// 限制每個 IP 每小時的註冊次數
export const accountCreateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 小時
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many registrations from this IP. Try later." },
});

// 限制一般 API 請求頻率
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 分鐘
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
