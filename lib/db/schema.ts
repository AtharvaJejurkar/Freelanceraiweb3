import { pgTable, text, timestamp, integer, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  wallet_address: text('wallet_address').notNull().unique(),
  role: text('role').notNull(), // 'company' or 'freelancer'
  display_name: text('display_name'),
  reputation_score: integer('reputation_score').default(100),
  total_earned: integer('total_earned').default(0),
  total_escrowed: integer('total_escrowed').default(0),
  projects_completed: integer('projects_completed').default(0),
  disputes_won: integer('disputes_won').default(0),
  created_at: timestamp('created_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  total_value: integer('total_value').notNull(),
  status: text('status').notNull(), // e.g. 'open', 'in_progress', 'completed'
  escrow_pda: text('escrow_pda'),
  company_id: uuid('company_id').references(() => users.id),
  freelancer_id: uuid('freelancer_id').references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
});

export const escrowTransactions = pgTable('escrow_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  from_wallet: text('from_wallet').notNull(),
  to_wallet: text('to_wallet').notNull(),
  amount: integer('amount').notNull(),
  tx_signature: text('tx_signature'),
  project_id: uuid('project_id').references(() => projects.id),
  created_at: timestamp('created_at').defaultNow(),
});
