export default function Bouton({ texte, onClick, type = "button", variante = "primaire" }) {
  const styles = {
    primaire: { backgroundColor: "#e44d26", color: "white", border: "none" },
    secondaire: { backgroundColor: "white", color: "#e44d26", border: "2px solid #e44d26" },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        ...styles[variante],
      }}
    >
      {texte}
    </button>
  );
}