import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authAPI from "../services/authAPI.js";
import AuthContext from "../contexts/AuthContext.js";
import { toast } from "react-toastify";
import Field from "../components/forms/Field.jsx";
import { USERS_API } from "../config.js";
import usersAPI from "../services/usersAPI.js";

function Signup(props) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const navigate = useNavigate();

  function handleChange({ currentTarget }) {
    setErrors({ ...errors, [currentTarget.name]: "" });
    setUser({ ...user, [currentTarget.name]: currentTarget.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm = "Passwords do not match";
      setErrors(apiErrors);
      return;
    }

    try {
      await usersAPI.register(user);
      setErrors({});
      toast.success("Your account has been created! You can now login.");
      navigate("/login");
    } catch ({ response }) {
      const { violations } = response.data;
      console.log(violations);
      if (violations) {
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
      }
    }
  }
  console.log(errors);

  useEffect(() => {
    if (authAPI.isAuthenticated()) {
      navigate("/customers");
    }
  }, [navigate]);

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
                    className="img-fluid "
                    style={{
                      borderRadius: "1rem 0 0 1rem",
                      objectFit: "cover",
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
                          style={{ color: "#9A616D" }}
                        ></i>
                        <span
                          className="h1 fw-bold mb-0"
                          style={{ color: "#9A616D" }}
                        >
                          FACT
                        </span>
                      </div>

                      <h4 className="fw-normal mb-3 pb-3">Sign Up</h4>

                      <Field
                        name="firstName"
                        label="FirstName"
                        placeholder="Your firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                      />
                      <Field
                        name="lastName"
                        label="lastName"
                        placeholder="Your lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                      />
                      <Field
                        name="email"
                        label="email Address"
                        placeholder="Your email"
                        value={user.email}
                        onChange={handleChange}
                        error={errors.email}
                        type="email"
                      />
                      <Field
                        name="password"
                        label="Password"
                        placeholder="Your password"
                        value={user.password}
                        onChange={handleChange}
                        error={errors.password}
                        type="password"
                      />
                      <Field
                        name="passwordConfirm"
                        label="Confirm password"
                        placeholder="Confirm your password"
                        value={user.passwordConfirm}
                        onChange={handleChange}
                        error={errors.passwordConfirm}
                        type="password"
                      />
                      <div className="text-center">
                        <button
                          style={{ backgroundColor: "#9A616D", color: "white" }}
                          className="btn  btn-lg btn-block"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
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

export default Signup;
