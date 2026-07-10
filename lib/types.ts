export type UserRole = 'company' | 'freelancer' | 'admin';

export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';

export type MilestoneStatus = 'locked' | 'in_progress' | 'submitted' | 'approved' | 'released' | 'disputed';

export type TransactionType = 'deposit' | 'release' | 'refund' | 'fee';

export type EvidenceType = 'chat' | 'file' | 'pdf' | 'github' | 'image' | 'video' | 'voice' | 'timestamp';

export type DisputeStatus = 'filed' | 'ai_review' | 'verdict_issued' | 'escalated' | 'resolved';

export type DisputeDecision = 'rule_freelancer' | 'rule_company' | 'split';

export interface User {
  id: string;
  wallet_address: string;
  role: UserRole;
  display_name?: string;
  avatar_url?: string;
  reputation_score: number;
  total_earned: number;
  total_escrowed: number;
  projects_completed: number;
  disputes_won: number;
  disputes_lost: number;
  is_active: boolean;
  is_verified: boolean;
  bio?: string;
  skills?: string[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  company_id: string;
  freelancer_id?: string;
  status: ProjectStatus;
  total_value: number;
  currency: string;
  escrow_pda?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  company?: User;
  freelancer?: User;
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  due_date?: string;
  status: MilestoneStatus;
  order_index: number;
  submitted_at?: string;
  approved_at?: string;
  released_at?: string;
  escrow_pda?: string;
  created_at: string;
  updated_at: string;
  project?: Project;
}

export interface EscrowTransaction {
  id: string;
  milestone_id?: string;
  tx_hash: string;
  type: TransactionType;
  amount: number;
  currency: string;
  from_wallet?: string;
  to_wallet?: string;
  created_at: string;
}

export interface Evidence {
  id: string;
  project_id: string;
  milestone_id?: string;
  dispute_id?: string;
  type: EvidenceType;
  title?: string;
  description?: string;
  ipfs_hash?: string;
  url?: string;
  uploaded_by: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Dispute {
  id: string;
  milestone_id: string;
  project_id: string;
  filed_by: string;
  reason: string;
  status: DisputeStatus;
  ai_verdict?: Record<string, unknown>;
  ai_confidence_score?: number;
  ai_verdict_at?: string;
  escalated_by?: string;
  escalated_at?: string;
  admin_id?: string;
  final_decision?: DisputeDecision;
  final_rationale?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
  milestone?: Milestone;
  project?: Project;
}

export interface AdminAction {
  id: string;
  admin_id: string;
  dispute_id: string;
  action: DisputeDecision;
  rationale?: string;
  signature?: string;
  created_at: string;
}

export interface ReputationEvent {
  id: string;
  user_id: string;
  project_id?: string;
  metric_type: string;
  value: number;
  description?: string;
  created_at: string;
}
