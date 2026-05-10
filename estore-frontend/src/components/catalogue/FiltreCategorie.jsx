export default function FiltreCategorie({ categories, actif, onChange }) {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "16px 0" }}>
      <button onClick={() => onChange("")} style={{ padding: "7px 14px", borderRadius: "20px", border: "none", backgroundColor: actif === "" ? "#e44d26" : "#eee", color: actif === "" ? "white" : "#333", cursor: "pointer" }}>
        Tous
      </button>
      {categories.map((cat) => (
        <button key={cat} onClick={() => onChange(cat)} style={{ padding: "7px 14px", borderRadius: "20px", border: "none", backgroundColor: actif === cat ? "#e44d26" : "#eee", color: actif === cat ? "white" : "#333", cursor: "pointer", textTransform: "capitalize" }}>
          {cat}
        </button>
      ))}
    </div>
  );
}