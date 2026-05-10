import { useEffect, useState } from "react";
import { getCommandes, annulerCommande } from "../services/serviceCommandes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [cancellingId, setCancellingId] = useState(null);

  const getUser = () => {
    try {
      // ← FIXED: was "user", must match ContexteAuth which saves "utilisateur"
      return JSON.parse(localStorage.getItem("utilisateur"));
    } catch (e) {
      return null;
    }
  };

  const user = getUser();

  const loadCommandes = async () => {
    if (!user || !user.id) {
      console.warn("⚠️ No user found in localStorage");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getCommandes(user.id);
      setCommandes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error loading orders:", err.message);
      setCommandes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler cette commande ?")) {
      setCancellingId(orderId);
      try {
        await annulerCommande(orderId);
        await loadCommandes();
      } catch (err) {
        console.error("❌ Cancel error:", err.message);
      } finally {
        setCancellingId(null);
      }
    }
  };

  useEffect(() => {
    loadCommandes();
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      "PENDING":    { bg: "#E3F2FD", color: "#1976D2", icon: "bi-hourglass-split", label: "En attente" },
      "PROCESSING": { bg: "#FFF3E0", color: "#F57C00", icon: "bi-gear",            label: "En traitement" },
      "SHIPPED":    { bg: "#E8F5E9", color: "#388E3C", icon: "bi-truck",           label: "Expédié" },
      "DELIVERED":  { bg: "#F3E5F5", color: "#7B1FA2", icon: "bi-check-circle",    label: "Livré" },
      "CANCELLED":  { bg: "#FFEBEE", color: "#C62828", icon: "bi-x-circle",        label: "Annulé" },
    };
    return statusMap[status] || statusMap["PENDING"];
  };

  const filteredCommandes = filterStatus === "all"
    ? commandes
    : commandes.filter((cmd) => cmd.status === filterStatus);

  if (!user) {
    return (
      <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <i className="bi bi-exclamation-triangle" style={{ fontSize: "48px", color: "#0f22cc", marginBottom: "16px", display: "block" }} />
          <h3 style={{ fontWeight: "700", color: "#212529", marginBottom: "12px" }}>Veuillez vous connecter</h3>
          <p style={{ color: "#6C757D", fontSize: "14px" }}>Vous devez être connecté pour voir vos commandes.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ width: "50px", height: "50px", border: "3px solid #E9ECEF", borderTop: "3px solid #0f22cc", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ marginTop: "20px", color: "#6C757D", fontWeight: "500", fontSize: "14px" }}>Chargement de vos commandes...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", paddingBottom: "40px" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #0f22cc 0%, #1a35e8 100%)", padding: "40px 0 30px", borderBottom: "1px solid #E9ECEF" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <i className="bi bi-box-seam" style={{ fontSize: "28px", color: "white" }} />
            <h1 style={{ fontWeight: "800", color: "white", margin: 0, fontSize: "32px" }}>Mes Commandes</h1>
          </div>
          <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: "14px" }}>Suivi et gestion de vos achats</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container" style={{ paddingTop: "32px" }}>

        {/* FILTER TABS */}
        {commandes.length > 0 && (
          <div style={{ marginBottom: "32px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "all",       label: `Toutes (${commandes.length})`, icon: "bi-list" },
              { id: "PENDING",   label: "En attente",                   icon: "bi-hourglass-split" },
              { id: "SHIPPED",   label: "Expédié",                      icon: "bi-truck" },
              { id: "DELIVERED", label: "Livré",                        icon: "bi-check-circle" },
              { id: "CANCELLED", label: "Annulé",                       icon: "bi-x-circle" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: filterStatus === f.id ? "2px solid #0f22cc" : "1px solid #E9ECEF",
                  backgroundColor: filterStatus === f.id ? "#E3F2FD" : "#F9F9F9",
                  color: filterStatus === f.id ? "#0f22cc" : "#6C757D",
                  fontWeight: "600",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <i className={`bi ${f.icon}`} style={{ marginRight: "6px" }} />
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {filteredCommandes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", backgroundColor: "#F9F9F9", borderRadius: "8px" }}>
            <i className="bi bi-inbox" style={{ fontSize: "56px", color: "#0f22cc", opacity: 0.3, marginBottom: "16px", display: "block" }} />
            <h4 style={{ fontWeight: "700", color: "#212529", marginBottom: "8px" }}>Aucune commande</h4>
            <p style={{ color: "#6C757D", fontSize: "14px", marginBottom: "24px" }}>
              {filterStatus === "all" ? "Vous n'avez pas encore passé de commande." : "Aucune commande avec ce statut."}
            </p>
            <a href="/catalogue" style={{
              display: "inline-block", backgroundColor: "#0f22cc", color: "white",
              padding: "10px 24px", borderRadius: "6px", textDecoration: "none",
              fontWeight: "600", fontSize: "14px",
            }}>
              <i className="bi bi-shop" style={{ marginRight: "6px" }} />
              Continuer les achats
            </a>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {filteredCommandes.map((cmd) => {
              const statusObj = getStatusBadge(cmd.status);
              return (
                <div
                  key={cmd.id}
                  style={{
                    backgroundColor: "#FFFFFF", border: "1px solid #E9ECEF",
                    borderRadius: "8px", padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)", transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(15,34,204,0.1)";
                    e.currentTarget.style.borderColor = "#0f22cc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "#E9ECEF";
                  }}
                >
                  {/* ORDER HEADER */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <h5 style={{ fontWeight: "700", color: "#212529", margin: "0 0 4px 0", fontSize: "16px" }}>
                        <i className="bi bi-hash" style={{ marginRight: "6px", color: "#0f22cc" }} />
                        Commande #{cmd.id}
                      </h5>
                      <p style={{ color: "#6C757D", fontSize: "12px", margin: 0 }}>
                        <i className="bi bi-calendar3" style={{ marginRight: "4px" }} />
                        {new Date(cmd.createdAt || Date.now()).toLocaleDateString("fr-FR", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    </div>

                    <div style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      backgroundColor: statusObj.bg, color: statusObj.color,
                      padding: "8px 14px", borderRadius: "6px",
                      fontWeight: "700", fontSize: "12px",
                      textTransform: "uppercase", letterSpacing: "0.5px",
                    }}>
                      <i className={`bi ${statusObj.icon}`} />
                      {statusObj.label}
                    </div>
                  </div>

                  {/* ORDER DETAILS */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "16px", marginBottom: "20px", paddingBottom: "16px",
                    borderBottom: "1px solid #E9ECEF",
                  }}>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6C757D", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Montant Total
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f22cc" }}>
                        {cmd.totalAmount}
                        <span style={{ fontSize: "14px", marginLeft: "4px" }}>DH</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: "12px", color: "#6C757D", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Articles
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: "800", color: "#212529" }}>
                        {cmd.items?.length || 1}
                        <span style={{ fontSize: "12px", color: "#6C757D", marginLeft: "4px" }}>
                          article{(cmd.items?.length || 1) !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: "12px", color: "#6C757D", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Paiement
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: "700", color: cmd.isPaid ? "#28A745" : "#FFC107", display: "flex", alignItems: "center", gap: "6px" }}>
                        <i className={`bi ${cmd.isPaid ? "bi-check-circle-fill" : "bi-hourglass-split"}`} />
                        {cmd.isPaid ? "Payée" : "En attente"}
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button style={{
                      flex: 1, minWidth: "120px", backgroundColor: "#0f22cc", color: "white",
                      border: "none", padding: "10px 16px", borderRadius: "6px",
                      fontWeight: "700", fontSize: "13px", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    }}>
                      <i className="bi bi-eye" />
                      Détails
                    </button>

                    {cmd.status !== "DELIVERED" && cmd.status !== "CANCELLED" && (
                      <button
                        onClick={() => handleCancel(cmd.id)}
                        disabled={cancellingId === cmd.id}
                        style={{
                          flex: 1, minWidth: "120px", backgroundColor: "#FFF3CD",
                          color: "#856404", border: "1px solid #FFE69C",
                          padding: "10px 16px", borderRadius: "6px",
                          fontWeight: "700", fontSize: "13px",
                          cursor: cancellingId === cmd.id ? "not-allowed" : "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                          opacity: cancellingId === cmd.id ? 0.6 : 1, transition: "all 0.2s",
                        }}
                      >
                        {cancellingId === cmd.id ? (
                          <><i className="bi bi-hourglass-split" />Annulation...</>
                        ) : (
                          <><i className="bi bi-x-circle" />Annuler</>
                        )}
                      </button>
                    )}

                    <button style={{
                      flex: 1, minWidth: "120px", backgroundColor: "#E9ECEF",
                      color: "#495057", border: "1px solid #DEE2E6",
                      padding: "10px 16px", borderRadius: "6px",
                      fontWeight: "700", fontSize: "13px", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    }}>
                      <i className="bi bi-arrow-repeat" />
                      Recommander
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}