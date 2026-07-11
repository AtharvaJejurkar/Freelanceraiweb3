'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header />

      <div className="flex w-full flex-grow border-t border-outline-variant/30">
        {/* Sidebar */}
        <aside className="w-64 bg-surface border-r border-outline-variant/30 flex flex-col pt-8">
          <div className="px-6 mb-8">
            <h2 className="font-mono text-xs text-brass-500 uppercase tracking-widest mb-1">EscrowAI</h2>
            <p className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Internal Audit System</p>
          </div>

          <div className="px-6 mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded-sm">
              <span className="material-symbols-outlined text-brass-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance
              </span>
            </div>
            <div>
              <div className="font-headline text-lg font-bold text-brass-500">System Admin</div>
              <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">Network Authority</div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 flex-grow">
            <div className="flex items-center gap-4 bg-brass-500/10 border-l-2 border-brass-500 px-6 py-3 text-brass-500">
              <span className="material-symbols-outlined text-sm">view_list</span>
              <span className="font-mono text-xs tracking-widest">Global Queue</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">group</span>
              <span className="font-mono text-xs tracking-widest">User Directory</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
              <span className="font-mono text-xs tracking-widest">Revenue</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant relative">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span className="font-mono text-xs tracking-widest">System Alerts</span>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-dispute-600"></div>
            </div>
          </nav>

          <div className="px-6 mt-auto pb-8">
            <button className="w-full bg-brass-500/20 text-brass-500 hover:bg-brass-500 hover:text-ink-900 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors font-bold">
              New System Alert
            </button>
            <div className="mt-12 space-y-4 text-on-surface-variant">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-sm">description</span>
                Documentation
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-sm">help</span>
                Support
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-surface-dim">
          {/* Top Header Row */}
          <div className="flex items-center justify-between border-b border-outline-variant/30 px-10 py-6">
            <h1 className="text-3xl font-headline font-bold text-brass-500 tracking-wider">
              HUMAN INTERVENTION<br />TEAM
            </h1>
            <div className="flex items-center bg-surface-container border border-outline-variant">
              <div className="px-4 py-2 border-r border-outline-variant font-mono text-[10px] text-outline-variant tracking-widest uppercase">
                Admin Node:
              </div>
              <div className="px-4 py-2 font-mono text-xs text-on-surface">
                0x4A...3F73
              </div>
            </div>
          </div>

          <div className="p-10 max-w-[1200px]">
            {/* Alert Banner */}
            <div className="bg-dispute-600/10 border border-dispute-600/30 p-6 flex items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-dispute-600 mt-1 md:mt-0">warning</span>
                <p className="text-sm font-mono text-dispute-600 leading-relaxed">
                  3 disputes have been awaiting human review for over 24 hours. Action required to maintain trust scores.
                </p>
              </div>
              <button className="font-mono text-[10px] text-dispute-600 uppercase tracking-widest hover:underline whitespace-nowrap">
                Focus Queue
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Platform Escrow */}
              <div className="bg-surface border border-outline-variant p-6 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Platform Escrow</h3>
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">account_balance</span>
                </div>
                <div className="text-4xl font-headline font-bold text-brass-500 mb-2">$12,490,201.00</div>
                <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Verified on Solana Chain</div>
              </div>

              {/* Active Projects */}
              <div className="bg-surface border border-outline-variant p-6 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Active Projects</h3>
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">inventory_2</span>
                </div>
                <div className="text-4xl font-headline font-bold text-on-surface mb-2">1,248</div>
                <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">+12% From Last Cycle</div>
              </div>

              {/* Human Escalations */}
              <div className="bg-surface border border-brass-500 p-6 relative overflow-hidden shadow-[0_0_15px_rgba(184,134,59,0.1)]">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-mono text-[10px] text-brass-500 uppercase tracking-widest font-bold">Human Escalations</h3>
                  <span className="material-symbols-outlined text-brass-500 text-lg">person_alert</span>
                </div>
                <div className="text-4xl font-headline font-bold text-on-surface mb-2">3</div>
                <div className="font-mono text-[9px] text-brass-500 uppercase tracking-widest font-bold">Critical Response Required</div>
              </div>
            </div>

            {/* Queue Table Section */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-headline font-semibold text-on-surface mb-1">Escalated Disputes Queue</h2>
                  <p className="text-sm font-body text-on-surface-variant">Manual arbitration required for automated protocol failures.</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">filter_list</span>
                  </button>
                  <button className="w-10 h-10 bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">refresh</span>
                  </button>
                </div>
              </div>

              <div className="bg-surface border border-outline-variant">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/50 font-mono text-[10px] text-outline-variant uppercase tracking-widest">
                  <div className="col-span-2">Case ID</div>
                  <div className="col-span-5">Project</div>
                  <div className="col-span-2 text-center">Time Waiting</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-outline-variant/30">
                  {/* Row 1 */}
                  <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-container-low transition-colors">
                    <div className="col-span-2 font-mono text-sm text-brass-500">#ESC-882-901</div>
                    <div className="col-span-5">
                      <div className="font-mono text-sm text-on-surface mb-1">Layer 2 DEX UI Overhaul</div>
                      <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Client: Velox Labs</div>
                    </div>
                    <div className="col-span-2 text-center font-mono text-sm text-dispute-600">26h 12m</div>
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brass-500"></div>
                      <span className="font-mono text-[10px] text-brass-500 uppercase tracking-widest font-bold">Awaiting Human</span>
                    </div>
                    <div className="col-span-1 text-right">
                      <Link href="/admin/disputes/882-901" className="inline-block border border-outline-variant text-on-surface hover:border-brass-500 hover:text-brass-500 px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors">
                        Review Case
                      </Link>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-container-low transition-colors">
                    <div className="col-span-2 font-mono text-sm text-brass-500">#ESC-901-443</div>
                    <div className="col-span-5">
                      <div className="font-mono text-sm text-on-surface mb-1">Solana Smart Contract Audit</div>
                      <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Client: DeFi Forge</div>
                    </div>
                    <div className="col-span-2 text-center font-mono text-sm text-on-surface-variant">25h 08m</div>
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brass-500"></div>
                      <span className="font-mono text-[10px] text-brass-500 uppercase tracking-widest font-bold">Awaiting Human</span>
                    </div>
                    <div className="col-span-1 text-right">
                      <Link href="/admin/disputes/901-443" className="inline-block border border-outline-variant text-on-surface hover:border-brass-500 hover:text-brass-500 px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors">
                        Review Case
                      </Link>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-container-low transition-colors">
                    <div className="col-span-2 font-mono text-sm text-brass-500">#ESC-772-109</div>
                    <div className="col-span-5">
                      <div className="font-mono text-sm text-on-surface mb-1">Global Asset Liquidity Protocol</div>
                      <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Client: Apex Capital</div>
                    </div>
                    <div className="col-span-2 text-center font-mono text-sm text-on-surface-variant">24h 55m</div>
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brass-500"></div>
                      <span className="font-mono text-[10px] text-brass-500 uppercase tracking-widest font-bold">Awaiting Human</span>
                    </div>
                    <div className="col-span-1 text-right">
                      <Link href="/admin/disputes/772-109" className="inline-block border border-outline-variant text-on-surface hover:border-brass-500 hover:text-brass-500 px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors">
                        Review Case
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background design elements */}
            <div className="mt-20 border border-outline-variant border-dashed p-12 flex items-center justify-end opacity-20">
              <div className="w-16 h-16 border-2 border-brass-500 rounded flex items-center justify-center rotate-12">
                 <span className="material-symbols-outlined text-3xl text-brass-500">verified</span>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
