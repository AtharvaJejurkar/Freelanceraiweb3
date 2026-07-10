import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface-dim border-t border-outline-variant py-8 w-full">
      <div className="max-w-container mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-mono text-xs font-bold text-on-surface tracking-widest">ESCROWAI</span>
          <span className="text-sm text-on-surface-variant">© 2024 ESCROWAI. NOTARIZED ON SOLANA.</span>
        </div>
        <div className="flex gap-8">
          <Link href="#" className="font-mono text-[10px] text-on-surface-variant hover:text-brass-500 transition-colors uppercase">
            Documentation
          </Link>
          <Link href="#" className="font-mono text-[10px] text-on-surface-variant hover:text-brass-500 transition-colors uppercase">
            Security Audits
          </Link>
          <Link href="#" className="font-mono text-[10px] text-on-surface-variant hover:text-brass-500 transition-colors uppercase">
            GitHub
          </Link>
          <Link href="#" className="font-mono text-[10px] text-on-surface-variant hover:text-brass-500 transition-colors uppercase">
            Privacy Ledger
          </Link>
        </div>
      </div>
    </footer>
  );
}
