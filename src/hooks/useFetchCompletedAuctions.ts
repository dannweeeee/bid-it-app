import AuctioneerAbi from "@/abis/AuctioneerAbi";
import { AUCTIONEER_CONTRACT_ADDRESS } from "@/lib/constants";
import { createPublicClient, http, fallback } from "viem";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";

export function useFetchCompletedAuctions() {
  const [completedAuctions, setCompletedAuctions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAuctions() {
      try {
        const client = createPublicClient({
          chain: sepolia,
          transport: fallback([
            http(
              `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
            ),
          ]),
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
