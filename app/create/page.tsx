'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

export default function ProjectCreationWizard() {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    budget: '',
    milestones: [{ title: '', amount: '' }],
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const updateMilestone = (index: number, field: string, value: string) => {
    const newMilestones = [...projectData.milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setProjectData({ ...projectData, milestones: newMilestones });
  };

  const addMilestone = () => {
    setProjectData({
      ...projectData,
      milestones: [...projectData.milestones, { title: '', amount: '' }],
    });
  };

  return (
    <div className="min-h-screen bg-[#030A14] text-on-surface flex flex-col font-body relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brass-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#7000FF]/20 blur-[150px] pointer-events-none" />

      <Header />

      <main className="flex-grow pt-24 pb-24 px-6 md:px-12 relative z-10 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brass-400 via-brass-500 to-[#00F0FF]">
              Initiate Escrow Contract
            </h1>
            <p className="text-on-surface-variant text-lg">
              Secure your freelance agreement on the Solana blockchain.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex justify-between items-center mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10 -translate-y-1/2" />
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                  step >= s 
                    ? 'bg-brass-500 text-ink-900 shadow-[0_0_20px_rgba(184,134,59,0.4)]' 
                    : 'bg-[#0a1829] text-on-surface-variant border border-white/10'
                }`}>
                  {s}
                </div>
                <span className={`text-xs font-mono uppercase tracking-widest ${step >= s ? 'text-brass-500' : 'text-on-surface-variant'}`}>
                  {s === 1 ? 'Details' : s === 2 ? 'Milestones' : 'Fund'}
                </span>
              </div>
            ))}
          </div>

          {/* Form Card with Glassmorphism */}
          <div className="bg-[#051522]/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Subtle glow border effect */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none" />

            {/* Step 1: Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-3">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={projectData.title}
                    onChange={e => setProjectData({ ...projectData, title: e.target.value })}
                    placeholder="e.g. DeFi Dashboard Frontend"
                    className="w-full bg-[#0a1829]/50 border border-white/10 px-4 py-3 text-on-surface font-body rounded-sm focus:border-brass-500 focus:outline-none transition-all focus:ring-1 focus:ring-brass-500/50"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-3">
                    Scope of Work & Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={projectData.description}
                    onChange={e => setProjectData({ ...projectData, description: e.target.value })}
                    placeholder="Describe the deliverables in detail..."
                    className="w-full bg-[#0a1829]/50 border border-white/10 px-4 py-3 text-on-surface font-body rounded-sm focus:border-brass-500 focus:outline-none transition-all focus:ring-1 focus:ring-brass-500/50 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Milestones */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  {projectData.milestones.map((milestone, idx) => (
                    <div key={idx} className="bg-[#0a1829]/30 border border-white/5 p-4 flex gap-4">
                      <div className="flex-grow">
                        <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
                          Milestone {idx + 1} Name
                        </label>
                        <input
                          type="text"
                          value={milestone.title}
                          onChange={e => updateMilestone(idx, 'title', e.target.value)}
                          placeholder="e.g. Initial UI Designs"
                          className="w-full bg-[#051522]/50 border border-white/10 px-3 py-2 text-sm text-on-surface focus:border-brass-500 focus:outline-none transition-all"
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
                          Amount (USDC)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-mono text-sm">$</span>
                          <input
                            type="number"
                            value={milestone.amount}
                            onChange={e => updateMilestone(idx, 'amount', e.target.value)}
                            placeholder="500"
                            className="w-full bg-[#051522]/50 border border-white/10 pl-7 pr-3 py-2 text-sm text-on-surface font-mono focus:border-brass-500 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addMilestone}
                  className="flex items-center gap-2 text-brass-500 hover:text-brass-400 transition-colors font-mono text-xs uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-sm">add_circle</span>
                  Add Milestone
                </button>
              </div>
            )}

            {/* Step 3: Fund Escrow */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in text-center py-6">
                <span className="material-symbols-outlined text-[64px] text-brass-500 mb-4 opacity-80">account_balance_wallet</span>
                <div>
                  <h3 className="text-2xl font-headline font-semibold mb-2">Fund Escrow Contract</h3>
                  <p className="text-on-surface-variant text-sm max-w-md mx-auto">
                    You are about to lock the project funds into the smart contract. The funds will only be released when you approve the milestones.
                  </p>
                </div>
                
                <div className="bg-[#0a1829]/50 border border-brass-500/30 p-6 rounded-sm inline-block min-w-[300px]">
                  <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-2">Total Lockup Value</p>
                  <p className="text-4xl font-headline font-bold text-brass-500">
                    ${projectData.milestones.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0).toLocaleString()} <span className="text-lg font-mono text-on-surface-variant">USDC</span>
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between items-center pt-6 border-t border-white/10">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className={`font-mono text-xs uppercase tracking-widest px-6 py-3 transition-colors ${
                  step === 1 ? 'text-white/20 cursor-not-allowed' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Back
              </button>
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="bg-brass-500 text-ink-900 px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-brass-400 transition-colors shadow-[0_0_15px_rgba(184,134,59,0.3)]"
                >
                  Continue
                </button>
              ) : (
                <Link
                  href="/contracts/ESC-9921-2024X"
                  className="bg-gradient-to-r from-brass-500 to-brass-400 text-ink-900 px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(184,134,59,0.5)] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  Sign & Fund Escrow
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
