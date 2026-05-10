export default function BarreRecherche({ valeur, onChange }) {
  return (
    <input
      type="text"
      placeholder=" Rechercher un produit..."
      value={valeur}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #ddd", fontSize: "15px" }}
    />
  );
}