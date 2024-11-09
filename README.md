# Bid It dApp

Dutch Auction for Token ICOs dApp built on Base Sepolia, powered by Chainlink Automation. Live Website on https://usebidit.vercel.app

## Features

- Built on [Base Sepolia](https://www.base.org/).
- Used [Reown AppKit](https://reown.com/) + [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/).
- [Dutch Auction for Token ICOs](https://github.com/dannweeeee/bid-it-contracts) - Resolves when token price reaches reserve price or when all tokens are sold. Auctions will only be open for 20 minutes.
- [Chainlink Automation](https://chain.link/) - Automate the auction process to end when token price reaches reserve price or when all tokens are sold. The automation will then airdrop the tokens to the bidders.

## Prerequisites

- [Metamask Wallet](https://metamask.io/)
- [Base Sepolia ETH](https://www.alchemy.com/faucets/base-sepolia)
- [LINK Tokens](https://faucets.chain.link/) (For creating of Auction)

## Getting Started

```bash
npm install
```

```bash
npm run dev
```

### For Auctioneers

#### Create Auction
1. Click on `Create Auction` Button
2. Approve 1 `LINK` Token
3. Confirm Auction Creation

#### Start Auction
1. Click on `Start` Button

### For Bidders

#### Bid Auction
1. Click on `Place Bid` Button
2. Enter the amount of `ETH` you wish to commit (Ensure you have enough ETH in your wallet)
3. Confirm Bid

## Links

- [Bid It Frontend](https://github.com/dannweeeee/bid-it-dapp)
- [Bid It Contracts](https://github.com/dannweeeee/bid-it-contracts)
