import { createPublicClient, http, fallback, Address } from "viem";
import { baseSepolia } from "viem/chains";
import { useEffect, useState } from "react";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { BASE_SEPOLIA_RPC_URL } from "@/lib/constants";

export function useCalculateBidPrice(
  auctionAddress: Address,
  quantity: number
) {
  const [price, setPrice] = useState<bigint | null>(null);

  useEffect(() => {
    async function calculatePrice() {
      try {
        const client = createPublicClient({
          chain: baseSepolia,
          transport: fallback([http(BASE_SEPOLIA_RPC_URL)]),
        });

        const result = await client.readContract({
          address: auctionAddress,
          abi: DutchAuctionAbi,
          functionName: "calculatePrice",
          args: [BigInt(quantity)],
        });

        setPrice(result as bigint);
      } catch (err) {
        console.error("Failed to calculate price:", err);
      }
    }

    if (auctionAddress && quantity > 0) {
      calculatePrice();
    }
  }, [auctionAddress, quantity]);

  return price;
}
