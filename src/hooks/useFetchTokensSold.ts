import { createPublicClient, http, fallback, Address } from "viem";
import { baseSepolia } from "viem/chains";
import { useEffect, useState } from "react";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { BASE_SEPOLIA_RPC_URL } from "@/lib/constants";

export function useFetchTokensSold(contractAddress: Address) {
  const [tokensSold, setTokensSold] = useState<bigint>(BigInt(0));

  useEffect(() => {
    async function fetchTokensSold() {
      try {
        const client = createPublicClient({
          chain: baseSepolia,
          transport: fallback([http(BASE_SEPOLIA_RPC_URL)]),
        });

        const result = await client.readContract({
          address: contractAddress,
          abi: DutchAuctionAbi,
          functionName: "getSoldTokens",
        });

        setTokensSold(result as bigint);
      } catch (err) {
        console.error("Failed to fetch tokens sold:", err);
        setTokensSold(BigInt(0));
      }
    }

    if (contractAddress) {
      fetchTokensSold();
    }
  }, [contractAddress]);

  console.log(tokensSold);

  return tokensSold;
}
