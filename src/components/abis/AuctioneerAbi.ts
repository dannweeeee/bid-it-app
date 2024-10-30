export default [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "auctionDetails",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        internalType: "string",
      },
      {
        name: "createdAt",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "isActive",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "totalEthRaised",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalTokensSold",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "auctionDuration",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "auctions",
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
        internalType: "contract DutchAuction",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createAuction",
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
        name: "_auctionDuration",
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
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "endAuction",
    inputs: [
      {
        name: "_auctionAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getActiveAuctions",
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
    name: "getAuctionInfo",
    inputs: [
      {
        name: "_auctionAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        internalType: "string",
      },
      {
        name: "createdAt",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "isActive",
        type: "bool",
        internalType: "bool",
      },
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
        name: "currentPrice",
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
      {
        name: "totalEthRaised",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalTokensSold",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalAuctions",
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
    name: "isValidAuction",
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
    name: "pauseAuction",
    inputs: [
      {
        name: "_auctionAddress",
        type: "address",
        internalType: "address",
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
    name: "startAuction",
    inputs: [
      {
        name: "_auctionAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "unpauseAuction",
    inputs: [
      {
        name: "_auctionAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AuctionCreated",
    inputs: [
      {
        name: "auctionAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "totalSupply",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "initialPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "reservePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AuctionPaused",
    inputs: [
      {
        name: "auctionAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AuctionUnpaused",
    inputs: [
      {
        name: "auctionAddress",
        type: "address",
        indexed: true,
        internalType: "address",
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
    type: "error",
    name: "AuctionNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidParameters",
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
] as const;
