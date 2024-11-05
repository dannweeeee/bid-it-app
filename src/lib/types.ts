export type AuctionCreatedEvent = {
  auctionAddress: string;
  name: string;
  symbol: string;
  totalSupply: bigint;
  initialPrice: bigint;
  reservePrice: bigint;
  minimumBid: bigint;
  upkeepId: bigint;
};
