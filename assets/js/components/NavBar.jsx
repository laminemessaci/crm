import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "../contexts/AuthContext.js";
import authAPI from "../services/authAPI.js";
import useAuth from "../services/hooks/useAuth.js";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated, customersLength } =
    useContext(AuthContext);
  const { username, firstname, lastname, status, isAdmin, roles } = useAuth();

  const navigate = useNavigate();
  console.log(customersLength);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, []);
  function handleLogout() {
    authAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes désormais déconnecté");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#">
          Fact
        </a> */}

        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars text-light"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
            <li className="nav-item text-center mx-2 mx-lg-1">
              <a className="nav-link active" aria-current="page" href="/">
                <div>
                  <i className="fas fa-home fa-lg mb-1"></i>
                </div>
                Home
              </a>
            </li>
            <li className="nav-item text-center mx-2 mx-lg-1">
              <Link className="nav-link" to="/customers">
                <div>
                  <i className="far fa-user fa-lg mb-1"></i>
                  <span className="badge rounded-pill badge-notification bg-success">
                    {customersLength}
                  </span>
                </div>
                Customers
              </Link>
            </li>
            <li className="nav-item text-center mx-2 mx-lg-1">
              <Link className="nav-link " to="/invoices">
                <div>
                  <i className="fa-solid fa-file-invoice fa-lg mb-1"></i>
                  <span className="badge rounded-pill badge-notification bg-warning">
                    11
                  </span>
                </div>
                Invoices
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item text-center mx-2 mx-lg-1">
                <a className="nav-link active" aria-current="page" href="/">
                  <div>
                    <i className="fas fa-user-plus fa-lg mb-1"></i>
                  </div>
                  Add User
                </a>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
            {(!isAuthenticated && (
              <>
                <li className="nav-item text-center mx-2 mx-lg-1">
                  <Link className="nav-link" to="/login">
                    <div>
                      <i className="fas fa-user fa-lg mb-1"></i>
                      <span className="badge rounded-pill badge-notification bg-info">
                        11
                      </span>
                    </div>
                    Login
                  </Link>
                </li>
                <li className="nav-item text-center mx-2 mx-lg-1">
                  <Link className="nav-link" to="/sign-up">
                    <div>
                      <i className="fas fa-user-plus fa-lg mb-1"></i>
                      <span className="badge rounded-pill badge-notification bg-success">
                        11
                      </span>
                    </div>
                    SignUp
                  </Link>
                </li>
              </>
            )) || (
              <>
                <li className="nav-item dropdown mx-3">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                      className="rounded-circle"
                      height="32"
                      alt="Portrait of a Woman"
                      loading="lazy"
                    />
                    <span className="mx-2">{firstname} </span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to={"/user-profile"} className="dropdown-item">
                      <div className="flex-direction-row">
                        <i
                          className="fas fa-id-card fa-lg mb-1 m-1"
                          style={{ color: "#9A616D" }}
                        ></i>
                        Profil
                      </div>
                    </Link>
                    <Link to={"/user-settings"} className="dropdown-item">
                      <div className="flex-direction-row">
                        <i
                          className="fas fa-gear fa-lg mb-1 m-1"
                          style={{ color: "#9A616D" }}
                        ></i>
                        Settings
                      </div>
                    </Link>
                    <Link onClick={handleLogout} className="dropdown-item">
                      <div className="flex-direction-row">
                        <i
                          className="fas fa-sign-out fa-lg mb-1 m-1 "
                          style={{ color: "#9A616D" }}
                        ></i>
                        Logout
                      </div>
                    </Link>
                  </ul>
                </li>
              </>
            )}
          </ul>

          {/* <form className="d-flex input-group w-auto ms-lg-3 my-3 my-lg-0">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-primary"
              type="button"
              data-mdb-ripple-color="dark"
            >
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
