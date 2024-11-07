import { createPublicClient, http, fallback, Address } from "viem";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { BASE_SEPOLIA_RPC_URL } from "@/lib/constants";

export function useCheckAuctionOwner(
  contractAddress: Address,
  walletAddress: Address
) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function fetchOwner() {
      try {
        const client = createPublicClient({
          chain: sepolia,
          transport: fallback([http(BASE_SEPOLIA_RPC_URL)]),
        });

        const result = await client.readContract({
          address: contractAddress,
          abi: DutchAuctionAbi,
          functionName: "owner",
        });

        // Check if the wallet address matches the owner address
        setIsOwner(result === walletAddress);
      } catch (err) {
        console.error("Failed to fetch owner:", err);
        setIsOwner(false);
      }
    }

    if (contractAddress && walletAddress) {
      fetchOwner();
    }
  }, [contractAddress, walletAddress]);

  return isOwner;
}
