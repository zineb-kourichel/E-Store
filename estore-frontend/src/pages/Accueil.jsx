import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProduits } from "../services/serviceProduits";
import { usePanier } from "../hooks/usePanier";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Accueil() {
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addedToCart, setAddedToCart] = useState(null);

  const { ajouterAuPanier } = usePanier();

  useEffect(() => {
    getProduits()
      .then((data) => setProduits(data))
      .catch((err) => console.error(err))
      .finally(() => setChargement(false));
  }, []);

  const handleAddToCart = (p) => {
    ajouterAuPanier({ ...p, quantite: 1 });
    setAddedToCart(p.id);
    setTimeout(() => setAddedToCart(null), 1800);
  };

  const filteredProduits = produits.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (chargement) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#F8FAFC",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            border: "4px solid #E2E8F0",
            borderTopColor: "#2563EB",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p
          style={{
            marginTop: "14px",
            color: "#64748B",
            fontSize: "14px",
          }}
        >
          Chargement des produits...
        </p>

        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* HERO SECTION */}
      <div
        style={{
          position: "relative",
          minHeight: "560px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(15,23,42,0.88), rgba(15,23,42,0.45))",
          }}
        />

        {/* NAVBAR */}
        <nav
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "24px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "900",
              letterSpacing: "-1px",
            }}
          >
            E-STORE
          </div>

          {/* Menu */}
          <div
            style={{
              display: "flex",
              gap: "28px",
              alignItems: "center",
            }}
          >
            {["Accueil", "Produits", "Nouveautés", "Contact"].map((item) => (
              <button
                key={item}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              style={iconBtn}
            >
              <i className="bi bi-person" />
            </button>

            <button
              style={iconBtn}
            >
              <i className="bi bi-heart" />
            </button>

            <button
              style={{
                ...iconBtn,
                position: "relative",
              }}
            >
              <i className="bi bi-cart3" />

              <span
                style={{
                  position: "absolute",
                  top: "-3px",
                  right: "-3px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "#2563EB",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                3
              </span>
            </button>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 20px",
            display: "flex",
            alignItems: "center",
            minHeight: "430px",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#DBEAFE",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "20px",
                backdropFilter: "blur(10px)",
              }}
            >
              Nouvelle collection 2026
            </span>

            <h1
              style={{
                fontSize: "64px",
                lineHeight: "1.05",
                fontWeight: "900",
                color: "white",
                marginBottom: "20px",
                letterSpacing: "-2px",
              }}
            >
              Shopping moderne,
              <br />
              simple & élégant.
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.75)",
                lineHeight: "1.8",
                marginBottom: "30px",
                maxWidth: "520px",
              }}
            >
              Découvrez des milliers de produits tendance avec livraison rapide
              partout au Maroc.
            </p>

            {/* SEARCH BAR */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "18px",
                overflow: "hidden",
                maxWidth: "560px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
              }}
            >
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "18px 20px",
                  fontSize: "15px",
                }}
              />

              <button
                style={{
                  border: "none",
                  backgroundColor: "#2563EB",
                  color: "white",
                  padding: "18px 28px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BADGES */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "-45px auto 0",
          padding: "0 20px",
          position: "relative",
          zIndex: 20,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "18px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            overflow: "hidden",
            boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
          }}
        >
          {[
            {
              icon: "bi-truck",
              title: "Livraison express",
              sub: "Sous 24h",
            },
            {
              icon: "bi-shield-check",
              title: "Paiement sécurisé",
              sub: "100% protégé",
            },
            {
              icon: "bi-arrow-repeat",
              title: "Retour facile",
              sub: "Sous 30 jours",
            },
            {
              icon: "bi-patch-check",
              title: "Produits authentiques",
              sub: "Garantie officielle",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "22px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                borderRight:
                  i !== 3 ? "1px solid #E2E8F0" : "none",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className={`bi ${item.icon}`}
                  style={{
                    color: "#2563EB",
                    fontSize: "20px",
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "#0F172A",
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748B",
                    marginTop: "2px",
                  }}
                >
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "40px auto",
          padding: "0 20px 50px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "800",
                margin: 0,
                color: "#0F172A",
              }}
            >
              Nos Produits
            </h2>

            <p
              style={{
                marginTop: "6px",
                color: "#64748B",
                fontSize: "14px",
              }}
            >
              {filteredProduits.length} produits disponibles
            </p>
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProduits.map((p, index) => (
            <ProductCard
              key={p.id}
              p={p}
              index={index}
              hovered={hoveredCard === p.id}
              added={addedToCart === p.id}
              onMouseEnter={() => setHoveredCard(p.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onAddToCart={() => handleAddToCart(p)}
            />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#0F172A",
          color: "white",
          padding: "30px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "800",
            marginBottom: "10px",
          }}
        >
          E-STORE
        </div>

        <p
          style={{
            color: "#94A3B8",
            fontSize: "13px",
          }}
        >
          © 2026 E-STORE — Tous droits réservés.
        </p>
      </footer>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        * {
          box-sizing: border-box;
        }

        button {
          font-family: inherit;
        }

        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #F8FAFC;
        }
      `}</style>
    </div>
  );
}

/* BUTTON STYLE */
const iconBtn = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
};

/* PRODUCT CARD */
function ProductCard({
  p,
  index,
  hovered,
  added,
  onMouseEnter,
  onMouseLeave,
  onAddToCart,
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: "white",
        borderRadius: "18px",
        overflow: "hidden",
        border: hovered
          ? "1px solid #BFDBFE"
          : "1px solid #E2E8F0",
        boxShadow: hovered
          ? "0 10px 30px rgba(37,99,235,0.12)"
          : "0 4px 12px rgba(0,0,0,0.04)",
        transition: "0.25s",
        transform: hovered
          ? "translateY(-4px)"
          : "translateY(0)",
        animation: `slideInUp 0.4s ease ${
          index * 0.05
        }s both`,
      }}
    >
      <Link
        to={`/produit/${p.id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <div
          style={{
            height: "240px",
            overflow: "hidden",
            backgroundColor: "#F8FAFC",
          }}
        >
          <img
            src={
              p.imageUrl?.startsWith("http")
                ? p.imageUrl
                : `http://localhost:8080/images/${p.imageUrl}`
            }
            alt={p.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "0.3s",
              transform: hovered
                ? "scale(1.05)"
                : "scale(1)",
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=Produit";
            }}
          />
        </div>
      </Link>

      <div
        style={{
          padding: "18px",
        }}
      >
        <h3
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#0F172A",
            marginBottom: "10px",
            minHeight: "40px",
          }}
        >
          {p.name}
        </h3>

        <div
          style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#2563EB",
            marginBottom: "14px",
          }}
        >
          {p.price} DH
        </div>

        <button
          onClick={onAddToCart}
          style={{
            width: "100%",
            border: "none",
            backgroundColor: added
              ? "#16A34A"
              : "#2563EB",
            color: "white",
            padding: "12px",
            borderRadius: "12px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          {added ? "Ajouté !" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
}