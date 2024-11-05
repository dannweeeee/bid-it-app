export default [
  {
    type: "constructor",
    inputs: [
      {
        name: "_name",
        type: "string",
        internalType: "string",
      },
      {
        name: "_symbol",
        type: "string",
        internalType: "string",
      },
      {
        name: "_totalSupply",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_initialPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_reservePrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minimumBid",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_auctioneer",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "AUCTION_DURATION",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "BATCH_SIZE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "auctionEnded",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "auctioneer",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "automationRegistry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "bid",
    inputs: [
      {
        name: "_quantity",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "bidders",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "calculatePrice",
    inputs: [
      {
        name: "_quantity",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "checkUpkeep",
    inputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "upkeepNeeded",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "performData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claimableTokens",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "currentClaimIndex",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "endAuction",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "endTime",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAuctionStatistics",
    inputs: [],
    outputs: [
      {
        name: "tokenAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "initialTokenPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "reserveTokenPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "minBidAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "auctionStartTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "auctionEndTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "duration",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalSupply",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "ethRaised",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "soldTokens",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalBidders",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "automationRegistryAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "auctioneerAddress",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAuctionStatus",
    inputs: [],
    outputs: [
      {
        name: "isStarted",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "isEnded",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "currentTokenPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "remainingTokens",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "timeRemaining",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBidders",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCurrentPrice",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenDetails",
    inputs: [],
    outputs: [
      {
        name: "tokenName",
        type: "string",
        internalType: "string",
      },
      {
        name: "tokenSymbol",
        type: "string",
        internalType: "string",
      },
      {
        name: "tokenDecimals",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "tokenTotalSupply",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "tokenAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenBalance",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasClaimedTokens",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialPrice",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isBidder",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "minimumBid",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "performUpkeep",
    inputs: [
      {
        name: "performData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "reservePrice",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setAutomationRegistry",
    inputs: [
      {
        name: "_registry",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "startAuction",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "startTime",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "token",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract Token",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalEthRaised",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalTokensForSale",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalTokensSold",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unpause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "userBids",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdrawEth",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AuctionEnded",
    inputs: [
      {
        name: "finalPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokensSold",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "ethRaised",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AuctionStarted",
    inputs: [
      {
        name: "startTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "endTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "startingPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AutomationRegistryUpdated",
    inputs: [
      {
        name: "oldRegistry",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "newRegistry",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Bid",
    inputs: [
      {
        name: "bidder",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "ethAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "price",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EthWithdrawn",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokensClaimed",
    inputs: [
      {
        name: "bidder",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AuctionAlreadyEnded",
    inputs: [],
  },
  {
    type: "error",
    name: "AuctionAlreadyStarted",
    inputs: [],
  },
  {
    type: "error",
    name: "AuctionNotEnded",
    inputs: [],
  },
  {
    type: "error",
    name: "AuctionNotStarted",
    inputs: [],
  },
  {
    type: "error",
    name: "BidQuantityTooHigh",
    inputs: [],
  },
  {
    type: "error",
    name: "EnforcedPause",
    inputs: [],
  },
  {
    type: "error",
    name: "ExpectedPause",
    inputs: [],
  },
  {
    type: "error",
    name: "InitialPriceTooLow",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidBidQuantity",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialPrice",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidMinimumBid",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidTotalSupply",
    inputs: [],
  },
  {
    type: "error",
    name: "MinimumBidTooHigh",
    inputs: [],
  },
  {
    type: "error",
    name: "MsgValueTooLow",
    inputs: [],
  },
  {
    type: "error",
    name: "NoEthToClaim",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "RefundFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "TransferFailed",
    inputs: [],
  },
] as const;
