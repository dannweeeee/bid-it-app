import React, { useState } from "react";
import { Button } from "./button";
import { Address } from "viem";
import { writeContract } from "wagmi/actions";
import { Pause } from "lucide-react";
import { wagmiAdapter } from "@/config";
import { useToast } from "@/hooks/useToast";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { Config } from "wagmi";
import { PacmanLoader } from "react-spinners";

const PauseAuctionButton = ({
  contractAddress,
  walletAddress,
}: {
  contractAddress: Address;
  walletAddress: Address;
}) => {
  const config = wagmiAdapter.wagmiConfig as Config;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePauseAuction = async () => {
    try {
      setLoading(true);
      await writeContract(config, {
        address: contractAddress,
        abi: DutchAuctionAbi,
        functionName: "pause",
      });
      toast({
        title: "Success",
        description: "Auction paused successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error pausing auction:", error);
      toast({
        title: "Error",
        description: "Failed to pause auction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePauseAuction}
      variant="secondary"
      size="sm"
      disabled={loading}
      className="w-10 text-black rounded-xl hover:bg-slate-400/70 hover:text-black hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30"
    >
      {loading ? (
        <>
          <PacmanLoader size={8} color="#000000" />
        </>
      ) : (
        <Pause className="w-4 h-4" />
      )}
    </Button>
  );
};

export default PauseAuctionButton;
