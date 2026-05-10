import { createContext, useState, useEffect } from "react";
import { getPanier } from "../services/servicePanier";

export const ContextePanier = createContext();

export function ProviderPanier({ children }) {
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    getPanier()
      .then((data) => setPanier(Array.isArray(data) ? data : []))
      .catch(() => setPanier([]));
  }, []);

  const ajouterAuPanier = (produit) => {
    setPanier((prev) => {
      const existe = prev.find((p) => p.id === produit.id);
      if (existe) {
        return prev.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      }
      return [
        ...prev,
        {
          id: produit.id,
          name: produit.name,
          price: produit.price,
          imageUrl: produit.imageUrl,
          description: produit.description,
          quantite: 1,
        },
      ];
    });
  };

  const retirerDuPanier = (id) => {
    setPanier((prev) => prev.filter((p) => p.id !== id));
  };

  // ← ADDED: was missing, Panier.jsx calls this after order confirmation
  const viderPanier = () => {
    setPanier([]);
  };

  const totalArticles = panier.reduce((acc, p) => acc + (p.quantite || 0), 0);
  const totalPrix = panier.reduce(
    (acc, p) => acc + (p.price || 0) * (p.quantite || 1),
    0
  );

  return (
    <ContextePanier.Provider
      value={{
        panier,
        ajouterAuPanier,
        retirerDuPanier,
        viderPanier,       // ← ADDED
        totalArticles,
        totalPrix,
      }}
    >
      {children}
    </ContextePanier.Provider>
  );
}