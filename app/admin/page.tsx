'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WaxSeal } from '@/components/ui/wax-seal';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Disputes', href: '/admin', icon: 'gavel', active: true },
  { label: 'Projects', href: '/admin/projects', icon: 'account_tree' },
  { label: 'Users', href: '/admin/users', icon: 'people' },
  { label: 'Transactions', href: '/admin/transactions', icon: 'receipt_long' },
];

const platformStats = {
  totalEscrow: 12450000,
  openDisputes: 12,
  aiResolved: 847,
  escalated: 23,
  revenue: 248000,
};

const disputes = [
  {
    id: 'DSP-001',
    project: 'DeFi Dashboard UI',
    milestone: 'Phase 2: Components',
    amount: 3500,
    filedBy: 'Company',
    filedAgainst: 'Freelancer',
    status: 'escalated',
    aiVerdict: 'rule_freelancer',
    aiConfidence: 78,
    filedAt: '2024-10-15',
    reason: 'Deliverables do not match specification requirements for responsive design.',
  },
  {
    id: 'DSP-002',
    project: 'Smart Contract Audit',
    milestone: 'Security Analysis',
    amount: 8000,
    filedBy: 'Freelancer',
    filedAgainst: 'Company',
    status: 'ai_review',
    aiVerdict: 'rule_company',
    aiConfidence: 92,
    filedAt: '2024-10-14',
    reason: 'Payment withheld despite delivering all audit reports on time.',
  },
  {
    id: 'DSP-003',
    project: 'Mobile Wallet App',
    milestone: 'Beta Release',
    amount: 12500,
    filedBy: 'Company',
    filedAgainst: 'Freelancer',
    status: 'resolved',
    aiVerdict: 'split',
    aiConfidence: 65,
    filedAt: '2024-10-10',
    resolvedAt: '2024-10-12',
    finalDecision: 'split',
    reason: 'App crashes on certain device configurations not in original scope.',
  },
];

const aiVerdictLabels: Record<string, { label: string; color: string }> = {
  rule_freelancer: { label: 'Release to Freelancer', color: 'text-verified-600' },
  rule_company: { label: 'Refund to Company', color: 'text-dispute-600' },
  split: { label: 'Split 50/50', color: 'text-brass-500' },
};

const statusColors: Record<string, string> = {
  filed: 'bg-surface-variant text-on-surface-variant',
  ai_review: 'bg-brass-500/20 text-brass-500',
  verdict_issued: 'bg-surface-container text-on-surface',
  escalated: 'bg-dispute-600/20 text-dispute-600',
  resolved: 'bg-verified-600/20 text-verified-600',
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header role="admin" reputation={100} walletAddress="0xAdmin...Auth" />

      <div className="flex max-w-container mx-auto flex-grow">
        {/* Admin Sidebar */}
        <aside className="hidden md:flex flex-col h-[calc(100vh-80px)] w-64 py-6 bg-admin-700/20 border-r border-outline-variant sticky top-20">
          <div className="px-6 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-admin-700/30 flex items-center justify-center border border-admin-700/50 rounded-full">
              <span className="material-symbols-outlined text-admin-700" style={{ fontVariationSettings: "'FILL' 1" }}>
                admin_panel_settings
              </span>
            </div>
            <div>
              <div className="font-headline text-lg font-bold text-admin-700">Human Intervention</div>
              <div className="font-mono text-[10px] text-on-surface-variant uppercase">Authority Panel</div>
            </div>
          </div>

          <nav className="flex-grow flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 font-mono text-sm transition-all",
                  item.active
                    ? "text-admin-700 bg-admin-700/10 border-l-4 border-admin-700 translate-x-1"
                    : "text-on-surface-variant hover:bg-surface-container"
                )}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto px-6 pt-6 border-t border-outline-variant/30">
            <div className="px-4 py-4 bg-surface-container-highest border border-outline-variant">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-admin-700 flex items-center justify-center text-paper-50 font-bold text-sm">
                  AD
                </div>
                <div>
                  <p className="font-mono text-xs text-on-surface">Admin Authority</p>
                  <p className="text-[10px] text-on-surface-variant">Final Signatory</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-grow p-margin-desktop min-h-screen bg-surface-dim">
          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="bg-surface-container border border-outline-variant p-6">
              <p className="font-mono text-[10px] text-on-surface-variant mb-1 uppercase">Total Escrow</p>
              <p className="text-2xl font-headline font-bold text-brass-500">
                ${(platformStats.totalEscrow / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="bg-surface-container border border-outline-variant p-6">
              <p className="font-mono text-[10px] text-on-surface-variant mb-1 uppercase">Open Disputes</p>
              <p className="text-2xl font-headline font-bold text-dispute-600">{platformStats.openDisputes}</p>
            </div>
            <div className="bg-surface-container border border-outline-variant p-6">
              <p className="font-mono text-[10px] text-on-surface-variant mb-1 uppercase">AI Resolved</p>
              <p className="text-2xl font-headline font-bold text-verified-600">{platformStats.aiResolved}</p>
            </div>
            <div className="bg-surface-container border border-outline-variant p-6">
              <p className="font-mono text-[10px] text-on-surface-variant mb-1 uppercase">Escalated</p>
              <p className="text-2xl font-headline font-bold text-brass-500">{platformStats.escalated}</p>
            </div>
            <div className="bg-surface-container border border-outline-variant p-6 col-span-2 md:col-span-1">
              <p className="font-mono text-[10px] text-on-surface-variant mb-1 uppercase">Revenue</p>
              <p className="text-2xl font-headline font-bold text-on-surface">
                ${platformStats.revenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Disputes Queue */}
          <section>
            <div className="flex justify-between items-end mb-6 border-b border-outline-variant pb-4">
              <div>
                <h3 className="text-3xl font-headline font-semibold text-admin-700">Dispute Resolution Queue</h3>
                <p className="text-sm text-on-surface-variant">Review AI verdicts and issue final binding decisions.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest border border-outline-variant">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  <span className="font-mono text-[10px]">STATUS</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {disputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className={cn(
                    "bg-surface-container border-l-4 transition-all",
                    dispute.status === 'escalated'
                      ? "border-dispute-600"
                      : dispute.status === 'resolved'
                        ? "border-verified-600"
                        : "border-outline-variant"
                  )}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-[10px] text-on-surface-variant">{dispute.id}</span>
                          <span className={cn(
                            "px-2 py-0.5 font-mono text-[10px] uppercase",
                            statusColors[dispute.status]
                          )}>
                            {dispute.status.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="text-xl font-headline font-semibold text-on-surface">{dispute.project}</h4>
                        <p className="font-mono text-xs text-on-surface-variant">{dispute.milestone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-headline font-bold text-brass-500">
                          ${dispute.amount.toLocaleString()}
                        </p>
                        <p className="font-mono text-[10px] text-on-surface-variant">Filed: {dispute.filedAt}</p>
                      </div>
                    </div>

                    {/* AI Verdict Section */}
                    <div className="bg-surface-container-low border border-outline-variant p-4 mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-brass-500">smart_toy</span>
                          <span className="font-mono text-xs text-brass-500 uppercase">AI Judge Verdict</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-on-surface-variant">Confidence:</span>
                          <div className={cn(
                            "font-mono text-sm font-bold",
                            dispute.aiConfidence >= 80 ? "text-verified-600" : "text-brass-500"
                          )}>
                            {dispute.aiConfidence}%
                          </div>
                        </div>
                      </div>
                      <p className={cn("font-mono text-sm", aiVerdictLabels[dispute.aiVerdict]?.color)}>
                        Recommended: {aiVerdictLabels[dispute.aiVerdict]?.label}
                      </p>
                    </div>

                    {/* Reason */}
                    <div className="mb-6">
                      <p className="font-mono text-[10px] text-on-surface-variant uppercase mb-1">Reason Filed</p>
                      <p className="text-sm text-on-surface-variant">{dispute.reason}</p>
                    </div>

                    {/* Parties */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-outline-variant/30">
                      <div>
                        <p className="font-mono text-[10px] text-on-surface-variant mb-1">Filed By</p>
                        <p className="font-mono text-sm text-on-surface">{dispute.filedBy}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-on-surface-variant mb-1">Filed Against</p>
                        <p className="font-mono text-sm text-on-surface">{dispute.filedAgainst}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    {dispute.status !== 'resolved' && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        <button className="bg-verified-600 text-paper-50 px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-verified-600/80 transition-colors flex items-center gap-2">
                          <WaxSeal size="sm" showCheck={false} className="!w-4 !h-4" />
                          Final Decision
                        </button>
                        <button className="border border-outline text-on-surface px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-colors">
                          View Evidence
                        </button>
                        <button className="border border-outline text-on-surface px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-colors">
                          Chat History
                        </button>
                      </div>
                    )}

                    {/* Resolution Info */}
                    {dispute.status === 'resolved' && (
                      <div className="mt-4 flex items-center gap-4 bg-verified-600/10 border border-verified-600/30 p-4">
                        <WaxSeal size="sm" />
                        <div>
                          <p className="font-mono text-xs text-verified-600 uppercase">Resolved</p>
                          <p className="text-sm text-on-surface">
                            Final Decision: {aiVerdictLabels[dispute.finalDecision || '']?.label}
                          </p>
                          <p className="font-mono text-[10px] text-on-surface-variant">
                            Completed: {dispute.resolvedAt}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
