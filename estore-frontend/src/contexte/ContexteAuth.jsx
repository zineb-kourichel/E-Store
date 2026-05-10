import React, { createContext, useContext, useState, useEffect } from "react";

export const ContexteAuth = createContext();

export const useAuth = () => {
  const contexte = useContext(ContexteAuth);
  if (!contexte) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return contexte;
};

export const AuthProvider = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const chargerUtilisateur = () => {
      try {
        const tokenStocke = localStorage.getItem("token");
        const utilisateurStocke = localStorage.getItem("utilisateur");
        if (tokenStocke && utilisateurStocke) {
          setToken(tokenStocke);
          setUtilisateur(JSON.parse(utilisateurStocke));
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'utilisateur:", err);
        setErreur("Erreur lors de la récupération de l'utilisateur");
      } finally {
        setChargement(false);
      }
    };
    chargerUtilisateur();
  }, []);

  const seConnecter = async (email, motDePasse) => {
    try {
      setChargement(true);
      setErreur(null);

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: motDePasse }), // ← fixed key
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Email ou mot de passe incorrect");
      }

      const userData = await response.json();

      const user = {
        id: userData.id,
        email: userData.email,
        nom:
          userData.firstName && userData.lastName
            ? `${userData.firstName} ${userData.lastName}`.trim()
            : userData.firstName || userData.lastName || userData.email.split("@")[0],
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      };

      const tokenRecu = userData.token || "";

      localStorage.setItem("token", tokenRecu);
      localStorage.setItem("utilisateur", JSON.stringify(user));

      setToken(tokenRecu);
      setUtilisateur(user);
    } catch (err) {
      setErreur(err.message || "Erreur lors de la connexion");
      throw err;
    } finally {
      setChargement(false);
    }
  };

  const sInscrire = async (nom, email, motDePasse) => {
    try {
      setChargement(true);
      setErreur(null);

      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, motDePasse }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'inscription");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));

      setToken(data.token);
      setUtilisateur(data.utilisateur);
    } catch (err) {
      setErreur(err.message || "Erreur lors de l'inscription");
      throw err;
    } finally {
      setChargement(false);
    }
  };

  const seDeconnecter = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    setToken(null);
    setUtilisateur(null);
    setErreur(null);
  };

  const mettreAJourUtilisateur = async (nouvellesInfos) => {
    try {
      setChargement(true);
      setErreur(null);

      const response = await fetch(`http://localhost:8080/api/utilisateurs/${utilisateur.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nouvellesInfos),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour des informations");

      const data = await response.json();
      localStorage.setItem("utilisateur", JSON.stringify(data));
      setUtilisateur(data);
    } catch (err) {
      setErreur(err.message || "Erreur lors de la mise à jour");
      throw err;
    } finally {
      setChargement(false);
    }
  };

  const changerMotDePasse = async (ancienMotDePasse, nouveauMotDePasse) => {
    try {
      setChargement(true);
      setErreur(null);

      const response = await fetch("http://localhost:8080/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ancienMotDePasse, nouveauMotDePasse }),
      });

      if (!response.ok) throw new Error("Erreur lors du changement de mot de passe");

      return await response.json();
    } catch (err) {
      setErreur(err.message || "Erreur lors du changement de mot de passe");
      throw err;
    } finally {
      setChargement(false);
    }
  };

  const estConnecte = () => utilisateur !== null && token !== null;
  const aRole = (role) => utilisateur?.role === role;

  const valeur = {
    utilisateur,
    chargement,
    erreur,
    token,
    seConnecter,
    sInscrire,
    seDeconnecter,
    mettreAJourUtilisateur,
    changerMotDePasse,
    estConnecte,
    aRole,
  };

  return (
    <ContexteAuth.Provider value={valeur}>
      {children}
    </ContexteAuth.Provider>
  );
};