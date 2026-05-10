const API_BASE = "http://localhost:8080/api/orders";

export async function validerCommande(order) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  return res.json();
}

export async function getCommandes(userId) {
  const res = await fetch(`${API_BASE}/user/${userId}`);
  return res.json();
}