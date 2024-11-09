import { createPublicClient, http, fallback, Address } from "viem";
import { baseSepolia } from "viem/chains";
import { useEffect, useState } from "react";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { BASE_SEPOLIA_RPC_URL } from "@/lib/constants";

export function useCheckWithdrawnEth(
  contractAddress: Address,
  walletAddress: Address
) {
  const [isWithdrawn, setIsWithdrawn] = useState(false);

  useEffect(() => {
    async function fetchEthWithdrawn() {
      try {
        const client = createPublicClient({
          chain: baseSepolia,
          transport: fallback([http(BASE_SEPOLIA_RPC_URL)]),
        });

        const result = await client.readContract({
          address: contractAddress,
          abi: DutchAuctionAbi,
          functionName: "ethWithdrawn",
        });

        setIsWithdrawn(result);
      } catch (err) {
        console.error("Failed to fetch eth withdrawn:", err);
        setIsWithdrawn(false);
      }
    }

    if (contractAddress && walletAddress) {
      fetchEthWithdrawn();
    }
  }, [contractAddress, walletAddress]);

  return isWithdrawn;
}
