const API_BASE = "http://localhost:8080/api/reviews";

export async function ajouterAvis(avis) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(avis),
  });

  return res.json();
}

export async function getAvisProduit(productId) {
  const res = await fetch(`${API_BASE}/product/${productId}`);
  return res.json();
}