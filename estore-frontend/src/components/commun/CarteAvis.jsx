import NotesEtoiles from "./NotesEtoiles";

export default function CarteAvis({ avis }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "12px", marginBottom: "10px" }}>
      <strong>{avis.auteur}</strong>
      <NotesEtoiles note={avis.note} />
      <p style={{ marginTop: "6px", color: "#555" }}>{avis.commentaire}</p>
    </div>
  );
}