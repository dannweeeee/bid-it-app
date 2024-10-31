import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { sepolia } from "@reown/appkit/networks";
import {
  walletConnect,
  injected,
  metaMask,
  coinbaseWallet,
} from "@wagmi/connectors";

export const projectId = process.env.NEXT_PUBLIC_REOWN_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [sepolia];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    coinbaseWallet(),
  ],
});

export const config = wagmiAdapter.wagmiConfig;
