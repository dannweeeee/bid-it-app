import React from "react";
import { AuctionCard } from "../ui/auction-card";
import { useFetchCompletedAuctions } from "@/hooks/useFetchCompletedAuctions";

const CompletedAuctions = () => {
  const completedAuctions = useFetchCompletedAuctions();
  console.log("COMPLETED AUCTIONS", completedAuctions);

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Completed Auctions
          </h2>
          <p className="text-sm text-muted-foreground">
            Review past auctions hosted by Bid It.
          </p>
        </div>
      </div>
      <AuctionCard />
    </div>
  );
};

export default CompletedAuctions;
