import React, { useEffect, useState } from "react";
import CustomersAPI from "../services/customersAPI.js";
import { toast } from "react-toastify";
import TableLoader from "../components/Loaders/TableLoader.jsx";
import NoInvoicesPage from "./NoInvoicesPage.jsx";

function CustomersPages() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCustomers() {
    try {
      const data = await CustomersAPI.findAll();
      console.log(data);
      setCustomers(data);
      setLoading(false);
      toast.success("Customers fetched successfully");
    } catch (error) {
      console.log(error);
      //toast.error("Unable to fetch customers");
    }
  }

  /**
   * Handles the deletion of a customer.
   *
   * @param {number} id - The ID of the customer to be deleted.
   * @return {Promise<void>} - A promise that resolves when the customer is deleted.
   */
  async function handleDelete(id) {
    const orginalCustomers = [...customers];
    setCustomers(customers.filter((customer) => customer.id !== customerId));
    try {
      await CustomersAPI.deleteCustomer(id);
      toast.success("Customer deleted successfully");
      // fetchCustomers();
    } catch (error) {
      toast.error("Unable to delete customer");
      setCustomers(orginalCustomers);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  // TO DO
  if (customers.length === 0) {
    return <NoInvoicesPage />;
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container">
        <h1 className="text-center m-5 text-white">Customers : </h1>
        <table className="table table-striped bg-light table-hover table-bordered text-center">
          <thead>
            <tr className="text-center table-header text-bold ">
              <th>Id</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Entreprise</th>
              <th>Invoices</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          {!loading && (
            <tbody className="table-group-divider">
              {customers.map((customer, index) => (
                <tr key={`${customer.id}-${index}`}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.company}</td>
                  <td>
                    <span className="badge bg-primary mx-2">
                      {customer.invoices.length}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-primary mx-2">
                      {customer.totalAmount.toFixed(2)}
                    </span>
                  </td>
                  <td className="justify-content-start">
                    {/* <button className="btn btn-info m-1">Voir</button>
                <button className="btn btn-warning m-1">Modifier</button> */}
                    <button
                      className="btn btn-danger custom-tooltip  data-bs-toggle='tooltip' data-bs-placement='top' title='Cliquez ici pour en savoir plus'"
                      onClick={() => handleDelete(customer.id)}
                      disabled={customer.invoices.length > 0}
                      title={`${customer.invoices.length} && this customer has invoices `}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && <TableLoader />}
      </div>
    </section>
  );
}

export default CustomersPages;
