'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WaxSealAnimated, WaxSeal } from '@/components/ui/wax-seal';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const dispute = {
  id: 'DSP-2024-042',
  project: 'DeFi Dashboard UI',
  milestone: 'Phase 2: Components',
  amount: 3500,
  status: 'verdict_issued',
  filedAt: '2024-10-15 14:22:01 UTC',
  reason: 'Deliverables do not match specification requirements for responsive design. Components fail to render correctly on tablet viewports (768px-1024px) as required in the original scope of work.',
  filedBy: {
    role: 'Company',
    name: 'Nexus Labs',
    wallet: '0x7a2...f91',
  },
  filedAgainst: {
    role: 'Freelancer',
    name: 'Jane Developer',
    wallet: '0x452...89a',
  },
  aiVerdict: {
    recommendation: 'rule_freelancer',
    confidence: 78,
    summary: 'After analyzing the submitted code, design specifications, and chat history, the AI Judge has determined that the deliverables substantially meet the requirements with minor deviations.',
    evidenceAnalysis: [
      {
        type: 'github',
        title: 'Pull Request #42: Component Library',
        summary: 'Code review shows proper responsive implementation using Tailwind breakpoints. The developer followed the design system specifications accurately.',
        result: 'Supports Freelancer',
      },
      {
        type: 'chat',
        title: 'Slack Conversation - Oct 10',
        summary: 'Company representative approved early wireframes which closely match final implementation. No explicit rejection of tablet breakpoint behavior.',
        result: 'Supports Freelancer',
      },
      {
        type: 'file',
        title: 'Design Specification v2.1',
        summary: 'Original specs mention "responsive design" but lack specific pixel ranges for tablet viewports. Ambiguous requirements.',
        result: 'Neutral',
      },
    ],
    keyFindings: [
      'The freelancer implemented responsive breakpoints as per Tailwind defaults (sm: 640px, md: 768px, lg: 1024px)',
      'Company approved wireframes on Oct 10 without requesting specific tablet adjustments',
      'Final delivery matches approved wireframes with 94% visual similarity',
      'No explicit rejection was communicated before final delivery',
    ],
    calculatedDecision: {
      freelancerScore: 72,
      companyScore: 28,
    },
  },
};

const evidenceItems = [
  { id: '1', type: 'github', title: 'Pull Request #42', uploadedBy: 'Freelancer', timestamp: '2024-10-14' },
  { id: '2', type: 'chat', title: 'Slack Conversation', uploadedBy: 'System', timestamp: '2024-10-10' },
  { id: '3', type: 'pdf', title: 'Design Specification v2.1', uploadedBy: 'Company', timestamp: '2024-09-28' },
  { id: '4', type: 'image', title: 'Screenshot - Tablet View', uploadedBy: 'Company', timestamp: '2024-10-14' },
];

const verdictLabels: Record<string, { label: string; color: string; icon: string }> = {
  rule_freelancer: { label: 'Release to Freelancer', color: 'text-verified-600', icon: 'person' },
  rule_company: { label: 'Refund to Company', color: 'text-dispute-600', icon: 'corporate_fare' },
  split: { label: 'Split 50/50', color: 'text-brass-500', icon: 'call_split' },
};

const evidenceIcons: Record<string, string> = {
  github: 'code',
  chat: 'chat',
  pdf: 'description',
  image: 'image',
  file: 'folder',
  video: 'videocam',
};

export default function DisputeCenterPage() {
  const [showVerdict, setShowVerdict] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [escalating, setEscalating] = useState(false);

  useEffect(() => {
    // Show verdict animation after load
    const timer = setTimeout(() => {
      setShowVerdict(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptVerdict = () => {
    setAnimating(true);
    // Would trigger smart contract execution
    setTimeout(() => {
      setAnimating(false);
    }, 2000);
  };

  const handleEscalate = () => {
    setEscalating(true);
    // Would escalate to admin queue
  };

  const verdict = verdictLabels[dispute.aiVerdict.recommendation];

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header role="company" reputation={98} walletAddress="0x82...f92" />

      <main className="flex-grow pt-8 pb-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container mx-auto">
          {/* Header */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] text-on-surface-variant">{dispute.id}</span>
              <span className={cn(
                "px-2 py-0.5 font-mono text-[10px] uppercase",
                "bg-brass-500/20 text-brass-500"
              )}>
                {dispute.status.replace('_', ' ')}
              </span>
            </div>

            <h1 className="text-4xl font-headline font-bold text-on-surface mb-2">AI Judge Dispute Center</h1>
            <p className="text-lg text-on-surface-variant">{dispute.project} — {dispute.milestone}</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Amount at Stake */}
              <div className="bg-surface-container border border-outline-variant p-6">
                <p className="font-mono text-xs text-on-surface-variant uppercase mb-2">Amount in Escrow</p>
                <p className="text-4xl font-headline font-bold text-brass-500">${dispute.amount.toLocaleString()}</p>
                <p className="text-sm text-on-surface-variant mt-2">Funds frozen pending resolution</p>
              </div>

              {/* Dispute Reason */}
              <div className="bg-surface-container-low border-l-4 border-dispute-600 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-dispute-600">gavel</span>
                  <h3 className="font-mono text-sm text-dispute-600 uppercase">Reason Filed</h3>
                </div>
                <p className="text-sm text-on-surface-variant">{dispute.reason}</p>
              </div>

              {/* AI Verdict */}
              {showVerdict && (
                <div className="bg-surface-container border border-brass-500/30 p-8 animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-brass-500 text-3xl">smart_toy</span>
                      <div>
                        <h3 className="text-xl font-headline font-semibold text-brass-500">AI Judge Verdict</h3>
                        <p className="font-mono text-xs text-on-surface-variant">Automated evidence analysis</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-on-surface-variant">Confidence Score</p>
                      <p className={cn(
                        "text-3xl font-headline font-bold",
                        dispute.aiVerdict.confidence >= 80 ? "text-verified-600" : "text-brass-500"
                      )}>
                        {dispute.aiVerdict.confidence}%
                      </p>
                    </div>
                  </div>

                  {/* Verdict Recommendation */}
                  <div className="bg-brass-500/10 border border-brass-500/30 p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="material-symbols-outlined text-2xl text-brass-500">{verdict.icon}</span>
                      <div>
                        <p className="font-mono text-xs text-on-surface-variant uppercase">Recommended Decision</p>
                        <p className={cn("text-xl font-headline font-bold", verdict.color)}>
                          {verdict.label}
                        </p>
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-end mb-1">
                          <span className="font-mono text-xs">Freelancer</span>
                          <span className="font-mono text-sm text-verified-600">{dispute.aiVerdict.calculatedDecision.freelancerScore}%</span>
                        </div>
                        <div className="h-2 bg-surface-variant">
                          <div className="h-full bg-verified-600" style={{ width: `${dispute.aiVerdict.calculatedDecision.freelancerScore}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-end mb-1">
                          <span className="font-mono text-xs">Company</span>
                          <span className="font-mono text-sm text-dispute-600">{dispute.aiVerdict.calculatedDecision.companyScore}%</span>
                        </div>
                        <div className="h-2 bg-surface-variant">
                          <div className="h-full bg-dispute-600" style={{ width: `${dispute.aiVerdict.calculatedDecision.companyScore}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-on-surface-variant mb-6">{dispute.aiVerdict.summary}</p>

                  {/* Key Findings */}
                  <div className="mb-6">
                    <h4 className="font-mono text-xs text-on-surface-variant uppercase mb-3">Key Findings</h4>
                    <ul className="space-y-2">
                      {dispute.aiVerdict.keyFindings.map((finding, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-brass-500 text-sm mt-0.5">check_circle</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <button
                      onClick={handleAcceptVerdict}
                      disabled={animating}
                      className={cn(
                        "flex-1 bg-verified-600 text-paper-50 px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                        animating ? "opacity-50" : "hover:bg-verified-600/80"
                      )}
                    >
                      {animating ? (
                        <>
                          <WaxSealAnimated />
                          Executing...
                        </>
                      ) : (
                        <>
                          <WaxSeal size="sm" showCheck={false} className="!w-4 !h-4" />
                          Accept Verdict
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleEscalate}
                      disabled={escalating}
                      className="flex-1 border border-dispute-600 text-dispute-600 px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-dispute-600/10 transition-colors"
                    >
                      Escalate to Human Review
                    </button>
                  </div>
                </div>
              )}

              {/* Evidence Analysis */}
              <div>
                <h3 className="text-xl font-headline font-semibold mb-6">Evidence Analysis</h3>
                <div className="space-y-4">
                  {dispute.aiVerdict.evidenceAnalysis.map((item, i) => (
                    <div key={i} className="bg-surface-container border border-outline-variant p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-brass-500">
                            {evidenceIcons[item.type] || 'folder'}
                          </span>
                          <div>
                            <p className="font-mono text-sm text-on-surface">{item.title}</p>
                            <p className="font-mono text-[10px] text-on-surface-variant uppercase">{item.type}</p>
                          </div>
                        </div>
                        <span className={cn(
                          "px-2 py-1 font-mono text-[10px] uppercase",
                          item.result === 'Supports Freelancer' ? "bg-verified-600/20 text-verified-600" :
                          item.result === 'Supports Company' ? "bg-dispute-600/20 text-dispute-600" :
                          "bg-surface-variant text-on-surface-variant"
                        )}>
                          {item.result}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Parties */}
              <div className="bg-surface-container border border-outline-variant p-6">
                <h4 className="font-mono text-xs text-on-surface-variant uppercase mb-4">Parties</h4>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-brass-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-brass-500 text-sm">corporate_fare</span>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-on-surface-variant">Filed By</p>
                      <p className="text-sm text-on-surface">{dispute.filedBy.name}</p>
                      <p className="font-mono text-[10px] text-on-surface-variant">{dispute.filedBy.wallet}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-on-surface-variant">Filed Against</p>
                      <p className="text-sm text-on-surface">{dispute.filedAgainst.name}</p>
                      <p className="font-mono text-[10px] text-on-surface-variant">{dispute.filedAgainst.wallet}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence Archive */}
              <div className="bg-surface-container border border-outline-variant p-6">
                <h4 className="font-mono text-xs text-on-surface-variant uppercase mb-4">Evidence Archive</h4>
                <div className="space-y-3">
                  {evidenceItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-outline-variant/30 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-brass-500 text-sm">
                          {evidenceIcons[item.type] || 'folder'}
                        </span>
                        <div>
                          <p className="font-mono text-xs text-on-surface">{item.title}</p>
                          <p className="font-mono text-[10px] text-on-surface-variant">{item.timestamp}</p>
                        </div>
                      </div>
                      <button className="text-xs font-mono text-brass-500 hover:underline">View</button>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 border border-outline text-on-surface-variant px-4 py-2 font-mono text-xs uppercase hover:bg-surface-container transition-colors">
                  Upload Evidence
                </button>
              </div>

              {/* Timeline */}
              <div className="bg-surface-container border border-outline-variant p-6">
                <h4 className="font-mono text-xs text-on-surface-variant uppercase mb-4">Dispute Timeline</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-brass-500 mt-1.5" />
                    <div>
                      <p className="font-mono text-xs text-on-surface">AI Verdict Issued</p>
                      <p className="font-mono text-[10px] text-on-surface-variant">Oct 16, 2024 - 09:15 UTC</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-surface-variant mt-1.5" />
                    <div>
                      <p className="font-mono text-xs text-on-surface">AI Review Started</p>
                      <p className="font-mono text-[10px] text-on-surface-variant">Oct 15, 2024 - 14:30 UTC</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-surface-variant mt-1.5" />
                    <div>
                      <p className="font-mono text-xs text-on-surface">Dispute Filed</p>
                      <p className="font-mono text-[10px] text-on-surface-variant">Oct 15, 2024 - 14:22 UTC</p>
                    </div>
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
