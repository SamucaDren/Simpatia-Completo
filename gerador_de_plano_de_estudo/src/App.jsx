import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ModulesSection from "./components/ModulesSection";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import StudyPlanGenerator from "./components/StudyPlanGenerator";

export default function App() {
  return (
    <BrowserRouter basename="/gerador-de-plano">
      <div className="font-sans text-neutral-900">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <ModulesSection />
                  <FAQ />
                </>
              }
            />
            <Route path="/study-plan" element={<StudyPlanGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
