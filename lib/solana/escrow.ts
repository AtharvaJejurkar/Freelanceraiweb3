import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import { AnchorProvider, Program, BN, web3 } from '@coral-xyz/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';

// ─── IDL Type (matches the generated IDL from `anchor build`) ─────────────────
// This will be replaced with the auto-generated IDL after deployment.
// For now, we define the instruction signatures manually.

const ESCROW_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_ESCROW_PROGRAM_ID || '11111111111111111111111111111112'
);

const DEVNET_RPC = 'https://api.devnet.solana.com';

/** Returns the escrow_account PDA for a given company + project ID */
export function getEscrowAccountPDA(company: PublicKey, projectId: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('escrow'), company.toBuffer(), Buffer.from(projectId)],
    ESCROW_PROGRAM_ID
  );
}

/** Returns the vault PDA (holds the SOL) derived from the escrow_account address */
export function getVaultPDA(escrowAccount: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), escrowAccount.toBuffer()],
    ESCROW_PROGRAM_ID
  );
}

/** Constructs the Anchor provider from the wallet adapter */
export function getProvider(wallet: WalletContextState): AnchorProvider {
  const connection = new Connection(DEVNET_RPC, 'confirmed');
  // @ts-ignore — AnchorProvider accepts wallet adapter wallets
  return new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
}

// ─── Instruction: initialize_escrow ─────────────────────────────────────────
/**
 * Called by Company when creating a project.
 * Transfers `amountSol` SOL into the vault PDA.
 * Returns the escrow_account public key (the PDA address to store in DB).
 */
export async function initializeEscrow(
  wallet: WalletContextState,
  projectId: string,
  amountSol: number
): Promise<{ escrowPda: string; vaultPda: string; txSig: string }> {
  if (!wallet.publicKey) throw new Error('Wallet not connected');

  const provider = getProvider(wallet);
  // Import the IDL after anchor build generates it
  const { default: idl } = await import('@/programs/escrow/target/idl/escrow.json');
  const program = new Program(idl as any, provider);

  const company = wallet.publicKey;
  const [escrowAccount] = getEscrowAccountPDA(company, projectId);
  const [vault] = getVaultPDA(escrowAccount);

  const amountLamports = new BN(amountSol * web3.LAMPORTS_PER_SOL);

  const txSig = await program.methods
    .initializeEscrow(projectId, amountLamports)
    .accounts({
      company,
      escrowAccount,
      vault,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

  return {
    escrowPda: escrowAccount.toBase58(),
    vaultPda: vault.toBase58(),
    txSig,
  };
}

// ─── Instruction: accept_freelancer ─────────────────────────────────────────
/**
 * Called by Company to accept a freelancer's application.
 * Updates escrow state: sets freelancer pubkey, status → InProgress.
 */
export async function acceptFreelancer(
  wallet: WalletContextState,
  projectId: string,
  freelancerAddress: string
): Promise<string> {
  if (!wallet.publicKey) throw new Error('Wallet not connected');

  const provider = getProvider(wallet);
  const { default: idl } = await import('@/programs/escrow/target/idl/escrow.json');
  const program = new Program(idl as any, provider);

  const company = wallet.publicKey;
  const [escrowAccount] = getEscrowAccountPDA(company, projectId);
  const freelancer = new PublicKey(freelancerAddress);

  const txSig = await program.methods
    .acceptFreelancer(freelancer)
    .accounts({
      company,
      escrowAccount,
    })
    .rpc();

  return txSig;
}

// ─── Instruction: release_payment ────────────────────────────────────────────
/**
 * Called by Company when the project is complete.
 * Transfers all SOL from vault PDA → freelancer wallet.
 */
export async function releasePayment(
  wallet: WalletContextState,
  projectId: string,
  freelancerAddress: string
): Promise<string> {
  if (!wallet.publicKey) throw new Error('Wallet not connected');

  const provider = getProvider(wallet);
  const { default: idl } = await import('@/programs/escrow/target/idl/escrow.json');
  const program = new Program(idl as any, provider);

  const company = wallet.publicKey;
  const [escrowAccount] = getEscrowAccountPDA(company, projectId);
  const [vault] = getVaultPDA(escrowAccount);
  const freelancer = new PublicKey(freelancerAddress);

  const txSig = await program.methods
    .releasePayment()
    .accounts({
      company,
      escrowAccount,
      freelancer,
      vault,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

  return txSig;
}

// ─── Instruction: cancel_escrow ──────────────────────────────────────────────
/**
 * Called by Company to cancel and reclaim SOL if no freelancer was accepted.
 */
export async function cancelEscrow(
  wallet: WalletContextState,
  projectId: string
): Promise<string> {
  if (!wallet.publicKey) throw new Error('Wallet not connected');

  const provider = getProvider(wallet);
  const { default: idl } = await import('@/programs/escrow/target/idl/escrow.json');
  const program = new Program(idl as any, provider);

  const company = wallet.publicKey;
  const [escrowAccount] = getEscrowAccountPDA(company, projectId);
  const [vault] = getVaultPDA(escrowAccount);

  const txSig = await program.methods
    .cancelEscrow()
    .accounts({
      company,
      escrowAccount,
      vault,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

  return txSig;
}

// ─── Read: fetch escrow account state ────────────────────────────────────────
export async function fetchEscrowState(escrowPda: string) {
  const connection = new Connection(DEVNET_RPC, 'confirmed');
  const { default: idl } = await import('@/programs/escrow/target/idl/escrow.json');
  // Read-only provider (no wallet needed)
  const provider = new AnchorProvider(connection, {} as any, {});
  const program = new Program(idl as any, provider);

  const account = await (program as any).account.escrowAccount.fetch(new PublicKey(escrowPda));
  return account;
}

/** Returns a Solana Explorer URL for an address on devnet */
export function explorerUrl(address: string, type: 'address' | 'tx' = 'address'): string {
  return `https://explorer.solana.com/${type}/${address}?cluster=devnet`;
}
