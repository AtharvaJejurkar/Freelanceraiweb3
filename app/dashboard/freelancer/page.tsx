'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WaxSealAnimated } from '@/components/ui/wax-seal';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Projects', href: '/dashboard/freelancer', icon: 'dashboard', active: true },
  { label: 'Contracts', href: '/dashboard/freelancer/contracts', icon: 'contract' },
  { label: 'Earnings', href: '/dashboard/freelancer/earnings', icon: 'payments' },
  { label: 'Profile', href: '/dashboard/freelancer/profile', icon: 'person' },
];

const activeContract = {
  id: 'ESC-9921-2024X',
  title: 'L1 Protocol Integration: Phase 2',
  value: 1200,
  milestone: '2/4',
  status: 'Funds Secured',
  dueDate: 'OCT 24, 2024',
  counterparty: 'Nexus Labs (Verified)',
};

const transactions = [
  { date: '2024-10-12', counterparty: 'Ether-Flow Org', value: 4500, status: 'RELEASED', hash: '0x7a...4d2' },
  { date: '2024-10-01', counterparty: 'Solaris Venture', value: 12000, status: 'RELEASED', hash: '0x3f...1b9' },
  { date: '2024-09-24', counterparty: 'Decentral Art', value: 850, status: 'RELEASED', hash: '0x9c...a21' },
];

const announcements = [
  { icon: 'record_voice_over', text: '"New compliance standards for AI data labeling contracts are now in effect."' },
  { icon: 'trending_up', text: 'Protocol fee reduced by 0.1% for high-reputation nodes.' },
];

export default function FreelancerDashboard() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col h-screen py-6 bg-surface-container-low border-r border-outline-variant w-64 shrink-0 overflow-y-auto">
        <div className="px-6 mb-8">
          <h1 className="text-xl font-headline font-bold text-brass-500">EscrowAI</h1>
          <p className="font-mono text-[10px] text-on-surface-variant tracking-widest mt-1">
            SECURE LEDGER V.1.04
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-transform duration-200",
                item.active
                  ? "text-brass-500 bg-brass-500/10 border-l-4 border-brass-500 translate-x-1"
                  : "text-on-surface-variant hover:bg-surface-container"
              )}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-mono text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-4 space-y-1 pt-6 border-t border-outline-variant">
          <Link href="#" className="flex items-center gap-3 text-on-surface-variant px-4 py-2 text-sm hover:text-brass-500 transition-colors">
            <span className="material-symbols-outlined text-sm">description</span>
            <span className="font-mono text-xs">Documentation</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 text-on-surface-variant px-4 py-2 text-sm hover:text-brass-500 transition-colors">
            <span className="material-symbols-outlined text-sm">help</span>
            <span className="font-mono text-xs">Support</span>
          </Link>

          <div className="px-4 py-4 mt-4 bg-surface-container-highest border border-outline-variant">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brass-500 flex items-center justify-center text-ink-900 font-bold text-sm">
                JD
              </div>
              <div>
                <p className="font-mono text-xs text-on-surface">Jane Developer</p>
                <p className="text-[10px] text-on-surface-variant">Freelancer</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-surface-dim">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full bg-surface/80 backdrop-blur-md border-b border-outline-variant">
          <div className="max-w-container mx-auto px-6 md:px-margin-desktop h-20 flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-2xl font-headline font-semibold text-brass-500">Freelancer Dashboard</h2>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-tighter">
                Verified Node: 0x82...f92
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex flex-col items-end">
                <span className="font-mono text-xs text-on-surface-variant">Reputation Score</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-brass-500 font-bold text-lg">100%</span>
                  <span className="px-2 py-0.5 bg-brass-500/10 text-brass-500 border border-brass-500/30 text-[10px] font-bold uppercase">
                    Fast Payer
                  </span>
                </div>
              </div>
              <button className="bg-brass-500 text-ink-900 px-6 py-2 font-mono text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity hard-shadow">
                Connect Wallet
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="max-w-container mx-auto px-6 md:px-margin-desktop py-12 space-y-12">
          {/* Global Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-high ledger-border p-6 hard-shadow">
              <p className="font-mono text-xs text-on-surface-variant mb-2">Earnings in Escrow</p>
              <h3 className="text-3xl font-headline font-semibold text-brass-500">$1,200.00</h3>
              <div className="mt-4 flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="font-mono text-xs uppercase">Pending Smart-Contract Release</span>
              </div>
            </div>

            <div className="bg-surface-container-high ledger-border p-6 hard-shadow">
              <p className="font-mono text-xs text-on-surface-variant mb-2">Total Released</p>
              <h3 className="text-3xl font-headline font-semibold text-on-surface">$54,000.00</h3>
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
                <h4 className="text-xl font-headline font-semibold text-on-surface">Active Contracts</h4>
                <span className="font-mono text-xs text-on-surface-variant uppercase bg-surface-container px-3 py-1 border border-outline-variant">
                  Total: 01
                </span>
              </div>

              {/* Contract Card */}
              <div className="bg-surface-container-low border-l-4 border-brass-500 p-8 ledger-border-active relative group hover:bg-surface-container transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h5 className="text-lg font-headline font-semibold text-on-surface">{activeContract.title}</h5>
                    <p className="font-mono text-xs text-on-surface-variant mt-1">
                      CONTRACT-ID: {activeContract.id}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-brass-500 text-lg">${activeContract.value.toLocaleString()}.00</span>
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase">
                      Milestone {activeContract.milestone}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-outline-variant/30">
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-500 rounded-full" />
                      <span className="font-mono text-xs uppercase">{activeContract.status}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant mb-1">Due Date</p>
                    <p className="font-mono text-xs uppercase">{activeContract.dueDate}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant mb-1">Counterparty</p>
                    <p className="font-mono text-xs uppercase">{activeContract.counterparty}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button className="bg-brass-500 text-ink-900 px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-brass-400 transition-colors">
                    Submit Milestone
                  </button>
                  <button className="border border-outline text-on-surface px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-colors">
                    View Ledger
                  </button>
                </div>
              </div>

              {/* Empty State */}
              <div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-12 text-center">
                <div className="max-w-xs mx-auto">
                  <span className="material-symbols-outlined text-outline-variant text-4xl mb-4">history_edu</span>
                  <h5 className="text-lg font-headline font-semibold text-on-surface-variant mb-2">
                    No Active Pipeline
                  </h5>
                  <p className="text-sm text-on-surface-variant mb-6">
                    The contract ledger is currently synchronized but contains no pending active agreements for your identifier.
                  </p>
                  <button className="border border-outline-variant text-on-surface-variant px-8 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:border-brass-500 hover:text-brass-500 transition-all">
                    Search Available Requests
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Reputation */}
            <div className="lg:col-span-4 space-y-8">
              <h4 className="text-xl font-headline font-semibold text-on-surface">Reputation Metrics</h4>

              <div className="bg-surface-container-high ledger-border p-8 space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(#fff 1px, transparent 0)',
                  backgroundSize: '20px 20px'
                }} />

                <div className="relative z-10">
                  <p className="font-mono text-[10px] text-on-surface-variant mb-4 uppercase">Node Performance Data</p>

                  <div className="space-y-6">
                    {/* Delivery Time */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-mono text-xs text-on-surface">Delivery Time</span>
                        <span className="font-mono text-brass-500">2.1 Days</span>
                      </div>
                      <div className="h-1 bg-ink-900 w-full">
                        <div className="h-full bg-brass-500 w-[85%]" />
                      </div>
                      <p className="text-[10px] text-on-surface-variant mt-1">Top 5% in Network speed.</p>
                    </div>

                    {/* Satisfaction */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-mono text-xs text-on-surface">Satisfaction</span>
                        <span className="font-mono text-brass-500">4.9/5</span>
                      </div>
                      <div className="h-1 bg-ink-900 w-full">
                        <div className="h-full bg-brass-500 w-[98%]" />
                      </div>
                      <p className="text-[10px] text-on-surface-variant mt-1">Aggregated from 124 transactions.</p>
                    </div>

                    {/* Dispute Rate */}
                    <div className="pb-4 border-b border-outline-variant/30">
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-mono text-xs text-on-surface">Dispute Rate</span>
                        <span className="font-mono text-dispute-600">0.2%</span>
                      </div>
                      <div className="h-1 bg-ink-900 w-full">
                        <div className="h-full bg-dispute-600 w-[2%]" />
                      </div>
                      <p className="text-[10px] text-on-surface-variant mt-1">Significantly below network average.</p>
                    </div>
                  </div>

                  {/* Wax Seal Badge */}
                  <div className="pt-6 flex justify-center">
                    <div className="relative">
                      <WaxSealAnimated />
                      <div className="absolute -bottom-2 -right-2 bg-on-surface text-surface-dim font-mono text-[8px] px-2 py-0.5 rounded-full border border-surface-dim">
                        LVL. 94
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
              <h4 className="text-xl font-headline font-semibold text-on-surface">Transaction Archive</h4>
              <div className="h-px flex-1 bg-outline-variant/30" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-surface-container-low ledger-border">
                <thead>
                  <tr className="border-b-2 border-outline-variant">
                    <th className="p-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Date</th>
                    <th className="p-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Counterparty</th>
                    <th className="p-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Value</th>
                    <th className="p-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Status</th>
                    <th className="p-4 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Hash</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {transactions.map((tx, i) => (
                    <tr
                      key={i}
                      className={cn(
                        "border-b border-outline-variant/30 hover:bg-surface-container transition-colors",
                        i % 2 === 1 && "bg-surface-container/20"
                      )}
                    >
                      <td className="p-4 text-on-surface">{tx.date}</td>
                      <td className="p-4 text-on-surface">{tx.counterparty}</td>
                      <td className="p-4 text-brass-500">${tx.value.toLocaleString()}.00</td>
                      <td className="p-4"><span className="text-brass-500">{tx.status}</span></td>
                      <td className="p-4 text-on-surface-variant">{tx.hash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-low border-t border-outline-variant flex justify-around items-center px-4 z-50">
          {navItems.map((item) => (
            <button
              key={item.href}
              className={cn(
                "flex flex-col items-center gap-1",
                item.active ? "text-brass-500" : "text-on-surface-variant"
              )}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-[10px] font-mono uppercase">{item.label}</span>
            </button>
          ))}
        </div>

        <Footer />
      </main>
    </div>
  );
}
