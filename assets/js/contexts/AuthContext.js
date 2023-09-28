import React, { createContext } from "react";

export default createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {},
  customersLength: 0,
  setCustomersLength: (value) => {},
  invoicesLength: 0,
  setInvoicesLength: (value) => {},
});
