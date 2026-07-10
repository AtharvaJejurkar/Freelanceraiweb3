import './globals.css';
import type { Metadata } from 'next';

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
    <html lang="en" className="dark">
      <body className="bg-surface text-on-surface font-body min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
