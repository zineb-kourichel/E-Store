import { usePanier } from "../../hooks/usePanier";

export default function LignePanier({ article }) {
  const { retirerDuPanier } = usePanier();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px", backgroundColor: "white", borderRadius: "8px", marginBottom: "10px" }}>
      <img src={article.image} alt={article.title} style={{ width: "60px", height: "60px", objectFit: "contain" }} />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "14px" }}>{article.title.slice(0, 40)}...</p>
        <p style={{ color: "#e44d26" }}>{article.price} € × {article.quantite}</p>
      </div>
      <button onClick={() => retirerDuPanier(article.id)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer" }}>🗑️</button>
    </div>
  );
}