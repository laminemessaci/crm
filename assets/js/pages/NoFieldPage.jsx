import React from "react";
import { Link } from "react-router-dom";

function NoFieldPage({ type }) {
  const link = "/" + type + "/new";
  return (
    <section
      className="vh-100 d-flex align-items-center"
      style={{ backgroundColor: "#9A616D" }}
    >
      <div className="container d-flex  justify-content-center p-5">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">There is no {type.slice(0, -1)} </h5>
            <p className="card-text">You can create a new {type.slice(0, -1)}</p>
            <Link to={link} className="btn btn-primary">
              Create a {type}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoFieldPage;
