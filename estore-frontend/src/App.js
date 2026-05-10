import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexte/ContexteAuth";
import { ProviderPanier } from "./contexte/ContextePanier";

import BarreNavigation from "./components/layout/BarreNavigation";
import PiedDePage from "./components/layout/PiedDePage";

import Accueil from "./pages/Accueil";
import Catalogue from "./pages/Catalogue";
import DetailProduit from "./pages/DetailProduit";
import Panier from "./pages/Panier";
import MesCommandes from "./pages/MesCommandes";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Profil from "./pages/Profil";

// ✅ ADD THIS IMPORT
import Inventaire from "./pages/Inventaire";

// 🧱 LAYOUT
function Layout() {
  return (
    <div style={{ display: "flex" }}>
      {/* SIDEBAR */}
      <BarreNavigation />

      {/* MAIN CONTENT */}
      <div style={styles.mainContainer}>
        <main style={styles.main}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Accueil />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/produit/:id" element={<DetailProduit />} />

            {/* INVENTAIRE PAGE (NEW) */}
            <Route path="/inventaire" element={<Inventaire />} />

            {/* AUTH */}
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />

            {/* USER */}
            <Route path="/panier" element={<Panier />} />
            <Route path="/mes-commandes" element={<MesCommandes />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        </main>

        <PiedDePage />
      </div>
    </div>
  );
}

// 🚀 APP ROOT
export default function App() {
  return (
    <AuthProvider>
      <ProviderPanier>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ProviderPanier>
    </AuthProvider>
  );
}

// 🎨 STYLES
const styles = {
  mainContainer: {
    marginLeft: "220px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  main: {
    padding: "25px",
    flex: 1,
  },
};