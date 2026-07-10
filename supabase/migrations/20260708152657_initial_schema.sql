/*
# EscrowAI Platform Schema

1. New Tables
- `users` - Wallet-based accounts (company, freelancer, admin roles)
- `projects` - Freelance work contracts
- `milestones` - Project deliverables with payment amounts
- `escrow_transactions` - On-chain payment records
- `evidence` - Dispute evidence (files, chat logs, etc.)
- `disputes` - AI Judge and human_reviewed disputes
- `admin_actions` - Admin decision records
- `reputation_events` - User reputation tracking

2. Security
- RLS enabled on all tables
- Owner-scoped policies for users on their own data
- Admin-only access for admin tables
- Public read for some project data (marketplace visibility)
*/

-- Custom types
CREATE TYPE user_role AS ENUM ('company', 'freelancer', 'admin');
CREATE TYPE project_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled', 'disputed');
CREATE TYPE milestone_status AS ENUM ('locked', 'in_progress', 'submitted', 'approved', 'released', 'disputed');
CREATE TYPE transaction_type AS ENUM ('deposit', 'release', 'refund', 'fee');
CREATE TYPE evidence_type AS ENUM ('chat', 'file', 'pdf', 'github', 'image', 'video', 'voice', 'timestamp');
CREATE TYPE dispute_status AS ENUM ('filed', 'ai_review', 'verdict_issued', 'escalated', 'resolved');
CREATE TYPE dispute_decision AS ENUM ('rule_freelancer', 'rule_company', 'split');

-- Users table (wallet-based auth)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'freelancer',
  display_name text,
  avatar_url text,
  reputation_score integer DEFAULT 0 CHECK (reputation_score >= 0 AND reputation_score <= 100),
  total_earned numeric(18, 2) DEFAULT 0,
  total_escrowed numeric(18, 2) DEFAULT 0,
  projects_completed integer DEFAULT 0,
  disputes_won integer DEFAULT 0,
  disputes_lost integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_verified boolean DEFAULT false,
  bio text,
  skills text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  company_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  freelancer_id uuid REFERENCES users(id) ON DELETE SET NULL,
  status project_status NOT NULL DEFAULT 'open',
  total_value numeric(18, 2) NOT NULL CHECK (total_value >= 0),
  currency text DEFAULT 'USD',
  escrow_pda text, -- Solana program-derived address
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  amount numeric(18, 2) NOT NULL CHECK (amount >= 0),
  currency text DEFAULT 'USD',
  due_date timestamptz,
  status milestone_status NOT NULL DEFAULT 'locked',
  order_index integer NOT NULL DEFAULT 0,
  submitted_at timestamptz,
  approved_at timestamptz,
  released_at timestamptz,
  escrow_pda text, -- Milestone-specific escrow PDA
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Escrow transactions table
CREATE TABLE IF NOT EXISTS escrow_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id uuid REFERENCES milestones(id) ON DELETE SET NULL,
  tx_hash text NOT NULL,
  type transaction_type NOT NULL,
  amount numeric(18, 2) NOT NULL CHECK (amount >= 0),
  currency text DEFAULT 'USD',
  from_wallet text,
  to_wallet text,
  created_at timestamptz DEFAULT now()
);

-- Evidence table (for disputes)
CREATE TABLE IF NOT EXISTS evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id uuid REFERENCES milestones(id) ON DELETE SET NULL,
  dispute_id uuid, -- Will reference disputes after created
  type evidence_type NOT NULL,
  title text,
  description text,
  ipfs_hash text,
  url text,
  uploaded_by uuid NOT NULL REFERENCES users(id),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Disputes table
CREATE TABLE IF NOT EXISTS disputes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id uuid NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  filed_by uuid NOT NULL REFERENCES users(id),
  reason text NOT NULL,
  status dispute_status NOT NULL DEFAULT 'filed',
  ai_verdict jsonb,
  ai_confidence_score integer CHECK (ai_confidence_score >= 0 AND ai_confidence_score <= 100),
  ai_verdict_at timestamptz,
  escalated_by uuid REFERENCES users(id),
  escalated_at timestamptz,
  admin_id uuid REFERENCES users(id),
  final_decision dispute_decision,
  final_rationale text,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add dispute_id reference to evidence
ALTER TABLE evidence ADD COLUMN IF NOT EXISTS dispute_id uuid REFERENCES disputes(id) ON DELETE CASCADE;

-- Admin actions table
CREATE TABLE IF NOT EXISTS admin_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL REFERENCES users(id),
  dispute_id uuid NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
  action dispute_decision NOT NULL,
  rationale text,
  signature text, -- Digital signature of the decision
  created_at timestamptz DEFAULT now()
);

-- Reputation events table
CREATE TABLE IF NOT EXISTS reputation_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  metric_type text NOT NULL,
  value integer NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE escrow_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reputation_events ENABLE ROW LEVEL SECURITY;

-- Users policies
DROP POLICY IF EXISTS "users_select_own" ON users;
CREATE POLICY "users_select_own" ON users FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_update_own" ON users;
CREATE POLICY "users_update_own" ON users FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Projects policies (company owns, freelancer assigned)
DROP POLICY IF EXISTS "projects_select_own" ON projects;
CREATE POLICY "projects_select_own" ON projects FOR SELECT
  TO authenticated USING (
    auth.uid() = company_id OR 
    auth.uid() = freelancer_id OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "projects_insert_company" ON projects;
CREATE POLICY "projects_insert_company" ON projects FOR INSERT
  TO authenticated WITH CHECK (
    auth.uid() = company_id AND 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'company')
  );

DROP POLICY IF EXISTS "projects_update_own" ON projects;
CREATE POLICY "projects_update_own" ON projects FOR UPDATE
  TO authenticated USING (
    auth.uid() = company_id OR 
    auth.uid() = freelancer_id OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Milestones policies
DROP POLICY IF EXISTS "milestones_select_own" ON milestones;
CREATE POLICY "milestones_select_own" ON milestones FOR SELECT
  TO authenticated USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = milestones.project_id 
      AND (projects.company_id = auth.uid() OR projects.freelancer_id = auth.uid())
    ) OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "milestones_insert_company" ON milestones;
CREATE POLICY "milestones_insert_company" ON milestones FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = milestones.project_id 
      AND projects.company_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "milestones_update_own" ON milestones;
CREATE POLICY "milestones_update_own" ON milestones FOR UPDATE
  TO authenticated USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = milestones.project_id 
      AND (projects.company_id = auth.uid() OR projects.freelancer_id = auth.uid())
    ) OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Escrow transactions - read only for participants
DROP POLICY IF EXISTS "escrow_transactions_select_own" ON escrow_transactions;
CREATE POLICY "escrow_transactions_select_own" ON escrow_transactions FOR SELECT
  TO authenticated USING (
    EXISTS (
      SELECT 1 FROM milestones m
      JOIN projects p ON m.project_id = p.id
      WHERE m.id = escrow_transactions.milestone_id
      AND (p.company_id = auth.uid() OR p.freelancer_id = auth.uid())
    ) OR from_wallet IN (SELECT wallet_address FROM users WHERE id = auth.uid())
    OR to_wallet IN (SELECT wallet_address FROM users WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Evidence policies
DROP POLICY IF EXISTS "evidence_select_own" ON evidence;
CREATE POLICY "evidence_select_own" ON evidence FOR SELECT
  TO authenticated USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM disputes d
      JOIN milestones m ON d.milestone_id = m.id
      JOIN projects p ON m.project_id = p.id
      WHERE d.id = evidence.dispute_id
      AND (p.company_id = auth.uid() OR p.freelancer_id = auth.uid())
    ) OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "evidence_insert_own" ON evidence;
CREATE POLICY "evidence_insert_own" ON evidence FOR INSERT
  TO authenticated WITH CHECK (uploaded_by = auth.uid());

-- Disputes policies
DROP POLICY IF EXISTS "disputes_select_own" ON disputes;
CREATE POLICY "disputes_select_own" ON disputes FOR SELECT
  TO authenticated USING (
    filed_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM milestones m
      JOIN projects p ON m.project_id = p.id
      WHERE m.id = disputes.milestone_id
      AND (p.company_id = auth.uid() OR p.freelancer_id = auth.uid())
    ) OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "disputes_insert_own" ON disputes;
CREATE POLICY "disputes_insert_own" ON disputes FOR INSERT
  TO authenticated WITH CHECK (
    filed_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM milestones m
      JOIN projects p ON m.project_id = p.id
      WHERE m.id = disputes.milestone_id
      AND (p.company_id = auth.uid() OR p.freelancer_id = auth.uid())
    )
  );

-- Admin actions - only admins can manage
DROP POLICY IF EXISTS "admin_actions_admin_only" ON admin_actions;
CREATE POLICY "admin_actions_admin_only" ON admin_actions FOR ALL
  TO authenticated USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Reputation events - read only for users on own data
DROP POLICY IF EXISTS "reputation_events_select_own" ON reputation_events;
CREATE POLICY "reputation_events_select_own" ON reputation_events FOR SELECT
  TO authenticated USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_company ON projects(company_id);
CREATE INDEX IF NOT EXISTS idx_projects_freelancer ON projects(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_milestones_project ON milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_milestones_status ON milestones(status);
CREATE INDEX IF NOT EXISTS idx_disputes_milestone ON disputes(milestone_id);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
