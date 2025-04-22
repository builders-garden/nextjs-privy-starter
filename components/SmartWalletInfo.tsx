import { BASE_SEPOLIA_USDC_ADDRESS, BASE_USDC_ADDRESS } from "@/lib/constants";
import { CheckIcon, CopyIcon } from "lucide-react";
import { erc20Abi, formatEther, formatUnits } from "viem";
import { base, baseSepolia } from "viem/chains";
import { useBalance, useReadContract } from "wagmi";

/**
 * Props interface for the SmartWalletInfo component
 * @param smartWalletAddress - The address of the smart wallet
 * @param chainId - The current chain ID (e.g., "84532" for Base Sepolia)
 * @param copiedWallet - The type of wallet that was copied (null if none)
 * @param onCopyWallet - Callback function when wallet address is copied
 */
interface SmartWalletInfoProps {
  smartWalletAddress: string | undefined;
  chainId: string | undefined;
  copiedWallet: string | null;
  onCopyWallet: (address: string, type: string) => void;
}

/**
 * SmartWalletInfo Component
 *
 * This component displays information about the smart wallet, including:
 * 1. The wallet address with copy functionality
 * 2. The wallet's ETH and USDC balances
 * 3. A link to the USDC faucet on testnet
 */
export default function SmartWalletInfo({
  smartWalletAddress,
  chainId,
  copiedWallet,
  onCopyWallet,
}: SmartWalletInfoProps) {
  // Fetch the smart wallet's ETH balance
  const { data: smartWalletEthBalance } = useBalance({
    address: smartWalletAddress as `0x${string}`,
    chainId: chainId === baseSepolia.id.toString() ? baseSepolia.id : base.id,
  });

  // Fetch the smart wallet's USDC balance using the ERC20 contract
  const { data: smartWalletUsdcBalance } = useReadContract({
    abi: erc20Abi,
    address:
      chainId?.toString() === baseSepolia.id.toString()
        ? BASE_SEPOLIA_USDC_ADDRESS
        : BASE_USDC_ADDRESS,
    functionName: "balanceOf",
    chainId: chainId === baseSepolia.id.toString() ? baseSepolia.id : base.id,
    args: [smartWalletAddress as `0x${string}`],
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        {/* Smart wallet address display with copy functionality */}
        <div className="flex items-center">
          <div className="relative flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Smart Wallet
            </label>
            <div className="relative">
              <div
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  smartWalletAddress ? "" : "h-[42px]"
                }`}
              >
                {smartWalletAddress}
              </div>
              {/* Copy button with success indicator */}
              <button
                onClick={() => onCopyWallet(smartWalletAddress || "", "smart")}
                className="absolute right-2 top-2"
              >
                {copiedWallet === "smart" ? (
                  <CheckIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Display wallet balances */}
        <div className="text-xs mt-1">
          <span className="font-semibold">Balance:</span>
          {smartWalletEthBalance &&
            ` ${formatEther(smartWalletEthBalance.value)} ETH`}
          {smartWalletUsdcBalance !== undefined &&
            `, ${formatUnits(smartWalletUsdcBalance, 6)} USDC`}
        </div>
        {/* Display USDC faucet link on testnet */}
        {/* Added some empty space to make it look better when the chain change from Base to Base Sepolia*/}
        {chainId === baseSepolia.id.toString() ? (
          <div className="text-xs mt-1">
            <a
              href="https://faucet.circle.com/"
              target="_blank"
              className="text-blue-500 hover:text-blue-600 transition-colors underline"
            >
              USDC Sepolia Faucet
            </a>
          </div>
        ) : (
          <div className="mt-1 h-[16px]">{""}</div>
        )}
      </div>
    </div>
  );
}
