'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WaxSealAnimated } from '@/components/ui/wax-seal';

export default function DisputeResolutionCenter() {
  const [verdict, setVerdict] = useState<'freelancer' | 'client' | 'split' | null>(null);

  return (
    <div className="min-h-screen bg-[#030A14] text-on-surface flex flex-col font-body relative overflow-hidden">
      {/* Dynamic Background Gradients - Red/Purple for dispute context */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-dispute-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-admin-700/20 blur-[150px] pointer-events-none" />

      <Header />

      <main className="flex-grow pt-8 pb-24 px-6 md:px-12 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Header Section */}
          <div className="lg:col-span-12 mb-8 mt-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-dispute-600/20 text-dispute-600 border border-dispute-600/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-dispute-600 animate-pulse"></span>
                Active Dispute
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                Case #AR-1092-B
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">
              L1 Protocol Integration: Phase 2
            </h1>
            <p className="text-on-surface-variant">
              Arbitration review required for locked funds. AI Summary generated.
            </p>
          </div>

          {/* AI Summary Panel (Left) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#051522]/60 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden rounded-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F0FF] to-[#7000FF]" />
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                  <span className="material-symbols-outlined text-[#00F0FF]">smart_toy</span>
                  <h3 className="font-headline text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#7000FF]">
                    AI Evidence Summary
                  </h3>
                </div>

                <div className="space-y-8">
                  {/* Confidence Score */}
                  <div className="flex items-center justify-between bg-[#0a1829]/50 border border-white/5 p-6 rounded-md">
                    <div>
                      <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">
                        Evidence Confidence
                      </p>
                      <h4 className="text-3xl font-headline font-bold text-[#00F0FF]">92%</h4>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">
                        AI Recommendation
                      </p>
                      <p className="font-mono text-xs text-on-surface uppercase">Release to Freelancer</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">
                      Reconstructed Timeline
                    </h4>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                      
                      {/* Timeline Item 1 */}
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#051522] text-on-surface-variant shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <span className="material-symbols-outlined text-sm text-[#00F0FF]">description</span>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-[#0a1829]/30 border border-white/5 rounded-md">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-headline font-semibold text-sm">Contract Signed</h5>
                            <span className="font-mono text-[10px] text-on-surface-variant">Day 1</span>
                          </div>
                          <p className="text-xs text-on-surface-variant">Initial scope and 4 milestones agreed upon.</p>
                        </div>
                      </div>

                      {/* Timeline Item 2 */}
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#051522] text-on-surface-variant shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <span className="material-symbols-outlined text-sm text-brass-500">code</span>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-[#0a1829]/30 border border-white/5 rounded-md">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-headline font-semibold text-sm">Milestone 2 Submitted</h5>
                            <span className="font-mono text-[10px] text-on-surface-variant">Day 12</span>
                          </div>
                          <p className="text-xs text-on-surface-variant">Freelancer pushed commit <span className="font-mono text-[#00F0FF]">#d3f2a1</span> and requested approval.</p>
                        </div>
                      </div>

                      {/* Timeline Item 3 */}
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-dispute-600 bg-[#051522] text-dispute-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <span className="material-symbols-outlined text-sm">gavel</span>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-dispute-600/10 border border-dispute-600/30 rounded-md">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-headline font-semibold text-sm">Client Stopped Responding</h5>
                            <span className="font-mono text-[10px] text-dispute-600">Day 19</span>
                          </div>
                          <p className="text-xs text-on-surface-variant">No chat activity or approval from Client for 7 days. Dispute automatically raised.</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* AI Conclusion */}
                  <div className="bg-admin-700/10 border border-admin-700/30 p-6 rounded-md">
                    <h4 className="font-mono text-[10px] text-admin-700 uppercase tracking-widest mb-2">
                      AI Conclusion
                    </h4>
                    <p className="text-sm text-on-surface leading-relaxed">
                      Based on GitHub commit history and chat logs, the Freelancer completed all agreed requirements for Milestone 2. The Client has not provided any revision requests or communicated dissatisfaction. Evidence heavily supports releasing the funds to the Freelancer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arbitrator Actions (Right) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#051522]/60 backdrop-blur-xl border border-white/10 shadow-2xl p-6 rounded-md sticky top-24">
              <h3 className="font-mono text-[10px] text-on-surface uppercase tracking-widest mb-6 pb-4 border-b border-white/10">
                Arbitration Panel
              </h3>

              <div className="mb-6">
                <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
                  Disputed Amount
                </p>
                <p className="text-3xl font-headline font-bold text-brass-500">
                  1,200.00 <span className="text-sm text-on-surface-variant font-mono">USDC</span>
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                  Execute Verdict
                </p>
                
                <button
                  onClick={() => setVerdict('freelancer')}
                  className={`w-full text-left p-4 border rounded-sm transition-all ${
                    verdict === 'freelancer' 
                      ? 'border-[#00F0FF] bg-[#00F0FF]/10' 
                      : 'border-white/10 bg-[#0a1829]/50 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-on-surface">Rule for Freelancer</span>
                    {verdict === 'freelancer' && <span className="material-symbols-outlined text-[#00F0FF] text-sm">check_circle</span>}
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Release 100% funds to freelancer.</p>
                </button>

                <button
                  onClick={() => setVerdict('client')}
                  className={`w-full text-left p-4 border rounded-sm transition-all ${
                    verdict === 'client' 
                      ? 'border-dispute-600 bg-dispute-600/10' 
                      : 'border-white/10 bg-[#0a1829]/50 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-on-surface">Rule for Client</span>
                    {verdict === 'client' && <span className="material-symbols-outlined text-dispute-600 text-sm">check_circle</span>}
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Refund 100% to client.</p>
                </button>

                <button
                  onClick={() => setVerdict('split')}
                  className={`w-full text-left p-4 border rounded-sm transition-all ${
                    verdict === 'split' 
                      ? 'border-brass-500 bg-brass-500/10' 
                      : 'border-white/10 bg-[#0a1829]/50 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-on-surface">Custom Split</span>
                    {verdict === 'split' && <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>}
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Define manual percentage split.</p>
                </button>
              </div>

              {verdict && (
                <div className="animate-fade-in space-y-4">
                  <div className="p-4 bg-admin-700/10 border border-admin-700/30 rounded-sm">
                    <p className="text-[10px] text-on-surface-variant font-mono mb-2">Arbitrator Cryptographic Signature Required</p>
                    <div className="flex items-center justify-center py-2">
                      <WaxSealAnimated />
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-brass-500 to-brass-400 text-ink-900 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(184,134,59,0.3)]">
                    Sign & Execute Transaction
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
