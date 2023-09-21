/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";
import Navbar from "./js/components/Navbar.jsx";
import HomePage from "./js/pages/HomePage.jsx";
import Layout from "./js/components/Layout.jsx";
import Login from "./js/pages/Login.jsx";
import Loader from "./js/components/Loader.jsx";
import CustomersPages from "./js/pages/CustomersPages.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <Loader type="bubbles" color="green" height={200} width={200} />
        }
      >
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customers" element={<CustomersPages />} />
          {/* </Route> */}
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
