import React, { useEffect, useState } from "react";
import customersAPI from "../services/customersAPI.js";
import { toast } from "react-toastify";

function CustomersPages() {
  const [customers, setCustomers] = useState([]);

  async function fetchCustomers() {
    try {
      const data = await customersAPI.findAll();
      console.log(data);
      setCustomers(data);
      setLoading(false);
    } catch (error) {
    
      toast.error("Impossible de charger les clients");
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center m-5 text-white">Customers : </h1>
      <table className="table table-striped bg-light ">
        <thead>
          <tr className="text-center">
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
        <tbody>
          <tr className="text-center">
            <td>1</td>
            <td>Doe</td>
            <td>John</td>
            <td>john@example.com</td>
            <td>ABC Inc.</td>
            <td>
              <span className="badge bg-primary mx-2">3</span>
            </td>
            <td>
              <span className="badge bg-primary mx-2">5023.12 €</span>
            </td>
            <td className="justify-content-start">
              <button className="btn btn-info m-1">Voir</button>
              <button className="btn btn-warning m-1">Modifier</button>
              <button className="btn btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomersPages;
