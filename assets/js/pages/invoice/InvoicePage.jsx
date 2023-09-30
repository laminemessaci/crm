import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../components/forms/Field.jsx";
import Select from "../../components/forms/Select.jsx";
import customersAPI from "../../services/customersAPI.js";
import { toast } from "react-toastify";
import invoicesAPI from "../../services/invoicesAPI.js";
import cache from "../../services/cache.js";

const initialState = {
  amount: 0,
  customer: "",
  status: "",
};
function InvoicePage() {
  const { id = "new" } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({ ...initialState, status: "SENT" });
  const [errors, setErrors] = useState(initialState);
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(false);

  /**
   * Fetches customers from the API and updates the state with the fetched data.
   *
   * @return {Promise} A promise that resolves when the customers have been fetched and the state has been updated.
   */
  async function fetchCustomers() {
    try {
      const data = await customersAPI.findAll();
      setCustomers(data);
      if (!invoice.customer) {
        setInvoice({ ...invoice, customer: data[0].id });
      }
    } catch (error) {
      toast.error("Unable to fetch invoices");
      navigate("/invoices");
    }
  }

  /**
   * Fetches the invoice with the given invoiceId and updates the state with the returned data.
   *
   * @param {string} invoiceId - The ID of the invoice to fetch.
   * @return {Promise<void>} - A promise that resolves when the invoice is fetched and the state is updated.
   */
  async function fetchInvoice(invoiceId) {
    try {
      const { amount, status, customer } = await invoicesAPI.find(invoiceId);
      setInvoice({ amount, status, customer: customer.id });
      // toast.success("Invoice fetched successfully");
    } catch (error) {
      toast.error("invoices not found");
      // navigate("/invoices");
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id]);

  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   * @return {Promise<void>} A promise that resolves when the submission is handled.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(initialState);

    if (editing) {
      try {
        await invoicesAPI.update(id, invoice);
        toast.success("Invoice updated successfully");
        cache.remove("invoices");
        navigate("/invoices");
      } catch (error) {
        toast.error("Unable to update invoice");
        // navigate("/invoices");
      }
    } else {
      try {
        await invoicesAPI.create(invoice);
        navigate("/invoices");
        toast.success("Invoice created successfully");
        cache.remove("invoices");
      } catch ({ response }) {
        const { violations } = response.data;
        if (violations) {
          console.log(violations);
          const apiErrors = {};
          violations.forEach(({ propertyPath, message }) => {
            apiErrors[propertyPath] = message;
          });
          setErrors(apiErrors);
        }
        toast.error("Unable to create invoice ");
      }
    }
  }

  /**
   * Updates the invoice state based on the input value.
   *
   * @param {Object} currentTarget - The event object with the target element.
   * @param {string} currentTarget.name - The name of the input field.
   * @param {string} currentTarget.value - The value of the input field.
   * @return {void}
   */
  function handleChange({ currentTarget }) {
    setInvoice({ ...invoice, [currentTarget.name]: currentTarget.value });
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
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
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
                        <h4 className="fw-normal mb-3 pb-3">Edit Invoice</h4>
                      ) : (
                        <h4 className="fw-normal mb-3 pb-3">Add Invoice </h4>
                      )}

                      <Field
                        name="amount"
                        type="number"
                        label="Amount"
                        placeholder="Invoice amount"
                        value={invoice.amount}
                        onChange={handleChange}
                        error={errors.amount}
                      />

                      <Select
                        name="customer"
                        label="Select a customer"
                        value={invoice.customer}
                        defaultValue={"Select Customer"}
                        error={errors.customer}
                        onChange={handleChange}
                      >
                        {customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.firstName} {customer.lastName}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="status"
                        label="Select a statut"
                        value={invoice.status || "SENT"}
                        error={errors.status}
                        onChange={handleChange}
                      >
                        <option value="SENT">Sent</option>
                        <option value="PAID">Paid</option>
                        <option value="CANCELLED">Canceled</option>
                      </Select>

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

export default InvoicePage;
