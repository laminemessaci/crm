import React from "react";

const HomePage = () => {
  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4 text-center text-bold ">FACT</h1>
          <h2 className="display-6 text-center text-bold ">
            Welcome to our Invoice Management System!
          </h2>
          <p className="lead"></p>
          <hr className="my-4" />
          <p className="lead text-center text-bold text-white ">
            Efficiently manage your invoices, track payments, and stay organized
            with our user-friendly platform. With powerful features and
            intuitive design, we make it easy for you to keep your financial
            records in order. Key Features: Create and send invoices in minutes.
            Track invoice status and payment history. Stay on top of your
            financial transactions. Access your account from anywhere, anytime.
            Get started today and experience hassle-free invoice management.
            Sign in or create an account to begin.
          </p>
          <p className="lead my-5  text-white">
            Have questions or need assistance? Our support team is here to help{" "}
            <br />
            <a className="btn btn-primary btn-lg  my-4" href="#" role="button">
              En savoir plus
            </a>
          </p>
        </div>
      </div>
      <footer>
        <div className="container text-center py-4 text-muted">
          © 2023 FACT. Tous droits réservés.
        </div>
      </footer>
    </section>
  );
};

export default HomePage;
