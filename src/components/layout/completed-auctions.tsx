import React from "react";
import { useFetchCompletedAuctions } from "@/hooks/useFetchCompletedAuctions";
import { CompletedAuctionCard } from "../ui/completed-auction-card";

const CompletedAuctions = () => {
  const completedAuctions = useFetchCompletedAuctions();

  return (
    <div>
      <div className="flex flex-col space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Completed Auctions
          </h2>
          <p className="text-sm text-muted-foreground">
            Review past auctions hosted by Bid It.
          </p>
        </div>
      </div>
      {completedAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {completedAuctions.map((auctionAddress) => (
            <CompletedAuctionCard
              key={auctionAddress}
              address={auctionAddress}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          No completed auctions currently.
        </div>
      )}
    </div>
  );
};

export default CompletedAuctions;
