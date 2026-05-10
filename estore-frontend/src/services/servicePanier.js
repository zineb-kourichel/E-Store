const API_BASE = "http://localhost:8080/api/cart";

export async function getPanier(userId) {
  const res = await fetch(`${API_BASE}/${userId}`);
  return res.json();
}

export async function ajouterAuPanier(data) {
  const res = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updatePanier(data) {
  const res = await fetch(`${API_BASE}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function supprimerItem(itemId) {
  const res = await fetch(`${API_BASE}/remove/${itemId}`, {
    method: "DELETE",
  });

  return res.json();
}