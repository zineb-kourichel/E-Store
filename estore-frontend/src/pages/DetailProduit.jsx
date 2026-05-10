import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifierStock } from "../services/serviceInventaire";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function DetailProduit() {
  const { id } = useParams();

  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stockQty, setStockQty] = useState(null);
  const [stockMessage, setStockMessage] = useState("");

  const [avis, setAvis] = useState([]);
  const [note, setNote] = useState(5);
  const [commentaire, setCommentaire] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // 👈 logged in user

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!res.ok) throw new Error();
        setProduit(await res.json());
      } catch {
        setError("Impossible de charger le produit");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      const res = await fetch(`http://localhost:8080/api/reviews/product/${id}`);
      if (res.ok) setAvis(await res.json());
    };

    const fetchStock = async () => {
      const res = await fetch(`http://localhost:8080/api/inventory/product/${id}`);
      if (res.ok) {
        const data = await res.json();
        setStockQty(data.quantity ?? data.quantityAvailable ?? 0);
      }
    };

    fetchData();
    fetchReviews();
    fetchStock();
  }, [id]);

  const ajouterAvis = async () => {
    if (!commentaire.trim()) return;

    await fetch("http://localhost:8080/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        rating: note,
        comment: commentaire,
        userName: user?.name || user?.username,
      }),
    });

    setCommentaire("");
    setNote(5);

    const res = await fetch(`http://localhost:8080/api/reviews/product/${id}`);
    setAvis(await res.json());
  };

  const renderStars = (n) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi bi-star-fill ${i < n ? "text-warning" : "text-secondary"}`}
      />
    ));

  const avgRating =
    avis.length > 0
      ? (avis.reduce((a, b) => a + b.rating, 0) / avis.length).toFixed(1)
      : 0;

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;
  if (!produit) return null;

  return (
    <div className="container py-4">

      {/* PRODUCT CARD */}
      <div className="card shadow-sm mb-4">
        <div className="row g-0">

          <div className="col-md-5">
            <img
              src={
                produit.imageUrl?.startsWith("http")
                  ? produit.imageUrl
                  : `http://localhost:8080/images/${produit.imageUrl}`
              }
              className="img-fluid rounded-start"
              alt={produit.name}
            />
          </div>

          <div className="col-md-7">
            <div className="card-body">

              <h3 className="fw-bold">{produit.name}</h3>

              <p className="text-muted">{produit.description}</p>

              <h4 className="text-primary">{produit.price} DH</h4>

              <p className="mt-2">
                <span className="fw-bold">Stock:</span>{" "}
                {stockQty === 0
                  ? "Rupture"
                  : stockQty <= 5
                  ? `Plus que ${stockQty}`
                  : "Disponible"}
              </p>

              <button className="btn btn-primary mt-2">
                <i className="bi bi-cart-plus"></i> Ajouter au panier
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* REVIEWS */}
      <div className="card shadow-sm p-4">

        <h4 className="mb-3">
          Avis clients ({avis.length}) — ⭐ {avgRating}
        </h4>

        {/* ADD REVIEW ONLY IF LOGGED IN */}
        {user ? (
          <div className="mb-4 border p-3 rounded bg-light">

            <h6>Ajouter un avis</h6>

            <select
              className="form-select mb-2"
              value={note}
              onChange={(e) => setNote(Number(e.target.value))}
            >
              <option value={5}>⭐⭐⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={1}>⭐</option>
            </select>

            <textarea
              className="form-control mb-2"
              rows="3"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              placeholder="Écrire votre avis..."
            />

            <button onClick={ajouterAvis} className="btn btn-success">
              Publier
            </button>

          </div>
        ) : (
          <div className="alert alert-warning">
            Connecte-toi pour laisser un avis
          </div>
        )}

        {/* LIST REVIEWS */}
        {avis.map((a, i) => (
          <div key={i} className="border-bottom py-3">

            <div className="d-flex align-items-center gap-2">
              <div className="fw-bold">
                {a.userName || "Utilisateur"}
              </div>
              <div>{renderStars(a.rating)}</div>
            </div>

            <p className="mb-0 text-muted">{a.comment}</p>

          </div>
        ))}

      </div>

    </div>
  );
}