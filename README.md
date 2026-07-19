# 🌐 Freelancer Web3 Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-13.5-black?logo=next.js">
  <img src="https://img.shields.io/badge/Solana-Web3-14F195?logo=solana&logoColor=white">
  <img src="https://img.shields.io/badge/Anchor-Framework-blue">
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css&logoColor=white">
</div>

## 🚀 Project Overview

This project is a decentralized freelancing platform built on the **Solana** blockchain. It leverages Web3 technologies to handle escrow contracts for secure payments, alongside a modern web tech stack (Next.js & Supabase) for the frontend interface and off-chain data storage. 

By integrating Solana smart contracts (programs), the platform ensures that funds are locked securely until project milestones are met, building a trustless environment for clients and freelancers.

---

## 🧩 Technologies Used

### 🖥 Frontend Architecture
*   **Next.js (App Router)**: Core React framework for server-side rendering, routing, and UI.
*   **TypeScript**: Provides static typing across the frontend and smart contract integrations.
*   **Tailwind CSS**: Utility-first CSS framework for rapid UI styling.
*   **Radix UI & Lucide React**: Unstyled, accessible component primitives and iconography.
*   **React Hook Form & Zod**: Schema-based form handling and validation.

### ⛓️ Web3 & Blockchain (Solana)
*   **Solana Web3.js**: Core library to interact with the Solana blockchain from the frontend.
*   **Solana Wallet Adapter**: UI components and hooks for users to connect their Solana wallets (Phantom, Solflare, etc.).
*   **Anchor Framework**: Framework for Solana's Sealevel runtime providing ergonomic smart contract development. The project includes a custom **`escrow`** program written in **Rust**.

### 🗄️ Backend & Database
*   **Supabase**: Handles off-chain relational data (user profiles, project details, chat) using a PostgreSQL database, while critical financial transactions are secured on-chain via Solana.

---

## 📂 Architecture & Directory Structure

```text
freelanceraiweb3/
├── app/                  # Next.js App Router (Frontend)
│   ├── dashboard/        # User and freelancer dashboards
│   ├── projects/         # Project listings and details
│   ├── contracts/        # Active escrow contract management
│   ├── disputes/         # Dispute resolution center
│   ├── reputation/       # Web3 reputation and rating system
│   └── onboard/          # Onboarding flow for new users/freelancers
├── components/           # Reusable React UI components (Radix UI + Tailwind)
├── programs/
│   └── escrow/           # Rust-based Solana smart contract for handling escrow payments
├── supabase/             # Supabase configurations and migrations
├── Anchor.toml           # Solana Anchor workspace configuration
└── package.json          # Frontend dependencies and scripts
```

---

## 💡 Core Features
1.  **Decentralized Escrow Payments**: Clients can deposit Solana (SOL/USDC) into a smart contract which is held securely until the freelancer completes the work.
2.  **Wallet Authentication**: Users log in by connecting their Solana wallets, ensuring a Web3-native identity.
3.  **Reputation System**: Both clients and freelancers can build a decentralized reputation based on successful contract completions.
4.  **Dispute Resolution**: Dedicated workflow for handling disagreements over deliverables and locked funds.

---

## 🛠️ Getting Started

### Prerequisites
*   Node.js (v18+)
*   Rust & Cargo
*   Solana CLI
*   Anchor CLI

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Run the Next.js Frontend
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### 3. Build & Test Solana Programs
Ensure you have the Solana local test validator running if you are testing locally.
```bash
# Build the escrow program
anchor build

# Run tests
anchor test
```

---

## 📜 License
All rights reserved.
