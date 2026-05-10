import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Inscription() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password
    ) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.text();

      if (!response.ok) {
        setError(data || "Erreur lors de l'inscription");
        return;
      }

      navigate("/connexion");
    } catch (err) {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100"
      style={{
        backgroundColor: "#F8FAFC",
      }}
    >
      <div className="row min-vh-100">

        {/* LEFT SIDE */}
        <div
          className="col-lg-6 d-none d-lg-flex flex-column justify-content-center position-relative text-white p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(37,99,235,0.85)), url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1600&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              top: "-120px",
              right: "-120px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              bottom: "-80px",
              left: "-80px",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div
              className="fw-bold mb-5"
              style={{
                fontSize: "34px",
                letterSpacing: "-1px",
              }}
            >
              E-STORE
            </div>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "58px",
                lineHeight: "1.1",
                maxWidth: "550px",
              }}
            >
              Commencez votre expérience shopping.
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "17px",
                lineHeight: "1.8",
                maxWidth: "520px",
              }}
            >
              Rejoignez E-STORE et découvrez des milliers de produits modernes
              avec livraison rapide partout au Maroc.
            </p>

            {/* FEATURES */}
            <div className="mt-5 d-flex flex-column gap-4">

              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "15px",
                    background: "rgba(255,255,255,0.12)",
                  }}
                >
                  <i className="bi bi-truck fs-5"></i>
                </div>

                <div>
                  <div className="fw-bold">Livraison rapide</div>
                  <div style={{ color: "rgba(255,255,255,0.65)" }}>
                    Partout au Maroc
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "15px",
                    background: "rgba(255,255,255,0.12)",
                  }}
                >
                  <i className="bi bi-shield-check fs-5"></i>
                </div>

                <div>
                  <div className="fw-bold">Paiement sécurisé</div>
                  <div style={{ color: "rgba(255,255,255,0.65)" }}>
                    Transactions protégées
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "15px",
                    background: "rgba(255,255,255,0.12)",
                  }}
                >
                  <i className="bi bi-stars fs-5"></i>
                </div>

                <div>
                  <div className="fw-bold">Produits premium</div>
                  <div style={{ color: "rgba(255,255,255,0.65)" }}>
                    Qualité garantie
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">

          <div
            className="w-100"
            style={{
              maxWidth: "460px",
            }}
          >
            {/* MOBILE LOGO */}
            <div className="d-lg-none text-center mb-4">
              <h1
                style={{
                  fontWeight: "900",
                  color: "#1E3A8A",
                  letterSpacing: "-1px",
                }}
              >
                E-STORE
              </h1>
            </div>

            {/* TITLE */}
            <div className="mb-4">
              <h2
                className="fw-bold mb-2"
                style={{
                  color: "#0F172A",
                  fontSize: "36px",
                }}
              >
                Créer un compte
              </h2>

              <p
                style={{
                  color: "#64748B",
                  fontSize: "15px",
                }}
              >
                Inscrivez-vous en quelques secondes
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div
                className="alert alert-danger border-0"
                style={{
                  borderRadius: "14px",
                  fontSize: "14px",
                }}
              >
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* FIRST + LAST NAME */}
              <div className="row g-3 mb-3">

                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#334155" }}
                  >
                    Prénom
                  </label>

                  <div className="input-group">
                    <span
                      className="input-group-text bg-white border-end-0"
                      style={{
                        borderRadius: "14px 0 0 14px",
                      }}
                    >
                      <i className="bi bi-person text-secondary"></i>
                    </span>

                    <input
                      type="text"
                      name="firstName"
                      placeholder="Zineb"
                      className="form-control border-start-0 shadow-none"
                      value={form.firstName}
                      onChange={handleChange}
                      style={{
                        height: "54px",
                        borderRadius: "0 14px 14px 0",
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#334155" }}
                  >
                    Nom
                  </label>

                  <div className="input-group">
                    <span
                      className="input-group-text bg-white border-end-0"
                      style={{
                        borderRadius: "14px 0 0 14px",
                      }}
                    >
                      <i className="bi bi-person-badge text-secondary"></i>
                    </span>

                    <input
                      type="text"
                      name="lastName"
                      placeholder="Kouri"
                      className="form-control border-start-0 shadow-none"
                      value={form.lastName}
                      onChange={handleChange}
                      style={{
                        height: "54px",
                        borderRadius: "0 14px 14px 0",
                      }}
                    />
                  </div>
                </div>

              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  Adresse email
                </label>

                <div className="input-group">
                  <span
                    className="input-group-text bg-white border-end-0"
                    style={{
                      borderRadius: "14px 0 0 14px",
                    }}
                  >
                    <i className="bi bi-envelope text-secondary"></i>
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder="vous@example.com"
                    className="form-control border-start-0 shadow-none"
                    value={form.email}
                    onChange={handleChange}
                    style={{
                      height: "54px",
                      borderRadius: "0 14px 14px 0",
                    }}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-4">
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  Mot de passe
                </label>

                <div className="input-group">
                  <span
                    className="input-group-text bg-white border-end-0"
                    style={{
                      borderRadius: "14px 0 0 14px",
                    }}
                  >
                    <i className="bi bi-lock text-secondary"></i>
                  </span>

                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="form-control border-start-0 shadow-none"
                    value={form.password}
                    onChange={handleChange}
                    style={{
                      height: "54px",
                      borderRadius: "0 14px 14px 0",
                    }}
                  />
                </div>
              </div>

              {/* TERMS */}
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                />

                <label
                  className="form-check-label"
                  htmlFor="terms"
                  style={{
                    fontSize: "14px",
                    color: "#475569",
                  }}
                >
                  J'accepte les conditions d'utilisation
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="btn w-100 fw-bold"
                style={{
                  height: "56px",
                  borderRadius: "14px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  fontSize: "15px",
                  boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Création...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>
                    Créer mon compte
                  </>
                )}
              </button>
            </form>

            {/* LOGIN */}
            <p
              className="text-center mt-4 mb-0"
              style={{
                color: "#64748B",
                fontSize: "14px",
              }}
            >
              Déjà un compte ?{" "}
              <Link
                to="/connexion"
                style={{
                  color: "#2563EB",
                  textDecoration: "none",
                  fontWeight: "700",
                }}
              >
                Se connecter
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}