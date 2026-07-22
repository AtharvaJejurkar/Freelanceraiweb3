'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FreelancerMarketplacePage() {
  const { connected } = useWallet();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userDomain, setUserDomain] = useState<string | null>(null);

  useEffect(() => {
    if (!connected) {
      setLoading(false);
      return;
    }

    async function fetchMarketplace() {
      try {
        // Mock user domain for filtering
        const mockStr = localStorage.getItem('mockUser');
        let domain = null;
        if (mockStr) {
          const mockUser = JSON.parse(mockStr);
          domain = mockUser.domain;
          setUserDomain(domain);
        }

        // Ideally fetch from /api/projects?status=open
        const res = await fetch('/api/projects?status=open');
        if (res.ok) {
          const data = await res.json();
          // Filter by domain if needed or just display all
          setProjects(data);
        } else {
          // Provide mock projects if api fails or is empty
          setProjects([
            { id: 'proj_1', title: 'Smart Contract Audit', description: 'Audit a DeFi protocol smart contract for vulnerabilities.', total_value: 5000, status: 'open', required_domain: 'Smart Contracts' },
            { id: 'proj_2', title: 'React Frontend for NFT Marketplace', description: 'Build a responsive React interface for a new NFT marketplace.', total_value: 3000, status: 'open', required_domain: 'Frontend' },
            { id: 'proj_3', title: 'Zero Knowledge Proof Implementation', description: 'Implement ZK-SNARKs for private transactions.', total_value: 12000, status: 'open', required_domain: 'Smart Contracts' },
            { id: 'proj_4', title: 'Solana Program Backend', description: 'Develop a Rust based Solana program for escrow logic.', total_value: 8000, status: 'open', required_domain: 'Backend' },
          ]);
        }
      } catch (err) {
        console.error('Failed to load marketplace projects', err);
        // Fallback mock
        setProjects([
          { id: 'proj_1', title: 'Smart Contract Audit', description: 'Audit a DeFi protocol smart contract for vulnerabilities.', total_value: 5000, status: 'open', required_domain: 'Smart Contracts' },
          { id: 'proj_2', title: 'React Frontend for NFT Marketplace', description: 'Build a responsive React interface for a new NFT marketplace.', total_value: 3000, status: 'open', required_domain: 'Frontend' },
          { id: 'proj_3', title: 'Zero Knowledge Proof Implementation', description: 'Implement ZK-SNARKs for private transactions.', total_value: 12000, status: 'open', required_domain: 'Smart Contracts' },
          { id: 'proj_4', title: 'Solana Program Backend', description: 'Develop a Rust based Solana program for escrow logic.', total_value: 8000, status: 'open', required_domain: 'Backend' },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchMarketplace();
  }, [connected]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <span className="material-symbols-outlined animate-spin text-4xl text-brass-500">
          sync
        </span>
      </div>
    );
  }

  // Filter projects by user's domain, putting exact matches first, then others.
  // If no user domain, just show all.
  const relevantProjects = userDomain 
    ? [...projects].sort((a, b) => {
        if (a.required_domain === userDomain && b.required_domain !== userDomain) return -1;
        if (a.required_domain !== userDomain && b.required_domain === userDomain) return 1;
        return 0;
      })
    : projects;

  return (
    <div className="max-w-container mx-auto px-6 md:px-margin-desktop py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-outline-variant/30 pb-6">
        <div>
          <h3 className="text-3xl font-headline font-semibold text-on-surface">Available Projects</h3>
          <p className="mt-2 text-sm text-on-surface-variant font-mono">
            {userDomain ? `FILTER: ${userDomain.toUpperCase()}` : 'ALL PIPELINES'}
          </p>
        </div>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search active pipelines..." 
            className="bg-surface-container-high border border-outline-variant px-4 py-2 text-sm font-mono focus:border-brass-500 outline-none w-64"
          />
          <button className="bg-surface-container border border-outline-variant px-4 py-2 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
          </button>
        </div>
      </div>

      {relevantProjects.length === 0 ? (
        <div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-12 text-center">
          <span className="material-symbols-outlined text-outline-variant text-4xl mb-4">search_off</span>
          <h5 className="text-lg font-headline font-semibold text-on-surface-variant mb-2">
            No Open Contracts Found
          </h5>
          <p className="text-sm text-on-surface-variant">
            Check back later for new pipelines that match your expertise.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relevantProjects.map((project) => {
            const isMatch = project.required_domain === userDomain;
            return (
              <div key={project.id} className="bg-surface-container-low border border-outline-variant p-6 hover:border-brass-500 transition-colors group flex flex-col h-full relative overflow-hidden">
                {isMatch && (
                  <div className="absolute top-0 right-0 bg-brass-500 text-ink-900 font-mono text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                    Strong Match
                  </div>
                )}
                
                <div className="mb-4 pt-4">
                  <span className="font-mono text-[10px] text-brass-500 uppercase tracking-widest bg-brass-500/10 px-2 py-1 border border-brass-500/20">
                    {project.required_domain || 'General'}
                  </span>
                </div>
                
                <h4 className="text-xl font-headline font-semibold text-on-surface mb-3 line-clamp-2">
                  {project.title}
                </h4>
                
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-3 flex-1">
                  {project.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-outline-variant/30 flex justify-between items-center">
                  <div>
                    <p className="font-mono text-[10px] text-on-surface-variant uppercase mb-1">Escrow Value</p>
                    <p className="font-mono font-bold text-lg text-brass-500">
                      ${project.total_value.toLocaleString()}
                    </p>
                  </div>
                  
                  <Link 
                    href={`/projects/${project.id}`}
                    className="border border-brass-500 text-brass-500 px-6 py-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-brass-500 hover:text-ink-900 transition-colors"
                  >
                    View Terms
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
