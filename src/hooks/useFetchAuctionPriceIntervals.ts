import AuctioneerAbi from "@/abis/AuctioneerAbi";
import { createPublicClient, http, fallback, Address } from "viem";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";
import { AUCTIONEER_CONTRACT_ADDRESS } from "@/lib/constants";

interface PriceInterval {
  minute: number;
  price: bigint;
}

interface PriceIntervals {
  prices: PriceInterval[];
}

export function useFetchAuctionPriceIntervals(contractAddress: Address) {
  const [priceIntervals, setPriceIntervals] = useState<PriceInterval[]>([]);

  useEffect(() => {
    async function fetchPriceIntervals() {
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
          address: AUCTIONEER_CONTRACT_ADDRESS,
          abi: AuctioneerAbi,
          functionName: "getPriceIntervals",
          args: [contractAddress],
        });

        // Parse the JSON string returned from the contract
        const parsedIntervals: PriceIntervals = JSON.parse(result as string);
        setPriceIntervals(parsedIntervals.prices);
      } catch (err) {
        console.error("Failed to fetch price intervals:", err);
      }
    }

    if (contractAddress) {
      fetchPriceIntervals();
    }
  }, [contractAddress]);

  return priceIntervals;
}
