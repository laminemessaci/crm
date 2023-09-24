import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authAPI from "../services/authAPI.js";
import AuthContext from "../contexts/AuthContext.js";
import { toast } from "react-toastify";
import Field from "../components/forms/Field.jsx";

function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [erroEmail, setErrorEmail] = useState("");
  const [erroPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  /**
   * Handles the change event for the input element.
   *
   * @param {object} currentTarget - The event target object.
   */
  function handleChange({ currentTarget }) {
    setError("");
    if (erroEmail) {
      setErrorEmail("");
    }
    if (erroPassword) {
      setErrorPassword("");
    }

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

    if (credentials.username === "") {
      setErrorEmail("email is required");
      return;
    }
    if (credentials.password === "") {
      setErrorPassword("password is required");
      return;
    }

    try {
      await authAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);

      navigate("/customers");
    } catch (error) {
      toast.error("Identifiant or password incorrect");
      setError("Identifiant or password incorrect");
    }
  }

  useEffect(() => {
    authAPI.setup();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-11">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{
                      borderRadius: "1rem 0 0 1rem",
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#393f81" }}
                        ></i>
                        <span className="h1 fw-bold mb-0 ">FACT</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: 1 }}
                      >
                        Sign into your account
                      </h5>

                      <Field
                        id={"emailInput"}
                        name="username"
                        type="email"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="example@ex.com"
                        label="Email"
                        error={error || erroEmail}
                      />
                      <Field
                        id={"passwordInput"}
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="********"
                        label="Password"
                        error={error || erroPassword}
                      />

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <a href="#/sign-up" style={{ color: "#393f81" }}>
                          Register here
                        </a>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
