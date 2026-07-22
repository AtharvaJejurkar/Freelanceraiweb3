'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { cn } from '@/lib/utils';
import { WaxSealAnimated } from '@/components/ui/wax-seal';

export default function CompanyOnboardPage() {
  const router = useRouter();
  const { publicKey, connected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    display_name: '',
    domain: '',
    experience: '',
    bio: '',
  });

  // Redirect if not connected
  useEffect(() => {
    if (!connected && !loading) {
      router.push('/onboard');
    }
  }, [connected, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    setLoading(true);
    setError(null);

    const walletAddress = publicKey.toString();

    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          display_name: formData.display_name,
          domain: formData.domain,
          experience: formData.experience,
          bio: formData.bio,
          is_onboarded: true,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // Update mockUser in localStorage just in case
      const mockStr = localStorage.getItem('mockUser');
      if (mockStr) {
        const mockUser = JSON.parse(mockStr);
        localStorage.setItem('mockUser', JSON.stringify({
          ...mockUser,
          display_name: formData.display_name,
          domain: formData.domain,
          experience: formData.experience,
          bio: formData.bio,
          is_onboarded: true,
        }));
      }

      router.push('/dashboard/company');
    } catch (err: any) {
      console.error('Failed to save profile', err);
      setError('Failed to save company profile. Please try again.');
      
      // Fallback for mock environment
      const mockStr = localStorage.getItem('mockUser');
      if (mockStr) {
        const mockUser = JSON.parse(mockStr);
        localStorage.setItem('mockUser', JSON.stringify({
          ...mockUser,
          display_name: formData.display_name,
          domain: formData.domain,
          experience: formData.experience,
          bio: formData.bio,
          is_onboarded: true,
        }));
        router.push('/dashboard/company');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 ledger-line-bg opacity-10 pointer-events-none" />
      
      <div className="max-w-2xl w-full space-y-8 bg-surface-container-low p-8 md:p-12 border border-outline-variant relative z-10 hard-shadow">
        
        <div className="text-center">
          <div className="flex justify-center mb-6">
             <div className="relative">
              <WaxSealAnimated />
            </div>
          </div>
          <h2 className="text-3xl font-headline font-bold text-on-surface">Register Your Company</h2>
          <p className="mt-2 text-sm text-on-surface-variant max-w-lg mx-auto">
            Provide your organizational details to issue smart contracts and manage decentralized escrow pipelines.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="display_name" className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-2">
                Company Name
              </label>
              <input
                id="display_name"
                name="display_name"
                type="text"
                required
                value={formData.display_name}
                onChange={handleChange}
                placeholder="e.g. Nexus Labs, DeFi Protocol"
                className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-brass-500 focus:ring-1 focus:ring-brass-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="domain" className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-2">
                Primary Industry
              </label>
              <select
                id="domain"
                name="domain"
                required
                value={formData.domain}
                onChange={handleChange}
                className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-brass-500 focus:ring-1 focus:ring-brass-500 outline-none transition-colors"
              >
                <option value="" disabled>Select your industry...</option>
                <option value="DeFi">DeFi & Finance</option>
                <option value="NFT/Gaming">NFT & Web3 Gaming</option>
                <option value="Infrastructure">Blockchain Infrastructure</option>
                <option value="DAO">DAO / Governance</option>
                <option value="Enterprise">Enterprise Web2 to Web3</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="experience" className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-2">
                Company Size
              </label>
              <select
                id="experience"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-brass-500 focus:ring-1 focus:ring-brass-500 outline-none transition-colors"
              >
                <option value="" disabled>Select company size...</option>
                <option value="Startup">Startup (1-10 employees)</option>
                <option value="Small">Small (11-50 employees)</option>
                <option value="Medium">Medium (51-200 employees)</option>
                <option value="Enterprise">Enterprise (200+ employees)</option>
              </select>
            </div>

            <div>
              <label htmlFor="bio" className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-2">
                Company Overview
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                required
                value={formData.bio}
                onChange={handleChange}
                placeholder="Describe your organization's mission and the types of contracts you'll be issuing..."
                className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-brass-500 focus:ring-1 focus:ring-brass-500 outline-none transition-colors font-sans text-sm resize-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-500 text-sm font-mono text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full flex justify-center py-4 px-4 border border-transparent font-mono text-sm font-bold uppercase tracking-widest text-ink-900 bg-brass-500 hover:bg-brass-400 focus:outline-none transition-colors hard-shadow",
                loading ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              {loading ? 'Registering Organization...' : 'Finalize Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
