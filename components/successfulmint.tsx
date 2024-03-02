import Image from "next/image";
import { CSSProperties } from "react";
import { TransactionReceipt, formatUnits } from "viem";

export function SuccessfulMint({
  contractAddress,
  nftMinted,
  mintedTokenId,
  txData,
  onClick,
}: {
  contractAddress: `0x${string}`;
  nftMinted: {
    name: string;
    image: string;
  };
  mintedTokenId?: bigint;
  txData?: TransactionReceipt;
  onClick: () => void;
}) {
  return (
    <div style={modal}>
      <div style={modalContent}>
        <div style={modalContent}>
          <h2>Mint Successful</h2>
          <div style={modalBody}>
            {nftMinted.name && <h3>{nftMinted.name}</h3>}
            {nftMinted.image && (
              <Image
                src={nftMinted.image}
                height="200"
                width="200"
                alt="Minted NFT"
              />
            )}
          </div>
          <div style={modalFooter}>
            <button style={modalButton}>
              {mintedTokenId != undefined && (
                <a
                  href={`https://testnets.opensea.io/assets/mumbai/${contractAddress}/${formatUnits(
                    mintedTokenId,
                    0
                  )}`}
                  target="_blank"
                >
                  View on OpenSea
                </a>
              )}
            </button>
            <button style={modalButton}>
              {txData && txData.transactionHash ? (
                <a
                  href={`https://mumbai.polygonscan.com/tx/${txData.transactionHash}`}
                  target="_blank"
                >
                  View on Polygonscan
                </a>
              ) : undefined}
            </button>
            <button onClick={onClick} style={modalButton}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const modal: CSSProperties = {
  position: "fixed",
  left: "0",
  top: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  zIndex: "1",
};

const modalContent: CSSProperties = {
  backgroundColor: "#fff",
  padding: "10px 30px",
  borderRadius: "16px",
  color: "#000",
};

const modalBody: CSSProperties = {
  padding: "20px",
  borderTop: "1px solid #eee",
  borderBottom: "1px solid #eee",
};

const modalFooter: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
  justifyContent: "space-evenly",
};

const modalButton: CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#fff",
  color: "#666",
  border: "0",
  borderRadius: "10px",
  fontSize: "18px",
  fontWeight: "700",
  boxShadow:
    "0 0.2em 0.4em 0 rgba(0, 0, 0, 0.2), 0 0.3em 1em 0 rgba(0, 0, 0, 0.19)",
  cursor: "pointer",
};
