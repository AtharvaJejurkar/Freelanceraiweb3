'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

export default function ContractDetailPage() {
  const [githubUrl, setGithubUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [comment, setComment] = useState('');

  return (
    <div className="min-h-screen bg-[#030A14] text-on-surface flex flex-col font-body relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brass-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00F0FF]/10 blur-[150px] pointer-events-none" />

      <Header />

      <main className="flex-grow pt-24 pb-24 px-6 md:px-12 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <p className="font-mono text-[10px] text-brass-500 uppercase mb-2 tracking-widest">
                Contract ID: #SOL-892-ALPHA
              </p>
              <h1 className="text-4xl font-headline font-bold text-on-surface mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Mainnet Protocol Integration
              </h1>
              <p className="text-base text-on-surface-variant font-body">
                Smart contract development and frontend integration for the decentralized credit facility.
              </p>
            </div>

            {/* Milestones List */}
            <div className="space-y-6">
              {/* Milestone 1: Released */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 mt-1 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#051522] border border-[#00F0FF]/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    <span className="material-symbols-outlined text-[#00F0FF] text-sm">check</span>
                  </div>
                </div>
                <div className="flex-grow bg-[#051522]/60 backdrop-blur-md border border-white/5 p-6 rounded-md transition-all hover:border-white/10 hover:bg-[#0a1829]/60">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-mono text-xs text-white font-bold tracking-widest uppercase">
                      01. Architecture Design
                    </h3>
                    <div className="bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider rounded-sm">
                      Released
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4">
                    System architecture documents and UML sequence diagrams.
                  </p>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#00F0FF]/80">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    Verified: 2024-10-12 14:30 UTC
                  </div>
                </div>
              </div>

              {/* Milestone 2: Active (Submitting/Review) */}
              <div className="flex gap-6 relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#00F0FF]/30 to-brass-500/30 -z-10 -translate-y-6 translate-y-6"></div>
                <div className="flex-shrink-0 mt-1 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-brass-500 flex items-center justify-center font-mono text-xs text-ink-900 font-bold shadow-[0_0_20px_rgba(184,134,59,0.4)]">
                    02
                  </div>
                </div>
                <div className="flex-grow border-2 border-brass-500/50 bg-[#051522]/80 backdrop-blur-xl p-6 rounded-md shadow-[0_0_30px_rgba(184,134,59,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brass-500/10 blur-[50px]" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-mono text-xs text-brass-500 font-bold tracking-widest uppercase">
                        02. Core Smart Contracts
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-brass-500/20 text-brass-500 flex items-center justify-center border border-brass-500/50">
                        <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface mb-6">
                      Development of lending pool logic and collateral liquidation modules.
                    </p>
                    
                    <div>
                      <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
                        Deliverable Asset
                      </p>
                      <div className="flex items-center gap-3 border border-white/10 bg-[#0a1829]/50 p-3 rounded-sm">
                        <span className="material-symbols-outlined text-brass-500 text-sm">link</span>
                        <a href="#" className="font-mono text-xs text-on-surface hover:text-brass-500 transition-colors">
                          github.com/org/repo/pull/42
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone 3: Submitted */}
              <div className="flex gap-6 relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10 -z-10 -translate-y-6 translate-y-6"></div>
                <div className="flex-shrink-0 mt-1 relative z-10">
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-[#051522] flex items-center justify-center font-mono text-xs text-white">
                    03
                  </div>
                </div>
                <div className="flex-grow border border-white/10 bg-[#0a1829]/40 backdrop-blur-sm p-6 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-mono text-xs text-white font-bold tracking-widest uppercase">
                      03. Frontend Integration
                    </h3>
                    <div className="bg-[#051522] border border-white/20 px-2 py-0.5 font-mono text-[10px] text-white uppercase tracking-wider rounded-sm">
                      Submitted
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-6">
                    Web3 providers, wallet connection logic, and real-time dashboard UI.
                  </p>
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <button className="flex-1 bg-gradient-to-r from-brass-500 to-brass-400 text-ink-900 py-3 rounded-sm font-mono text-[10px] font-bold tracking-widest uppercase hover:brightness-110 transition-all shadow-[0_0_15px_rgba(184,134,59,0.3)]">
                      Approve & Release
                    </button>
                    <Link href="/disputes/AR-1092-B" className="flex-1 flex justify-center items-center border border-dispute-600/50 text-dispute-600 rounded-sm py-3 font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-dispute-600/10 transition-colors">
                      Raise a Dispute
                    </Link>
                  </div>
                </div>
              </div>

              {/* Milestone 4: Pending/Future */}
              <div className="flex gap-6 relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10 -z-10 -translate-y-6 translate-y-6"></div>
                <div className="flex-shrink-0 mt-1 relative z-10">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-[#051522] flex items-center justify-center font-mono text-xs text-on-surface-variant opacity-50">
                    04
                  </div>
                </div>
                <div className="flex-grow border border-white/5 bg-[#0a1829]/20 p-6 rounded-md opacity-60">
                  <h3 className="font-mono text-xs text-on-surface-variant font-bold tracking-widest uppercase mb-2">
                    04. Security Audit & Remediation
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    Formal verification and fix implementation based on external audit report.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Vault Escrow Balance */}
            <div className="bg-[#051522]/80 backdrop-blur-xl border border-white/10 p-6 rounded-md relative overflow-hidden shadow-2xl">
              <span className="material-symbols-outlined absolute -right-6 -top-6 text-[150px] text-white/5 pointer-events-none select-none">
                lock
              </span>
              
              <div className="relative z-10">
                <h3 className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase mb-4">
                  Vault Escrow Balance
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-headline font-bold text-brass-500">24,500.00</span>
                  <span className="text-lg font-mono text-on-surface-variant ml-2">USDC</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#00F0FF] mb-8 bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-3 py-2 rounded-sm inline-flex">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Smart Contract: ox71...f92a
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-on-surface-variant">Total Milestone Funds</span>
                    <span className="text-white">50,000 USDC</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-on-surface-variant">Released to Date</span>
                    <span className="text-white">25,500 USDC</span>
                  </div>
                  
                  <div className="w-full bg-[#0a1829] h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brass-500 to-brass-400 w-[51%] shadow-[0_0_10px_rgba(184,134,59,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Work */}
            <div className="bg-[#051522]/60 backdrop-blur-md border border-white/10 p-6 rounded-md">
              <h3 className="font-mono text-[10px] text-white font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">cloud_upload</span>
                Submit Work
              </h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-mono text-[10px] text-on-surface-variant tracking-widest mb-2">
                    GitHub PR URL
                  </label>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-[#0a1829]/50 border border-white/10 px-3 py-2 text-xs font-mono text-white rounded-sm focus:border-brass-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-on-surface-variant tracking-widest mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Provide context for this submission..."
                    rows={3}
                    className="w-full bg-[#0a1829]/50 border border-white/10 px-3 py-2 text-xs font-body text-white rounded-sm focus:border-brass-500 focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>
              
              <button className="w-full border border-brass-500/50 hover:border-brass-500 bg-brass-500/10 text-brass-500 py-3 rounded-sm font-mono text-[10px] font-bold tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(184,134,59,0.1)]">
                Submit Deliverable
              </button>
            </div>

            {/* Ledger Comments */}
            <div className="bg-[#051522]/60 backdrop-blur-md border border-white/10 flex flex-col h-[400px] rounded-md overflow-hidden">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0a1829]/50">
                <h3 className="font-mono text-[10px] text-white font-bold tracking-widest uppercase flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">forum</span>
                  Ledger Comments
                </h3>
                <span className="font-mono text-[10px] text-on-surface-variant bg-white/5 px-2 py-1 rounded-sm">4 Messages</span>
              </div>
              
              <div className="flex-grow p-4 overflow-y-auto space-y-6 scrollbar-hide">
                <div className="space-y-1">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[10px] text-brass-500 tracking-widest uppercase">Client_Admin</span>
                    <span className="font-mono text-[9px] text-on-surface-variant">10:42 AM</span>
                  </div>
                  <div className="bg-[#0a1829]/80 border border-white/5 p-3 text-xs text-on-surface-variant font-body rounded-md rounded-tl-none">
                    Could you please update the test suite to include the liquidation edge cases we discussed?
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[10px] text-[#00F0FF] tracking-widest uppercase">Solana_Dev_42</span>
                    <span className="font-mono text-[9px] text-on-surface-variant">11:15 AM</span>
                  </div>
                  <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/20 p-3 text-xs text-white font-body rounded-md rounded-tr-none ml-6">
                    Tests updated. See PR commit #d3f2a1. Ready for review.
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-white/10 bg-[#0a1829]/50">
                <div className="relative">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add to ledger..."
                    className="w-full bg-[#051522] border border-white/10 px-4 py-3 text-xs font-body text-white rounded-md focus:border-brass-500 focus:outline-none transition-all pr-12"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-brass-500 hover:text-brass-400 transition-colors flex items-center justify-center p-2 rounded-md hover:bg-white/5">
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
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
