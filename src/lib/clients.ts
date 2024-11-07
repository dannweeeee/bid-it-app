import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, sepolia } from "viem/chains";
import { BASE_SEPOLIA_RPC_URL } from "./constants";

const account = privateKeyToAccount(
  process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
);

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA_RPC_URL),
});

export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA_RPC_URL),
});
