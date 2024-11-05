import { AUCTIONEER_CONTRACT_ADDRESS } from "@/lib/constants";
import { createPublicClient, http, fallback, Address } from "viem";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";

interface AuctionStatus {
  isStarted: boolean;
  isEnded: boolean;
  currentTokenPrice: bigint;
  remainingTokens: bigint;
  timeRemaining: bigint;
}

export function useFetchAuctionStatus(auctionAddress: Address) {
  const [auctionStatus, setAuctionStatus] = useState<AuctionStatus | null>(
    null
  );

  useEffect(() => {
    async function fetchAuctionStatus() {
      try {
        const client = createPublicClient({
          chain: sepolia,
          transport: fallback([
            http(
              `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
            ),
          ]),
        });

        const result = await client.readContract({
          address: auctionAddress,
          abi: DutchAuctionAbi,
          functionName: "getAuctionStatus",
        });

        // Type assertion after converting to unknown
        const status = result as unknown as [
          boolean,
          boolean,
          bigint,
          bigint,
          bigint
        ];

        setAuctionStatus({
          isStarted: status[0],
          isEnded: status[1],
          currentTokenPrice: status[2],
          remainingTokens: status[3],
          timeRemaining: status[4],
        });
      } catch (err) {
        console.error("Failed to fetch auction status:", err);
      }
    }

    if (auctionAddress) {
      fetchAuctionStatus();
    }
  }, [auctionAddress]);

  return auctionStatus;
}
