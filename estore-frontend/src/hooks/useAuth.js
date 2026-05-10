
import { useContext } from "react";
import { ContexteAuth } from "../contexte/ContexteAuth";

export function useAuth() {
  return useContext(ContexteAuth);
}