import { createPublicClient, http, fallback, Address } from "viem";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { BASE_SEPOLIA_RPC_URL } from "@/lib/constants";

interface TokenDetails {
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenTotalSupply: bigint;
  tokenAddress: Address;
  tokenBalance: bigint;
}

export function useFetchTokenDetails(auctionAddress: Address) {
  const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null);

  useEffect(() => {
    async function fetchTokenDetails() {
      try {
        const client = createPublicClient({
          chain: sepolia,
          transport: fallback([
            http(
              BASE_SEPOLIA_RPC_URL
            ),
          ]),
        });

        const result = await client.readContract({
          address: auctionAddress,
          abi: DutchAuctionAbi,
          functionName: "getTokenDetails",
        });

        // Type assertion after converting to unknown
        const details = result as unknown as [
          string,
          string,
          number,
          bigint,
          Address,
          bigint
        ];

        setTokenDetails({
          tokenName: details[0],
          tokenSymbol: details[1],
          tokenDecimals: details[2],
          tokenTotalSupply: details[3],
          tokenAddress: details[4],
          tokenBalance: details[5],
        });
      } catch (err) {
        console.error("Failed to fetch token details:", err);
      }
    }

    if (auctionAddress) {
      fetchTokenDetails();
    }
  }, [auctionAddress]);

  return tokenDetails;
}
