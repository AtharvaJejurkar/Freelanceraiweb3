use anchor_lang::prelude::*;

#[error_code]
pub enum EscrowError {
    #[msg("Only the company that created this escrow can perform this action.")]
    Unauthorized,

    #[msg("Escrow must be in Open status to accept a freelancer.")]
    EscrowNotOpen,

    #[msg("Escrow must be in InProgress status to release payment.")]
    EscrowNotInProgress,

    #[msg("Escrow must be in Open status to cancel.")]
    EscrowNotCancellable,

    #[msg("Project ID is too long. Maximum 64 characters.")]
    ProjectIdTooLong,

    #[msg("Escrow amount must be greater than zero.")]
    InvalidAmount,
}
