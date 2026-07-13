/**
 * lib/store/projects.ts
 *
 * A localStorage-backed CRUD store for EscrowAI projects and applications.
 * Used as the primary data layer during development (Supabase RLS pending).
 * Each entity is stored under a unique key in localStorage.
 */

export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  status: 'pending' | 'submitted' | 'approved' | 'released';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  companyWallet: string;
  companyName: string;
  freelancerWallet: string | null;
  status: ProjectStatus;
  totalValueSol: number;
  escrowPda: string | null;        // escrow_account PDA
  vaultPda: string | null;         // vault PDA (holds SOL)
  initTxSig: string | null;        // transaction signature from initialize_escrow
  milestones: Milestone[];
  createdAt: string;               // ISO date string
}

export interface Application {
  id: string;
  projectId: string;
  freelancerWallet: string;
  freelancerName: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

const PROJECTS_KEY = 'escrow_projects';
const APPLICATIONS_KEY = 'escrow_applications';

// ─── Projects ─────────────────────────────────────────────────────────────────

export function getAllProjects(): Project[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getProjectById(id: string): Project | null {
  return getAllProjects().find((p) => p.id === id) || null;
}

export function getOpenProjects(): Project[] {
  return getAllProjects().filter((p) => p.status === 'open');
}

export function getProjectsByCompany(companyWallet: string): Project[] {
  return getAllProjects().filter((p) => p.companyWallet === companyWallet);
}

export function getProjectsByFreelancer(freelancerWallet: string): Project[] {
  return getAllProjects().filter((p) => p.freelancerWallet === freelancerWallet);
}

export function saveProject(project: Project): void {
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    all[idx] = project;
  } else {
    all.push(project);
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(all));
}

export function updateProjectStatus(id: string, status: ProjectStatus): void {
  const all = getAllProjects();
  const project = all.find((p) => p.id === id);
  if (project) {
    project.status = status;
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(all));
  }
}

export function assignFreelancer(projectId: string, freelancerWallet: string): void {
  const all = getAllProjects();
  const project = all.find((p) => p.id === projectId);
  if (project) {
    project.freelancerWallet = freelancerWallet;
    project.status = 'in_progress';
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(all));
  }
}

export function updateProjectEscrow(
  id: string,
  escrowPda: string,
  vaultPda: string,
  txSig: string
): void {
  const all = getAllProjects();
  const project = all.find((p) => p.id === id);
  if (project) {
    project.escrowPda = escrowPda;
    project.vaultPda = vaultPda;
    project.initTxSig = txSig;
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(all));
  }
}

// ─── Applications ─────────────────────────────────────────────────────────────

export function getAllApplications(): Application[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getApplicationsByProject(projectId: string): Application[] {
  return getAllApplications().filter((a) => a.projectId === projectId);
}

export function getApplicationsByFreelancer(freelancerWallet: string): Application[] {
  return getAllApplications().filter((a) => a.freelancerWallet === freelancerWallet);
}

export function hasApplied(projectId: string, freelancerWallet: string): boolean {
  return getAllApplications().some(
    (a) => a.projectId === projectId && a.freelancerWallet === freelancerWallet
  );
}

export function saveApplication(application: Application): void {
  const all = getAllApplications();
  all.push(application);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(all));
}

export function updateApplicationStatus(
  applicationId: string,
  status: 'accepted' | 'rejected'
): void {
  const all = getAllApplications();
  const app = all.find((a) => a.id === applicationId);
  if (app) {
    app.status = status;
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(all));
  }
}

/** Generate a short unique ID */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
}
