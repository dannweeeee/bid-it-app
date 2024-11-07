import React from "react";
import { Button } from "./button";
import { Address } from "viem";
import { writeContract, waitForTransactionReceipt } from "wagmi/actions";
import { Config } from "wagmi";
import { wagmiAdapter } from "@/config";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { useToast } from "@/hooks/useToast";

const WithdrawEthButton = ({
  contractAddress,
  walletAddress,
}: {
  contractAddress: Address;
  walletAddress: Address;
}) => {
  const config = wagmiAdapter.wagmiConfig as Config;
  const { toast } = useToast();

  const handleWithdrawEth = async () => {
    try {
      const withdrawTx = await writeContract(config, {
        address: contractAddress,
        abi: DutchAuctionAbi,
        functionName: "withdrawEth",
      });

      await waitForTransactionReceipt(config, {
        hash: withdrawTx,
      });

      toast({
        variant: "default",
        title: "ETH withdrawn successfully",
        description:
          "You have successfully withdrawn your ETH from the auction",
      });
    } catch (error) {
      console.error("Error withdrawing ETH:", error);
      toast({
        variant: "destructive",
        title: "Error withdrawing ETH",
        description:
          "There was an error withdrawing your ETH. Please try again.",
      });
    }
  };

  return (
    <Button
      onClick={handleWithdrawEth}
      variant="default"
      size="sm"
      className="min-w-[120px] text-white rounded-xl hover:bg-black/70 hover:text-white hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30"
    >
      Withdraw ETH
    </Button>
  );
};

export default WithdrawEthButton;
