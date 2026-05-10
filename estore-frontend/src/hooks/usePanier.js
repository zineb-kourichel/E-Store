import { useContext } from "react";
import { ContextePanier } from "../contexte/ContextePanier";

export function usePanier() {
  return useContext(ContextePanier);
}