import AuctioneerAbi from "@/abis/AuctioneerAbi";
import {
  AUCTIONEER_CONTRACT_ADDRESS,
  BASE_SEPOLIA_RPC_URL,
} from "@/lib/constants";
import { createPublicClient, http, fallback } from "viem";
import { baseSepolia } from "viem/chains";
import { useEffect, useState } from "react";

export function useFetchCompletedAuctions() {
  const [completedAuctions, setCompletedAuctions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAuctions() {
      try {
        const client = createPublicClient({
          chain: baseSepolia,
          transport: fallback([http(BASE_SEPOLIA_RPC_URL)]),
        });

        const auctions = await client.readContract({
          address: AUCTIONEER_CONTRACT_ADDRESS,
          abi: AuctioneerAbi,
          functionName: "getInactiveAuctions",
        });

        setCompletedAuctions(auctions as any[]);
      } catch (err) {
        console.error("Failed to fetch completed auctions:", err);
      }
    }

    fetchAuctions();
  }, []);

  return completedAuctions;
}
