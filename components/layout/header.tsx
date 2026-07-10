'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeaderProps {
  role?: 'company' | 'freelancer' | 'admin';
  reputation?: number;
  walletAddress?: string;
  onConnectWallet?: () => void;
}

export function Header({ role, reputation = 98, walletAddress, onConnectWallet }: HeaderProps) {
  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant">
      <div className="flex justify-between items-center w-full px-margin-desktop h-20 max-w-container mx-auto">
        <Link href="/" className="flex items-center gap-4">
          <span className="text-2xl font-headline font-bold text-brass-500">EscrowAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              "text-sm font-mono uppercase tracking-wider transition-colors",
              !role ? "text-brass-500 font-bold border-b-2 border-brass-500 pb-1" : "text-on-surface-variant hover:text-brass-500"
            )}
          >
            Projects
          </Link>
          <Link
            href="/"
            className="text-sm font-mono uppercase tracking-wider text-on-surface-variant hover:text-brass-500 transition-colors"
          >
            Contracts
          </Link>
          <Link
            href="/"
            className="text-sm font-mono uppercase tracking-wider text-on-surface-variant hover:text-brass-500 transition-colors"
          >
            Reputation
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          {role && (
            <div className="flex items-center gap-3 px-4 py-2 bg-surface-container-low border border-outline-variant">
              <span className="font-mono text-xs text-on-surface-variant uppercase">Reputation</span>
              <span className="font-mono text-brass-500 font-bold">{reputation}%</span>
            </div>
          )}
          <button
            onClick={onConnectWallet}
            className="bg-brass-500 text-ink-900 font-mono text-xs px-6 py-2.5 font-bold hover:opacity-80 transition-opacity uppercase tracking-wider"
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </header>
  );
}
