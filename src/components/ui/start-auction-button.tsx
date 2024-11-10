import React, { useState } from "react";
import { Button } from "./button";
import { Address } from "viem";
import { writeContract } from "wagmi/actions";
import { wagmiAdapter } from "@/config";
import { Config } from "wagmi";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { PacmanLoader } from "react-spinners";
import { useToast } from "@/hooks/useToast";

const StartAuctionButton = ({
  contractAddress,
  walletAddress,
}: {
  contractAddress: Address;
  walletAddress: Address;
}) => {
  const config = wagmiAdapter.wagmiConfig as Config;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleStartAuction = async () => {
    try {
      setLoading(true);
      await writeContract(config, {
        address: contractAddress,
        abi: DutchAuctionAbi,
        functionName: "startAuction",
      });
      toast({
        title: "Success",
        description: "Auction started successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error starting auction:", error);
      toast({
        title: "Error",
        description: "Failed to start auction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleStartAuction}
      variant="secondary"
      size="sm"
      disabled={loading}
      className="min-w-[120px] text-black rounded-xl hover:bg-slate-400/70 hover:text-black hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30"
    >
      {loading ? (
        <>
          Starting
          <PacmanLoader size={8} color="#000000" />
        </>
      ) : (
        "Start Auction"
      )}
    </Button>
  );
};

export default StartAuctionButton;
