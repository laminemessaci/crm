import React, { useContext, useEffect, useState } from "react";
import UsersAPI from "../../services/UsersAPI.js";
import { toast } from "react-toastify";
import TableLoader from "../../components/Loaders/TableLoader.jsx";
import useAuth from "../../services/hooks/useAuth.js";
import Pagination from "../../components/Pagination.jsx";
import AuthContext from "../../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import DialogModal from "../../components/DialogModal.jsx";
import NoFieldPage from "../NoFieldPage.jsx";

const itemsPerPage = 10;
function UsersPage() {
  // const { username, status, isAdmin, firstname, lastname } = useAuth();
  // const { setUsersLength } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function handleConfirmDelete() {
    await handleDelete(userIdToDelete);
    setUserIdToDelete(null);
  }

  async function fetchUsers() {
    const data = await UsersAPI.findAll();

    console.log(data);
    setUsers(data);
    // setUsersLength(data.length);
    setLoading(false);
    toast.success("Users fetched successfully");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Unable to fetch users");
    // }
  }

  /**
   * Handles the deletion of a user.
   *
   * @param {number} id - The ID of the user to be deleted.
   * @return {Promise<void>} - A promise that resolves when the user is deleted.
   */
  async function handleDelete(userId) {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== userId));
    try {
      await UsersAPI.delete(userId);
      setUsersLength(originalUsers.length - 1);
      toast.success("User deleted successfully");
      // fetchUsers();
      setCurrentPage(1);
    } catch (error) {
      toast.error("Unable to delete user");
      setUsers(originalUsers);
    }
  }

  function handleEdit(userId) {
    navigate("/users/" + userId);
  }

  useEffect(() => {
    fetchUsers();
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

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = Pagination.getData(
    filteredUsers,
    currentPage,
    itemsPerPage
  );

  if (users.length === 0 && !loading) {
    return <NoFieldPage type={"users"} />;
  }

  return (
    <main className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container  ">
        <div className="row d-flex justify-content-center ">
          <h1 className="text-center p-5 display-5 text-white">
            Users List :{" "}
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
            <Link to="/users/new" className="btn btn-primary">
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
              {paginatedUsers.map((user, index) => (
                <tr key={`${user.id}-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.company}</td>
                  <td>
                    <span className="badge bg-primary mx-2">{user.length}</span>
                  </td>
                  <td>
                    <span className="badge bg-primary mx-2">
                      {user.totalAmount.toFixed(2)}
                    </span>
                  </td>
                  <td className="justify-content-start">
                    <button
                      className="btn btn-warning m-1 "
                      onClick={() => handleEdit(user.id)}
                    >
                      Update
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#confirmationModal"
                      data-user-id={user.id}
                      className="btn btn-danger "
                      onClick={() => setUserIdToDelete(user.id)}
                      disabled={user.length > 0}
                      title={` `}
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
          {filteredUsers.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              length={filterdUsers.length}
              onPageChanged={handlePageChange}
            />
          )}
        </div>
      </div>
      <DialogModal
        idToDelete={userIdToDelete}
        handleConfirmDelete={handleConfirmDelete}
        setShowModal={setShowModal}
        title={"Delete User"}
        content={"Are you sure you want to delete this user ?"}
      />
    </main>
  );
}

export default UsersPage;
