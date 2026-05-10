import { usePanier } from "../../hooks/usePanier";
import { ajouterCommande } from "../../services/serviceCommandes";
import { useNavigate } from "react-router-dom";

export default function RecapitulatifPanier() {
  const { panier, totalPrix, viderPanier } = usePanier();
  const navigate = useNavigate();

  const commander = () => {
    ajouterCommande({ articles: panier, total: totalPrix });
    viderPanier();
    navigate("/mes-commandes");
  };

  return (
    <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
      <h3>Récapitulatif</h3>
      <p style={{ margin: "16px 0", fontSize: "20px" }}>Total : <strong style={{ color: "#e44d26" }}>{totalPrix.toFixed(2)} €</strong></p>
      <button onClick={commander} style={{ backgroundColor: "#e44d26", color: "white", border: "none", padding: "12px 24px", borderRadius: "6px", cursor: "pointer", width: "100%", fontSize: "16px" }}>
        Confirmer la commande
      </button>
    </div>
  );
}