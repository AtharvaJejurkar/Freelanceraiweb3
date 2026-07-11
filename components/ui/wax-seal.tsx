'use client';

import { cn } from '@/lib/utils';

interface WaxSealProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showCheck?: boolean;
  animated?: boolean;
}

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-12 h-12',
  lg: 'w-24 h-24',
};

const checkSizes = {
  sm: 'text-[10px]',
  md: 'text-lg',
  lg: 'text-3xl',
};

export function WaxSeal({ size = 'md', className, showCheck = true, animated = false }: WaxSealProps) {
  return (
    <div
      className={cn(
        'wax-seal rounded-full flex items-center justify-center border-4 border-ink-900 relative',
        sizes[size],
        animated && 'animate-wax-seal-appear',
        className
      )}
    >
      {showCheck && (
        <>
          <svg
            viewBox="0 0 100 100"
            className={cn('absolute inset-2', checkSizes[size])}
            fill="none"
          >
            <path
              d="M25 50 L45 70 L75 30"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={animated ? 'animate-check-draw' : ''}
              style={{
                strokeDasharray: animated ? undefined : '100',
                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))'
              }}
            />
          </svg>
        </>
      )}
    </div>
  );
}

export function WaxSealAnimated({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="relative w-24 h-24">
      <div
        className="wax-seal w-24 h-24 rounded-full flex items-center justify-center border-4 border-ink-900 animate-wax-seal-appear"
        onAnimationEnd={onComplete}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16"
          fill="none"
        >
          <path
            d="M25 50 L45 70 L75 30"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))'
            }}
          />
        </svg>
      </div>
    </div>
  );
}
