import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, optimism, polygon, base } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// import { defineChain } from "viem";

// export const polygonAmoy = /*#__PURE__*/ defineChain({
//   id: 80002,
//   name: "Polygon Amoy",
//   nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
//   rpcUrls: {
//     default: {
//       http: ["https://rpc-amoy.polygon.technology"],
//     },
//     public: {
//       http: ["https://polygon-amoy-bor-rpc.publicnode.com"],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: "OK LINK",
//       url: "https://www.oklink.com/amoy",
//     },
//   },
//   contracts: {
//     multicall3: {
//       address: "0xca11bde05977b3631167028862be2a173976ca11",
//       blockCreated: 3127388,
//     },
//   },
//   testnet: true,
//   network: "polygonamoy",
// });

import { Chain } from "wagmi";
import { http } from "viem";

export const polygonAmoy = {
  id: 80002,
  name: "Polygon Amoy",
  network: "polygonamoy",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC",
  },
  rpcUrls: {
    public: { http: ["https://polygon-amoy-bor-rpc.publicnode.com"] },
    default: { http: ["https://rpc-amoy.polygon.technology"] },
  },
  blockExplorers: {
    etherscan: { name: "OK LINK", url: "https://www.oklink.com/amoy" },
    default: { name: "OK LINK", url: "https://www.oklink.com/amoy" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3127388,
    },
  },
} as const satisfies Chain;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [polygonAmoy]
      : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || "" }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `${chain.rpcUrls.default.http}`,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
