'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WaxSealAnimated } from '@/components/ui/wax-seal';
import Link from 'next/link';

const stats = [
  { label: 'Total Value Escrowed', value: '$12.4M' },
  { label: 'Disputes Resolved', value: '1,240+' },
  { label: 'Avg. Resolution', value: '14m' },
];

const steps = [
  { number: '01', title: 'Locks Funds', description: 'Client deposits assets into the immutable vault.' },
  { number: '02', title: 'Delivers', description: 'Freelancer submits verifiable proof of work.' },
  { number: '03', title: 'AI Review', description: 'Neural engine validates delivery against contract.', highlight: true },
  { number: '04', title: 'Funds Released', description: 'Automatic distribution upon validation success.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[900px] flex items-center justify-center px-margin-mobile md:px-margin-desktop overflow-hidden">
          <div className="absolute inset-0 ledger-line-bg opacity-[0.03]" />

          <div className="relative z-10 max-w-4xl text-center space-y-8">
            <div className="inline-block border border-brass-500/30 bg-brass-500/5 px-4 py-1">
              <span className="font-mono text-xs text-brass-500 uppercase tracking-[0.2em]">
                Institutional Grade Verification
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-headline font-bold text-on-surface leading-tight">
              Eliminate Payment Disputes with On-Chain Escrow &amp; AI
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-body">
              Secure your capital in smart contracts notarized by AI auditors. Permanent, immutable, and settled on Solana in seconds.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                href="/onboard"
                className="bg-brass-500 text-ink-900 px-8 py-4 font-mono text-xs uppercase tracking-widest hard-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform font-bold"
              >
                Connect Wallet
              </Link>
              <button className="border border-brass-500 text-brass-500 px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-brass-500/10 transition-colors">
                See how disputes are resolved
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
            <span className="material-symbols-outlined text-[120px] text-brass-500" style={{ fontVariationSettings: "'wght' 100" }}>
              history_edu
            </span>
          </div>
          <div className="absolute top-40 right-10 hidden lg:block opacity-20">
            <span className="material-symbols-outlined text-[120px] text-brass-500" style={{ fontVariationSettings: "'wght' 100" }}>
              verified_user
            </span>
          </div>
        </section>

        {/* Role Explainer Cards */}
        <section className="py-24 bg-surface-container-low px-margin-mobile md:px-margin-desktop border-y border-outline-variant">
          <div className="max-w-container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Companies */}
              <div className="border border-outline-variant p-8 space-y-6 hover:border-brass-500/50 transition-colors bg-surface-dim">
                <span className="material-symbols-outlined text-brass-500 text-4xl">account_balance</span>
                <h3 className="text-2xl font-headline font-semibold text-on-surface">For Companies</h3>
                <p className="text-base text-on-surface-variant">
                  Lock funds in a neutral treasury. Only release once milestones meet the precise criteria of your signed agreement.
                </p>
                <ul className="space-y-3 font-mono text-sm text-on-surface-variant border-t border-outline-variant pt-4">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Capital efficiency
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Automated release
                  </li>
                </ul>
              </div>

              {/* Freelancers */}
              <div className="border border-brass-500 p-8 space-y-6 bg-surface-dim relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-brass-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-brass-500">verified</span>
                </div>
                <span className="material-symbols-outlined text-brass-500 text-4xl">work</span>
                <h3 className="text-2xl font-headline font-semibold text-on-surface">For Freelancers</h3>
                <p className="text-base text-on-surface-variant">
                  Work with 100% confidence. See funds locked on-chain before you commit a single line of code or design.
                </p>
                <ul className="space-y-3 font-mono text-sm text-on-surface-variant border-t border-outline-variant pt-4">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Payment guaranteed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Proof of reputation
                  </li>
                </ul>
              </div>

              {/* Arbitration */}
              <div className="border border-outline-variant p-8 space-y-6 hover:border-brass-500/50 transition-colors bg-surface-dim">
                <span className="material-symbols-outlined text-brass-500 text-4xl">gavel</span>
                <h3 className="text-2xl font-headline font-semibold text-on-surface">Arbitration</h3>
                <p className="text-base text-on-surface-variant">
                  Our AI Judge reviews pull requests and deliverables against the SOW to settle disputes without human bias.
                </p>
                <ul className="space-y-3 font-mono text-sm text-on-surface-variant border-t border-outline-variant pt-4">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    14min avg resolution
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Evidence-based
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop overflow-hidden">
          <div className="max-w-container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant hidden md:block z-0" />

              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`relative z-10 bg-surface border p-6 w-full md:w-1/4 group transition-all ${
                    step.highlight
                      ? 'border-brass-500 shadow-xl'
                      : 'border-outline-variant hover:border-brass-500'
                  }`}
                >
                  <div className="font-mono text-brass-500 mb-4">{step.number}</div>
                  <h4 className="font-mono text-xs uppercase mb-2">{step.title}</h4>
                  <p className="text-sm text-on-surface-variant">{step.description}</p>

                  {step.highlight && (
                    <div className="absolute -top-4 -right-4 w-12 h-12">
                      <WaxSealAnimated />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Stats */}
        <section className="py-20 border-t border-outline-variant bg-surface-container-highest">
          <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`space-y-2 ${
                    i === 1 ? 'border-y md:border-y-0 md:border-x border-outline-variant py-8 md:py-0' : ''
                  }`}
                >
                  <div className="text-3xl font-headline font-semibold text-brass-500">{stat.value}</div>
                  <div className="font-mono text-xs text-on-surface-variant uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 px-margin-mobile md:px-margin-desktop text-center border-t border-outline-variant">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-headline font-semibold">Secure your next contract today.</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/onboard"
                className="bg-brass-500 text-ink-900 px-10 py-5 font-mono text-xs uppercase tracking-widest hard-shadow font-bold"
              >
                Start First Project
              </Link>
              <button className="border border-outline text-on-surface px-10 py-5 font-mono text-xs uppercase tracking-widest hover:bg-surface-container transition-colors">
                Read Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
