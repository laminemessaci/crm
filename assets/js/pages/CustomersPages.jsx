import React, { useEffect, useState } from "react";
import CustomersAPI from "../services/customersAPI.js";
import { toast } from "react-toastify";
import TableLoader from "../components/Loaders/TableLoader.jsx";

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

  return (
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
          <tbody>
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
                    {(customer.totalAmount / 100).toFixed(2)}
                  </span>
                </td>
                <td className="justify-content-start">
                  {/* <button className="btn btn-info m-1">Voir</button>
                <button className="btn btn-warning m-1">Modifier</button> */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(customer.id)}
                    disabled={customer.invoices.length > 0}
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
  );
}

export default CustomersPages;
