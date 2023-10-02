import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext.js";
import useAuth from "../../services/hooks/useAuth.js";

function ProfilePage() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    customersLength,
    invoicesLength,
    setCustomersLength,
    setInvoicesLength,
  } = useContext(AuthContext);
  const {
    username,
    firstname,
    lastname,
    status,
    isAdmin,
    roles,
    totalTransactions,
  } = useAuth();
  console.log(useAuth());

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-4">
            <div className="card" style={{ borderRadius: 15 }}>
              <div className="card-body text-center">
                <div className="mt-3 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-circle img-fluid"
                    style={{ width: 100 }}
                  />
                </div>
                <h4 className="mb-2">
                  {lastname} {firstname}
                </h4>
                <p className="text-muted mb-4">
                  @FACT <span className="mx-2">|</span>{" "}
                  <a href="#!">{username}</a>
                </p>
                <div className="mb-4 pb-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating m-1"
                  >
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating m-1"
                  >
                    <i className="fab fa-twitter fa-lg"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating m-1"
                  >
                    <i className="fab fa-skype fa-lg"></i>
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-rounded btn-lg"
                >
                  Edit Profile
                </button>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <p className="mb-2 h5">
                      <span className="badge rounded-pill badge-notification bg-warning">
                        {customersLength}
                      </span>
                    </p>
                    <p className="text-muted mb-0">Customers</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-2 h5">
                      <span className="badge rounded-pill badge-notification bg-warning">
                        {invoicesLength}
                      </span>
                    </p>
                    <p className="text-muted mb-0">Invoices </p>
                  </div>
                  <div>
                    <p className="mb-2 h5">
                      <span className="badge rounded-pill badge-notification bg-warning">
                        {totalTransactions} €
                      </span>
                    </p>
                    <p className="text-muted mb-0">Total Transactions</p>
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

export default ProfilePage;
