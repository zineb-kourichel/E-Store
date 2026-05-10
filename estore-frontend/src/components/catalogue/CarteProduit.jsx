import { Link } from "react-router-dom";
import NotesEtoiles from "../commun/NotesEtoiles";
import { usePanier } from "../../hooks/usePanier";

export default function CarteProduit({ produit }) {
  const { ajouterAuPanier } = usePanier();

  return (
    <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "10px" }}>
      <Link to={`/produit/${produit.id}`}>
        <img src={produit.image} alt={produit.title} style={{ width: "100%", height: "180px", objectFit: "contain" }} />
      </Link>
      <Link to={`/produit/${produit.id}`}>
        <h4 style={{ fontSize: "14px", color: "#333" }}>{produit.title.slice(0, 50)}...</h4>
      </Link>
      <NotesEtoiles note={produit.rating?.rate} />
      <strong style={{ color: "#e44d26" }}>{produit.price} €</strong>
      <button onClick={() => ajouterAuPanier(produit)} style={{ backgroundColor: "#e44d26", color: "white", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer" }}>
        + Panier
      </button>
    </div>
  );
}