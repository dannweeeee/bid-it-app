import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { BASE_SEPOLIA_RPC_URL } from "@/lib/constants";
import { Address, createPublicClient, fallback, http } from "viem";
import { baseSepolia } from "viem/chains";

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA_RPC_URL),
});

export const calculateBid = async (
  contractAddress: Address,
  quantity: number
) => {
  const result = await client.readContract({
    address: contractAddress,
    abi: DutchAuctionAbi,
    functionName: "calculatePrice",
    args: [BigInt(quantity)],
  });

  return result;
};
