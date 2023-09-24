import React from "react";

function NoInvoicesPage() {
  return (
    <section
      className="vh-100 d-flex align-items-center"
      style={{ backgroundColor: "#9A616D" }}
    >
      <div class="container ">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Aucune facture n'a été trouvée.</h5>
            <p class="card-text">
              Vous n'avez actuellement aucune facture dans votre compte.
            </p>
            <a href="#" class="btn btn-primary">
              Créer une nouvelle facture
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoInvoicesPage;
