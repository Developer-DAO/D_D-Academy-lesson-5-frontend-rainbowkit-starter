import { useState } from "react";
import { Log } from "viem";
import { useContractEvent, useContractRead } from "wagmi";

type LogWithArgs = Log & {
  args: { from: string; to: string; tokenId: bigint };
};

export function useAwaitMintResult({
  abi,
  contractAddress,
  userWalletAddress,
}: {
  abi: any;
  contractAddress: `0x${string}`;
  userWalletAddress?: `0x${string}`;
}) {
  const [mintedTokenId, setMintedTokenId] = useState<bigint | undefined>(
    undefined
  );

  // await for mint to complete
  const unwatch = useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "Transfer",
    listener(events) {
      if (events.length === 0) {
        return;
      }
      events.forEach((event) => {
        const extendedEvent = event as LogWithArgs;
        const { to, tokenId } = extendedEvent.args;
        if (to === userWalletAddress) {
          setMintedTokenId(tokenId);
          unwatch?.();
        }
      });
    },
  });

  const { data: tokenURI }: { data: any } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "tokenURI",
    args: [mintedTokenId],
    watch: true,
    enabled: mintedTokenId != undefined,
  });

  return {
    tokenURI,
    mintedTokenId,
  };
}
