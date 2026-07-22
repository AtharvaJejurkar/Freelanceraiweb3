'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { WaxSeal } from '@/components/ui/wax-seal';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Projects', href: '/dashboard/company', icon: 'account_tree', active: true },
  { label: 'Payments', href: '/dashboard/company/payments', icon: 'payments' },
  { label: 'Reputation', href: '/dashboard/company/profile', icon: 'verified_user' },
  { label: 'Audit Log', href: '/dashboard/company/audit', icon: 'history' },
];

const projects = [
  {
    id: '1',
    title: 'Escrow DApp UX',
    freelancer: '0x452...89a',
    progress: 75,
    balance: 2500,
    status: 'in_progress',
    lastActivity: '2 hours ago — Milestone 3: "Final UI Implementation"',
    hasWaxSeal: true,
  },
  {
    id: '2',
    title: 'Smart Contract Audit',
    freelancer: '0x18c...b2e',
    progress: 30,
    balance: 8000,
    status: 'in_progress',
    lastActivity: '1 day ago — "Initial Vulnerability Scan Completed"',
    hasWaxSeal: false,
  },
  {
    id: '3',
    title: 'Backend Architecture',
    freelancer: '0x992...22f',
    progress: 100,
    balance: 12450,
    status: 'completed',
    lastActivity: 'Completed',
    hasWaxSeal: true,
  },
];

const auditLogs = [
  { hash: '7a2...f91', status: 'NOTARIZED', time: '14:22:01 UTC' },
  { hash: '3c1...88d', status: 'NOTARIZED', time: '11:05:44 UTC' },
  { hash: '9e0...b42', status: 'NOTARIZED', time: '09:12:12 UTC' },
];

export default function CompanyDashboard() {
  const { publicKey, connected } = useWallet();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      if (!publicKey) return;
      const walletAddress = publicKey.toString();
      
      try {
        const res = await fetch(`/api/users?wallet_address=${walletAddress}`);
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          const mockStr = localStorage.getItem('mockUser');
          if (mockStr) setUser(JSON.parse(mockStr));
        }
      } catch (err) {
        const mockStr = localStorage.getItem('mockUser');
        if (mockStr) setUser(JSON.parse(mockStr));
      }
    }
    if (connected) {
      loadUser();
    }
  }, [connected, publicKey]);

  const displayName = user?.display_name || 'Nexus Labs';
  const initials = displayName.substring(0, 2).toUpperCase();
  const walletAddr = user?.wallet_address ? `${user.wallet_address.substring(0,6)}...${user.wallet_address.slice(-4)}` : '0x82...f92';
  const reputation = user?.reputation_score || 98;

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header role="company" reputation={reputation} walletAddress={walletAddr} />

      <div className="flex max-w-container mx-auto flex-grow">
        <SidebarNav
          items={navItems}
          userName={displayName}
          userRole="Company"
          userInitials={initials}
        />

        <main className="flex-grow p-margin-desktop min-h-screen">
          {/* Hero Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
            <div className="col-span-2 bg-ink-900 border border-outline-variant p-8 hard-shadow relative overflow-hidden group">
              <div className="relative z-10">
                <span className="font-mono text-xs text-brass-500 mb-2 block uppercase tracking-[0.2em]">
                  Institutional Liquidity
                </span>
                <h1 className="text-5xl font-headline font-bold mb-4">$45,200.00</h1>
                <p className="text-base text-on-surface-variant max-w-md">
                  Aggregate capital currently secured across active smart-contract escrows within your governance domain.
                </p>
              </div>
            </div>

            <div className="bg-surface-container border border-outline-variant p-8 hard-shadow flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-on-surface-variant mb-2 block uppercase">
                  Primary Directive
                </span>
                <h2 className="text-2xl font-headline font-semibold leading-tight">
                  Register New Freelance Work
                </h2>
              </div>
              <Link
                href="/projects/new"
                className="mt-8 bg-brass-500 text-ink-900 py-4 font-mono text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 group uppercase tracking-wider"
              >
                Initialize Contract
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Active Projects */}
          <section>
            <div className="flex justify-between items-end mb-6 border-b border-outline-variant pb-4">
              <div>
                <h3 className="text-3xl font-headline font-semibold">Active Projects</h3>
                <p className="text-sm text-on-surface-variant">Real-time ledger of verified contractual obligations.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest border border-outline-variant">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  <span className="font-mono text-[10px]">FILTER</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest border border-outline-variant">
                  <span className="material-symbols-outlined text-sm">sort</span>
                  <span className="font-mono text-[10px]">SORT BY DATE</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={cn(
                    "border transition-colors group",
                    project.status === 'completed'
                      ? "bg-surface-container-low/50 border-outline-variant grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                      : "bg-surface-container-low border-outline-variant hover:border-brass-500"
                  )}
                >
                  <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className={cn(
                          "text-xl font-headline font-semibold",
                          project.status === 'completed' ? "text-on-surface" : "text-brass-500"
                        )}>
                          {project.title}
                        </h4>
                        {project.hasWaxSeal && (
                          <WaxSeal size="sm" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-on-surface-variant">FREELANCER</span>
                        <span className="font-mono text-sm">{project.freelancer}</span>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col gap-2">
                      <div className="flex justify-between items-end mb-1">
                        <span className="font-mono text-xs text-on-surface-variant">MILESTONE PROGRESS</span>
                        <span className={cn(
                          "font-mono text-sm",
                          project.status === 'completed' ? "text-on-surface" : "text-brass-500"
                        )}>
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-surface-variant h-2 overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all duration-1000 ease-out",
                            project.status === 'completed' ? "bg-on-surface" : "bg-brass-500"
                          )}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 text-right">
                      <span className="font-mono text-xs text-on-surface-variant block mb-1">
                        {project.status === 'completed' ? 'TOTAL PAID' : 'ESCROW BALANCE'}
                      </span>
                      <span className="text-xl font-headline font-semibold">
                        ${project.balance.toLocaleString()}.00
                      </span>
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                      <div className={cn(
                        "px-4 py-1.5 font-mono text-[10px] tracking-widest flex items-center gap-2",
                        project.status === 'completed'
                          ? "bg-surface-variant text-on-surface-variant border border-outline-variant"
                          : "bg-brass-500/20 text-brass-500 border border-brass-500/30"
                      )}>
                        {project.status !== 'completed' && (
                          <span className="w-1.5 h-1.5 bg-brass-500 rounded-full animate-pulse" />
                        )}
                        {project.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
                      </div>
                    </div>
                  </div>

                  {project.status !== 'completed' && (
                    <div className="bg-surface-container-highest/30 px-6 py-2 border-t border-outline-variant flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-mono text-[11px] text-on-surface-variant">
                        Last activity: {project.lastActivity}
                      </span>
                      <button className="font-mono text-[10px] text-brass-500 hover:underline underline-offset-4">
                        VIEW FULL LEDGER
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Data Display */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="bg-surface-container border border-outline-variant p-6">
              <h4 className="font-mono text-xs text-brass-500 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">history_edu</span>
                Recent Network Audits
              </h4>
              <div className="space-y-3">
                {auditLogs.map((log, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center font-mono text-sm border-b border-outline-variant/30 pb-2"
                  >
                    <span className="text-on-surface-variant">Hash: {log.hash}</span>
                    <span className="text-brass-500">{log.status}</span>
                    <span className="text-on-surface-variant text-[10px]">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container border border-outline-variant p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full border-4 border-brass-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-brass-500 text-3xl">shield_lock</span>
              </div>
              <h5 className="text-xl font-headline font-semibold mb-2">Vault Security Active</h5>
              <p className="text-sm text-on-surface-variant mb-4">
                All transactions are multi-sig verified and anchored on the Solana ledger for immutable record keeping.
              </p>
              <a className="text-xs font-mono text-brass-500 font-bold tracking-widest hover:underline" href="#">
                SECURITY PROTOCOL v4.2
              </a>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
