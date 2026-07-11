'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ReputationLedgerPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-dim pt-12 pb-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Profile Card */}
            <div className="bg-surface border border-outline-variant p-8 relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-6 -top-6 text-[150px] text-surface-container-highest opacity-50 pointer-events-none select-none">
                verified_user
              </span>
              
              <div className="relative z-10">
                <div className="w-24 h-24 mb-6 border-2 border-brass-500 rounded p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" 
                    alt="Alex Thorne" 
                    className="w-full h-full object-cover grayscale opacity-90"
                  />
                </div>
                
                <h1 className="text-3xl font-headline font-bold text-on-surface mb-1">Alex Thorne</h1>
                <p className="font-mono text-[10px] text-brass-500 uppercase tracking-widest mb-6 font-bold">
                  NODE_ID: 0x82f...4E21
                </p>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 border border-brass-500 text-brass-500 px-3 py-1.5 bg-brass-500/10">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Verified Node</span>
                  </div>
                  <div className="flex items-center gap-2 border border-outline-variant bg-surface-container px-3 py-1.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest">Fast Payer</span>
                  </div>
                  <div className="flex items-center gap-2 border border-outline-variant bg-surface-container px-3 py-1.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">emoji_events</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest">Milestone Master</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Score Card */}
            <div className="bg-surface border border-outline-variant p-8 text-center">
              <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-6">
                Aggregate Trust Score
              </h3>
              
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#2c3b49" strokeWidth="6" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#B8863B" strokeWidth="6" strokeDasharray="283" strokeDashoffset="2.83" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-headline font-bold text-on-surface">99</span>
                      <span className="text-xl font-headline font-bold text-brass-500">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm font-body text-on-surface-variant px-4">
                Exceptional reliability rating based on on-chain verification.
              </p>
            </div>

            {/* Quick Stats list */}
            <div className="space-y-4">
              <div className="bg-surface border border-outline-variant p-6 flex justify-between items-center">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Projects Completed</span>
                <span className="text-2xl font-headline font-bold text-on-surface">42</span>
              </div>
              <div className="bg-surface border border-outline-variant p-6 flex justify-between items-center">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Avg Delivery Time</span>
                <span className="text-2xl font-headline font-bold text-on-surface">2.1d</span>
              </div>
              <div className="bg-surface border border-outline-variant p-6 flex justify-between items-center">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Dispute Frequency</span>
                <span className="text-2xl font-headline font-bold text-on-surface">0.1%</span>
              </div>
            </div>

          </div>

          {/* Right Column - Ledger */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-end mb-8 border-b border-outline-variant/50 pb-4">
              <div>
                <h2 className="text-2xl font-headline font-semibold text-on-surface mb-1">Public Reputation Ledger</h2>
                <p className="text-sm font-body text-on-surface-variant">Immutable record of professional history notarized on Solana.</p>
              </div>
              <button className="text-brass-500 hover:text-brass-400 font-mono text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                Export PDF
              </button>
            </div>

            {/* Table */}
            <div className="bg-surface border border-outline-variant mb-8">
              <div className="grid grid-cols-12 gap-4 p-5 border-b border-outline-variant/50 font-mono text-[10px] text-outline-variant uppercase tracking-widest">
                <div className="col-span-2">Date</div>
                <div className="col-span-6">Transaction / Project</div>
                <div className="col-span-2">Volume</div>
                <div className="col-span-2 text-right">Status</div>
              </div>

              <div className="divide-y divide-outline-variant/30">
                {/* Row 1 */}
                <div className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-surface-container-low transition-colors">
                  <div className="col-span-2 font-mono text-sm text-outline-variant">2024-05-12</div>
                  <div className="col-span-6">
                    <div className="font-mono text-sm text-on-surface font-bold mb-1">Smart Contract Audit: Nexus DeFi</div>
                    <div className="font-mono text-[9px] text-outline-variant tracking-widest uppercase">Counterparty: Nebula Ventures</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-mono text-sm text-on-surface">12,500</div>
                    <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">USDC</div>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-3">
                    <div className="w-8 h-8 rounded-full bg-brass-500 flex items-center justify-center text-ink-900">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <span className="font-mono text-[9px] text-brass-500 uppercase tracking-widest font-bold">Released</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-surface-container-low transition-colors">
                  <div className="col-span-2 font-mono text-sm text-outline-variant">2024-04-28</div>
                  <div className="col-span-6">
                    <div className="font-mono text-sm text-on-surface font-bold mb-1">Cross-Chain Bridge Security Refactor</div>
                    <div className="font-mono text-[9px] text-outline-variant tracking-widest uppercase">Counterparty: Prism protocol</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-mono text-sm text-on-surface">8,000</div>
                    <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">USDC</div>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-3">
                    <div className="w-8 h-8 rounded-full bg-brass-500 flex items-center justify-center text-ink-900">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <span className="font-mono text-[9px] text-brass-500 uppercase tracking-widest font-bold">Released</span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-surface-container-low transition-colors">
                  <div className="col-span-2 font-mono text-sm text-outline-variant">2024-03-15</div>
                  <div className="col-span-6">
                    <div className="font-mono text-sm text-on-surface font-bold mb-1">Zero-Knowledge Proof Implementation</div>
                    <div className="font-mono text-[9px] text-outline-variant tracking-widest uppercase">Counterparty: Stealth Research Lab</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-mono text-sm text-on-surface">25,000</div>
                    <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">USDC</div>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-3">
                    <div className="w-8 h-8 rounded-full bg-brass-500 flex items-center justify-center text-ink-900">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <span className="font-mono text-[9px] text-brass-500 uppercase tracking-widest font-bold">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Trust Maintenance */}
              <div className="bg-surface border border-outline-variant p-8 border-l-4 border-l-brass-500">
                <h3 className="text-xl font-headline font-bold text-on-surface mb-8">Trust Maintenance</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-mono text-[10px] text-on-surface uppercase tracking-widest">Identity Verification</span>
                      <span className="font-mono text-xs text-brass-500">Tier 3 Complete</span>
                    </div>
                    <div className="w-full bg-surface-container h-1">
                      <div className="h-full bg-brass-500 w-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-mono text-[10px] text-on-surface uppercase tracking-widest">Stake Commitment</span>
                      <span className="font-mono text-xs text-brass-500">500 SOL Staked</span>
                    </div>
                    <div className="w-full bg-surface-container h-1">
                      <div className="h-full bg-brass-500 w-[60%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-mono text-[10px] text-on-surface uppercase tracking-widest">Community Endorsements</span>
                      <span className="font-mono text-xs text-brass-500">12 Active</span>
                    </div>
                    <div className="w-full bg-surface-container h-1">
                      <div className="h-full bg-brass-500 w-[40%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Endorsement */}
              <div className="bg-surface border border-outline-variant p-8 relative overflow-hidden flex flex-col justify-between">
                <span className="font-headline text-[150px] text-surface-container-highest absolute -bottom-10 -right-4 font-bold opacity-30 leading-none">99</span>
                
                <h3 className="text-xl font-headline font-bold text-on-surface mb-6 relative z-10">Latest Endorsement</h3>
                
                <p className="text-on-surface-variant font-headline italic text-lg leading-relaxed mb-8 relative z-10">
                  "One of the most precise security auditors we've worked with. Delivered 2 days early with no critical errors found in subsequent third-party reviews."
                </p>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 border border-outline-variant p-0.5 rounded-sm">
                    <div className="w-full h-full bg-surface-container flex items-center justify-center text-brass-500 font-bold font-headline">N</div>
                  </div>
                  <div>
                    <div className="font-mono text-sm text-on-surface">Sarah Chen</div>
                    <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">CTO, Nebula Ventures</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
