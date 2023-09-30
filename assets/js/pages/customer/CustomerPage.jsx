import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { async } from "regenerator-runtime";
import Field from "../../components/forms/Field.jsx";
import customersAPI from "../../services/customersAPI.js";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
};
function CustomerPage() {
  const { id = "new" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [customer, setCustomer] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [editing, setEditing] = useState(false);

  async function fetchCustomers(customerId) {
    try {
      const { lastName, firstName, email, company } = await customersAPI.find(
        customerId
      );
      setCustomer({ lastName, firstName, email, company });
    } catch (error) {
      navigate("/customers");
    }
  }

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchCustomers(id);
    }
  }, [id, location]);

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   * @return {Promise} - A promise that resolves when the form submission is handled.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(initialState);
    if (editing) {
      try {
        await customersAPI.update(id, customer);
        toast.success("Customer updated successfully");
        navigate("/customers");
      } catch ({ response }) {
        const { violations } = response.data;
        if (violations) {
          const apiErrors = {};
          violations.forEach(({ propertyPath, message }) => {
            apiErrors[propertyPath] = message;
          });
          setErrors(apiErrors);
        }
        toast.error("Unable to update customer");
      }
    } else {
      try {
        await customersAPI.create(customer);
        navigate("/customers");
        toast.success("Customer created successfully");
      } catch ({ response }) {
        const { violations } = response.data;
        if (violations) {
          const apiErrors = {};
          violations.forEach(({ propertyPath, message }) => {
            apiErrors[propertyPath] = message;
          });
          setErrors(apiErrors);
        }
        toast.error(`Unable to create customer `);
      }
    }
  }

  function handleChange({ currentTarget }) {
    setCustomer({ ...customer, [currentTarget.name]: currentTarget.value });
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-11">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img2.webp"
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
                      {editing ? (
                        <h4 className="fw-normal mb-3 pb-3">Edit Customer</h4>
                      ) : (
                        <h4 className="fw-normal mb-3 pb-3">Add Customer </h4>
                      )}

                      <Field
                        name="firstName"
                        label="FirstName"
                        placeholder="Your firstName"
                        value={customer.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                      />
                      <Field
                        name="lastName"
                        label="lastName"
                        placeholder="Your lastName"
                        value={customer.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                      />
                      <Field
                        name="email"
                        label="email Address"
                        placeholder="Your email"
                        value={customer.email}
                        onChange={handleChange}
                        error={errors.email}
                        type="email"
                      />
                      <Field
                        name="company"
                        label="Company"
                        placeholder="Your company"
                        value={customer.company}
                        onChange={handleChange}
                        error={errors.company}
                        type="text"
                      />

                      <div className="text-center">
                        {editing ? (
                          <button
                            style={{
                              backgroundColor: "#9A616D",
                              color: "white",
                            }}
                            className="btn  btn-lg btn-block"
                            type="submit"
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            style={{
                              backgroundColor: "#9A616D",
                              color: "white",
                            }}
                            className="btn  btn-lg btn-block"
                            type="submit"
                          >
                            Create
                          </button>
                        )}
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

export default CustomerPage;
