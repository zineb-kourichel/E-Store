import { useState, useEffect } from "react";
import { useAuth } from "../contexte/ContexteAuth";
import { Link, useNavigate } from "react-router-dom";
import { getCommandes } from "../services/serviceCommandes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BLUE = "#2563EB";
const DARK = "#1E3A8A";
const BG = "#F1F5F9";

const toDH = (v) => `${(Number(v) * 10.8).toFixed(2)} DH`;

const statusConfig = {
  PENDING:   { label: "En attente", badge: "warning" },
  CANCELLED: { label: "Annulée",   badge: "danger"  },
  DELIVERED: { label: "Livrée",    badge: "success" },
  SHIPPED:   { label: "Expédiée",  badge: "info"    },
};

const Badge = ({ status }) => {
  const cfg = statusConfig[status] || { label: status, badge: "secondary" };
  return <span className={`badge bg-${cfg.badge}`}>{cfg.label}</span>;
};

export default function Profil() {
  const { utilisateur, seDeconnecter } = useAuth();
  const navigate = useNavigate();
  const [commandes, setCommandes] = useState([]);
  const [onglet, setOnglet] = useState("profil");
  const [sauvegarde, setSauvegarde] = useState(false);
  const [form, setForm] = useState({
    nom: "", email: "", telephone: "",
    adresse: "", ville: "Casablanca", pays: "Maroc",
  });

  useEffect(() => {
    if (utilisateur) {
      setForm((f) => ({
        ...f,
        nom: utilisateur.nom || "",
        email: utilisateur.email || "",
      }));
    }
  }, [utilisateur]);

  useEffect(() => {
    if (utilisateur?.id) {
      getCommandes(utilisateur.id).then(setCommandes).catch(() => {});
    }
  }, [utilisateur?.id]);

  /* ── NOT LOGGED IN ── */
  if (!utilisateur) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: BG }}>
        <div className="card border-0 shadow-lg p-4 text-center" style={{ maxWidth: 460, width: "100%", borderRadius: 16 }}>
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
            style={{ width: 70, height: 70, background: "#EEF2FF", color: BLUE }}>
            <i className="bi bi-person-circle fs-2" />
          </div>
          <h4 className="fw-bold">Bienvenue sur eStore</h4>
          <p className="text-muted mb-3">Connectez-vous pour accéder à votre espace</p>
          <Link to="/connexion" className="btn btn-primary w-100 mb-2" style={{ background: BLUE, border: "none" }}>
            Se connecter
          </Link>
          <Link to="/inscription" className="btn btn-outline-primary w-100">Créer un compte</Link>
        </div>
      </div>
    );
  }

  const initiales =
    utilisateur.nom?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";

  const livrées = commandes.filter((c) => c.status === "DELIVERED").length;

  const tabs = [
    { id: "profil",    label: "Mon profil", icon: "bi-person"      },
    { id: "commandes", label: "Commandes",  icon: "bi-box"         },
    { id: "adresse",   label: "Adresses",   icon: "bi-geo-alt"     },
    { id: "securite",  label: "Sécurité",   icon: "bi-shield-lock" },
  ];

  const handleDeconnexion = () => {
    seDeconnecter();
    navigate("/");
  };

  return (
    <div style={{ background: BG, minHeight: "100vh", paddingBottom: 60 }}>

      {/* TOP HEADER BAR */}
      <div style={{
        background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
        padding: "0",
      }}>
        {/* breadcrumb row */}
        <div className="container-lg" style={{ maxWidth: 1100 }}>
          <div style={{ padding: "10px 0 0", color: "rgba(255,255,255,0.75)", fontSize: 13 }}>
            <Link to="/" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>
              <i className="bi bi-chevron-left me-1" />
              Retour à l'accueil
            </Link>
          </div>
          <div style={{ padding: "8px 0 24px" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>
              Accueil &gt; Mon espace
            </div>
            <h2 style={{ color: "white", fontWeight: 800, margin: 0, fontSize: 28 }}>
              Mon espace personnel
            </h2>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="container-lg" style={{ maxWidth: 1100, marginTop: 28 }}>
        <div className="row g-4">

          {/* ── LEFT SIDEBAR ── */}
          <div className="col-lg-4 col-md-5">

            {/* AVATAR CARD */}
            <div className="card border-0 shadow-sm mb-3" style={{ borderRadius: 14 }}>
              <div className="card-body text-center py-4">
                {/* Avatar circle */}
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: 80, height: 80,
                    background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                    color: "white", fontWeight: 800, fontSize: 28,
                  }}>
                  {initiales}
                </div>

                <h5 className="fw-bold mb-1" style={{ color: "#0F172A" }}>
                  {utilisateur.firstName} {utilisateur.lastName}
                </h5>
                <div style={{ color: "#64748B", fontSize: 13, marginBottom: 16 }}>
                  {utilisateur.email}
                </div>

                {/* Stats row */}
                <div className="d-flex justify-content-center gap-4 pt-3"
                  style={{ borderTop: "1px solid #E2E8F0" }}>
                  <div className="text-center">
                    <div style={{ fontWeight: 800, fontSize: 22, color: "#0F172A" }}>
                      {commandes.length}
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>Commandes</div>
                  </div>
                  <div style={{ width: 1, background: "#E2E8F0" }} />
                  <div className="text-center">
                    <div style={{ fontWeight: 800, fontSize: 22, color: "#0F172A" }}>
                      {livrées}
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>Livrées</div>
                  </div>
                </div>
              </div>
            </div>

            {/* NAV CARD */}
            <div className="card border-0 shadow-sm mb-3" style={{ borderRadius: 14 }}>
              <div className="card-body p-2">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setOnglet(t.id)}
                    className="w-100 d-flex align-items-center justify-content-between"
                    style={{
                      background: onglet === t.id ? "#EEF2FF" : "transparent",
                      border: "none",
                      borderLeft: onglet === t.id ? `3px solid ${BLUE}` : "3px solid transparent",
                      borderRadius: onglet === t.id ? "0 8px 8px 0" : "8px",
                      padding: "11px 14px",
                      color: onglet === t.id ? BLUE : "#475569",
                      fontWeight: onglet === t.id ? 700 : 500,
                      fontSize: 14,
                      cursor: "pointer",
                      marginBottom: 2,
                      transition: "all 0.15s",
                    }}
                  >
                    <span>
                      <i className={`bi ${t.icon} me-2`} />
                      {t.label}
                    </span>
                    {t.id === "commandes" && commandes.length > 0 && (
                      <span className="badge rounded-pill"
                        style={{ background: BLUE, fontSize: 11 }}>
                        {commandes.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* DECONNEXION CARD */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: 14 }}>
              <div className="card-body p-2">
                <button
                  onClick={handleDeconnexion}
                  className="w-100 d-flex align-items-center"
                  style={{
                    background: "transparent", border: "none",
                    borderRadius: 8, padding: "11px 14px",
                    color: "#EF4444", fontWeight: 600, fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2" />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="col-lg-8 col-md-7">
            <div className="card border-0 shadow-sm" style={{ borderRadius: 14, overflow: "hidden" }}>

              {/* Panel header */}
              <div style={{
                background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
                padding: "16px 24px",
                display: "flex", alignItems: "center", gap: 10,
                color: "white", fontWeight: 700, fontSize: 15,
              }}>
                <i className={`bi ${tabs.find((t) => t.id === onglet)?.icon}`} />
                {tabs.find((t) => t.id === onglet)?.label}
              </div>

              {/* ── PROFIL TAB ── */}
              {onglet === "profil" && (
                <div className="card-body p-4">
                  <p style={{ color: "#64748B", fontSize: 14, marginBottom: 24 }}>
                    Gérez vos informations personnelles.
                  </p>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: 12, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Nom Complet
                      </label>
                      <input
                        className="form-control"
                        style={{ borderRadius: 8, border: "1px solid #E2E8F0", padding: "10px 14px" }}
                        value={form.nom}
                        onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: 12, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Adresse E-Mail
                      </label>
                      <input
                        className="form-control"
                        style={{ borderRadius: 8, border: "1px solid #E2E8F0", padding: "10px 14px" }}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: 12, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Téléphone
                      </label>
                      <input
                        className="form-control"
                        style={{ borderRadius: 8, border: "1px solid #E2E8F0", padding: "10px 14px" }}
                        value={form.telephone}
                        onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                        placeholder="+212 6XX XXX XXX"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ fontSize: 12, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Ville
                      </label>
                      <input
                        className="form-control"
                        style={{ borderRadius: 8, border: "1px solid #E2E8F0", padding: "10px 14px" }}
                        value={form.ville}
                        onChange={(e) => setForm({ ...form, ville: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ fontSize: 12, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Adresse
                      </label>
                      <input
                        className="form-control"
                        style={{ borderRadius: 8, border: "1px solid #E2E8F0", padding: "10px 14px" }}
                        value={form.adresse}
                        onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                        placeholder="Rue, numéro, quartier..."
                      />
                    </div>
                  </div>

                  <div className="text-end mt-4">
                    <button
                      className="btn text-white d-inline-flex align-items-center gap-2"
                      style={{
                        background: sauvegarde ? "#16A34A" : BLUE,
                        border: "none", borderRadius: 8,
                        padding: "10px 22px", fontWeight: 700, fontSize: 14,
                        transition: "all 0.2s",
                      }}
                      onClick={() => { setSauvegarde(true); setTimeout(() => setSauvegarde(false), 2500); }}
                    >
                      <i className={`bi ${sauvegarde ? "bi-check-lg" : "bi-floppy"}`} />
                      {sauvegarde ? "Sauvegardé" : "Sauvegarder"}
                    </button>
                  </div>
                </div>
              )}

              {/* ── COMMANDES TAB ── */}
              {onglet === "commandes" && (
                <div className="card-body p-4">
                  {commandes.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-inbox" style={{ fontSize: 48, color: "#CBD5E1", display: "block", marginBottom: 12 }} />
                      <p className="text-muted">Aucune commande</p>
                      <Link to="/catalogue" className="btn btn-sm text-white" style={{ background: BLUE, borderRadius: 8 }}>
                        Commencer mes achats
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {commandes.map((c) => (
                        <div key={c.id} style={{
                          border: "1px solid #E2E8F0", borderRadius: 10,
                          padding: "14px 18px",
                          display: "flex", justifyContent: "space-between",
                          alignItems: "center", flexWrap: "wrap", gap: 10,
                          transition: "all 0.2s",
                        }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = BLUE}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
                        >
                          <div>
                            <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 14 }}>
                              Commande #{c.id}
                            </div>
                            <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 2 }}>
                              <i className="bi bi-calendar3 me-1" />
                              {new Date(c.orderDate || c.createdAt || Date.now()).toLocaleDateString("fr-FR", {
                                year: "numeric", month: "long", day: "numeric"
                              })}
                            </div>
                          </div>
                          <Badge status={c.status} />
                          <strong style={{ color: BLUE, fontSize: 15 }}>
                            {toDH(c.totalAmount)}
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── ADRESSES TAB ── */}
              {onglet === "adresse" && (
                <div className="card-body p-4">
                  <div style={{
                    border: "2px dashed #E2E8F0", borderRadius: 12,
                    padding: "40px 20px", textAlign: "center",
                  }}>
                    <i className="bi bi-geo-alt" style={{ fontSize: 40, color: "#CBD5E1", display: "block", marginBottom: 12 }} />
                    <p className="text-muted mb-3">Aucune adresse enregistrée</p>
                    <button className="btn btn-sm text-white" style={{ background: BLUE, borderRadius: 8 }}>
                      <i className="bi bi-plus-lg me-1" />
                      Ajouter une adresse
                    </button>
                  </div>
                </div>
              )}

              {/* ── SECURITE TAB ── */}
              {onglet === "securite" && (
                <div className="card-body p-4">
                  <p style={{ color: "#64748B", fontSize: 14, marginBottom: 24 }}>
                    Modifiez votre mot de passe.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 420 }}>
                    {["Mot de passe actuel", "Nouveau mot de passe", "Confirmer le mot de passe"].map((lbl) => (
                      <div key={lbl}>
                        <label className="form-label fw-semibold" style={{ fontSize: 12, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {lbl}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          style={{ borderRadius: 8, border: "1px solid #E2E8F0", padding: "10px 14px" }}
                          placeholder="••••••••"
                        />
                      </div>
                    ))}
                    <button className="btn text-white align-self-end d-inline-flex align-items-center gap-2"
                      style={{ background: BLUE, border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 700, fontSize: 14 }}>
                      <i className="bi bi-lock" />
                      Mettre à jour
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}