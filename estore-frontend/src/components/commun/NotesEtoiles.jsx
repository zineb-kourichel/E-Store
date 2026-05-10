export default function NotesEtoiles({ note, max = 5 }) {
  return (
    <div>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ color: i < Math.round(note) ? "#f5a623" : "#ccc", fontSize: "18px" }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: "13px", color: "#777", marginLeft: "6px" }}>({note?.toFixed(1)})</span>
    </div>
  );
}