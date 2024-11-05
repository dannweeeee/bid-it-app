export default [
  {
    type: "constructor",
    inputs: [
      {
        name: "_link",
        type: "address",
        internalType: "address",
      },
      {
        name: "_registrar",
        type: "address",
        internalType: "address",
      },
      {
        name: "_registry",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "UPKEEP_GAS_LIMIT",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "UPKEEP_MINIMUM_FUNDS",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint96",
        internalType: "uint96",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "auctionUpkeepIds",
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
    name: "getAuctionsByOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "getInactiveAuctions",
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
    name: "getPriceIntervals",
    inputs: [
      {
        name: "_auctionAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
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
    name: "getUpkeepId",
    inputs: [
      {
        name: "auctionAddress",
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
    name: "i_link",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract LinkTokenInterface",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "i_registrar",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract AutomationRegistrarInterface",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "i_registry",
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
      {
        name: "minimumBid",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "upkeepId",
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
    type: "error",
    name: "AuctionNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidAddresses",
    inputs: [],
  },
  {
    type: "error",
    name: "LinkTransferFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "UpkeepRegistrationFailed",
    inputs: [],
  },
] as const;
