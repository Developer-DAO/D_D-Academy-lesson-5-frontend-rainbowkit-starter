import { parseEther } from "viem";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export function useMint({
  abi,
  contractAddress,
  mintingPrice,
}: {
  abi: any;
  contractAddress: `0x${string}`;
  mintingPrice: string;
}) {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "mint",
    value: parseEther(mintingPrice),
    onError: (e) => {
      console.log("Error minting NFT", e);
    },
    enabled: mintingPrice !== "0",
  });

  const {
    data: mintData,
    writeAsync: mint,
    isLoading: isMintLoading,
  } = useContractWrite(config);

  return {
    mint,
    mintData,
    isMintLoading,
  };
}