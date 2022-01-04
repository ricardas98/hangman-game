import React from "react";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";

import { Landing } from "./pages/landing/Landing";
import { Game } from "./pages/game/Game";
import { NotFound } from "./pages/notFound/NotFound";

import { NavBar } from "./components/navBar/NavBar";

import "./App.css";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
