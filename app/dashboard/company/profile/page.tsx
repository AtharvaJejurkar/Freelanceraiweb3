'use client';

import { WaxSealAnimated } from '@/components/ui/wax-seal';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const announcements = [
  { icon: 'shield_lock', text: 'New Smart Contract templates for Web3 Audits have been deployed.' },
  { icon: 'trending_up', text: 'Staking requirements for dispute resolution reduced by 10%.' },
];

export default function CompanyProfilePage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [activeContracts, setActiveContracts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!connected) {
      setLoading(false);
      return;
    }

    async function loadDashboardData() {
      if (!publicKey) return;
      const walletAddress = publicKey.toString();

      try {
        let userData = null;
        try {
          const res = await fetch(`/api/users?wallet_address=${walletAddress}`);
          if (res.ok) {
            userData = await res.json();
          } else {
            throw new Error(await res.text());
          }
        } catch (userError) {
          const mockStr = localStorage.getItem('mockUser');
          if (mockStr) {
            userData = JSON.parse(mockStr);
          }
        }
        
        setUser(userData);

        if (userData && userData.id !== 'mock-user-id') {
          try {
            const res = await fetch(`/api/projects?company_id=${userData.id}`);
            if (res.ok) {
              const projectsData = await res.json();
              setActiveContracts(projectsData);
            }
          } catch (projectsError) {
            console.error("Failed to fetch projects from API", projectsError);
          }

          try {
            const res = await fetch(`/api/transactions?from_wallet=${walletAddress}`);
            if (res.ok) {
              const txData = await res.json();
              setTransactions(txData);
            }
          } catch (txError) {
            console.error("Failed to fetch transactions from API", txError);
          }
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [connected, publicKey]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <span className="material-symbols-outlined animate-spin text-4xl text-brass-500">
          sync
        </span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-container mx-auto px-6 md:px-margin-desktop py-12 space-y-12">
      {/* Global Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-high ledger-border p-6 hard-shadow">
          <p className="font-mono text-xs text-on-surface-variant mb-2">Total Funded (Escrow)</p>
          <h3 className="text-3xl font-headline font-semibold text-brass-500">${user.total_escrowed || '0.00'}</h3>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span className="font-mono text-xs uppercase">Locked in Smart Contracts</span>
          </div>
        </div>

        <div className="bg-surface-container-high ledger-border p-6 hard-shadow">
          <p className="font-mono text-xs text-on-surface-variant mb-2">Total Released</p>
          <h3 className="text-3xl font-headline font-semibold text-on-surface">${user.total_earned || '0.00'}</h3>
          <div className="mt-4 flex items-center gap-2 text-verified-600">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span className="font-mono text-xs uppercase">Notarized on Solana Ledger</span>
          </div>
        </div>

        <div className="bg-surface-container-high ledger-border p-6 hard-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 translate-x-8 -translate-y-8">
            <span className="material-symbols-outlined text-[120px]">verified_user</span>
          </div>
          <p className="font-mono text-xs text-on-surface-variant mb-2">Vault Security Status</p>
          <h3 className="text-3xl font-headline font-semibold text-on-surface">Protected</h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brass-500 animate-pulse" />
            <span className="font-mono text-xs uppercase text-brass-500">Multisig Enabled</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Active Contracts */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-headline font-semibold text-on-surface">Active Contracts Initiated</h4>
            <span className="font-mono text-xs text-on-surface-variant uppercase bg-surface-container px-3 py-1 border border-outline-variant">
              Total: {activeContracts.length < 10 ? `0${activeContracts.length}` : activeContracts.length}
            </span>
          </div>

          {activeContracts.length > 0 ? (
            activeContracts.map((contract) => (
              <div key={contract.id} className="bg-surface-container-low border-l-4 border-brass-500 p-8 ledger-border-active relative group hover:bg-surface-container transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h5 className="text-lg font-headline font-semibold text-on-surface">{contract.title}</h5>
                    <p className="font-mono text-xs text-on-surface-variant mt-1">
                      CONTRACT-ID: {contract.id.substring(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-brass-500 text-lg">${contract.total_value.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-outline-variant/30">
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-500 rounded-full" />
                      <span className="font-mono text-xs uppercase">{contract.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant mb-1">PDA Escrow</p>
                    <p className="font-mono text-xs uppercase text-on-surface-variant">
                      {contract.escrow_pda ? `${contract.escrow_pda.substring(0, 6)}...${contract.escrow_pda.slice(-4)}` : 'PENDING'}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant mb-1">Counterparty (Freelancer)</p>
                    <p className="font-mono text-xs uppercase">{contract.users?.display_name || 'Unassigned'}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href={`/contracts/${contract.id}`} className="bg-brass-500 text-ink-900 px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-brass-400 transition-colors">
                    View Room
                  </Link>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-12 text-center">
              <div className="max-w-xs mx-auto">
                <span className="material-symbols-outlined text-outline-variant text-4xl mb-4">history_edu</span>
                <h5 className="text-lg font-headline font-semibold text-on-surface-variant mb-2">
                  No Active Pipeline
                </h5>
                <p className="text-sm text-on-surface-variant mb-6">
                  You have not initiated any contracts or all your contracts have been finalized.
                </p>
                <button onClick={() => router.push('/dashboard/company/projects/new')} className="border border-outline-variant text-on-surface-variant px-8 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:border-brass-500 hover:text-brass-500 transition-all">
                  Initialize Contract
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Profile & Reputation */}
        <div className="lg:col-span-4 space-y-8">
          <h4 className="text-xl font-headline font-semibold text-on-surface">Company Identity</h4>

          {/* Identity Information */}
          <div className="bg-surface-container-high ledger-border p-8 space-y-6 relative">
            <div>
              <h5 className="text-2xl font-headline font-bold text-brass-500 mb-2">{user.display_name || 'Anonymous Organization'}</h5>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="font-mono text-[10px] bg-brass-500/10 text-brass-500 px-2 py-1 uppercase tracking-widest border border-brass-500/20">
                  {user.domain || 'Industry Not Set'}
                </span>
                <span className="font-mono text-[10px] bg-surface-container text-on-surface-variant px-2 py-1 uppercase tracking-widest border border-outline-variant">
                  {user.experience || 'Size Not Set'}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
                {user.bio || 'No overview provided yet. Update your organization registry to ensure maximum transparency on the ledger.'}
              </p>
            </div>
          </div>

          <div className="bg-surface-container-high ledger-border p-8 space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: 'radial-gradient(#fff 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }} />

            <div className="relative z-10">
              <p className="font-mono text-[10px] text-on-surface-variant mb-4 uppercase">Company Performance</p>

              <div className="space-y-6">
                {/* Projects Created */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-mono text-xs text-on-surface">Projects Managed</span>
                    <span className="font-mono text-brass-500">{user.projects_completed}</span>
                  </div>
                  <div className="h-1 bg-ink-900 w-full">
                    <div className="h-full bg-brass-500 w-[100%]" />
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Total contracts deployed.</p>
                </div>

                {/* Dispute Rate */}
                <div className="pb-4 border-b border-outline-variant/30">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-mono text-xs text-on-surface">Disputes Won</span>
                    <span className="font-mono text-verified-600">{user.disputes_won}</span>
                  </div>
                  <div className="h-1 bg-ink-900 w-full">
                    <div className="h-full bg-verified-600 w-[100%]" />
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1">AI arbitration rulings in your favor.</p>
                </div>
              </div>

              {/* Wax Seal Badge */}
              <div className="pt-6 flex justify-center">
                <div className="relative">
                  <WaxSealAnimated />
                  <div className="absolute -bottom-2 -right-2 bg-on-surface text-surface-dim font-mono text-[8px] px-2 py-0.5 rounded-full border border-surface-dim">
                    LVL. {user.reputation_score}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Network Announcements */}
          <div className="bg-brass-500/10 border border-brass-500/20 p-6">
            <h5 className="font-mono text-brass-500 text-[10px] mb-4 uppercase tracking-widest">
              Network Announcements
            </h5>
            <ul className="space-y-4">
              {announcements.map((ann, i) => (
                <li key={i} className="flex gap-3">
                  <span className="material-symbols-outlined text-brass-500 text-sm">{ann.icon}</span>
                  <p className="text-xs text-on-surface-variant italic">{ann.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Transaction Archive */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h4 className="text-xl font-headline font-semibold text-on-surface">Payment Archive</h4>
          <div className="h-px flex-1 bg-outline-variant/30" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-surface-container-low ledger-border">
            <thead>
              <tr className="border-b-2 border-outline-variant">
                <th className="p-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Date</th>
                <th className="p-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Value</th>
                <th className="p-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Status</th>
                <th className="p-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Hash</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {transactions.length > 0 ? (
                transactions.map((tx, i) => (
                  <tr
                    key={tx.id}
                    className={cn(
                      "border-b border-outline-variant/30 hover:bg-surface-container transition-colors",
                      i % 2 === 1 && "bg-surface-container/20"
                    )}
                  >
                    <td className="p-4 text-on-surface">{new Date(tx.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-brass-500">${tx.amount.toLocaleString()}</td>
                    <td className="p-4"><span className="text-brass-500">{tx.type || 'PAID'}</span></td>
                    <td className="p-4 text-on-surface-variant">{tx.tx_signature?.substring(0, 10)}...</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                    No transactions recorded on ledger for this identity.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
