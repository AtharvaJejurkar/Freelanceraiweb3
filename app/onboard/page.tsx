'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type UserRole = 'company' | 'freelancer';

const wallets = [
  { id: 'phantom', name: 'Phantom', color: '#AB9FF2', icon: 'host' },
  { id: 'solflare', name: 'Solflare', color: '#F19D1E', icon: 'light_mode' },
  { id: 'backpack', name: 'Backpack', color: '#E41C2D', icon: 'backpack' },
];

export default function OnboardPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleWalletConnect = async (walletId: string) => {
    setConnectingWallet(walletId);
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setConnectingWallet(null);
    setConnectedWallet(walletId);

    // Redirect to appropriate dashboard
    setTimeout(() => {
      if (selectedRole === 'company') {
        router.push('/dashboard/company');
      } else {
        router.push('/dashboard/freelancer');
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-surface text-on-surface flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 opacity-30 grayscale pointer-events-none ledger-line-bg" />

      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-white text-ink-900 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-5/12 bg-ink-900 text-paper-50 p-8 md:p-12 flex flex-col justify-between border-r border-outline-variant/10">
          <div className="z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="wax-seal w-10 h-10 rounded-full flex items-center justify-center border-4 border-ink-900">
                <span className="material-symbols-outlined text-paper-50 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  security
                </span>
              </div>
              <span className="font-headline text-xl font-bold text-brass-500 tracking-tight">EscrowAI</span>
            </div>
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-4 leading-tight">
              Authorize Your Entry into the Ledger.
            </h2>
            <p className="text-base text-on-surface-variant">
              Connect your Solana identity to initiate high-stakes verification protocols and access the escrow network.
            </p>
          </div>

          <div className="z-10 mt-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-brass-500 text-sm mt-1">check_circle</span>
                <div>
                  <p className="font-mono text-[10px] text-paper-50 uppercase">Verification 01</p>
                  <p className="text-sm text-on-surface-variant italic">Legal-grade contract notarization</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-brass-500 text-sm mt-1">check_circle</span>
                <div>
                  <p className="font-mono text-[10px] text-paper-50 uppercase">Verification 02</p>
                  <p className="text-sm text-on-surface-variant italic">Automated milestone enforcement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-7/12 p-8 md:p-12 space-y-8 overflow-y-auto max-h-[600px]">
          {/* Phase 01: Role Selection */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h3 className="font-mono text-[11px] text-surface-container-high tracking-widest uppercase">
                Phase 01: Define Authority
              </h3>
              <span className="font-mono text-brass-500 text-[11px]">
                {selectedRole ? `Selected: ${selectedRole.toUpperCase()}` : 'Pending Selection'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => handleRoleSelect('company')}
                className={cn(
                  "group text-left p-6 border-2 transition-all duration-300",
                  selectedRole === 'company'
                    ? "border-brass-500 bg-brass-500/5"
                    : "border-surface-container-lowest/10 hover:border-brass-500 bg-white"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "font-headline text-lg transition-colors",
                    selectedRole === 'company' ? "text-brass-500" : "text-ink-900 group-hover:text-brass-500"
                  )}>
                    I&apos;m a Company
                  </span>
                  <span className={cn(
                    "material-symbols-outlined transition-colors",
                    selectedRole === 'company' ? "text-brass-500" : "text-ink-900/30 group-hover:text-brass-500"
                  )}>
                    corporate_fare
                  </span>
                </div>
                <p className="text-sm text-surface-container-high">
                  I want to hire &amp; pay — initiate escrow contracts for top-tier freelancers with notarized security.
                </p>
              </button>

              <button
                onClick={() => handleRoleSelect('freelancer')}
                className={cn(
                  "group text-left p-6 border-2 transition-all duration-300",
                  selectedRole === 'freelancer'
                    ? "border-brass-500 bg-brass-500/5"
                    : "border-surface-container-lowest/10 hover:border-brass-500 bg-white"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "font-headline text-lg transition-colors",
                    selectedRole === 'freelancer' ? "text-brass-500" : "text-ink-900 group-hover:text-brass-500"
                  )}>
                    I&apos;m a Freelancer
                  </span>
                  <span className={cn(
                    "material-symbols-outlined transition-colors",
                    selectedRole === 'freelancer' ? "text-brass-500" : "text-ink-900/30 group-hover:text-brass-500"
                  )}>
                    badge
                  </span>
                </div>
                <p className="text-sm text-surface-container-high">
                  I want to get hired &amp; paid — showcase my verified work history and secure guaranteed milestone payments.
                </p>
              </button>
            </div>
          </section>

          {/* Phase 02: Wallet Connect */}
          <section className={cn(
            "transition-opacity duration-500",
            !selectedRole ? "opacity-40 pointer-events-none" : "opacity-100"
          )}>
            <div className="flex justify-between items-end mb-6 border-t border-outline-variant/10 pt-8">
              <h3 className="font-mono text-[11px] text-surface-container-high tracking-widest uppercase">
                Phase 02: Cryptographic Signature
              </h3>
              <span className={cn(
                "font-mono text-[11px]",
                connectedWallet ? "text-verified-600" : "text-outline"
              )}>
                {connectedWallet ? 'Connected' : selectedRole ? 'Ready' : 'Awaiting Phase 01'}
              </span>
            </div>

            <div className="space-y-3">
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletConnect(wallet.id)}
                  disabled={!selectedRole || connectingWallet !== null}
                  className={cn(
                    "w-full flex items-center justify-between p-4 border transition-colors group",
                    connectedWallet === wallet.id
                      ? "border-verified-600 bg-verified-600/5"
                      : "border-ink-900/20 hover:bg-ink-900/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{ backgroundColor: wallet.color }}
                    >
                      <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {wallet.icon}
                      </span>
                    </div>
                    <span className={cn(
                      "font-mono transition-all",
                      connectedWallet === wallet.id ? "text-verified-600 font-bold" : "text-ink-900 group-hover:font-bold"
                    )}>
                      {wallet.name}
                    </span>
                  </div>
                  <span className={cn(
                    "font-mono text-[10px]",
                    connectedWallet === wallet.id
                      ? "text-verified-600"
                      : connectingWallet === wallet.id
                        ? "text-brass-500"
                        : "text-ink-900/40 group-hover:text-brass-500"
                  )}>
                    {connectedWallet === wallet.id
                      ? 'CONNECTED'
                      : connectingWallet === wallet.id
                        ? 'AUTHENTICATING...'
                        : 'ESTABLISH LINK'}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-ink-900/40">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span className="text-[11px] uppercase tracking-tight font-mono">Encrypted Handshake Protocol v2.4.0</span>
            </div>
            <p className="text-sm text-ink-900/60 italic">
              By connecting your wallet, you agree to the notarized ledger protocols and terms of escrow established on the Solana network.
            </p>
          </footer>
        </div>

        {/* Close Button */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 text-ink-900/40 hover:text-brass-500 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
}
