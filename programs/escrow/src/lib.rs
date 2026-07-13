use anchor_lang::prelude::*;
use anchor_lang::system_program;

mod state;
mod errors;

use state::{EscrowAccount, EscrowStatus};
use errors::EscrowError;

declare_id!("HggZvjk4C65bcfwFjQ9AwgiLymRT78Y3z3GZ5gARKhqj"); // Will be replaced after `anchor build`

#[program]
pub mod escrow {
    use super::*;

    /// Called by a Company to create and fund the escrow for a project.
    /// Transfers `amount_lamports` SOL from the company's wallet into a PDA vault.
    pub fn initialize_escrow(
        ctx: Context<InitializeEscrow>,
        project_id: String,
        amount_lamports: u64,
    ) -> Result<()> {
        require!(project_id.len() <= 64, EscrowError::ProjectIdTooLong);
        require!(amount_lamports > 0, EscrowError::InvalidAmount);

        let escrow = &mut ctx.accounts.escrow_account;
        escrow.company = ctx.accounts.company.key();
        escrow.freelancer = Pubkey::default();
        escrow.amount_lamports = amount_lamports;
        escrow.project_id = project_id;
        escrow.status = EscrowStatus::Open;
        escrow.bump = ctx.bumps.escrow_account;
        escrow.vault_bump = ctx.bumps.vault;

        // Transfer SOL from company wallet → vault PDA
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.company.to_account_info(),
                to: ctx.accounts.vault.to_account_info(),
            },
        );
        system_program::transfer(cpi_context, amount_lamports)?;

        msg!("Escrow initialized for project {}. {} lamports locked.", escrow.project_id, amount_lamports);
        Ok(())
    }

    /// Called by the Company to accept a freelancer.
    /// Sets the freelancer pubkey and moves status to InProgress.
    pub fn accept_freelancer(
        ctx: Context<AcceptFreelancer>,
        freelancer: Pubkey,
    ) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow_account;

        require_keys_eq!(ctx.accounts.company.key(), escrow.company, EscrowError::Unauthorized);
        require!(escrow.status == EscrowStatus::Open, EscrowError::EscrowNotOpen);

        escrow.freelancer = freelancer;
        escrow.status = EscrowStatus::InProgress;

        msg!("Freelancer {} accepted for project {}.", freelancer, escrow.project_id);
        Ok(())
    }

    /// Called by the Company to release payment to the accepted freelancer.
    /// Transfers all SOL from the vault PDA → freelancer wallet.
    pub fn release_payment(ctx: Context<ReleasePayment>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow_account;

        require_keys_eq!(ctx.accounts.company.key(), escrow.company, EscrowError::Unauthorized);
        require!(escrow.status == EscrowStatus::InProgress, EscrowError::EscrowNotInProgress);

        let amount = escrow.amount_lamports;
        let escrow_key = escrow.key();

        // Sign with vault PDA seeds
        let vault_seeds = &[
            b"vault",
            escrow_key.as_ref(),
            &[escrow.vault_bump],
        ];
        let signer_seeds = &[&vault_seeds[..]];

        let cpi_context = CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.vault.to_account_info(),
                to: ctx.accounts.freelancer.to_account_info(),
            },
            signer_seeds,
        );
        system_program::transfer(cpi_context, amount)?;

        escrow.status = EscrowStatus::Completed;
        escrow.amount_lamports = 0;

        msg!("Payment of {} lamports released to freelancer {}.", amount, escrow.freelancer);
        Ok(())
    }

    /// Called by the Company to cancel the escrow and retrieve all funds.
    /// Only possible when status is Open (no freelancer accepted yet).
    pub fn cancel_escrow(ctx: Context<CancelEscrow>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow_account;

        require_keys_eq!(ctx.accounts.company.key(), escrow.company, EscrowError::Unauthorized);
        require!(escrow.status == EscrowStatus::Open, EscrowError::EscrowNotCancellable);

        let amount = escrow.amount_lamports;
        let escrow_key = escrow.key();

        let vault_seeds = &[
            b"vault",
            escrow_key.as_ref(),
            &[escrow.vault_bump],
        ];
        let signer_seeds = &[&vault_seeds[..]];

        let cpi_context = CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.vault.to_account_info(),
                to: ctx.accounts.company.to_account_info(),
            },
            signer_seeds,
        );
        system_program::transfer(cpi_context, amount)?;

        escrow.status = EscrowStatus::Cancelled;
        escrow.amount_lamports = 0;

        msg!("Escrow cancelled. {} lamports returned to company.", amount);
        Ok(())
    }
}

// ─── Account Contexts ─────────────────────────────────────────────────────────

#[derive(Accounts)]
#[instruction(project_id: String)]
pub struct InitializeEscrow<'info> {
    #[account(mut)]
    pub company: Signer<'info>,

    #[account(
        init,
        payer = company,
        space = EscrowAccount::LEN,
        seeds = [b"escrow", company.key().as_ref(), project_id.as_bytes()],
        bump
    )]
    pub escrow_account: Account<'info, EscrowAccount>,

    /// Separate vault PDA that holds the SOL (no data, just SOL)
    #[account(
        mut,
        seeds = [b"vault", escrow_account.key().as_ref()],
        bump
    )]
    pub vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AcceptFreelancer<'info> {
    #[account(mut)]
    pub company: Signer<'info>,

    #[account(
        mut,
        seeds = [b"escrow", company.key().as_ref(), escrow_account.project_id.as_bytes()],
        bump = escrow_account.bump,
    )]
    pub escrow_account: Account<'info, EscrowAccount>,
}

#[derive(Accounts)]
pub struct ReleasePayment<'info> {
    #[account(mut)]
    pub company: Signer<'info>,

    #[account(
        mut,
        seeds = [b"escrow", company.key().as_ref(), escrow_account.project_id.as_bytes()],
        bump = escrow_account.bump,
    )]
    pub escrow_account: Account<'info, EscrowAccount>,

    /// CHECK: This is the freelancer's wallet — validated via escrow_account.freelancer
    #[account(mut, address = escrow_account.freelancer)]
    pub freelancer: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [b"vault", escrow_account.key().as_ref()],
        bump = escrow_account.vault_bump,
    )]
    pub vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CancelEscrow<'info> {
    #[account(mut)]
    pub company: Signer<'info>,

    #[account(
        mut,
        seeds = [b"escrow", company.key().as_ref(), escrow_account.project_id.as_bytes()],
        bump = escrow_account.bump,
    )]
    pub escrow_account: Account<'info, EscrowAccount>,

    #[account(
        mut,
        seeds = [b"vault", escrow_account.key().as_ref()],
        bump = escrow_account.vault_bump,
    )]
    pub vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}
