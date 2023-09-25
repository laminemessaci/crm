/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React, { Suspense, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";
import HomePage from "./js/pages/HomePage.jsx";
import Layout from "./js/components/Layout.jsx";
import Login from "./js/pages/Login.jsx";
import Loader from "./js/components/Loaders/Loader.jsx";
import CustomersPages from "./js/pages/customer/CustomersPages.jsx";
import AuthContext from "./js/contexts/AuthContext.js";
import authAPI from "./js/services/authAPI.js";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./js/pages/Signup.jsx";
import Navbar from "./js/components/NavBar.jsx";
import UserPages from "./js/pages/user/UserPages.jsx";
import PrivateRoute from "./js/components/navigation/PrivateRoute.jsx";
import InvoicesPages from "./js/pages/invoice/InvoicesPages.jsx";
import UserSettings from "./js/pages/user/UserSettings.jsx";
import RequireAuth from "./js/components/navigation/RequireAuth.js";
import { ROLES } from "./js/config.js";
import ErrorPage from "./js/pages/Error404/ErrorPage.jsx";
// import "./animations.js";

authAPI.setup();
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  );
  const [customersLength, setCustomersLength] = useState(0);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        customersLength,
        setCustomersLength,
      }}
    >
      <Navbar />
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <Suspense
        fallback={
          <Loader type="bubbles" color="green" height={200} width={200} />
        }
      >
        <Routes>
          {/* Public Routes */}

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />

          <Route element={<PrivateRoute />}>
            <Route
              element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
            >
              <Route path="/customers" element={<CustomersPages />} />
              <Route path="/invoices" element={<InvoicesPages />} />
              <Route path="/user-profile" element={<UserPages />} />
              <Route path="/user-settings" element={<UserSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </AuthContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <>
    <HashRouter>
      <App />
    </HashRouter>
  </>
);
export default App;
