import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import invoicesAPI from "../services/invoicesAPI.js";
import customersAPI from "../services/customersAPI.js";
import AuthContext from "./AuthContext.js";

const Prefetch = () => {
  const { setCustomersLength, setInvoicesLength } = useContext(AuthContext);

  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);

  async function fetchCustomers() {
    try {
      const data = await customersAPI.findAll();
      if (data.length === 0) {
        toast.error("No customers found");
      }
      setCustomers(data);
      setCustomersLength(data.length);
    } catch (error) {
      console.log(error);
      //toast.error("Unable to fetch customers");
    }
  }

  async function fetchInvoices() {
    try {
      const data = await invoicesAPI.findAll();
      setInvoices(data);
      setInvoicesLength(data.length);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCustomers();
    fetchInvoices();
  }, []);

  return <Outlet />;
};
export default Prefetch;
