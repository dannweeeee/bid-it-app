"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { useMemo } from "react";
import { http, createConfig } from "wagmi";
import { baseSepolia, base, sepolia } from "wagmi/chains";

export function useWagmiConfig() {
  const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
  if (!projectId) {
    const providerErrMessage =
      "To connect to all Wallets you need to provide a WC_PROJECT_ID env variable";
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: "Recommended Wallet",
          wallets: [coinbaseWallet],
        },
        {
          groupName: "Other Wallets",
          wallets: [rainbowWallet, metaMaskWallet, rabbyWallet],
        },
      ],
      {
        appName: "Bid It",
        projectId,
      }
    );

    const wagmiConfig = createConfig({
      chains: [sepolia],
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [sepolia.id]: http(),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
