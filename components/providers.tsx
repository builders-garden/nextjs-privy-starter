"use client";

import { wagmiConfig } from "@/lib/wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import { base, baseSepolia } from "viem/chains";

const queryClient = new QueryClient();

/**
 * Providers component that wraps the entire application with necessary providers
 * This component sets up:
 * 1. PrivyProvider - For authentication and wallet management
 * 2. SmartWalletsProvider - For smart wallet functionality
 * 3. QueryClientProvider - For React Query state management
 * 4. WagmiProvider - For Ethereum interaction
 *
 * @param children - The child components to be wrapped by the providers
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        embeddedWallets: {
          createOnLogin: "all-users",
          showWalletUIs: true,
        },
        defaultChain: baseSepolia,
        supportedChains: [base, baseSepolia],
      }}
    >
      <SmartWalletsProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <main className="h-full">{children}</main>
          </WagmiProvider>
        </QueryClientProvider>
      </SmartWalletsProvider>
    </PrivyProvider>
  );
}
