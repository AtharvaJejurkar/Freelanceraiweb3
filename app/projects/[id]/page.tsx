'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WaxSealAnimated, WaxSeal } from '@/components/ui/wax-seal';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const milestones = [
  {
    id: '1',
    title: 'Project Setup & Architecture',
    description: 'Initial setup, tech stack decisions, and architecture documentation.',
    amount: 500,
    status: 'released',
    dueDate: '2024-09-15',
    completedAt: '2024-09-14',
    order: 1,
  },
  {
    id: '2',
    title: 'Core Components Development',
    description: 'Build all foundational UI components following design system.',
    amount: 1500,
    status: 'approved',
    dueDate: '2024-10-01',
    completedAt: '2024-10-01',
    order: 2,
  },
  {
    id: '3',
    title: 'Integration & API Connection',
    description: 'Connect all components to backend APIs and smart contracts.',
    amount: 2000,
    status: 'in_progress',
    dueDate: '2024-10-20',
    order: 3,
  },
  {
    id: '4',
    title: 'Final Delivery & Documentation',
    description: 'Complete documentation, testing, and final handoff.',
    amount: 1000,
    status: 'locked',
    dueDate: '2024-11-01',
    order: 4,
  },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: string }> = {
  locked: { label: 'Funds Locked', color: 'text-on-surface-variant', bgColor: 'bg-surface-variant', icon: 'lock' },
  in_progress: { label: 'In Progress', color: 'text-brass-500', bgColor: 'bg-brass-500/20', icon: 'pending' },
  submitted: { label: 'Submitted', color: 'text-blue-400', bgColor: 'bg-blue-400/20', icon: 'upload' },
  approved: { label: 'Approved', color: 'text-verified-600', bgColor: 'bg-verified-600/20', icon: 'check_circle' },
  released: { label: 'Released', color: 'text-verified-600', bgColor: 'bg-verified-600/20', icon: 'paid' },
  disputed: { label: 'Disputed', color: 'text-dispute-600', bgColor: 'bg-dispute-600/20', icon: 'gavel' },
};

const project = {
  id: 'PRJ-2024-001',
  title: 'Escrow DApp UX Redesign',
  description: 'Complete redesign of the escrow platform user experience, including new onboarding flows, dashboard interfaces, and mobile-responsive components.',
  company: 'Nexus Labs',
  freelancer: 'Jane Developer',
  totalValue: 5000,
  status: 'in_progress',
  createdAt: '2024-09-01',
};

export default function ProjectDetailPage() {
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(m => m.status === 'released' || m.status === 'approved').length;
  const progress = (completedMilestones / totalMilestones) * 100;

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header role="company" reputation={98} walletAddress="0x82...f92" />

      <main className="flex-grow pt-8 pb-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container mx-auto">
          {/* Project Header */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] text-on-surface-variant">{project.id}</span>
              <span className={cn(
                "px-2 py-0.5 font-mono text-[10px] uppercase",
                "bg-brass-500/20 text-brass-500"
              )}>
                {project.status.replace('_', ' ')}
              </span>
            </div>

            <h1 className="text-4xl font-headline font-bold text-on-surface mb-4">{project.title}</h1>

            <p className="text-base text-on-surface-variant max-w-3xl mb-8">{project.description}</p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface-container border border-outline-variant p-4">
                <p className="font-mono text-[10px] text-on-surface-variant uppercase mb-1">Total Value</p>
                <p className="text-xl font-headline font-bold text-brass-500">${project.totalValue.toLocaleString()}</p>
              </div>
              <div className="bg-surface-container border border-outline-variant p-4">
                <p className="font-mono text-[10px] text-on-surface-variant uppercase mb-1">Company</p>
                <p className="text-base font-mono text-on-surface">{project.company}</p>
              </div>
              <div className="bg-surface-container border border-outline-variant p-4">
                <p className="font-mono text-[10px] text-on-surface-variant uppercase mb-1">Freelancer</p>
                <p className="text-base font-mono text-on-surface">{project.freelancer}</p>
              </div>
              <div className="bg-surface-container border border-outline-variant p-4">
                <p className="font-mono text-[10px] text-on-surface-variant uppercase mb-1">Progress</p>
                <p className="text-xl font-headline font-bold text-on-surface">{completedMilestones}/{totalMilestones}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="font-mono text-xs text-on-surface-variant">Overall Progress</span>
                <span className="font-mono text-sm text-brass-500">{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-surface-variant h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brass-600 to-brass-500 transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </section>

          {/* Milestone Timeline */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-headline font-semibold">Milestone Timeline</h2>
              <div className="h-px flex-1 bg-outline-variant/30" />
            </div>

            <div className="space-y-6">
              {milestones.map((milestone, index) => {
                const config = statusConfig[milestone.status];
                const isLast = index === milestones.length - 1;

                return (
                  <div key={milestone.id} className="relative">
                    {/* Timeline Line */}
                    {!isLast && (
                      <div
                        className={cn(
                          "absolute left-6 top-16 w-0.5 h-[calc(100%-24px)]",
                          milestone.status === 'released' || milestone.status === 'approved'
                            ? "bg-verified-600"
                            : "bg-outline-variant"
                        )}
                      />
                    )}

                    <div
                      className={cn(
                        "flex gap-6 p-6 border transition-all",
                        milestone.status === 'released'
                          ? "bg-verified-600/5 border-verified-600/30"
                          : milestone.status === 'approved'
                            ? "bg-brass-500/5 border-brass-500/30"
                            : "bg-surface-container border-outline-variant"
                      )}
                    >
                      {/* Status Icon / Wax Seal */}
                      <div className="flex-shrink-0">
                        {milestone.status === 'released' ? (
                          <WaxSeal size="md" />
                        ) : (
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center border",
                            config.bgColor,
                            milestone.status === 'approved' ? "border-verified-600" : "border-outline-variant"
                          )}>
                            <span className={cn("material-symbols-outlined", config.color)}>
                              {config.icon}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-headline font-semibold text-on-surface">
                                {milestone.title}
                              </h3>
                              <span className={cn(
                                "px-2 py-0.5 font-mono text-[10px] uppercase",
                                config.bgColor,
                                config.color
                              )}>
                                {config.label}
                              </span>
                            </div>
                            <p className="text-sm text-on-surface-variant">{milestone.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xl font-headline font-bold text-brass-500">
                              ${milestone.amount.toLocaleString()}
                            </p>
                            <p className="font-mono text-[10px] text-on-surface-variant">
                              Due: {milestone.dueDate}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        {milestone.status === 'locked' && (
                          <div className="flex gap-3">
                            <button className="bg-brass-500 text-ink-900 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-brass-400 transition-colors">
                              Fund Milestone
                            </button>
                          </div>
                        )}

                        {milestone.status === 'in_progress' && (
                          <div className="flex gap-3">
                            <button className="bg-verified-600 text-paper-50 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-verified-600/80 transition-colors">
                              Approve Milestone
                            </button>
                            <button
                              onClick={() => setShowDisputeModal(true)}
                              className="border border-dispute-600 text-dispute-600 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-dispute-600/10 transition-colors"
                            >
                              Raise Dispute
                            </button>
                          </div>
                        )}

                        {milestone.status === 'approved' && (
                          <div className="flex items-center gap-4 bg-verified-600/10 border border-verified-600/30 p-3">
                            <span className="material-symbols-outlined text-verified-600">schedule</span>
                            <div>
                              <p className="font-mono text-xs text-verified-600 uppercase">Releasing Funds</p>
                              <p className="text-sm text-on-surface-variant">
                                Transaction processing on Solana...
                              </p>
                            </div>
                          </div>
                        )}

                        {milestone.status === 'released' && (
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-xs text-verified-600 uppercase">
                              Released: {milestone.completedAt}
                            </span>
                            <span className="font-mono text-[10px] text-on-surface-variant">
                              TX: 0x7a...4d2
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-dim/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-surface border border-outline-variant p-8 relative">
            <button
              onClick={() => setShowDisputeModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-brass-500 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-2xl font-headline font-semibold text-dispute-600 mb-4">Raise Dispute</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              This will freeze the milestone funds and initiate the AI Judge review process.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="font-mono text-xs text-on-surface-variant uppercase block mb-2">
                  Reason for Dispute
                </label>
                <textarea
                  className="w-full bg-surface-container border border-outline-variant p-4 text-sm text-on-surface font-body resize-none"
                  rows={4}
                  placeholder="Describe the issue in detail..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDisputeModal(false)}
                className="flex-1 border border-outline text-on-surface px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-dispute-600 text-paper-50 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-dispute-600/80 transition-colors">
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
