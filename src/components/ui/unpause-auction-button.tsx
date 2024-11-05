import React, { useState } from "react";
import { Button } from "./button";
import { Address } from "viem";
import { writeContract } from "wagmi/actions";
import { Play } from "lucide-react";
import { wagmiAdapter } from "@/config";
import { Config } from "wagmi";
import { useToast } from "@/hooks/useToast";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { PacmanLoader } from "react-spinners";

const UnpauseAuctionButton = ({
  contractAddress,
  walletAddress,
}: {
  contractAddress: Address;
  walletAddress: Address;
}) => {
  const config = wagmiAdapter.wagmiConfig as Config;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUnpauseAuction = async () => {
    try {
      setLoading(true);
      await writeContract(config, {
        address: contractAddress,
        abi: DutchAuctionAbi,
        functionName: "unpause",
      });
      toast({
        title: "Success",
        description: "Auction unpaused successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error unpausing auction:", error);
      toast({
        title: "Error",
        description: "Failed to unpause auction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleUnpauseAuction}
      variant="secondary"
      size="sm"
      disabled={loading}
      className="w-10 text-black rounded-xl hover:bg-slate-400/70 hover:text-black hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30"
    >
      {loading ? (
        <PacmanLoader size={8} color="#000000" />
      ) : (
        <Play className="w-4 h-4" />
      )}
    </Button>
  );
};

export default UnpauseAuctionButton;
