import { useState } from "react";
import { useAuth } from "../contexte/ContexteAuth";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Connexion() {
  const { seConnecter } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);

    try {
      await seConnecter(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <div className="row min-vh-100">

        {/* LEFT SIDE */}
        <div
          className="col-lg-6 d-none d-lg-flex flex-column justify-content-center p-5"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              top: "-100px",
              right: "-80px",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              bottom: "-50px",
              left: "-50px",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="mb-5" style={{ fontSize: "34px", fontWeight: "900", letterSpacing: "-1px" }}>
              E-STORE
            </div>

            <h1 className="fw-bold mb-4" style={{ fontSize: "56px", lineHeight: "1.1", maxWidth: "520px" }}>
              Connectez-vous à votre espace.
            </h1>

            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "17px", lineHeight: "1.8", maxWidth: "520px" }}>
              Gérez vos commandes, vos favoris et découvrez les meilleures offres sur E-STORE.
            </p>

            <div className="mt-5 d-flex flex-column gap-4">
              {[
                { icon: "bi-truck", title: "Livraison rapide", sub: "Partout au Maroc" },
                { icon: "bi-shield-check", title: "Paiement sécurisé", sub: "Transactions protégées" },
                { icon: "bi-stars", title: "Produits premium", sub: "Qualité garantie" },
              ].map(({ icon, title, sub }) => (
                <div className="d-flex align-items-center gap-3" key={title}>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px", borderRadius: "14px", background: "rgba(255,255,255,0.1)" }}
                  >
                    <i className={`bi ${icon} fs-5`}></i>
                  </div>
                  <div>
                    <div className="fw-bold">{title}</div>
                    <div style={{ color: "rgba(255,255,255,0.65)" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: "430px" }}>

            <div className="d-lg-none text-center mb-4">
              <h1 style={{ fontWeight: "900", color: "#1E3A8A", letterSpacing: "-1px" }}>E-STORE</h1>
            </div>

            <div className="mb-4">
              <h2 className="fw-bold mb-2" style={{ color: "#0F172A", fontSize: "34px" }}>Connexion</h2>
              <p style={{ color: "#64748B", fontSize: "15px" }}>Entrez vos informations pour continuer</p>
            </div>

            {error && (
              <div className="alert alert-danger border-0" style={{ borderRadius: "14px", fontSize: "14px" }}>
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: "#334155" }}>Adresse email</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0" style={{ borderRadius: "14px 0 0 14px", paddingLeft: "16px" }}>
                    <i className="bi bi-envelope text-secondary"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 shadow-none"
                    placeholder="vous@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ height: "54px", borderRadius: "0 14px 14px 0" }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#334155" }}>Mot de passe</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0" style={{ borderRadius: "14px 0 0 14px", paddingLeft: "16px" }}>
                    <i className="bi bi-lock text-secondary"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 shadow-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ height: "54px", borderRadius: "0 14px 14px 0" }}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label" htmlFor="remember" style={{ fontSize: "14px", color: "#475569" }}>
                    Se souvenir de moi
                  </label>
                </div>
                <a href="#" style={{ color: "#2563EB", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-100 fw-bold"
                style={{
                  height: "54px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  border: "none",
                  fontSize: "15px",
                  color: "white",
                  boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Connexion...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Se connecter
                  </>
                )}
              </button>
            </form>

            <div className="d-flex align-items-center my-4">
              <div className="flex-grow-1 border-top"></div>
              <span className="px-3" style={{ color: "#94A3B8", fontSize: "13px" }}>OU</span>
              <div className="flex-grow-1 border-top"></div>
            </div>

            <button
              className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-2"
              style={{ height: "52px", borderRadius: "14px", fontWeight: "600" }}
            >
              <i className="bi bi-google"></i>
              Continuer avec Google
            </button>

            <p className="text-center mt-4 mb-0" style={{ color: "#64748B", fontSize: "14px" }}>
              Vous n'avez pas de compte ?{" "}
              <Link to="/inscription" style={{ color: "#2563EB", textDecoration: "none", fontWeight: "700" }}>
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}