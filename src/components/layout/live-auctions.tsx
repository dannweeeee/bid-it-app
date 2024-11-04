import React from "react";
import { AuctionCard } from "../ui/auction-card";

const LiveAuctions = () => {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Live Auctions</h2>
          <p className="text-sm text-muted-foreground">
            Explore live auctions hosted by Bid It.
          </p>
        </div>
      </div>
      <AuctionCard />
    </div>
  );
};

export default LiveAuctions;
