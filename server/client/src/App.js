import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Landing } from "./pages/landing/Landing";
import { Game } from "./pages/game/Game";

import { NavBar } from "./components/navBar/NavBar";

import "./App.css";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/game" exact element={<Game />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
