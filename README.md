# Bid It dApp

Dutch Auction for Token ICOs dApp built on Base Sepolia, powered by Chainlink Automation. Live Website on https://usebidit.vercel.app

## Features

- Built on [Base Sepolia](https://www.base.org/).
- Used [Reown AppKit](https://reown.com/) + [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/).
- [Dutch Auction for Token ICOs](https://github.com/dannweeeee/bid-it-contracts) - Resolves when token price reaches reserve price or when all tokens are sold. Auctions will only be open for 20 minutes.
- [Chainlink Automation](https://chain.link/) - Automate the auction process to end when token price reaches reserve price or when all tokens are sold. The automation will then airdrop the tokens to the bidders.

## Prerequisites

When testing, make sure your wallet have Base Sepolia ETH and LINK tokens (if you are creating your own auction).

## Getting Started

```bash
npm install
```

```bash
npm run dev
```

## Links

- [Bid It Frontend](https://github.com/dannweeeee/bid-it-dapp)
- [Bid It Contracts](https://github.com/dannweeeee/bid-it-contracts)
