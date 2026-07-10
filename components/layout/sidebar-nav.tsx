'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SidebarNavItem {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  userName?: string;
  userRole?: string;
  userInitials?: string;
}

export function SidebarNav({ items, userName, userRole, userInitials = 'JD' }: SidebarNavProps) {
  return (
    <aside className="hidden md:flex flex-col h-[calc(100vh-80px)] w-64 py-6 bg-surface-container-low border-r border-outline-variant sticky top-20">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-brass-500/10 flex items-center justify-center border border-brass-500/30 rounded-full">
          <span className="material-symbols-outlined text-brass-500" style={{ fontVariationSettings: "'FILL' 1" }}>
            shield_person
          </span>
        </div>
        <div>
          <div className="font-headline text-lg font-bold text-brass-500">{userName || 'System Admin'}</div>
          <div className="font-mono text-[10px] text-on-surface-variant uppercase">{userRole || 'Network Authority'}</div>
        </div>
      </div>

      <nav className="flex-grow flex flex-col gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-6 py-3 font-mono text-sm transition-all",
              item.active
                ? "text-brass-500 bg-brass-500/10 border-l-4 border-brass-500 translate-x-1"
                : "text-on-surface-variant hover:bg-surface-container"
            )}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-6 pt-6 flex flex-col gap-4 border-t border-outline-variant/30 mx-6">
        <div className="px-4 py-4 bg-surface-container-highest border border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brass-500 flex items-center justify-center text-ink-900 font-bold text-sm">
              {userInitials}
            </div>
            <div>
              <p className="font-mono text-xs text-on-surface">{userName}</p>
              <p className="text-[10px] text-on-surface-variant">{userRole}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
          <Link href="#" className="hover:text-brass-500">Docs</Link>
          <Link href="#" className="hover:text-brass-500">Support</Link>
        </div>
      </div>
    </aside>
  );
}
