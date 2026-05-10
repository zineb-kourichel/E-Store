const API_BASE = "http://localhost:8080/api/orders";

export async function validerCommande(order) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Erreur HTTP: ${res.status}`);
  }

  return res.json();
}

export async function getCommandes(userId) {
  const res = await fetch(`${API_BASE}/user/${userId}`);

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }

  return res.json();
}

export async function annulerCommande(orderId) {
  // ← FIXED: was /${orderId}/cancel, backend expects /cancel/${orderId}
  const res = await fetch(`${API_BASE}/cancel/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }

  return res.json();
}