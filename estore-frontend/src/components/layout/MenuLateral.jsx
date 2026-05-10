import { Link } from "react-router-dom";
import { usePanier } from "../../hooks/usePanier";
export default function MenuLateral({ categories }) {
  return (
    <aside style={{ width: "200px", padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
      <h3 style={{ marginBottom: "12px" }}>Catégories</h3>
      {categories.map((cat) => (
        <Link key={cat} to={`/catalogue?categorie=${cat}`} style={{ display: "block", padding: "6px 0", color: "#e44d26", textTransform: "capitalize" }}>
          {cat}
        </Link>
      ))}
    </aside>
  );
}