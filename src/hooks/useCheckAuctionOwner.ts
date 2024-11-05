import { createPublicClient, http, fallback, Address } from "viem";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";

export function useCheckAuctionOwner(
  contractAddress: Address,
  walletAddress: Address
) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function fetchOwner() {
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
          address: contractAddress,
          abi: DutchAuctionAbi,
          functionName: "owner",
        });

        // Check if the wallet address matches the owner address
        setIsOwner(result === walletAddress);
      } catch (err) {
        console.error("Failed to fetch owner:", err);
        setIsOwner(false);
      }
    }

    if (contractAddress && walletAddress) {
      fetchOwner();
    }
  }, [contractAddress, walletAddress]);

  return isOwner;
}
