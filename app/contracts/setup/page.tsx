'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ContractorSetupPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Software Development');
  const [wallet, setWallet] = useState('');
  const [scope, setScope] = useState('');

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header />

      <main className="flex-grow flex max-w-container mx-auto w-full">
        {/* Left Sidebar */}
        <aside className="w-64 py-12 pr-8 flex flex-col border-r border-outline-variant/30">
          <div className="mb-10 px-4">
            <h2 className="text-brass-500 font-headline font-bold text-lg mb-1">Contractor Setup</h2>
            <p className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase">
              ID: ESC-992-QX
            </p>
          </div>

          <nav className="flex flex-col gap-2 flex-grow">
            {/* Step 1: Active */}
            <div className="flex items-center gap-4 bg-surface-container-highest/50 px-4 py-3 border-l-2 border-brass-500">
              <span className="material-symbols-outlined text-brass-500 text-sm">edit_document</span>
              <span className="font-mono text-[10px] text-brass-500 font-bold uppercase tracking-widest">
                Work Details
              </span>
            </div>

            {/* Step 2: Inactive */}
            <div className="flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">timeline</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                Milestones
              </span>
            </div>

            {/* Step 3: Inactive */}
            <div className="flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">lock</span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                Review & Lock
              </span>
            </div>
          </nav>

          <div className="mt-auto px-4 pt-10 border-t border-outline-variant/30">
            <div className="flex items-center gap-2 text-on-surface-variant opacity-70">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span className="font-mono text-[10px] uppercase tracking-widest">Notarized on Solana</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow py-12 pl-12 pr-4 bg-surface-dim">
          <div className="max-w-3xl">
            {/* Paper Card */}
            <div className="bg-paper-50 p-10 mb-8 shadow-sm">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-outline-variant/20">
                <h2 className="text-2xl font-headline font-bold text-ink-900">Project Definition</h2>
                <span className="material-symbols-outlined text-outline text-[40px] opacity-40">
                  description
                </span>
              </div>

              <div className="space-y-8">
                {/* Project Title */}
                <div>
                  <label className="block font-mono text-[10px] text-outline tracking-widest uppercase mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Protocol Upgrade v2.1"
                    className="w-full bg-transparent border border-outline px-4 py-3 text-sm font-body text-ink-900 focus:border-brass-500 focus:outline-none transition-colors placeholder:text-outline/50"
                  />
                </div>

                {/* Category & Wallet Row */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block font-mono text-[10px] text-outline tracking-widest uppercase mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-transparent border border-outline px-4 py-3 text-sm font-body text-ink-900 focus:border-brass-500 focus:outline-none transition-colors appearance-none"
                      >
                        <option>Software Development</option>
                        <option>Design</option>
                        <option>Writing</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-outline tracking-widest uppercase mb-2">
                      Freelancer Wallet (Solana)
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                        account_balance_wallet
                      </span>
                      <input
                        type="text"
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        placeholder="GvP...89xY"
                        className="w-full bg-transparent border border-outline pl-10 pr-4 py-3 text-sm font-body text-ink-900 focus:border-brass-500 focus:outline-none transition-colors placeholder:text-outline/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Scope of Work */}
                <div>
                  <label className="block font-mono text-[10px] text-outline tracking-widest uppercase mb-2">
                    Detailed Scope of Work
                  </label>
                  <textarea
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    placeholder="Outline the primary deliverables and technical constraints..."
                    rows={6}
                    className="w-full bg-transparent border border-outline px-4 py-3 text-sm font-body text-ink-900 focus:border-brass-500 focus:outline-none transition-colors resize-none placeholder:text-outline/50"
                  />
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button className="bg-brass-500 hover:bg-brass-400 text-ink-900 px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
                Configure Milestones
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
