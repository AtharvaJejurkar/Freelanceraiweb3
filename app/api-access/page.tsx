'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ApiAccessPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-32">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop mb-32 max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block border border-brass-500/30 px-3 py-1 mb-6">
              <span className="font-mono text-[10px] text-brass-500 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">api</span>
                Enterprise API Access
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-headline font-bold text-on-surface mb-6 leading-tight">
              Embed Truth into <span className="italic text-brass-500">Every Transaction.</span>
            </h1>
            
            <p className="text-lg text-on-surface-variant font-body mb-8">
              The ultimate high-stakes verification engine for global marketplaces. Integrate EscrowAI's notarized ledger directly into your platform to secure payments, automate milestones, and build institutional trust on Solana.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brass-500 hover:bg-brass-400 text-ink-900 px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                Request API Key
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button className="border border-outline-variant hover:border-brass-500 text-on-surface px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-colors">
                View Documentation
              </button>
            </div>
          </div>

          <div className="bg-surface-container border border-outline-variant relative p-8 shadow-hard">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-surface border border-brass-500 flex items-center justify-center text-brass-500">
              <span className="material-symbols-outlined">lock</span>
            </div>
            
            <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-6">
              System Identity Check
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
                <span className="font-mono text-sm text-outline-variant">NODE_STATUS</span>
                <span className="font-mono text-sm text-verified-600 font-bold">STABLE</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
                <span className="font-mono text-sm text-outline-variant">LEDGER_SYNC</span>
                <span className="font-mono text-sm text-brass-500 font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="font-mono text-sm text-outline-variant">UPTIME</span>
                <span className="font-mono text-sm text-on-surface">99.998%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / Tiers */}
        <section className="px-margin-mobile md:px-margin-desktop mb-32 bg-surface-container-low py-24 border-y border-outline-variant">
          <div className="max-w-container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-headline font-bold mb-4">Institutional Grade Access</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                Scalable infrastructure for businesses that prioritize security and permanence over speed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Tier 1 */}
              <div className="bg-surface border border-outline-variant p-8 relative hover:border-outline transition-colors">
                <div className="font-mono text-[10px] text-outline-variant uppercase tracking-widest mb-2">Tier I</div>
                <h3 className="text-xl font-headline font-bold mb-6">Basic</h3>
                
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-4xl font-headline font-bold text-brass-500">$299</span>
                  <span className="font-mono text-[10px] text-outline-variant uppercase">/ Month</span>
                </div>
                
                <ul className="space-y-4 mb-8 font-mono text-xs text-on-surface">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    1,000 Verified Smart Contracts
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Standard Ledger Sync
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Community Support
                  </li>
                </ul>
                
                <button className="w-full border border-outline-variant hover:border-brass-500 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors font-bold">
                  Get Started
                </button>
              </div>

              {/* Tier 2 */}
              <div className="bg-surface border-2 border-brass-500 p-8 relative shadow-[0_0_20px_rgba(184,134,59,0.15)] transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brass-500 text-ink-900 px-4 py-1 font-mono text-[9px] uppercase tracking-widest font-bold">
                  Most Popular
                </div>
                <div className="font-mono text-[10px] text-brass-500 uppercase tracking-widest mb-2 mt-2">Tier II</div>
                <h3 className="text-xl font-headline font-bold mb-6">Professional</h3>
                
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-4xl font-headline font-bold text-brass-500">$899</span>
                  <span className="font-mono text-[10px] text-outline-variant uppercase">/ Month</span>
                </div>
                
                <ul className="space-y-4 mb-8 font-mono text-xs text-on-surface">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    10,000 Verified Smart Contracts
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Priority Webhooks & Callbacks
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Multi-Signature Support
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    24h SLA Response
                  </li>
                </ul>
                
                <button className="w-full bg-brass-500 hover:bg-brass-400 text-ink-900 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors font-bold">
                  Deploy Now
                </button>
              </div>

              {/* Tier 3 */}
              <div className="bg-surface border border-outline-variant p-8 relative hover:border-outline transition-colors">
                <div className="font-mono text-[10px] text-outline-variant uppercase tracking-widest mb-2">Tier III</div>
                <h3 className="text-xl font-headline font-bold mb-6 text-on-surface">Enterprise</h3>
                
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-4xl font-headline font-bold text-brass-500">Custom</span>
                </div>
                
                <ul className="space-y-4 mb-8 font-mono text-xs text-on-surface">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Unlimited API Calls
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    Dedicated Node Infrastructure
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    On-site Engineering Support
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brass-500 text-sm">check_circle</span>
                    White-label Rep Score
                  </li>
                </ul>
                
                <button className="w-full border border-outline-variant hover:border-brass-500 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors font-bold">
                  Inquire
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="px-margin-mobile md:px-margin-desktop mb-32 max-w-container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-headline font-bold mb-6 leading-tight">
              Designed for Seamless Hardcoding.
            </h2>
            <p className="text-on-surface-variant font-body mb-8">
              Our API follows the principles of structural integrity. Integrate with just a few lines of code to create escrow accounts that are legally immutable and cryptographically sound.
            </p>

            <div className="space-y-4 mb-8">
              <div className="border border-outline-variant bg-surface-container p-6 flex gap-4">
                <span className="material-symbols-outlined text-brass-500">integration_instructions</span>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest font-bold mb-2">Simple SDK</h4>
                  <p className="text-sm text-on-surface-variant">NPM and Rust crates ready for immediate deployment on Solana mainnet.</p>
                </div>
              </div>
              <div className="border border-outline-variant bg-surface p-6 flex gap-4 hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-brass-500">webhook</span>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest font-bold mb-2">Real-Time Webhooks</h4>
                  <p className="text-sm text-on-surface-variant">Get notified instantly when funds are deposited, milestones released, or disputes filed.</p>
                </div>
              </div>
            </div>

            <button className="border border-brass-500 text-brass-500 hover:bg-brass-500/10 px-8 py-3 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-colors">
              Explore SDK
              <span className="material-symbols-outlined text-sm">description</span>
            </button>
          </div>

          {/* Code Snippet Window */}
          <div className="bg-surface-container border border-outline-variant rounded-md overflow-hidden shadow-2xl">
            {/* Mac Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/30 bg-surface-dim">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <div className="ml-4 font-mono text-[10px] text-outline-variant">index.ts — escrow-api-test/src</div>
            </div>
            
            <div className="p-6 font-mono text-xs leading-loose overflow-x-auto text-on-surface">
              <div><span className="text-blue-400">const</span> <span className="text-blue-200">escrow</span> = <span className="text-blue-400">await</span> escrowai.<span className="text-yellow-200">create</span>({'{'}</div>
              <div className="pl-4">client: <span className="text-green-400">"0x1...v0R"</span>,</div>
              <div className="pl-4">contractor: <span className="text-green-400">"GvP...f38"</span>,</div>
              <div className="pl-4">milestones: {'['}</div>
              <div className="pl-8">{'{'} label: <span className="text-green-400">"Initial Audit"</span>, amount: <span className="text-orange-400">2.5</span> {'}'},</div>
              <div className="pl-8">{'{'} label: <span className="text-green-400">"Final Delivery"</span>, amount: <span className="text-orange-400">7.5</span> {'}'}</div>
              <div className="pl-4">{']'},</div>
              <div className="pl-4">notary: <span className="text-blue-400">true</span>,</div>
              <div className="pl-4">encryption: <span className="text-green-400">"AES-256-GCM"</span></div>
              <div>{'}'});</div>
              <br/>
              <div>console.<span className="text-yellow-200">log</span>(<span className="text-green-400">"Vault created:"</span>, escrow.vault_id);</div>
            </div>
            
            <div className="px-4 py-2 border-t border-outline-variant/30 bg-surface-dim flex justify-between items-center text-[10px] font-mono text-outline-variant">
              <span>RESPONSE TIME: 142MS</span>
              <span className="flex items-center gap-1 cursor-pointer hover:text-on-surface">COPY CODE <span className="material-symbols-outlined text-[12px]">content_copy</span></span>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-margin-mobile md:px-margin-desktop py-24 text-center border-t border-outline-variant/30">
          <div className="max-w-2xl mx-auto space-y-8 flex flex-col items-center">
            <div className="w-16 h-16 border border-brass-500 rounded flex items-center justify-center text-brass-500 mb-4">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <h2 className="text-3xl font-headline font-bold">Secure Your Reputation.</h2>
            <p className="text-on-surface-variant max-w-xl">
              EscrowAI is the standard for decentralized trust. Join the network of 500+ enterprises building the future of work.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button className="bg-brass-500 hover:bg-brass-400 text-ink-900 px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-colors">
                Contact Sales
              </button>
              <button className="border border-outline hover:border-brass-500 text-on-surface px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
