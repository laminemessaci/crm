import React, { useEffect, useState } from "react";
import CustomersAPI from "../../services/customersAPI.js";
import { toast } from "react-toastify";
import TableLoader from "../../components/Loaders/TableLoader.jsx";
import NoInvoicesPage from "../NoInvoicesPage.jsx";
import useAuth from "../../services/hooks/useAuth.js";
import Pagination from "../../components/Pagination.jsx";

function CustomersPages() {
  const { username, status, isAdmin, firstname, lastname } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  async function fetchCustomers() {
    try {
      const data = await CustomersAPI.findAll();
      if (data.length === 0) {
        toast.error("No customers found");
      }
      setCustomers(data);
      setLoading(false);
      customers.length === 0
        ? null
        : toast.success("Customers fetched successfully");
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

  /**
   * Handles the page change event.
   *
   * @param {number} page - The new page number.
   * @return {undefined} This function does not return a value.
   */
  function handlePageChange(page) {
    console.log(page);
    setCurrentPage(page);
  }

  const paginatedCustomers = Pagination.getData(
    customers,
    currentPage,
    itemsPerPage
  );

  if (!customers) {
    return <NoInvoicesPage />;
  }

  return (
    <main className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container  ">
        <h1 className="text-center p-5 text-white">Customers : </h1>
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
              {paginatedCustomers.map((customer, index) => (
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
        <div className="d-flex justify-content-center">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={customers.length}
            onPageChanged={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}

export default CustomersPages;
