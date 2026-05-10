import { useState, useEffect } from "react";
import { usePanier } from "../hooks/usePanier";
import { useNavigate, Link } from "react-router-dom";
import { validerCommande } from "../services/serviceCommandes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const formatDH = (price) => `${Number(price || 0).toFixed(2)} DH`;

export default function Panier() {
  const { panier, retirerDuPanier, viderPanier, totalPrix } = usePanier();
  const navigate = useNavigate();

  const [modePaiement, setModePaiement] = useState("visa");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const fraisLivraison = totalPrix >= 500 ? 0 : 29.99;
  const totalFinal = totalPrix + fraisLivraison;

  const MODES_PAIEMENT = [
    { id: "visa", label: "Carte bancaire", icon: "bi-credit-card", desc: "Visa, Mastercard" },
    { id: "paypal", label: "PayPal", icon: "bi-paypal", desc: "Sécurisé PayPal" },
    { id: "virement", label: "Virement bancaire", icon: "bi-bank", desc: "Virement direct" },
    { id: "livraison", label: "Paiement à la livraison", icon: "bi-truck", desc: "Paiement à réception" },
  ];

  const getImageUrl = (img) =>
    img?.startsWith("http") ? img : `http://localhost:8080/images/${img}`;

  const handleRemoveItem = async (id) => {
    setRemovingId(id);
    setTimeout(() => {
      retirerDuPanier(id);
      setRemovingId(null);
    }, 300);
  };

  const confirmerCommande = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // ← FIXED: was "user", must match what ContexteAuth saves ("utilisateur")
      const storedUser = JSON.parse(localStorage.getItem("utilisateur"));

      if (!storedUser?.id) {
        alert("Utilisateur non connecté");
        return;
      }

      if (!panier || panier.length === 0) {
        alert("Panier vide");
        return;
      }

      const orderDTO = {
        userId: Number(storedUser.id),
        modePaiement,
        items: panier.map((p) => ({
          productId: Number(p.id || p.productId),
          quantity: Number(p.quantite),
        })),
      };

      await validerCommande(orderDTO);

      viderPanier();
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setTimeout(() => navigate("/mes-commandes"), 500);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la commande : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  /* EMPTY */
  if (panier.length === 0 && !showSuccess) {
    return (
      <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
        <div style={{
          background: "linear-gradient(135deg, #0f22cc 0%, #3B82F6 100%)",
          padding: "40px 20px",
          color: "white",
        }}>
          <div className="container">
            <h1 style={{ fontWeight: "800", fontSize: "32px", margin: "0 0 8px 0" }}>
              <i className="bi bi-cart-fill me-3" />
              Mon Panier
            </h1>
            <p style={{ opacity: 0.85, margin: 0, fontSize: "15px" }}>
              Gestion de vos articles
            </p>
          </div>
        </div>

        <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px", textAlign: "center" }}>
          <i className="bi bi-cart-x" style={{ fontSize: "72px", color: "#CBD5E1", display: "block", marginBottom: "20px" }} />
          <h3 style={{ fontWeight: "700", color: "#0F172A", marginBottom: "12px", fontSize: "24px" }}>
            Votre panier est vide
          </h3>
          <p style={{ color: "#64748B", marginBottom: "28px", fontSize: "15px" }}>
            Explorez notre catalogue et ajoutez vos produits préférés
          </p>
          <Link
            to="/catalogue"
            className="btn btn-lg"
            style={{
              backgroundColor: "#0f22cc",
              color: "white",
              border: "none",
              fontWeight: "700",
              padding: "12px 32px",
              borderRadius: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <i className="bi bi-shop" />
            Continuer les achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", paddingBottom: "40px" }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #0f22cc 0%, #3B82F6 100%)",
        padding: "40px 20px",
        color: "white",
      }}>
        <div className="container">
          <h1 style={{ fontWeight: "800", fontSize: "32px", margin: "0 0 8px 0" }}>
            <i className="bi bi-cart-fill me-3" />
            Mon Panier
          </h1>
          <p style={{ opacity: 0.85, margin: 0, fontSize: "15px" }}>
            {panier.length} article{panier.length !== 1 ? "s" : ""} - Total: <strong>{formatDH(totalFinal)}</strong>
          </p>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION */}
      {showSuccess && (
        <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999, animation: "slideInRight 0.4s ease-out" }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            minWidth: "380px",
            border: "1px solid #ECFDF5",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                backgroundColor: "#ECFDF5", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <i className="bi bi-check-circle-fill" style={{ fontSize: "28px", color: "#10B981" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0", fontSize: "18px" }}>
                  Commande confirmée! 🎉
                </h4>
                <p style={{ color: "#64748B", margin: "0 0 12px 0", fontSize: "14px", lineHeight: "1.5" }}>
                  Merci pour votre achat! Vous allez être redirigé vers vos commandes.
                </p>
                <div style={{ height: "3px", backgroundColor: "#10B981", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", backgroundColor: "#10B981", animation: "progress 3s ease-out forwards" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="container" style={{ paddingTop: "32px" }}>
        <div className="row g-4">

          {/* LEFT - CART ITEMS */}
          <div className="col-lg-8">
            {panier.map((item, index) => (
              <div
                key={item.id}
                className="card border-0 mb-3 overflow-hidden"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  opacity: removingId === item.id ? 0.5 : 1,
                  transform: removingId === item.id ? "scale(0.95)" : "scale(1)",
                }}
              >
                <div className="card-body p-4">
                  <div className="row align-items-center g-4">
                    <div className="col-sm-auto">
                      <img
                        src={getImageUrl(item.imageUrl)}
                        alt={item.name}
                        style={{
                          width: "120px", height: "120px",
                          objectFit: "cover", borderRadius: "10px",
                          border: "1px solid #E2E8F0",
                        }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/120")}
                      />
                    </div>

                    <div className="col-sm flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h6 style={{ fontWeight: "700", color: "#0F172A", margin: "0 0 8px 0", fontSize: "16px" }}>
                            {item.name}
                          </h6>
                          <small style={{ color: "#64748B", display: "block" }}>SKU: {item.id}</small>
                        </div>
                        <span className="badge bg-light text-dark">#{index + 1}</span>
                      </div>

                      <div className="row align-items-center g-3 mb-3">
                        <div className="col-auto">
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>
                              {formatDH(item.price)} × {item.quantite}
                            </span>
                            <span style={{
                              padding: "4px 10px", backgroundColor: "#E7F1FF",
                              color: "#0f22cc", borderRadius: "6px", fontSize: "12px", fontWeight: "700",
                            }}>
                              Qté: {item.quantite}
                            </span>
                          </div>
                        </div>
                        <div className="col-auto ms-auto">
                          <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f22cc" }}>
                            {formatDH(item.price * item.quantite)}
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-sm"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={removingId === item.id}
                        style={{
                          backgroundColor: "#FFE4E4", color: "#DC2626",
                          border: "none", fontWeight: "600", fontSize: "13px",
                          padding: "6px 12px", borderRadius: "6px",
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          cursor: removingId === item.id ? "wait" : "pointer",
                        }}
                      >
                        <i className="bi bi-trash3" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={viderPanier}
              className="btn btn-sm btn-outline-danger w-100"
              style={{ padding: "10px", fontWeight: "600", borderColor: "#DC2626", color: "#DC2626" }}
            >
              <i className="bi bi-trash3 me-2" />
              Vider le panier
            </button>
          </div>

          {/* RIGHT - ORDER SUMMARY & PAYMENT */}
          <div className="col-lg-4">
            <div className="card border-0 mb-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)", position: "sticky", top: "20px" }}>
              <div className="card-body p-4">
                <h5 style={{ fontWeight: "800", color: "#0F172A", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="bi bi-receipt" style={{ color: "#0f22cc" }} />
                  Résumé de la commande
                </h5>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", marginBottom: "12px", borderBottom: "1px solid #E2E8F0" }}>
                  <span style={{ color: "#64748B", fontWeight: "500" }}>
                    Sous-total ({panier.length} article{panier.length !== 1 ? "s" : ""})
                  </span>
                  <span style={{ fontWeight: "700", color: "#0F172A" }}>{formatDH(totalPrix)}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", marginBottom: "16px", borderBottom: "1px solid #E2E8F0" }}>
                  <div>
                    <span style={{ color: "#64748B", fontWeight: "500" }}>Livraison</span>
                    <small style={{ display: "block", color: "#94A3B8", fontSize: "12px", marginTop: "2px" }}>
                      {fraisLivraison === 0 ? "Livraison gratuite" : "En 1-3 jours"}
                    </small>
                  </div>
                  <span style={{ fontWeight: "700", color: fraisLivraison === 0 ? "#10B981" : "#0F172A" }}>
                    {formatDH(fraisLivraison)}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A" }}>Total</span>
                  <span style={{
                    fontSize: "24px", fontWeight: "800",
                    background: "linear-gradient(135deg, #0f22cc 0%, #3B82F6 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    {formatDH(totalFinal)}
                  </span>
                </div>

                {fraisLivraison > 0 && (
                  <div style={{
                    padding: "12px", backgroundColor: "#FEF3C7",
                    border: "1px solid #FCD34D", borderRadius: "8px",
                    fontSize: "12px", color: "#92400E", fontWeight: "600",
                  }}>
                    <i className="bi bi-info-circle me-2" />
                    Frais de livraison gratuits à partir de 500 DH
                  </div>
                )}
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="card border-0 mb-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div className="card-body p-4">
                <h5 style={{ fontWeight: "800", color: "#0F172A", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="bi bi-credit-card" style={{ color: "#0f22cc" }} />
                  Mode de paiement
                </h5>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {MODES_PAIEMENT.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setModePaiement(m.id)}
                      style={{
                        padding: "14px",
                        border: modePaiement === m.id ? "2px solid #0f22cc" : "1px solid #E2E8F0",
                        borderRadius: "10px", cursor: "pointer",
                        backgroundColor: modePaiement === m.id ? "#E7F1FF" : "white",
                        transition: "all 0.2s",
                        display: "flex", alignItems: "center", gap: "12px",
                      }}
                    >
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "8px",
                        backgroundColor: modePaiement === m.id ? "#0f22cc" : "#E7F1FF",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <i className={`bi ${m.icon}`} style={{ fontSize: "18px", color: modePaiement === m.id ? "white" : "#0f22cc" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "700", color: "#0F172A", fontSize: "14px" }}>{m.label}</div>
                        <small style={{ color: "#94A3B8", fontSize: "12px" }}>{m.desc}</small>
                      </div>
                      {modePaiement === m.id && (
                        <i className="bi bi-check-circle-fill ms-auto" style={{ color: "#0f22cc", fontSize: "18px" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CONFIRM BUTTON */}
            <button
              onClick={confirmerCommande}
              disabled={loading || panier.length === 0}
              className="btn btn-lg w-100"
              style={{
                background: loading || panier.length === 0
                  ? "#CBD5E1"
                  : "linear-gradient(135deg, #0f22cc 0%, #3B82F6 100%)",
                color: "white", border: "none", fontWeight: "800",
                padding: "14px 20px", borderRadius: "10px", fontSize: "16px",
                cursor: loading || panier.length === 0 ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Traitement en cours...
                </>
              ) : (
                <>
                  <i className="bi bi-check2-circle" />
                  Confirmer la commande
                </>
              )}
            </button>

            <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "16px", textAlign: "center", margin: "16px 0 0 0" }}>
              <i className="bi bi-lock-fill me-1" />
              Paiement sécurisé et chiffré
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(400px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        @media (max-width: 768px) {
          .card { margin-bottom: 1rem !important; }
        }
      `}</style>
    </div>
  );
}