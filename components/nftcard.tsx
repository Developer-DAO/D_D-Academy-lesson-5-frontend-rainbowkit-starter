import Image from "next/image";
import { CSSProperties } from "react";

export function NftCard({
  name,
  imageSrc,
  alt,
  onClick,
  disabled,
}: {
  name: string;
  imageSrc: string;
  alt: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div style={NFTCard}>
      <h2>{name}</h2>
      <Image src={imageSrc} width="200" height="200" alt={alt} />
      <button onClick={onClick} style={NFTMint} disabled={disabled}>
        Mint
      </button>
    </div>
  );
}

const NFTCard: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  border: "2px solid white",
  borderRadius: "10px",
  padding: "20px",
  alignItems: "center",
  gap: "10px",
  fontWeight: "bold",
};

const NFTMint: CSSProperties = {
  fontWeight: "700",
  padding: "5px 20px",
  border: "2px solid white",
  color: "white",
  backgroundColor: "black",
  borderRadius: "5px",
  cursor: "pointer",
};
