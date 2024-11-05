import AuctioneerAbi from "@/abis/AuctioneerAbi";
import { AUCTIONEER_CONTRACT_ADDRESS } from "@/lib/constants";
import { createPublicClient, http, fallback } from "viem";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";

export function useFetchLiveAuctions() {
  const [liveAuctions, setLiveAuctions] = useState<any[]>([]);

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
          functionName: "getActiveAuctions",
        });

        setLiveAuctions(auctions as any[]);
      } catch (err) {
        console.error("Failed to fetch live auctions:", err);
      }
    }

    fetchAuctions();
  }, []);

  return liveAuctions;
}
