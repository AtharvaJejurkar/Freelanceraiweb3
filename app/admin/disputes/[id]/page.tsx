'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const steps = [
  { label: 'FILED', status: 'completed', icon: 'check' },
  { label: 'AI REVIEW', status: 'active', icon: 'smart_toy' },
  { label: 'VERDICT ISSUED', status: 'pending', icon: 'gavel' },
  { label: 'HUMAN REVIEW', status: 'pending', icon: 'person' },
  { label: 'RESOLVED', status: 'pending', icon: 'verified' },
];

export default function DisputeDetailPage() {
  const [activeTab, setActiveTab] = useState('CHAT LOGS');

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header role="admin" reputation={100} walletAddress="0xAdmin...Auth" />

      <div className="flex max-w-[1400px] mx-auto w-full flex-grow">
        {/* Sidebar */}
        <aside className="w-64 py-8 bg-surface border-r border-outline-variant/30 flex flex-col">
          <div className="px-6 mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded-sm">
              <span className="material-symbols-outlined text-brass-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance
              </span>
            </div>
            <div>
              <div className="font-headline text-lg font-bold text-brass-500">System Admin</div>
              <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Network Authority</div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 flex-grow">
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant">
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
            <div className="flex items-center gap-4 bg-brass-500/10 border-l-2 border-brass-500 px-6 py-3 text-brass-500">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span className="font-mono text-xs tracking-widest">System Alerts</span>
            </div>
          </nav>

          <div className="px-6 mt-auto">
            <button className="w-full bg-dispute-600/20 text-dispute-600 hover:bg-dispute-600 hover:text-paper-50 border border-dispute-600/50 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors">
              New System Alert
            </button>
            <div className="mt-8 space-y-4 text-on-surface-variant">
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
        <main className="flex-grow bg-surface-dim p-10 overflow-hidden">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-dispute-600 text-sm">gavel</span>
              <span className="font-mono text-[10px] text-dispute-600 tracking-widest uppercase">
                Dispute Center — ID #8829-X
              </span>
            </div>
            <h1 className="text-4xl font-headline font-bold text-on-surface mb-2">AI Judge Review</h1>
            <p className="text-sm text-on-surface-variant font-body">
              Case regarding "Smart Contract Audit for Nebula Protocol". Resolution pending evidence synthesis and jurisdictional alignment.
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-12 relative max-w-4xl">
            <div className="absolute top-4 left-0 right-0 h-px bg-outline-variant/50 -z-10"></div>
            <div className="flex justify-between relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 flex items-center justify-center border",
                    step.status === 'completed' ? "bg-surface-container border-outline-variant text-outline" :
                    step.status === 'active' ? "bg-brass-500 border-brass-500 text-ink-900" :
                    "bg-surface border-outline-variant/30 text-outline-variant/30"
                  )}>
                    <span className="material-symbols-outlined text-sm">{step.icon}</span>
                  </div>
                  <span className={cn(
                    "font-mono text-[9px] uppercase tracking-widest",
                    step.status === 'active' ? "text-brass-500 font-bold" :
                    step.status === 'completed' ? "text-outline" : "text-outline-variant/30"
                  )}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details & Chat */}
            <div className="lg:col-span-2 space-y-6">
              {/* Verdict Card */}
              <div className="bg-surface-container border border-outline-variant p-6 relative overflow-hidden">
                <span className="material-symbols-outlined absolute -right-4 -top-4 text-[120px] text-surface-container-highest opacity-50 pointer-events-none select-none">
                  shield
                </span>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-verified-600/20 flex items-center justify-center border border-verified-600/30">
                      <span className="material-symbols-outlined text-verified-600">gavel</span>
                    </div>
                    <h2 className="text-xl font-headline font-bold italic text-on-surface">AI Judge Verdict</h2>
                  </div>

                  <p className="text-sm font-body text-on-surface mb-6 leading-relaxed">
                    <span className="text-brass-500 font-bold">"Based on repository commits and confirmed milestones:</span> Release milestone payment to freelancer."
                  </p>

                  <div className="bg-surface-dim border border-outline-variant/50 p-3 flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">info</span>
                    <span className="font-mono text-xs text-on-surface-variant italic">Note: AI Judge — not final if either party escalates within 48 hours.</span>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-brass-500 text-ink-900 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-brass-400 flex items-center justify-center gap-2 transition-colors">
                      <span className="material-symbols-outlined text-sm">check</span>
                      Accept Verdict
                    </button>
                    <button className="flex-1 border border-dispute-600 text-dispute-600 hover:bg-dispute-600/10 py-3 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                      <span className="material-symbols-outlined text-sm">emergency</span>
                      Escalate to Human Review
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat / Logs Box */}
              <div className="bg-surface-container border border-outline-variant flex flex-col h-[400px]">
                <div className="flex border-b border-outline-variant">
                  {['CHAT LOGS', 'FILES', 'GITHUB', 'ON-CHAIN HISTORY'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "px-6 py-3 font-mono text-[10px] tracking-widest uppercase transition-colors border-b-2",
                        activeTab === tab
                          ? "border-brass-500 text-brass-500 font-bold bg-brass-500/5"
                          : "border-transparent text-on-surface-variant hover:bg-surface"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-grow p-6 overflow-y-auto bg-surface-dim font-mono text-xs space-y-6">
                  <div className="flex gap-4">
                    <span className="text-outline-variant w-20 flex-shrink-0">[10:14:02]</span>
                    <span className="text-brass-500 w-24 flex-shrink-0">CLIENT:</span>
                    <span className="text-on-surface">The audit report is missing the re-entrancy vulnerability analysis for the staking pool.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-outline-variant w-20 flex-shrink-0">[10:15:45]</span>
                    <span className="text-on-surface w-24 flex-shrink-0">FREELANCER:</span>
                    <span className="text-on-surface">Check the 'Vulnerabilities.md' file in the root. Lines 42-120 cover the staking pool re-entrancy test results.</span>
                  </div>
                  <div className="flex gap-4 p-3 bg-brass-500/10 border border-brass-500/30 italic">
                    <span className="text-brass-500/50 w-20 flex-shrink-0">[AI<br/>ANALYSIS]</span>
                    <span className="text-brass-500">Pattern match found. Freelancer provided the requested documentation at timestamp 10:15:45. Milestone 3 criteria met.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-outline-variant w-20 flex-shrink-0">[11:02:11]</span>
                    <span className="text-brass-500 w-24 flex-shrink-0">CLIENT:</span>
                    <span className="text-on-surface">I see it now, but I wanted it in PDF format, not Markdown.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-outline-variant w-20 flex-shrink-0">[11:04:18]</span>
                    <span className="text-on-surface w-24 flex-shrink-0">FREELANCER:</span>
                    <span className="text-on-surface">The original brief didn't specify file format. MD is industry standard for audit repos.</span>
                  </div>
                  <div className="flex gap-4 p-3 bg-dispute-600/10 border border-dispute-600/30 italic">
                    <span className="text-dispute-600/50 w-20 flex-shrink-0">[AI<br/>ANALYSIS]</span>
                    <span className="text-dispute-600">Scope creep detected. Brief #822 does not list PDF as a required deliverable. Client request rejected.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & History */}
            <div className="space-y-6">
              {/* Confidence Score Card */}
              <div className="bg-surface-container border border-outline-variant p-6">
                <h3 className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase mb-6 text-center">
                  Confidence Score
                </h3>
                
                <div className="flex justify-center mb-8">
                  {/* SVG Circle Progress */}
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#2c3b49" strokeWidth="8" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#B8863B" strokeWidth="8" strokeDasharray="283" strokeDashoffset="22.64" className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-headline font-bold text-on-surface">92%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-mono text-[10px] mb-1 uppercase tracking-widest">
                      <span className="text-on-surface-variant">Logical Consistency</span>
                      <span className="text-brass-500">98%</span>
                    </div>
                    <div className="w-full h-1 bg-surface">
                      <div className="h-full bg-brass-500 w-[98%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono text-[10px] mb-1 uppercase tracking-widest">
                      <span className="text-on-surface-variant">Evidence Depth</span>
                      <span className="text-brass-500">87%</span>
                    </div>
                    <div className="w-full h-1 bg-surface">
                      <div className="h-full bg-brass-500 w-[87%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono text-[10px] mb-1 uppercase tracking-widest">
                      <span className="text-on-surface-variant">Rule Compliance</span>
                      <span className="text-brass-500">94%</span>
                    </div>
                    <div className="w-full h-1 bg-surface">
                      <div className="h-full bg-brass-500 w-[94%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Trail */}
              <div className="bg-surface-container border border-outline-variant p-6">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-outline-variant text-sm">history</span>
                  <h3 className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase">
                    Audit Trail
                  </h3>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-y-2 before:left-[5px] before:w-px before:bg-outline-variant/30">
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-outline-variant"></div>
                    <p className="text-sm text-on-surface font-body mb-1">Dispute filed by Client</p>
                    <p className="font-mono text-[9px] text-outline-variant uppercase">OCT 12, 14:00 UTC</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-outline-variant"></div>
                    <p className="text-sm text-on-surface font-body mb-1">Evidence lock initiated</p>
                    <p className="font-mono text-[9px] text-outline-variant uppercase">OCT 12, 14:05 UTC</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-brass-500 shadow-[0_0_8px_rgba(184,134,59,0.5)]"></div>
                    <p className="text-sm text-brass-500 font-body mb-1">AI Judge generated report</p>
                    <p className="font-mono text-[9px] text-brass-500 uppercase">OCT 13, 09:12 UTC</p>
                  </div>
                </div>
              </div>

              {/* View Scoped Artifacts Block */}
              <div className="relative h-32 border border-outline-variant group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f4ec084?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute inset-0 bg-surface-dim/50 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-brass-500 text-3xl mb-2">visibility</span>
                  <span className="font-mono text-[10px] text-paper-50 uppercase tracking-widest font-bold">
                    View Scoped Artifacts
                  </span>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
