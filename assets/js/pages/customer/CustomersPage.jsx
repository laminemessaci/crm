import React, { useContext, useEffect, useState } from "react";
import CustomersAPI from "../../services/customersAPI.js";
import { toast } from "react-toastify";
import TableLoader from "../../components/Loaders/TableLoader.jsx";
import NoInvoicesPage from "../NoFieldPage.jsx";
import useAuth from "../../services/hooks/useAuth.js";
import Pagination from "../../components/Pagination.jsx";
import AuthContext from "../../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import DialogModal from "../../components/DialogModal.jsx";
import NoFieldPage from "../NoFieldPage.jsx";

const itemsPerPage = 10;
function CustomersPage() {
  // const { username, status, isAdmin, firstname, lastname } = useAuth();
  const { setCustomersLength } = useContext(AuthContext);
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function handleConfirmDelete() {
    await handleDelete(customerIdToDelete);
    setCustomerIdToDelete(null);
  }

  async function fetchCustomers() {
    try {
      const data = await CustomersAPI.findAll();
      if (data.length === 0) {
        toast.error("No customers found");
      }
      setCustomers(data);
      setCustomersLength(data.length);
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
  async function handleDelete(customerId) {
    const originalCustomers = [...customers];
    setCustomers(customers.filter((customer) => customer.id !== customerId));
    try {
      await CustomersAPI.delete(customerId);
      toast.success("Customer deleted successfully");
      // fetchCustomers();
    } catch (error) {
      toast.error("Unable to delete customer");
      setCustomers(originalCustomers);
    }
  }

  function handleEdit(customerId) {
    navigate("/customers/" + customerId);
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
    setCurrentPage(page);
  }

  /**
   * Handles the search event and updates the search state and current page.
   *
   * @param {object} currentTarget - The event target object.
   * @return {undefined} This function does not return a value.
   */
  function handleSearch({ currentTarget }) {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  );

  if (!customers) {
    return <NoFieldPage type={"Customer"} />;
  }

  return (
    <main className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container  ">
        <div className="row d-flex justify-content-center ">
          <h1 className="text-center p-5 display-5 text-white">
            Customers List :{" "}
          </h1>
        </div>

        <div className="row d-flex justify-content-space-evenly ">
          <div className="col input-group mb-4 w-50 mx-0 p-4">
            <div className="form-floating  ">
              <input
                id="search"
                type="text"
                name="search"
                className="form-control"
                placeholder="john doe"
                value={search}
                onChange={handleSearch}
              />
              <label htmlFor="search">Search</label>
            </div>
            <button type="button" className="btn btn-info">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="col mb-4 d-flex justify-content-end align-items-center">
            <Link to="/customers/new" className="btn btn-primary">
              <i
                className="fas fa-user-plus "
                style={{ fontSize: "20px", color: "aquamarine" }}
              ></i>
            </Link>
          </div>
        </div>

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
                    <button
                      className="btn btn-warning m-1 "
                      onClick={() => handleEdit(customer.id)}
                    >
                      Update
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#confirmationModal"
                      data-customer-id={customer.id}
                      className="btn btn-danger "
                      onClick={() => setCustomerIdToDelete(customer.id)}
                      disabled={customer.invoices.length > 0}
                      title={`${customer.invoices.length} && this customer has invoices `}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && <TableLoader />}
        <div className="d-flex justify-content-center">
          {filteredCustomers.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              length={filteredCustomers.length}
              onPageChanged={handlePageChange}
            />
          )}
        </div>
      </div>
      <DialogModal
        idToDelete={customerIdToDelete}
        handleConfirmDelete={handleConfirmDelete}
        setShowModal={setShowModal}
        title={"Delete Customer"}
        content={"Are you sure you want to delete this customer ?"}
      />
    </main>
  );
}

export default CustomersPage;
