'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function VaultLedgerPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Header />

      <div className="flex w-full flex-grow border-t border-outline-variant/30">
        {/* Sidebar */}
        <aside className="w-64 bg-surface border-r border-outline-variant/30 flex flex-col pt-8">
          <div className="px-6 mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded-sm">
              <span className="material-symbols-outlined text-brass-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                admin_panel_settings
              </span>
            </div>
            <div>
              <div className="font-headline text-lg font-bold text-brass-500">System Admin</div>
              <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">Network Authority</div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 flex-grow">
            <Link href="/admin" className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">view_list</span>
              <span className="font-mono text-xs tracking-widest">Global Queue</span>
            </Link>
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">group</span>
              <span className="font-mono text-xs tracking-widest">User Directory</span>
            </div>
            <div className="flex items-center gap-4 bg-brass-500/10 border-l-2 border-brass-500 px-6 py-3 text-brass-500">
              <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
              <span className="font-mono text-xs tracking-widest">Revenue</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors cursor-pointer text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span className="font-mono text-xs tracking-widest">System Alerts</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-surface-dim p-10 max-w-[1200px] overflow-hidden">
          <div className="mb-12">
            <h1 className="text-4xl font-headline font-bold text-on-surface mb-4 tracking-wider">
              Vault Ledger
            </h1>
            <p className="text-sm font-body text-on-surface-variant max-w-2xl leading-relaxed">
              A permanent, notarized record of all financial movements within the EscrowAI ecosystem. Immutable and verified on Solana.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Available Balance */}
            <div className="bg-surface border border-outline-variant p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Available Balance</h3>
                <span className="material-symbols-outlined text-brass-500 text-lg">account_balance_wallet</span>
              </div>
              <div className="text-3xl font-mono font-bold text-brass-500 mb-2">42,850.00<br/>SOL</div>
              <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">≈ $4,285,000.00 USD</div>
            </div>

            {/* Locked in Escrow */}
            <div className="bg-surface border border-outline-variant p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Locked In Escrow</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-lg">lock</span>
              </div>
              <div className="text-3xl font-mono font-bold text-on-surface mb-2">15,200.50<br/>SOL</div>
              <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">14 Active Contracts</div>
            </div>

            {/* Total Released */}
            <div className="bg-surface border border-outline-variant p-6 relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-mono text-[10px] text-brass-500 uppercase tracking-widest font-bold">Total Released</h3>
                <span className="material-symbols-outlined text-brass-500 text-lg">verified</span>
              </div>
              <div className="text-3xl font-mono font-bold text-brass-500 mb-2">128,430.00<br/>SOL</div>
              <div className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">Since Inception</div>
            </div>
          </div>

          {/* Filters & Export */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-6">
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
                  Project Filter
                </label>
                <div className="relative">
                  <select className="w-48 bg-surface-container border border-outline-variant px-4 py-2 text-sm font-mono text-on-surface focus:border-brass-500 focus:outline-none transition-colors appearance-none">
                    <option>All Projects</option>
                    <option>Layer 2 DEX</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
                  Date Range
                </label>
                <div className="relative">
                  <input type="text" placeholder="mm/dd/yyyy" className="w-48 bg-surface-container border border-outline-variant pl-4 pr-10 py-2 text-sm font-mono text-on-surface focus:border-brass-500 focus:outline-none transition-colors placeholder:text-outline-variant" />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                    calendar_today
                  </span>
                </div>
              </div>

              <button className="bg-surface-container border border-outline-variant hover:border-brass-500 hover:text-brass-500 text-on-surface-variant px-6 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Apply Filters
              </button>
            </div>

            <button className="text-on-surface hover:text-brass-500 font-mono text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span>
              Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="bg-surface-container border border-outline-variant mb-12">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/50 font-mono text-[10px] text-outline-variant uppercase tracking-widest">
              <div className="col-span-2">Type</div>
              <div className="col-span-3 text-right">Amount</div>
              <div className="col-span-3 text-center">TX Hash</div>
              <div className="col-span-2">Timestamp</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            <div className="divide-y divide-outline-variant/30">
              {/* Release */}
              <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-dim transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-brass-500 text-sm rotate-45">arrow_upward</span>
                  <span className="font-mono text-sm text-on-surface">Release</span>
                </div>
                <div className="col-span-3 text-right font-mono text-sm font-bold text-brass-500">1,250.00 SOL</div>
                <div className="col-span-3 text-center font-mono text-xs text-outline-variant">5x9A...k7L2m8</div>
                <div className="col-span-2 font-mono text-[10px] text-on-surface-variant uppercase">2024-05-24 14:22:10</div>
                <div className="col-span-2 text-right flex items-center justify-end gap-2">
                  <span className="material-symbols-outlined text-[14px] text-verified-600">check_circle</span>
                  <span className="font-mono text-[10px] text-verified-600 uppercase">Notarized</span>
                </div>
              </div>

              {/* Deposit */}
              <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-dim transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-verified-600 text-sm">login</span>
                  <span className="font-mono text-sm text-on-surface">Deposit</span>
                </div>
                <div className="col-span-3 text-right font-mono text-sm font-bold text-on-surface">5,000.00 SOL</div>
                <div className="col-span-3 text-center font-mono text-xs text-outline-variant">7w2B...p9Q1u4</div>
                <div className="col-span-2 font-mono text-[10px] text-on-surface-variant uppercase">2024-05-23 09:15:44</div>
                <div className="col-span-2 text-right flex items-center justify-end gap-2">
                  <span className="material-symbols-outlined text-[14px] text-verified-600">check_circle</span>
                  <span className="font-mono text-[10px] text-verified-600 uppercase">Notarized</span>
                </div>
              </div>

              {/* Fee */}
              <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-dim transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-pink-400 text-sm">receipt_long</span>
                  <span className="font-mono text-sm text-on-surface">Fee</span>
                </div>
                <div className="col-span-3 text-right font-mono text-sm text-on-surface">12.50 SOL</div>
                <div className="col-span-3 text-center font-mono text-xs text-outline-variant">1a8Z...h4Y0v9</div>
                <div className="col-span-2 font-mono text-[10px] text-on-surface-variant uppercase">2024-05-23 09:15:44</div>
                <div className="col-span-2 text-right flex items-center justify-end gap-2">
                  <span className="material-symbols-outlined text-[14px] text-verified-600">check_circle</span>
                  <span className="font-mono text-[10px] text-verified-600 uppercase">Notarized</span>
                </div>
              </div>

              {/* Release 2 */}
              <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-dim transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-brass-500 text-sm rotate-45">arrow_upward</span>
                  <span className="font-mono text-sm text-on-surface">Release</span>
                </div>
                <div className="col-span-3 text-right font-mono text-sm font-bold text-brass-500">2,400.00 SOL</div>
                <div className="col-span-3 text-center font-mono text-xs text-outline-variant">9c3D...f2M1x5</div>
                <div className="col-span-2 font-mono text-[10px] text-on-surface-variant uppercase">2024-05-22 18:01:12</div>
                <div className="col-span-2 text-right flex items-center justify-end gap-2">
                  <span className="material-symbols-outlined text-[14px] text-verified-600">check_circle</span>
                  <span className="font-mono text-[10px] text-verified-600 uppercase">Notarized</span>
                </div>
              </div>

              {/* Deposit 2 */}
              <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-dim transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-verified-600 text-sm">login</span>
                  <span className="font-mono text-sm text-on-surface">Deposit</span>
                </div>
                <div className="col-span-3 text-right font-mono text-sm font-bold text-on-surface">10,000.00 SOL</div>
                <div className="col-span-3 text-center font-mono text-xs text-outline-variant">4m1N...t8R5w3</div>
                <div className="col-span-2 font-mono text-[10px] text-on-surface-variant uppercase">2024-05-20 11:30:00</div>
                <div className="col-span-2 text-right flex items-center justify-end gap-2">
                  <span className="material-symbols-outlined text-[14px] text-verified-600">check_circle</span>
                  <span className="font-mono text-[10px] text-verified-600 uppercase">Notarized</span>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 border-t border-outline-variant/50">
              <span className="font-mono text-[9px] text-outline-variant uppercase tracking-widest">
                Showing 1-15 of 1,248 Transactions
              </span>
              <div className="flex gap-1">
                <button className="w-8 h-8 border border-outline-variant/50 flex items-center justify-center text-outline-variant hover:text-on-surface hover:border-outline-variant transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 bg-brass-500 text-ink-900 font-mono text-xs font-bold">1</button>
                <button className="w-8 h-8 border border-outline-variant/50 text-on-surface-variant font-mono text-xs hover:border-outline-variant hover:text-on-surface transition-colors">2</button>
                <button className="w-8 h-8 border border-outline-variant/50 text-on-surface-variant font-mono text-xs hover:border-outline-variant hover:text-on-surface transition-colors">3</button>
                <button className="w-8 h-8 border border-outline-variant/50 flex items-center justify-center text-outline-variant hover:text-on-surface hover:border-outline-variant transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Proof of Custody Block */}
          <div className="bg-surface-container border border-outline-variant p-8 relative overflow-hidden">
            <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[200px] text-surface-container-highest opacity-50 pointer-events-none select-none">
              verified_user
            </span>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl font-headline font-bold text-brass-500 mb-4">Proof of Custody</h2>
              <p className="text-sm font-body text-on-surface-variant leading-relaxed mb-6">
                Every transaction on this ledger is mirrored on the Solana Mainnet. The protocol reserves a 1:1 asset backing in segregated cold storage vaults, ensuring absolute liquidity for every active contract.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-surface-dim border border-outline-variant/50 px-4 py-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-brass-500 text-sm">account_balance</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest">Vault Cluster: #SOL-092-VAULT</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-dim border border-outline-variant/50 px-4 py-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-brass-500 text-sm">sync</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest">Last Notary Sync: 4 mins ago</span>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
