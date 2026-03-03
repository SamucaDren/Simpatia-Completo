import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./assets/components/Nav.jsx";
import Footer from "./assets/components/Footer.jsx";
import Ferramentas from "./assets/pages/Modules.jsx";
import Index from "./assets/pages/Index.jsx";
import Features from "./assets/pages/Features.jsx";

import MODULOS_DATA from "./data/modulosData";
import UpdatesPage from "./assets/pages/About.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/modules/:tipo"
          element={<Ferramentas todosModulos={MODULOS_DATA} />}
        />
        <Route path="/about" element={<UpdatesPage />} />
        <Route path="/features/:id" element={<Features />} />
        <Route path="*" element={<h1>404: Página Não Encontrada</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
