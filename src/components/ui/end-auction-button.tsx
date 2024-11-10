import React, { useState } from "react";
import { Button } from "./button";
import { Address } from "viem";
import { writeContract } from "wagmi/actions";
import { wagmiAdapter } from "@/config";
import { Config } from "wagmi";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { PacmanLoader } from "react-spinners";
import { useToast } from "@/hooks/useToast";

const EndAuctionButton = ({
  contractAddress,
  walletAddress,
}: {
  contractAddress: Address;
  walletAddress: Address;
}) => {
  const config = wagmiAdapter.wagmiConfig as Config;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleEndAuction = async () => {
    try {
      setLoading(true);
      await writeContract(config, {
        address: contractAddress,
        abi: DutchAuctionAbi,
        functionName: "endAuction",
      });
      toast({
        title: "Success",
        description: "Auction ended successfully",
        variant: "default",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error ending auction:", error);
      toast({
        title: "Error",
        description: "Failed to end auction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEndAuction}
      variant="secondary"
      size="sm"
      disabled={loading}
      className="min-w-[120px] text-black rounded-xl hover:bg-slate-400/70 hover:text-black hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30"
    >
      {loading ? (
        <>
          Ending
          <PacmanLoader size={8} color="#000000" />
        </>
      ) : (
        "End Auction"
      )}
    </Button>
  );
};

export default EndAuctionButton;
