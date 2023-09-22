import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../services/authAPI.js";
import AuthContext from "../contexts/AuthContext.js";
import { toast } from "react-toastify";

function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  /**
   * Handles the change event for the input element.
   *
   * @param {object} currentTarget - The event target object.
   */
  function handleChange({ currentTarget }) {
    setCredentials({
      ...credentials,
      [currentTarget.name]: currentTarget.value,
    });
  }

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   * @return {Promise<void>} - A promise that resolves when the function finishes executing.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(credentials);
    try {
      await authAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      // toast.success("Authentification réussie !");
      navigate("/customers");
    } catch (error) {
      toast.error("Authentification échouée !");
      setError(
        "Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas"
      );
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="text-center mb-4">Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="username"
                placeholder="Your Email"
                onChange={handleChange}
                value={credentials.username}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Your Password"
                onChange={handleChange}
                value={credentials.password}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Se Connecter
            </button>
          </form>
          <p className="mt-3 text-center">
            You don't have an account ? <a href="inscription.html">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
