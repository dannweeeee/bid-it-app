import React from "react";
import { AuctionCard } from "../ui/auction-card";
import { useFetchLiveAuctions } from "@/hooks/useFetchLiveAuctions";

const LiveAuctions = () => {
  const liveAuctions = useFetchLiveAuctions();

  return (
    <div>
      <div className="flex flex-col space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Live Auctions</h2>
          <p className="text-sm text-muted-foreground">
            Explore live auctions hosted by Bid It.
          </p>
        </div>
      </div>
      {liveAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {liveAuctions.map((auctionAddress) => (
            <AuctionCard key={auctionAddress} address={auctionAddress} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          No live auctions currently. Check back soon!
        </div>
      )}
    </div>
  );
};

export default LiveAuctions;
