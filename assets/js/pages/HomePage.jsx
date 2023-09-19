import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">FACT</h1>
          <span>Welcome to our Invoice Management System!</span>
          <p className="lead"></p>
          <hr className="my-4" />
          <p className="lead my-5">
            Efficiently manage your invoices, track payments, and stay organized
            with our user-friendly platform. With powerful features and
            intuitive design, we make it easy for you to keep your financial
            records in order. Key Features: Create and send invoices in minutes.
            Track invoice status and payment history. Stay on top of your
            financial transactions. Access your account from anywhere, anytime.
            Get started today and experience hassle-free invoice management.
            Sign in or create an account to begin.
          </p>
          <p className="lead my-5">
            Have questions or need assistance? Our support team is here to help
            <a className="btn btn-primary btn-lg" href="#" role="button">
              En savoir plus
            </a>
          </p>
        </div>
      </div>
      <footer>
        <div className="container text-center py-4">
          © 2023 FACT. Tous droits réservés.
        </div>
      </footer>
    </>
  );
};

export default HomePage;
