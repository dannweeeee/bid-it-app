import React from "react";
import { Button } from "./button";
import { Address } from "viem";
import { writeContract } from "wagmi/actions";

const EndAuctionButton = ({
  contractAddress,
  walletAddress,
}: {
  contractAddress: Address;
  walletAddress: Address;
}) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      className="min-w-[120px] text-black rounded-xl hover:bg-slate-400/70 hover:text-black hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30"
    >
      End Auction
    </Button>
  );
};

export default EndAuctionButton;
