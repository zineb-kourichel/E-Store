import CarteProduit from "./CarteProduit";

export default function ListeProduits({ produits }) {
  if (!produits.length) return <p>Aucun produit trouvé.</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
      {produits.map((p) => <CarteProduit key={p.id} produit={p} />)}
    </div>
  );
}