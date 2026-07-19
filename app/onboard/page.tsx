'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

// Local type definitions for Solana wallet adapter
// (avoids IDE resolution issues while keeping full type safety)
interface WalletAdapter {
  name: string;
  icon: string;
  readyState: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

interface WalletInfo {
  adapter: WalletAdapter;
  readyState: string;
}

interface DisplayWallet {
  name: string;
  color: string;
  icon: string;
  iconUrl: string | null;
  installed: boolean;
}

type UserRole = 'company' | 'freelancer';

// Fallback wallet info for display when extensions aren't detected yet
const knownWallets = [
  { name: 'Phantom', color: '#AB9FF2', icon: 'host' },
  { name: 'Solflare', color: '#F19D1E', icon: 'light_mode' },
];

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';

export default function OnboardPage() {
  const router = useRouter();
  const {
    select,
    connect,
    publicKey,
    connected,
    connecting,
    wallets,
    wallet,
    disconnect,
  } = useWallet();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Once connected, authenticate via API (falls back to localStorage on failure)
  useEffect(() => {
    async function authenticateUser() {
      if (connected && publicKey && selectedRole && !isAuthenticating) {
        setIsAuthenticating(true);
        try {
          const walletAddress = publicKey.toString();
          let existingUser = null;
          let apiAvailable = false;

          // Try fetching from our new Next.js API
          try {
            const res = await fetch(`/api/users?wallet_address=${walletAddress}`);
            if (res.ok) {
              existingUser = await res.json();
              apiAvailable = true;
            } else if (res.status === 404) {
              // User not found, proceed to creation
              apiAvailable = true;
            } else {
              console.warn("API fetch error, falling back to local storage.", await res.text());
            }
          } catch (networkError) {
            console.warn("API unreachable. Using local storage.", networkError);
          }

          if (apiAvailable && !existingUser) {
            // Try to register new user via API
            try {
              const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  wallet_address: walletAddress, 
                  role: selectedRole,
                  display_name: `User_${walletAddress.substring(0, 4)}`,
                  reputation_score: 100
                })
              });
              
              if (!res.ok) {
                console.warn("API insert error. Falling back to local storage.", await res.text());
              } else {
                existingUser = await res.json();
              }
            } catch (insertNetworkError) {
              console.warn("API insert failed (network). Using local storage.", insertNetworkError);
            }
          }

          // Always save to localStorage as fallback
          if (!existingUser) {
            localStorage.setItem('mockUser', JSON.stringify({
              id: 'mock-user-id',
              wallet_address: walletAddress,
              role: selectedRole,
              display_name: `User_${walletAddress.substring(0, 4)}`,
              reputation_score: 100,
              total_earned: 0,
              total_escrowed: 0,
              projects_completed: 0,
              disputes_won: 0
            }));
          }

          // Redirect to appropriate dashboard
          const mockUserStr = localStorage.getItem('mockUser');
          const mockUser = mockUserStr ? JSON.parse(mockUserStr) : null;
          const redirectRole = existingUser?.role || mockUser?.role || selectedRole;
          
          if (redirectRole === 'company') {
            router.push('/dashboard/company');
          } else {
            router.push('/dashboard/freelancer');
          }

        } catch (error: any) {
          console.error("Authentication Error:", error);
          setAuthError(error.message || "Failed to authenticate with ledger.");
          setIsAuthenticating(false);
        }
      }
    }

    authenticateUser();
  }, [connected, publicKey, selectedRole, router, isAuthenticating]);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleWalletConnect = useCallback(async (walletName: string) => {
    setAuthError(null);
    if (!selectedRole) return;
    
    try {
      // Step 1: Select the wallet
      select(walletName as WalletName);
      
      // Step 2: Small delay to allow the adapter to register the selection,
      // then explicitly connect to trigger the browser extension popup
      setTimeout(async () => {
        try {
          await connect();
        } catch (err: any) {
          // WalletNotReadyError means the extension isn't installed
          if (err.name === 'WalletNotReadyError') {
            setAuthError(`${walletName} wallet extension not found. Please install it from your browser's extension store.`);
          } else if (err.name === 'WalletConnectionError') {
            setAuthError('Connection was rejected. Please try again.');
          } else {
            console.error("Connect error:", err);
            setAuthError(err.message || "Failed to connect wallet.");
          }
        }
      }, 100);
    } catch (error: any) {
      console.error("Wallet selection error:", error);
      setAuthError("Failed to initialize wallet connection.");
    }
  }, [selectedRole, select, connect]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Build display list: use detected wallets if available, otherwise show known wallets
  const detectedWallets: WalletInfo[] = mounted ? wallets.filter((w: WalletInfo) => w.readyState === 'Installed') : [];
  
  const displayWallets: DisplayWallet[] = detectedWallets.length > 0
    ? detectedWallets.map((w: WalletInfo): DisplayWallet => ({
        name: w.adapter.name,
        color: knownWallets.find((kw) => kw.name === w.adapter.name)?.color || '#666',
        icon: knownWallets.find((kw) => kw.name === w.adapter.name)?.icon || 'account_balance_wallet',
        iconUrl: w.adapter.icon,
        installed: true,
      }))
    : knownWallets.map((kw): DisplayWallet => ({ ...kw, iconUrl: null, installed: false }));

  return (
    <div className="fixed inset-0 w-full h-full bg-surface text-on-surface flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 opacity-30 grayscale pointer-events-none ledger-line-bg" />

      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-surface-container text-on-surface shadow-2xl flex flex-col md:flex-row overflow-hidden border border-outline-variant/20 rounded-xl">
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
              <h3 className="font-mono text-[11px] text-on-surface-variant tracking-widest uppercase">
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
                    : "border-outline-variant/20 hover:border-brass-500 bg-surface-container-high"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "font-headline text-lg transition-colors",
                    selectedRole === 'company' ? "text-brass-500" : "text-on-surface group-hover:text-brass-500"
                  )}>
                    I&apos;m a Company
                  </span>
                  <span className={cn(
                    "material-symbols-outlined transition-colors",
                    selectedRole === 'company' ? "text-brass-500" : "text-on-surface-variant group-hover:text-brass-500"
                  )}>
                    corporate_fare
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant">
                  I want to hire &amp; pay — initiate escrow contracts for top-tier freelancers with notarized security.
                </p>
              </button>

              <button
                onClick={() => handleRoleSelect('freelancer')}
                className={cn(
                  "group text-left p-6 border-2 transition-all duration-300",
                  selectedRole === 'freelancer'
                    ? "border-brass-500 bg-brass-500/5"
                    : "border-outline-variant/20 hover:border-brass-500 bg-surface-container-high"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "font-headline text-lg transition-colors",
                    selectedRole === 'freelancer' ? "text-brass-500" : "text-on-surface group-hover:text-brass-500"
                  )}>
                    I&apos;m a Freelancer
                  </span>
                  <span className={cn(
                    "material-symbols-outlined transition-colors",
                    selectedRole === 'freelancer' ? "text-brass-500" : "text-on-surface-variant group-hover:text-brass-500"
                  )}>
                    badge
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant">
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
            <div className="flex justify-between items-end mb-6 border-t border-outline-variant/20 pt-8">
              <h3 className="font-mono text-[11px] text-on-surface-variant tracking-widest uppercase">
                Phase 02: Cryptographic Signature
              </h3>
              <span className={cn(
                "font-mono text-[11px]",
                connected ? "text-verified-600" : "text-outline"
              )}>
                {connected ? 'Connected' : selectedRole ? 'Ready' : 'Awaiting Phase 01'}
              </span>
            </div>

            <div className="space-y-3">
              {displayWallets.map((w) => {
                const isThisWalletConnecting = connecting && wallet?.adapter.name === w.name;
                const isThisWalletConnected = connected && wallet?.adapter.name === w.name;

                return (
                  <button
                    key={w.name}
                    onClick={() => handleWalletConnect(w.name)}
                    disabled={!selectedRole || connecting || isAuthenticating}
                    className={cn(
                      "w-full flex items-center justify-between p-4 border transition-colors group",
                      isThisWalletConnected
                        ? "border-verified-600 bg-verified-600/5"
                        : "border-outline-variant/20 bg-surface-container-high hover:border-brass-500/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {w.iconUrl ? (
                        <img src={w.iconUrl} alt={w.name} className="w-8 h-8 rounded" />
                      ) : (
                        <div
                          className="w-8 h-8 rounded flex items-center justify-center"
                          style={{ backgroundColor: w.color }}
                        >
                          <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {w.icon}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col items-start">
                        <span className={cn(
                          "font-mono transition-all",
                          isThisWalletConnected ? "text-verified-600 font-bold" : "text-on-surface group-hover:font-bold"
                        )}>
                          {w.name}
                        </span>
                        {!w.installed && (
                          <span className="text-[9px] text-on-surface-variant font-mono">NOT DETECTED — CLICK TO TRY</span>
                        )}
                      </div>
                    </div>
                    <span className={cn(
                      "font-mono text-[10px]",
                      isThisWalletConnected
                        ? "text-verified-600"
                        : isThisWalletConnecting || isAuthenticating
                          ? "text-brass-500"
                          : "text-on-surface-variant group-hover:text-brass-500"
                    )}>
                      {isThisWalletConnected
                        ? 'AUTHENTICATED'
                        : isThisWalletConnecting
                          ? 'SIGNING...'
                          : isAuthenticating
                            ? 'AUTHENTICATING...'
                            : 'ESTABLISH LINK'}
                    </span>
                  </button>
                );
              })}
            </div>

            {authError && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs font-mono rounded border border-red-100">
                <span className="font-bold">ERROR:</span> {authError}
              </div>
            )}
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
