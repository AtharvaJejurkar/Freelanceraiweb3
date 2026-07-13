use anchor_lang::prelude::*;

#[account]
pub struct EscrowAccount {
    /// The company that created and funded this escrow
    pub company: Pubkey,
    /// The freelancer accepted for this project (default = Pubkey::default() if not set)
    pub freelancer: Pubkey,
    /// Total SOL locked in the vault (in lamports)
    pub amount_lamports: u64,
    /// The project ID string (matches localStorage / Supabase ID)
    pub project_id: String,
    /// Current status of the escrow
    pub status: EscrowStatus,
    /// PDA bump seed
    pub bump: u8,
    /// Vault bump seed
    pub vault_bump: u8,
}

impl EscrowAccount {
    /// Space: 8 (discriminator) + 32 (company) + 32 (freelancer) + 8 (amount)
    ///        + 4 + 64 (project_id string, max 64 chars) + 1 (status) + 1 + 1
    pub const LEN: usize = 8 + 32 + 32 + 8 + (4 + 64) + 1 + 1 + 1;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum EscrowStatus {
    /// Escrow is funded, accepting freelancer applications
    Open,
    /// A freelancer has been accepted, work is in progress
    InProgress,
    /// Work completed, payment released to freelancer
    Completed,
    /// Escrow cancelled, funds returned to company
    Cancelled,
}
