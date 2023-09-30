import React from "react";

function NoFieldPage({ type }) {
  return (
    <section
      className="vh-100 d-flex align-items-center"
      style={{ backgroundColor: "#9A616D" }}
    >
      <div className="container d-flex  justify-content-center p-5">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">There is no {type} </h5>
            <p className="card-text">You can create a new {type}</p>
            <a href="" className="btn btn-primary">
              Create a {type}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoFieldPage;
