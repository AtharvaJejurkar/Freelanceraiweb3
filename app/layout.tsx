import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { SolanaProvider } from '@/components/providers/solana-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'EscrowAI - On-Chain Freelance Security',
  description: 'Secure your capital in smart contracts notarized by AI auditors. Permanent, immutable, and settled on Solana.',
  openGraph: {
    title: 'EscrowAI - On-Chain Freelance Security',
    description: 'Eliminate Payment Disputes with On-Chain Escrow & AI',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body min-h-screen antialiased">
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}
