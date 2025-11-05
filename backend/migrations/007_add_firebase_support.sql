-- Add Firebase support columns to users table
DO $$ 
BEGIN
  -- Add firebase_uid column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='firebase_uid') THEN
    ALTER TABLE users ADD COLUMN firebase_uid VARCHAR(128) UNIQUE;
    CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);
  END IF;

  -- Add fcm_token column if it doesn't exist (single token per user - simple approach)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='fcm_token') THEN
    ALTER TABLE users ADD COLUMN fcm_token TEXT;
  END IF;
END $$;

-- Create FCM tokens table for multiple tokens per user (optional, more flexible)
CREATE TABLE IF NOT EXISTS fcm_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  device_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, token)
);

CREATE INDEX IF NOT EXISTS idx_fcm_tokens_user ON fcm_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_fcm_tokens_token ON fcm_tokens(token);

