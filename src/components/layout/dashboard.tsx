import React from "react";
import { AuctionCard } from "../ui/auction-card";

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Live Auctions</h2>
      </div>
      <AuctionCard />
    </div>
  );
};

export default Dashboard;
