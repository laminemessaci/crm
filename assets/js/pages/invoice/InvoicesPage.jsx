import React, { useContext, useEffect, useState } from "react";
import TableLoader from "../../components/Loaders/TableLoader.jsx";
import invoicesAPI from "../../services/invoicesAPI.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination.jsx";
import NoInvoicesPage from "../NoInvoicesPage.jsx";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/AuthContext.js";

import { formatDate } from "../../utils/index.js";
import DialogModal from "../../components/DialogModal.jsx";

const itemsPerPage = 10;

/**
 * Fetches the invoices from the API and updates the state with the fetched data.
 *
 * @return {Promise<void>} - A promise that resolves when the invoices are fetched.
 */
function InvoicesPage(props) {
  const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger",
  };
  const { setInvoicesLength } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  const [invoiceIdToDelete, setInvoiceIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchInvoices() {
    try {
      const data = await invoicesAPI.findAll();

      if (data.length === 0) {
        toast.error("there are no invoices to display");
      }

      setInvoices(data);
      setLoading(false);
      setInvoicesLength(data.length);
      toast.success("Invoices fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch invoices");
    }
  }

  /**
   * Handles the deletion of a customer.
   *
   * @param {number} id - The ID of the customer to be deleted.
   * @return {Promise<void>} - A promise that resolves when the customer is deleted.
   */
  async function handleDelete(customerId) {
    const originalInvoices = [...invoices];
    setInvoices(invoices.filter((invoice) => invoice.id !== customerId));
    try {
      await invoicesAPI.delete(customerId);
      toast.success("Invoice deleted successfully");
      // fetchInvoices();
    } catch (error) {
      toast.error("Unable to delete invoice");
      setInvoices(originalInvoices);
    }
  }

  async function handleConfirmDelete() {
    await handleDelete(invoiceIdToDelete);
    setInvoiceIdToDelete(null);
  }

  async function handleEdit(invoiceId) {
    navigate("/invoices/" + invoiceId);
  }

  useEffect(() => {
    fetchInvoices();
  }, [location]);

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

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.amount.toString().startsWith(search.toLowerCase())
  );

  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  );

  if (!invoices) {
    return <NoInvoicesPage />;
  }

  return (
    <main className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container  ">
        <div className="row d-flex justify-content-center ">
          <h1 className="text-center p-5 text-white">Invoices List : </h1>
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
          <div className="col mb-4 d-flex justify-content-end align-items-center ">
            <Link to="/invoices/new" className="btn btn-info ">
              <i className="fa-solid fa-plus m-1"></i>
              <i
                className="fa-solid fa-file-invoice fa-lg "
                style={{ fontSize: "20px", padding: 4 }}
              ></i>
            </Link>
          </div>
        </div>

        <table className="table table-striped bg-light table-hover table-bordered text-center">
          <thead>
            <tr className="text-center table-header text-bold ">
              <th>Number</th>
              <th>Customer</th>
              <th>Date sent </th>
              <th>Status </th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          {!loading && (
            <tbody className="table-group-divider">
              {paginatedInvoices.map((invoice, index) => (
                <tr key={`${invoice.id}-${index}`}>
                  <td>{invoice.chrono}</td>
                  <td>
                    <Link
                      className="text-decoration-none"
                      to={"/customers/" + invoice.customer.id}
                    >
                      {invoice.customer.firstName} {invoice.customer.lastName}
                    </Link>
                  </td>
                  <td>{formatDate(invoice.sentAt)}</td>
                  <td>
                    <span
                      className={"badge bg-" + STATUS_CLASSES[invoice.status]}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td>{invoice.amount.toLocaleString()} €</td>

                  <td>
                    <button
                      className="btn btn-warning m-1"
                      onClick={() => handleEdit(invoice.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmationModal"
                      data-invoice-id={invoice.id}
                      onClick={() => {
                        setInvoiceIdToDelete(invoice.id);
                      }}
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
          {filteredInvoices.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              length={filteredInvoices.length}
              onPageChanged={handlePageChange}
            />
          )}
        </div>
      </div>

      <DialogModal
        idToDelete={invoiceIdToDelete}
        handleConfirmDelete={handleConfirmDelete}
        setShowModal={setShowModal}
        title={"Delete Invoice"}
        content={"Are you sure you want to delete this invoice ?"}
      />
    </main>
  );
}

export default InvoicesPage;
