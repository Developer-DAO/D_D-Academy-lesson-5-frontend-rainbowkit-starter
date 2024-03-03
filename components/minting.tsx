import { CSSProperties } from "react";

export function Minting() {
  return (
    <div style={modal}>
      <div style={modalContent}>
        <h2>Minting...</h2>
        <p>Please be patient, this make take several seconds.</p>
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
