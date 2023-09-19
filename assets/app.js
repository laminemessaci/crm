/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";
import Navbar from "./js/components/Navbar.jsx";
import HomePage from "./js/pages/HomePage.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <HomePage />
      </div>
    </>
  );
};

export default App;
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
