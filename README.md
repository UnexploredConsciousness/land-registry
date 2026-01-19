# Blockchain-Based Land Record Management System

## Overview
A role-based decentralized application (DApp) for managing land records using blockchain technology.

## Roles
- Admin: Full control, manages registrars and encumbrances
- Registrar: Registers land and transfers ownership
- User: Read-only access to land records

## Features
- Land registration
- Ownership transfer
- Encumbrance management (add / resolve)
- Role-based access control
- Transparent parcel viewing

## Tech Stack
- Solidity
- Hardhat
- Ethers.js
- HTML / JavaScript
- MetaMask

## How to Run
   (Open Command Prompt inside root folder. Each command opens in a separate tab)
1. Start local blockchain:
   - npx hardhat node
2. Deploy contract:
   - npx hardhat ignition deploy ignition/modules/lock.js --network localhost
3. Update contract address in
   - "frontend/app.js"
4. Run server:
   - npx serve frontend
5. Open the link in browser

## Notes
   Hardhat localhost resets state on restart
   Roles must be assigned after restart

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.