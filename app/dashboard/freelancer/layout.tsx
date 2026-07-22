'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LogOut, User as UserIcon, Settings } from 'lucide-react';

const navItems = [
  { label: 'Projects', href: '/dashboard/freelancer', icon: 'dashboard', exact: true },
  { label: 'Contracts', href: '/dashboard/freelancer/contracts', icon: 'contract' },
  { label: 'Earnings', href: '/dashboard/freelancer/earnings', icon: 'payments' },
  { label: 'Profile', href: '/dashboard/freelancer/profile', icon: 'person' },
];

export default function FreelancerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const pathname = usePathname();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!connected) {
      setLoading(false);
      return;
    }

    async function loadUser() {
      if (!publicKey) return;
      const walletAddress = publicKey.toString();

      try {
        let userData = null;
        try {
          const res = await fetch(`/api/users?wallet_address=${walletAddress}`);
          if (res.ok) {
            userData = await res.json();
          } else {
            throw new Error(await res.text());
          }
        } catch (userError) {
          const mockStr = localStorage.getItem('mockUser');
          if (mockStr) {
            userData = JSON.parse(mockStr);
          }
        }
        
        setUser(userData);
      } catch (err) {
        console.error('Error loading dashboard user:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [connected, publicKey]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-brass-500">
          sync
        </span>
      </div>
    );
  }

  if (!connected || !user) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center space-y-6 text-center">
        <h2 className="text-2xl font-headline font-bold text-on-surface">Access Denied</h2>
        <p className="text-on-surface-variant max-w-md">
          You must cryptographically sign in with your Solana wallet to access the decentralized ledger.
        </p>
        <button 
          onClick={() => router.push('/onboard')}
          className="bg-brass-500 text-ink-900 px-8 py-3 font-mono text-sm font-bold tracking-widest uppercase hover:brightness-110"
        >
          Initialize Handshake
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col h-screen py-6 bg-surface-container-low border-r border-outline-variant w-64 shrink-0 overflow-y-auto">
        <div className="px-6 mb-8">
          <h1 className="text-xl font-headline font-bold text-brass-500">EscrowAI</h1>
          <p className="font-mono text-[10px] text-on-surface-variant tracking-widest mt-1">
            SECURE LEDGER V.1.04
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-transform duration-200",
                  isActive
                    ? "text-brass-500 bg-brass-500/10 border-l-4 border-brass-500 translate-x-1"
                    : "text-on-surface-variant hover:bg-surface-container"
                )}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-mono text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-4 space-y-1 pt-6 border-t border-outline-variant">
          <Link href="#" className="flex items-center gap-3 text-on-surface-variant px-4 py-2 text-sm hover:text-brass-500 transition-colors">
            <span className="material-symbols-outlined text-sm">description</span>
            <span className="font-mono text-xs">Documentation</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 text-on-surface-variant px-4 py-2 text-sm hover:text-brass-500 transition-colors">
            <span className="material-symbols-outlined text-sm">help</span>
            <span className="font-mono text-xs">Support</span>
          </Link>

          <div className="px-4 py-4 mt-4 bg-surface-container-highest border border-outline-variant">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-surface-container transition-colors p-2 -mx-2 rounded-md">
                  <div className="w-8 h-8 rounded-full bg-brass-500 flex items-center justify-center text-ink-900 font-bold text-sm">
                    {user.display_name?.substring(0, 2).toUpperCase() || 'US'}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-mono text-xs text-on-surface">{user.display_name}</p>
                    <p className="text-[10px] text-on-surface-variant capitalize">{user.role}</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">expand_more</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-surface-container border-outline-variant text-on-surface">
                <DropdownMenuItem 
                  onClick={() => router.push('/dashboard/freelancer/profile')}
                  className="cursor-pointer hover:bg-surface-container-high hover:text-brass-500"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span className="font-mono text-xs uppercase">View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-surface-container-high hover:text-brass-500"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="font-mono text-xs uppercase">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => router.push('/onboard')}
                  className="cursor-pointer text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-mono text-xs uppercase">Disconnect Wallet</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-surface-dim">
        <header className="sticky top-0 z-30 w-full bg-surface/80 backdrop-blur-md border-b border-outline-variant">
          <div className="max-w-container mx-auto px-6 md:px-margin-desktop h-20 flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-2xl font-headline font-semibold text-brass-500">Freelancer Dashboard</h2>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-tighter">
                Verified Node: {user.wallet_address.substring(0, 4)}...{user.wallet_address.slice(-4)}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex flex-col items-end">
                <span className="font-mono text-xs text-on-surface-variant">Reputation Score</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-brass-500 font-bold text-lg">{user.reputation_score}%</span>
                  <span className="px-2 py-0.5 bg-brass-500/10 text-brass-500 border border-brass-500/30 text-[10px] font-bold uppercase">
                    {user.reputation_score > 90 ? 'Fast Payer' : 'Standard'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {children}

        {/* Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-low border-t border-outline-variant flex justify-around items-center px-4 z-50">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1",
                  isActive ? "text-brass-500" : "text-on-surface-variant"
                )}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-[10px] font-mono uppercase">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <Footer />
      </main>
    </div>
  );
}
