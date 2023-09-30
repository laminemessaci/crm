import axios from "axios";
import { INVOICES_API } from "../config";
import Cache from "./cache";

async function findAll() {
  const cachedCustomers = await Cache.get("invoices");
  if (cachedCustomers) {
    return cachedCustomers;
  }

  const response = await axios.get(INVOICES_API);
  const invoices = response.data["hydra:member"];

  Cache.set("invoices", invoices);
  return invoices;
}

async function findInvoice(invoiceId) {
  const response = await axios.get(INVOICES_API + "/" + invoiceId);
  return response.data;
}

async function deleteInvoice(invoiceId) {
  return axios.delete(INVOICES_API + "/" + invoiceId);
}

async function updateInvoice(invoiceId, invoice) {
  invoice.amount = Number(invoice.amount);
  const response = await axios.put(INVOICES_API + "/" + invoiceId, {
    ...invoice,
    customer: `/api/customers/${invoice.customer}`,
  });
  return response;
}

async function createInvoice(invoice) {
  invoice.amount = Number(invoice.amount);
  return axios.post(INVOICES_API, {
    ...invoice,
    customer: `/api/customers/${invoice.customer}`,
  });
}

export default {
  findAll,
  find: findInvoice,
  delete: deleteInvoice,
  update: updateInvoice,
  create: createInvoice,
};
