import { useState, useEffect } from "react";
import { getProduits } from "../services/serviceProduits";

export function useProduits() {
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    getProduits()
      .then((data) => setProduits(Array.isArray(data) ? data : []))
      .finally(() => setChargement(false));
  }, []);

  return { produits, chargement };
}