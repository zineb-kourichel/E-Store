import { useState } from "react";
import { Link } from "react-router-dom";
import { useProduits } from "../hooks/useProduits";
import { usePanier } from "../hooks/usePanier";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Catalogue() {
  const { produits, chargement } = useProduits();
  const { ajouterAuPanier } = usePanier();

  const [recherche, setRecherche] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [addedToCart, setAddedToCart] = useState(null);

  const handleAddToCart = (p) => {
    ajouterAuPanier({ ...p, quantite: 1 });
    setAddedToCart(p.id);
    setTimeout(() => setAddedToCart(null), 1800);
  };

  const produitsFiltres = produits.filter((p) =>
    (p.name || "").toLowerCase().includes(recherche.toLowerCase())
  );

  const produitsTries = [...produitsFiltres].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return (a.name || "").localeCompare(b.name || "");
      default:
        return 0;
    }
  });

  /* ── LOADING ── */
  if (chargement) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          backgroundColor: "#F8FAFC",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid #E2E8F0",
            borderTopColor: "#2563EB",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p
          style={{
            color: "#64748B",
            fontSize: "14px",
            marginTop: "16px",
          }}
        >
          Chargement du catalogue...
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
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >

      {/* ───────────────── HEADER ───────────────── */}
      <header
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #E2E8F0",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: "blur(10px)",
        }}
      >

        {/* TOP NAV */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >

          {/* LOGO */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#0F172A",
                letterSpacing: "-1px",
              }}
            >
              E-STORE
            </div>
          </Link>

          {/* SEARCH */}
          <div
            style={{
              flex: 1,
              maxWidth: "620px",
              position: "relative",
            }}
          >
            <i
              className="bi bi-search"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94A3B8",
                fontSize: "14px",
              }}
            />

            <input
              type="text"
              placeholder="Rechercher des produits..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "14px",
                border: "1px solid #E2E8F0",
                backgroundColor: "#F8FAFC",
                padding: "0 16px 0 42px",
                fontSize: "14px",
                outline: "none",
                color: "#0F172A",
                transition: "0.2s",
              }}
            />
          </div>

          {/* ACTIONS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <HeaderButton icon="bi-person" />
            <HeaderButton icon="bi-heart" />

            <div style={{ position: "relative" }}>
              <HeaderButton icon="bi-bag" />

              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
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
            </div>
          </div>
        </div>

        {/* CATEGORY NAV */}
        <div
          style={{
            borderTop: "1px solid #F1F5F9",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 20px",
              display: "flex",
              gap: "24px",
              overflowX: "auto",
            }}
          >
            {[
              "Nouveautés",
              "Électronique",
              "Mode",
              "Maison",
              "Gaming",
              "Sport",
              "Accessoires",
            ].map((item, index) => (
              <button
                key={item}
                style={{
                  background: "none",
                  border: "none",
                  padding: "14px 0",
                  color: index === 0 ? "#2563EB" : "#64748B",
                  fontWeight: index === 0 ? "700" : "500",
                  fontSize: "14px",
                  cursor: "pointer",
                  borderBottom:
                    index === 0
                      ? "2px solid #2563EB"
                      : "2px solid transparent",
                  whiteSpace: "nowrap",
                  transition: "0.2s",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ───────────────── HERO SECTION ───────────────── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "24px auto 0",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            minHeight: "320px",
            display: "flex",
            alignItems: "center",
            padding: "50px",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(37,99,235,0.75)), url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1600&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div
            style={{
              maxWidth: "520px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.12)",
                color: "white",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "18px",
                backdropFilter: "blur(10px)",
              }}
            >
              Nouvelle collection 2026
            </span>

            <h1
              style={{
                fontSize: "52px",
                fontWeight: "900",
                lineHeight: "1.1",
                color: "white",
                margin: "0 0 18px",
                letterSpacing: "-2px",
              }}
            >
              Découvrez des produits modernes.
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "16px",
                lineHeight: "1.8",
                marginBottom: "28px",
              }}
            >
              Explorez notre catalogue premium avec des milliers de produits
              tendance livrés rapidement partout au Maroc.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  color: "#0F172A",
                  border: "none",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Explorer maintenant
              </button>

              <button
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.18)",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px",
                  backdropFilter: "blur(10px)",
                }}
              >
                Voir les nouveautés
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── MAIN CONTENT ───────────────── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "30px auto",
          padding: "0 20px 48px",
        }}
      >

        {/* SEARCH & SORT */}
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "16px 18px",
            marginBottom: "20px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              {produitsTries.length} produits
            </span>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid #E2E8F0",
                backgroundColor: "#F8FAFC",
                fontSize: "13px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="newest">Plus récent</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="name">Nom A-Z</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS */}
        {produitsTries.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #E2E8F0",
              padding: "60px 40px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <i
              className="bi bi-search"
              style={{
                fontSize: "40px",
                color: "#CBD5E1",
                display: "block",
                marginBottom: "14px",
              }}
            />

            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#334155",
              }}
            >
              Aucun produit trouvé
            </div>

            <p
              style={{
                fontSize: "14px",
                color: "#94A3B8",
                marginTop: "8px",
              }}
            >
              Essayez une autre recherche
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "18px",
            }}
          >
            {produitsTries.map((p, index) => (
              <CatalogueCard
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
        )}
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

/* ───────────────── SUB COMPONENTS ───────────────── */

function HeaderButton({ icon }) {
  return (
    <button
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        backgroundColor: "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#334155",
        transition: "0.2s",
      }}
    >
      <i className={`bi ${icon}`} style={{ fontSize: "18px" }} />
    </button>
  );
}

function CatalogueCard({
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
        animation: `slideInUp 0.4s ease-out ${index * 0.04}s both`,
        backgroundColor: "white",
        borderRadius: "18px",
        overflow: "hidden",
        border: hovered ? "1px solid #BFDBFE" : "1px solid #E2E8F0",
        boxShadow: hovered
          ? "0 12px 30px rgba(30,64,175,0.08)"
          : "0 2px 6px rgba(0,0,0,0.03)",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link
        to={`/produit/${p.id}`}
        style={{
          display: "block",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "220px",
            backgroundColor: "#F8FAFC",
            overflow: "hidden",
            position: "relative",
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
              transition: "transform 0.35s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=Produit";
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <i
              className="bi bi-heart"
              style={{
                fontSize: "14px",
                color: "#64748B",
              }}
            />
          </div>
        </div>
      </Link>

      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#0F172A",
            margin: "0 0 8px",
            lineHeight: "1.5",
          }}
        >
          {p.name}
        </h3>

        <p
          style={{
            fontSize: "13px",
            color: "#64748B",
            marginBottom: "14px",
            lineHeight: "1.6",
          }}
        >
          {p.description || "Produit premium de qualité"}
        </p>

        <div
          style={{
            fontSize: "22px",
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
            marginTop: "auto",
            height: "46px",
            border: "none",
            borderRadius: "12px",
            backgroundColor: added ? "#16A34A" : "#2563EB",
            color: "white",
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