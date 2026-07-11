'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

export default function EscalatedCaseReviewPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      {/* Custom Top Header */}
      <header className="h-20 bg-surface border-b border-outline-variant/30 flex items-center justify-between px-margin-mobile md:px-margin-desktop w-full sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <Link href="/admin" className="text-2xl font-headline font-bold text-brass-500 tracking-wider hover:opacity-80 transition-opacity">
            Escalated Case Review
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brass-500"></div>
            <span className="font-mono text-[10px] text-outline-variant uppercase tracking-widest">
              Case ID: <span className="text-on-surface">#SOL-8829-QX</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col items-end">
            <span className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Latest Block</span>
            <span className="font-mono text-sm text-brass-500 font-bold tracking-wider">284,102,991</span>
          </div>
          <button className="bg-transparent border border-brass-500 text-brass-500 hover:bg-brass-500 hover:text-ink-900 px-6 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors font-bold">
            Connect Wallet
          </button>
        </div>
      </header>

      <div className="flex w-full flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-surface border-r border-outline-variant/30 flex flex-col pt-8">
          <div className="px-6 mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded-sm">
              <span className="material-symbols-outlined text-brass-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                admin_panel_settings
              </span>
            </div>
            <div>
              <div className="font-headline text-lg font-bold text-brass-500">System Admin</div>
              <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">Network Authority</div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 flex-grow">
            <Link href="/admin" className="flex items-center gap-4 bg-brass-500/10 border-l-2 border-brass-500 px-6 py-3 text-brass-500">
              <span className="material-symbols-outlined text-sm">view_list</span>
              <span className="font-mono text-xs tracking-widest">Global Queue</span>
            </Link>
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">group</span>
              <span className="font-mono text-xs tracking-widest">User Directory</span>
            </div>
            <Link href="/admin/revenue" className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
              <span className="font-mono text-xs tracking-widest">Revenue</span>
            </Link>
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant relative">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span className="font-mono text-xs tracking-widest">System Alerts</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-surface-dim p-10">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column - Analytics & Logs */}
            <div className="lg:col-span-4 space-y-6">
              {/* AI Judge Analytics */}
              <div className="bg-surface border border-outline-variant p-8">
                <div className="flex items-center gap-2 mb-8">
                  <span className="material-symbols-outlined text-outline-variant text-sm">psychology</span>
                  <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">AI Judge Analytics</h3>
                </div>

                <div className="flex justify-center mb-10">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <div className="absolute inset-0 border-[12px] border-surface-container rounded-sm"></div>
                    <div className="absolute inset-0 border-[12px] border-brass-500 rounded-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 88%)' }}></div>
                    
                    <div className="text-center relative z-10">
                      <div className="text-5xl font-headline font-bold text-brass-500 mb-1">88%</div>
                      <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">Confidence</div>
                    </div>

                    <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-brass-500 flex items-center justify-center rounded-sm shadow-lg transform rotate-12">
                      <span className="material-symbols-outlined text-ink-900 text-2xl">gavel</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Primary Conflict</span>
                    <span className="font-mono text-sm text-on-surface">Scope Creep</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Contract Type</span>
                    <span className="font-mono text-sm text-on-surface">Milestone-Based</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Total Value</span>
                    <span className="font-mono text-sm font-bold text-brass-500">12.50 SOL</span>
                  </div>
                </div>
              </div>

              {/* Archive Log */}
              <div className="bg-surface border border-outline-variant p-6">
                <h3 className="font-mono text-[10px] text-on-surface font-bold uppercase tracking-widest mb-6">Archive Log</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between border border-outline-variant bg-surface-container p-4 hover:border-outline transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-outline-variant text-lg">attachment</span>
                      <div>
                        <div className="font-mono text-xs text-on-surface mb-0.5">technical_spec_v2.pdf</div>
                        <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Signed by both: 12 Oct</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-brass-500 hover:text-brass-400">download</span>
                  </div>

                  <div className="flex items-center justify-between border border-outline-variant bg-surface-container p-4 hover:border-outline transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-outline-variant text-lg">code</span>
                      <div>
                        <div className="font-mono text-xs text-on-surface mb-0.5">github_commit_hash...</div>
                        <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Verified by AI Agent</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-brass-500 hover:text-brass-400">link</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Assessment & Adjudication */}
            <div className="lg:col-span-8">
              
              {/* Assessment Section */}
              <div className="mb-12 relative">
                <div className="absolute top-0 right-0 border border-dispute-600 px-3 py-1 bg-dispute-600/10">
                  <span className="font-mono text-[9px] text-dispute-600 font-bold uppercase tracking-widest">Urgent Review</span>
                </div>
                
                <h1 className="text-4xl font-headline font-bold text-on-surface mb-2 max-w-lg leading-tight">
                  Automated Legal Assessment
                </h1>
                <p className="font-mono text-xs text-on-surface-variant mb-10">
                  Generated by Neural Ledger Model 4.0 (Notarized)
                </p>

                <div className="relative pl-6 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-brass-500 mb-10">
                  <h3 className="font-mono text-[10px] text-brass-500 font-bold uppercase tracking-widest mb-3">
                    The Dispute Summary
                  </h3>
                  <p className="text-sm font-body text-on-surface leading-relaxed">
                    Freelancer alleges Milestone 4 completion. Client disputes the logic implementation in the smart contract layer, citing a mismatch with the architectural blueprint. AI analysis of the Git repository confirms 94% of functions match the blueprint, but edge-case handling is absent.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-surface-container border border-outline-variant p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brass-500/50 to-transparent"></div>
                    <h4 className="font-mono text-[9px] text-outline-variant uppercase tracking-widest mb-3">Freelancer Defense</h4>
                    <p className="text-sm font-headline italic text-on-surface">
                      "The architecture was revised in a chat thread on Oct 14th which the client acknowledged via emoji."
                    </p>
                  </div>
                  <div className="bg-surface-container border border-outline-variant p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dispute-600/50 to-transparent"></div>
                    <h4 className="font-mono text-[9px] text-outline-variant uppercase tracking-widest mb-3">Client Objection</h4>
                    <p className="text-sm font-headline italic text-on-surface">
                      "The revision was for the UI elements, not the core protocol logic. This break is critical."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] text-brass-500 font-bold uppercase tracking-widest mb-3">
                    AI Recommendation
                  </h3>
                  <p className="text-sm font-body text-on-surface leading-relaxed">
                    The AI suggests a <span className="text-brass-500 font-bold">70/30 split</span> in favor of the Freelancer. While the core logic differs from the spec, the client's ambiguous feedback in un-notarized communication channels contributed to the development drift.
                  </p>
                </div>
              </div>

              {/* Final Adjudication Block */}
              <div className="bg-surface border border-outline-variant p-8">
                <h3 className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-8 text-center">
                  Final Adjudication
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  <button className="bg-surface-container border border-outline-variant hover:border-brass-500 p-6 flex flex-col items-center justify-center text-center transition-colors group">
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-brass-500 text-3xl mb-4 transition-colors">person</span>
                    <span className="font-mono text-xs text-on-surface mb-1">Rule for Freelancer</span>
                    <span className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">100% Payout</span>
                  </button>
                  <button className="bg-surface-container border border-outline-variant hover:border-brass-500 p-6 flex flex-col items-center justify-center text-center transition-colors group">
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-brass-500 text-3xl mb-4 transition-colors">cases</span>
                    <span className="font-mono text-xs text-on-surface mb-1">Rule for Company</span>
                    <span className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">100% Refund</span>
                  </button>
                  <button className="bg-surface-dim border border-brass-500 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-[0_0_15px_rgba(184,134,59,0.1)]">
                    <span className="material-symbols-outlined text-brass-500 text-3xl mb-4">balance</span>
                    <span className="font-mono text-xs text-brass-500 font-bold mb-1">Split Payment</span>
                    <span className="font-mono text-[9px] text-brass-500 uppercase tracking-widest">Custom Distribution</span>
                  </button>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Digital Signature Authorization</span>
                    <span className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Verified: ADMIN_772</span>
                  </div>
                  
                  {/* Signature Canvas Placeholder */}
                  <div className="w-full h-32 bg-surface-dim border border-outline-variant/50 mb-6 flex items-center justify-center cursor-crosshair">
                    <span className="font-mono text-sm text-outline-variant/30 select-none">Draw Signature Here</span>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-surface-container border border-outline-variant hover:border-outline text-on-surface-variant py-4 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors">
                      Clear
                    </button>
                    <button className="flex-[2] bg-brass-500 hover:bg-brass-400 text-ink-900 py-4 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors shadow-hard">
                      Finalize & Broadcast To Ledger
                    </button>
                  </div>
                  <p className="font-mono text-[9px] text-outline-variant uppercase text-center mt-6">
                    By clicking finalize, you notarize this decision on the Solana mainnet.<br/>Action is irreversible.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
