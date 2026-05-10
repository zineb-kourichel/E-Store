const API = "http://localhost:8080/api/products";

export async function getProduits() {
  const res = await fetch(API);
  return res.json();
}

export async function getProduitParId(id) {
  const res = await fetch(`${API}/${id}`);
  return res.json();
}