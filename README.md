# Blockchain-Based Land Record Management System

## Overview
A role-based decentralized application (DApp) for managing land records using blockchain technology. Built on Polygon Amoy testnet with a publicly accessible frontend.

## Live Demo
- **DApp URL:** https://silver-kulfi-251466.netlify.app
- **Smart Contract:** https://amoy.polygonscan.com/address/0x946223AbAA400224095411F7Fc716943C11dC4fE
- **Network:** Polygon Amoy Testnet (Chain ID: 80002)

## Roles
- **Admin:** Full control — manages registrars, encumbrances, and all parcel operations
- **Registrar:** Registers land parcels and transfers ownership
- **User:** Read-only access to view land records and encumbrances

## Features
- Land parcel registration
- Ownership transfer
- Encumbrance management (add / resolve)
- Role-based access control (OpenZeppelin AccessControl)
- Manage Registrars (grant / revoke registrar role)
- Transparent parcel viewing with full ownership history
- MetaMask wallet integration
- Auto network switching to Polygon Amoy on connect

## Tech Stack
- **Smart Contract:** Solidity 0.8.24, OpenZeppelin AccessControl
- **Development:** Hardhat, Hardhat Ignition
- **Frontend:** HTML, CSS, JavaScript, Ethers.js v5
- **Wallet:** MetaMask
- **Network:** Polygon Amoy Testnet
- **Hosting:** Netlify
- **RPC Provider:** Alchemy

## How to Use (Public)
1. Visit https://silver-kulfi-251466.netlify.app
2. Install MetaMask if you haven't already
3. Click **"Connect MetaMask"** — it will auto-switch to Polygon Amoy
4. Your role (Admin / Registrar / User) will be detected automatically

## How to Run Locally
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root folder:
   ```env
   AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/your-alchemy-key
   PRIVATE_KEY=your-wallet-private-key
   ```
4. Deploy the contract to Polygon Amoy:
   ```bash
   npx hardhat ignition deploy ignition/modules/Lock.js --network amoy
   ```
5. Update the contract address in `frontend/app.js`
6. Serve the frontend:
   ```bash
   npx serve frontend
   ```

## Smart Contract
- **Contract:** `LandRegistry.sol`
- **Address (Amoy):** `0x946223AbAA400224095411F7Fc716943C11dC4fE`
- **Verified on:** [Polygonscan Amoy](https://amoy.polygonscan.com/address/0x946223AbAA400224095411F7Fc716943C11dC4fE)

## Notes
- This project is deployed on **Polygon Amoy testnet** — not mainnet
- POL tokens used are test tokens with no real value
- Admin role is permanently assigned to the deployer wallet
- Roles persist on the blockchain and do not reset
