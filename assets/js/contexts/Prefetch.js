import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import invoicesAPI from "../services/invoicesAPI.js";
import customersAPI from "../services/customersAPI.js";
import AuthContext from "./AuthContext.js";
import { toast } from "react-toastify";
import UsersAPI from "../services/UsersAPI.js";
import useAuth from "../services/hooks/useAuth.js";

const Prefetch = () => {
  const { setCustomersLength, setInvoicesLength } = useContext(AuthContext);
  const { username, status, isAdmin } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  async function fetchCustomers() {
    try {
      const data = await customersAPI.findAll();
      // if (data.length === 0) {
      //   toast.error("No customers found");
      // }
      setCustomers(data);
      setCustomersLength(data.length);
    } catch (error) {
      console.log(error);
      //toast.error("Unable to fetch customers");
      setLoading(false);
    }
  }

  async function fetchInvoices() {
    try {
      const data = await invoicesAPI.findAll();
      setInvoices(data);
      setInvoicesLength(data.length);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchUsers() {
    try {
      const data = await UsersAPI.findAll();
      setUsers(data);
      setLoading(false);
      //  toast.success("Users fetched successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const fetchAll = async () => {
    await fetchCustomers();
    await fetchInvoices();
    if (isAdmin) {
      await fetchUsers();
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return <Outlet />;
};
export default Prefetch;
