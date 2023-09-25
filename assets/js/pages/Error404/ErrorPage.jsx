import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { errosPageAnimation } from "../../utils/index.js";

const ErrorPage = () => {
  useEffect(() => {
    errosPageAnimation();
  }, []);

  return (
    <main
      className="flex items-center justify-center "
      style={{ height: "100vh" }}
    >
      <div className="error">
        <div className="container-floud">
          <div className="col-xs-12 ground-color text-center">
            <div className="container-error-404">
              <div className="clip">
                <div className="shadow">
                  <span className="digit thirdDigit">4</span>
                </div>
              </div>
              <div className="clip">
                <div className="shadow">
                  <span className="digit secondDigit">0</span>
                </div>
              </div>
              <div className="clip">
                <div className="shadow">
                  <span className="digit firstDigit">4</span>
                </div>
              </div>
              <div
                className="msg "
                style={{ color: " white", backgroundColor: "#9A616D" }}
              >
                OH!
                <span className="triangle"></span>
              </div>
            </div>
            <h2 className="h1">Sorry! Page not found</h2>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Link
          to="/"
          className="btn btn-info p-4"
          style={{
            backgroundColor: "#9A616D",
            textDecoration: "none",
            color: "white",
          }}
        >
          <i className="fas fa-home m-1"></i>
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;
