const API_BASE = "http://localhost:8080/api/inventory";

export const obtenirToutInventaire = async () => {
  try {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("❌ Error fetching inventory:", err);
    return [];
  }
};

export const obtenirInventaireByProductId = async (productId) => {
  try {
    const res = await fetch(`${API_BASE}/product/${productId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Error fetching inventory for product ${productId}:`, err);
    throw err;
  }
};

export const mettreAJourQuantite = async (productId, quantity) => {
  try {
    const res = await fetch(`${API_BASE}/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Error updating inventory for product ${productId}:`, err);
    throw err;
  }
};

export const verifierStock = async (productId, quantity = 1) => {
  try {
    const res = await fetch(`${API_BASE}/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Error checking stock for product ${productId}:`, err);
    return { available: false, quantityAvailable: 0 };
  }
};

export const mettreAJourApresCommande = async (productId, quantity) => {
  try {
    const res = await fetch(`${API_BASE}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Error updating inventory after order:`, err);
    throw err;
  }
};