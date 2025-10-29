-- LORI Safeguard Database Schema (PostgreSQL)
-- Defines users, payments, tokens, and risk event tracking.

CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,
  email TEXT,
  phone TEXT,
  tier INT DEFAULT 0,
  device_fp CHAR(64),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payment_events (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(64),
  pi_id TEXT,
  status TEXT,
  amount_cents INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE api_tokens (
  token CHAR(64) PRIMARY KEY,
  user_id VARCHAR(64),
  scope TEXT,                 -- 'limited' | 'full'
  daily_quota INT,
  revoked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE risk_events (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(64),
  ip TEXT,
  device_fp CHAR(64),
  tag TEXT,
  score INT,
  action TEXT,                -- 'ALLOW' | 'LIMIT' | 'FREEZE'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE corporate_access (
  id BIGSERIAL PRIMARY KEY,
  agent_identifier TEXT,
  pi_id TEXT,
  status TEXT,
  deposit_cents INT,
  created_at TIMESTAMP DEFAULT NOW()
);
