import React from "react";
import { Button } from "./button";
import { Address } from "viem";
import { writeContract } from "wagmi/actions";

const BidButton = ({
  contractAddress,
  walletAddress,
}: {
  contractAddress: Address;
  walletAddress: Address;
}) => {
  return (
    <Button
      variant="default"
      size="sm"
      className="min-w-[120px] text-white rounded-xl hover:bg-black/70 hover:text-white hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30"
    >
      Bid
    </Button>
  );
};

export default BidButton;
