import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { obtenirToutInventaire, mettreAJourQuantite } from "../services/serviceInventaire";

export default function Inventaire() {
  const [inventaire, setInventaire] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInventaire = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await obtenirToutInventaire();
      setInventaire(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Erreur lors du chargement de l'inventaire: " + err.message);
      setInventaire([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventaire();
  }, []);

  const getStatus = (qty) => {
    if (qty < 20) return { label: "Faible", color: "#EF4444", bg: "#FEE2E2" };
    if (qty < 50) return { label: "Moyen", color: "#F59E0B", bg: "#FEF3C7" };
    return { label: "Bon", color: "#10B981", bg: "#ECFDF5" };
  };

  const handleEditStart = (productId, currentQty) => {
    setEditingId(productId);
    setEditingValue(currentQty.toString());
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const handleSaveQuantity = async (productId) => {
    const newQty = parseInt(editingValue, 10);

    if (isNaN(newQty) || newQty < 0) {
      setError("Veuillez entrer une quantité valide");
      return;
    }

    setUpdating(true);
    setError("");
    setSuccessMessage("");

    try {
      // ← FIXED: uses productId not id, matches PUT /api/inventory/{productId}
      await mettreAJourQuantite(productId, newQty);

      // ← FIXED: updates by productId in local state
      setInventaire((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity: newQty } : item
        )
      );

      setSuccessMessage(`Stock du produit #${productId} mis à jour avec succès!`);
      setTimeout(() => setSuccessMessage(""), 3000);
      setEditingId(null);
      setEditingValue("");
    } catch (err) {
      setError("Erreur lors de la mise à jour du stock: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const filteredInventaire = inventaire.filter((item) => {
    if (!item) return false;
    return (
      (item.productId && item.productId.toString().includes(searchTerm.toLowerCase())) ||
      (item.id && item.id.toString().includes(searchTerm.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: "80vh", backgroundColor: "#F8FAFC",
      }}>
        <div className="spinner-border" style={{ color: "#0f22cc", width: 50, height: 50 }} />
        <p style={{ marginTop: 20, color: "#64748B", fontWeight: "500" }}>
          Chargement de l'inventaire...
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #E2E8F0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}>
        <div className="container-lg" style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "12px 0",
        }}>
          <div style={{
            fontSize: "24px", fontWeight: "800",
            background: "linear-gradient(135deg, #0f22cc, #3B82F6)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <i className="bi bi-box-seam-fill" style={{ WebkitTextFillColor: "#0f22cc" }} />
            E-STORE ADMIN
          </div>

          <button
            onClick={fetchInventaire}
            style={{
              backgroundColor: "#0f22cc", color: "white", border: "none",
              padding: "10px 18px", borderRadius: "6px", fontWeight: "600",
              fontSize: "13px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#0a1399"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#0f22cc"}
          >
            <i className="bi bi-arrow-clockwise" />
            Actualiser
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0f22cc, #3B82F6)",
        color: "white", padding: "40px 20px", marginBottom: "30px",
      }}>
        <div className="container-lg">
          <h1 style={{ fontSize: "36px", fontWeight: "800", margin: "0 0 8px 0" }}>
            <i className="bi bi-graph-up-arrow" style={{ marginRight: "12px" }} />
            Gestion de l'inventaire
          </h1>
          <p style={{ opacity: 0.9, margin: 0, fontSize: "15px" }}>
            Suivez et mettez à jour le stock de vos produits en temps réel
          </p>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="container-lg mb-3">
          <div style={{
            backgroundColor: "#FEE2E2", color: "#991B1B",
            padding: "14px 16px", borderRadius: "8px",
            border: "1px solid #FECACA",
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            <i className="bi bi-exclamation-circle-fill" />
            {error}
          </div>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="container-lg mb-3">
          <div style={{
            backgroundColor: "#ECFDF5", color: "#166534",
            padding: "14px 16px", borderRadius: "8px",
            border: "1px solid #BBFBEE",
            display: "flex", alignItems: "center", gap: "10px",
            animation: "slideIn 0.3s ease-out",
          }}>
            <i className="bi bi-check-circle-fill" />
            {successMessage}
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="container-lg" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px", marginBottom: "30px",
      }}>
        <div style={cardStyle("#0f22cc")}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <i className="bi bi-box-fill" style={{ fontSize: "28px", color: "#0f22cc", opacity: 0.3 }} />
            <div>
              <h3 style={{ margin: 0, fontWeight: "800", fontSize: "28px", color: "#0f22cc" }}>
                {inventaire.length}
              </h3>
              <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13px" }}>Articles en stock</p>
            </div>
          </div>
        </div>

        <div style={cardStyle("#10B981")}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <i className="bi bi-stack" style={{ fontSize: "28px", color: "#10B981", opacity: 0.3 }} />
            <div>
              <h3 style={{ margin: 0, fontWeight: "800", fontSize: "28px", color: "#10B981" }}>
                {inventaire.reduce((acc, i) => acc + (i.quantity || 0), 0)}
              </h3>
              <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13px" }}>Quantité totale</p>
            </div>
          </div>
        </div>

        <div style={cardStyle("#F59E0B")}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: "28px", color: "#F59E0B", opacity: 0.3 }} />
            <div>
              <h3 style={{ margin: 0, fontWeight: "800", fontSize: "28px", color: "#F59E0B" }}>
                {inventaire.filter((i) => (i?.quantity || 0) < 20).length}
              </h3>
              <p style={{ margin: "4px 0 0", color: "#64748B", fontSize: "13px" }}>Stock faible</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="container-lg mb-4">
        <div style={{
          display: "flex", alignItems: "center",
          backgroundColor: "white", borderRadius: "8px",
          border: "1px solid #E2E8F0", padding: "0 14px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}>
          <i className="bi bi-search" style={{ color: "#94A3B8", marginRight: "10px" }} />
          <input
            type="text"
            placeholder="Rechercher par ID ou produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1, border: "none", padding: "12px 0",
              fontSize: "14px", outline: "none", fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="container-lg">
        <div style={{
          backgroundColor: "white", borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          overflow: "hidden", border: "1px solid #E2E8F0",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table className="table mb-0" style={{ fontSize: "14px" }}>
              <thead style={{ backgroundColor: "#0f22cc", color: "white" }}>
                <tr>
                  <th style={{ padding: "16px", fontWeight: "700" }}>ID</th>
                  <th style={{ padding: "16px", fontWeight: "700" }}>Produit ID</th>
                  <th style={{ padding: "16px", fontWeight: "700", textAlign: "center" }}>Quantité</th>
                  <th style={{ padding: "16px", fontWeight: "700", textAlign: "center" }}>Status</th>
                  <th style={{ padding: "16px", fontWeight: "700", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredInventaire.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: "40px 20px", textAlign: "center" }}>
                      <i className="bi bi-inbox" style={{
                        fontSize: "48px", color: "#CBD5E1",
                        display: "block", marginBottom: "12px",
                      }} />
                      <p style={{ color: "#94A3B8", fontWeight: "600" }}>
                        {inventaire.length === 0 ? "Aucun produit en stock" : "Aucun résultat trouvé"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredInventaire.map((item) => {
                    if (!item) return null;
                    const status = getStatus(item.quantity || 0);
                    // ← FIXED: editing tracked by productId
                    const isEditing = editingId === item.productId;

                    return (
                      <tr
                        key={item.id}
                        style={{ borderBottom: "1px solid #E2E8F0", transition: "all 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F8FAFC"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                      >
                        <td style={{ padding: "16px", fontWeight: "600", color: "#0f22cc" }}>
                          {item.id}
                        </td>
                        <td style={{ padding: "16px", fontWeight: "600", color: "#212529" }}>
                          {item.productId}
                        </td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              style={{
                                padding: "8px 12px", borderRadius: "6px",
                                border: "2px solid #0f22cc", fontSize: "14px",
                                width: "100px", textAlign: "center", fontWeight: "600",
                              }}
                              autoFocus
                            />
                          ) : (
                            <span style={{ fontWeight: "700", fontSize: "16px", color: "#0f22cc" }}>
                              {item.quantity || 0}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          <span style={{
                            backgroundColor: status.bg, color: status.color,
                            padding: "6px 12px", borderRadius: "20px",
                            fontSize: "12px", fontWeight: "700",
                            display: "inline-block",
                            border: `1px solid ${status.color}30`,
                          }}>
                            {status.label}
                          </span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          {isEditing ? (
                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                              <button
                                onClick={() => handleSaveQuantity(item.productId)}
                                disabled={updating}
                                style={{
                                  backgroundColor: "#10B981", color: "white",
                                  border: "none", padding: "6px 12px", borderRadius: "6px",
                                  fontWeight: "600", fontSize: "12px",
                                  cursor: updating ? "not-allowed" : "pointer",
                                  opacity: updating ? 0.6 : 1, transition: "all 0.2s",
                                  display: "inline-flex", alignItems: "center", gap: "4px",
                                }}
                                onMouseEnter={(e) => { if (!updating) e.target.style.backgroundColor = "#059669"; }}
                                onMouseLeave={(e) => { if (!updating) e.target.style.backgroundColor = "#10B981"; }}
                              >
                                <i className="bi bi-check-lg" />
                                {updating ? "Sauvegarde..." : "Sauvegarder"}
                              </button>
                              <button
                                onClick={handleEditCancel}
                                disabled={updating}
                                style={{
                                  backgroundColor: "#EF4444", color: "white",
                                  border: "none", padding: "6px 12px", borderRadius: "6px",
                                  fontWeight: "600", fontSize: "12px",
                                  cursor: updating ? "not-allowed" : "pointer",
                                  opacity: updating ? 0.6 : 1, transition: "all 0.2s",
                                  display: "inline-flex", alignItems: "center", gap: "4px",
                                }}
                                onMouseEnter={(e) => { if (!updating) e.target.style.backgroundColor = "#DC2626"; }}
                                onMouseLeave={(e) => { if (!updating) e.target.style.backgroundColor = "#EF4444"; }}
                              >
                                <i className="bi bi-x-lg" />
                                Annuler
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEditStart(item.productId, item.quantity || 0)}
                              style={{
                                backgroundColor: "#0f22cc", color: "white",
                                border: "none", padding: "6px 12px", borderRadius: "6px",
                                fontWeight: "600", fontSize: "12px", cursor: "pointer",
                                transition: "all 0.2s",
                                display: "inline-flex", alignItems: "center", gap: "4px",
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = "#0a1399"}
                              onMouseLeave={(e) => e.target.style.backgroundColor = "#0f22cc"}
                            >
                              <i className="bi bi-pencil-fill" />
                              Éditer
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {filteredInventaire.length > 0 && (
          <div style={{ marginTop: "16px", textAlign: "center", color: "#94A3B8", fontSize: "13px" }}>
            Affichage de {filteredInventaire.length} sur {inventaire.length} produits
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "40px", padding: "20px", textAlign: "center", color: "#94A3B8", fontSize: "13px" }}>
        © 2026 E-STORE ADMIN - Gestion d'inventaire
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const cardStyle = (color) => ({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  borderLeft: `4px solid ${color}`,
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  border: `1px solid #E2E8F0`,
});