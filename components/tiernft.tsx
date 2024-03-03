import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { CSSProperties, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import TierABI from "../artifacts/contracts/TierNFT.sol/TierNFT.json";
import { NftCard } from "../components/nftcard";
import { useAwaitMintResult } from "../hooks/useAwaitMintResult";
import { useMint } from "../hooks/useMint";
import { Minting } from "./minting";
import { SuccessfulMint } from "./successfulmint";

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export function TierNFT() {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [mintingPrice, setMintingPrice] = useState("0");

  // await for user to connect their wallet
  const { isConnected, address } = useAccount();
  useEffect(() => {
    try {
      setIsUserConnected(isConnected);
    } catch (e) {
      const error = e as Error;
      console.log("Error connecting to user", error.message);
    }
  }, [isConnected]);

  // mint when the mintingPrice is set
  const { mint, isMinting, txData } = useMint({
    contractAddress: CONTRACT_ADDRESS,
    abi: TierABI.abi,
    mintingPrice: mintingPrice,
  });

  // start mint via setting mintingPrice
  useEffect(() => {
    if (mintingPrice !== "0" && mint) {
      mint();
      setModalShow(true);
      setMintingPrice("0");
    }
  }, [mintingPrice, mint]);

  // when mint completes, return the minted nft we want to show
  const { mintedTokenId, latestNFTMinted } = useAwaitMintResult({
    abi: TierABI.abi,
    contractAddress: CONTRACT_ADDRESS,
    userWalletAddress: address,
  });

  return (
    <div>
      <Head>
        <title>NFT Minter</title>
        <meta
          name="description"
          content="D_D Academy NFT Minter frontend integration project"
        />
      </Head>

      <header style={header}>
        <h1>TierNFTs</h1>
        <ConnectButton />
      </header>

      {isUserConnected ? (
        <main>
          <div style={NFTFlex}>
            <NftCard
              name="Tier 0"
              imageSrc="/nfts/0_basic.svg"
              alt="basic tier nft"
              onClick={() => setMintingPrice("0.01")}
              disabled={isMinting}
            />

            <NftCard
              name="Tier 1"
              imageSrc="/nfts/1_medium.svg"
              alt="medium tier nft"
              onClick={() => setMintingPrice("0.02")}
              disabled={isMinting}
            />

            <NftCard
              name="Tier 2"
              imageSrc="/nfts/2_premium.svg"
              alt="premium tier nft"
              onClick={() => setMintingPrice("0.05")}
              disabled={isMinting}
            />
          </div>

          {modalShow &&
            (txData ? (
              <SuccessfulMint
                contractAddress={CONTRACT_ADDRESS}
                nftMinted={latestNFTMinted}
                mintedTokenId={mintedTokenId}
                onClose={() => {
                  setModalShow(false);
                }}
                txData={txData}
              />
            ) : (
              <Minting />
            ))}
        </main>
      ) : (
        <main>
          <div>Please connect your wallet.</div>
        </main>
      )}
    </div>
  );
}

const header: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "20px",
  paddingLeft: "50px",
  paddingRight: "50px",
};

const NFTFlex: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: "50px",
};
