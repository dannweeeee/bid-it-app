import { createPublicClient, http, fallback, Address } from "viem";
import { baseSepolia } from "viem/chains";
import { useEffect, useState } from "react";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { BASE_SEPOLIA_RPC_URL } from "@/lib/constants";

export function useFetchFinalPrice(contractAddress: Address) {
  const [finalPrice, setFinalPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    async function fetchFinalPrice() {
      try {
        const client = createPublicClient({
          chain: baseSepolia,
          transport: fallback([http(BASE_SEPOLIA_RPC_URL)]),
        });

        const result = await client.readContract({
          address: contractAddress,
          abi: DutchAuctionAbi,
          functionName: "getFinalPrice",
        });

        setFinalPrice(result as bigint);
      } catch (err) {
        console.error("Failed to fetch final price:", err);
        setFinalPrice(BigInt(0));
      }
    }

    if (contractAddress) {
      fetchFinalPrice();
    }
  }, [contractAddress]);

  return finalPrice;
}
