const BASE_URL = "https://fakestoreapi.com";

export async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error("Erreur réseau");
  return response.json();
}