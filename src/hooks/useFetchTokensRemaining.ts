import { createPublicClient, http, fallback, Address } from "viem";
import { baseSepolia } from "viem/chains";
import { useEffect, useState } from "react";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { BASE_SEPOLIA_RPC_URL } from "@/lib/constants";

export function useFetchTokensRemaining(contractAddress: Address) {
  const [tokensRemaining, setTokensRemaining] = useState<bigint>(BigInt(0));

  useEffect(() => {
    async function fetchTokensRemaining() {
      try {
        const client = createPublicClient({
          chain: baseSepolia,
          transport: fallback([http(BASE_SEPOLIA_RPC_URL)]),
        });

        const result = await client.readContract({
          address: contractAddress,
          abi: DutchAuctionAbi,
          functionName: "getRemainingTokens",
        });

        setTokensRemaining(result as bigint);
      } catch (err) {
        console.error("Failed to fetch tokens remaining:", err);
        setTokensRemaining(BigInt(0));
      }
    }

    if (contractAddress) {
      fetchTokensRemaining();
    }
  }, [contractAddress]);

  return tokensRemaining;
}
