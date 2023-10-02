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
  const cachedInvoice = await Cache.get("invoices." + invoiceId);
  if (cachedInvoice) {
    return cachedInvoice;
  }

  return axios.get(INVOICES_API + "/" + invoiceId).then(async (response) => {
    const invoice = await response.data;
    Cache.set("invoices." + invoiceId, invoice);

    return invoice;
  });
}

/**
 * Deletes an invoice with the specified invoiceId.
 *
 * @param {string} invoiceId - The ID of the invoice to be deleted.
 * @return {Promise} A promise that resolves to the response from the API.
 */
async function deleteInvoice(invoiceId) {
  const response = await axios.delete(`${INVOICES_API}/${invoiceId}`);
  const cachedInvoices = await Cache.get("invoices");
  if (cachedInvoices) {
    const filteredInvoices = cachedInvoices.filter(
      (invoice) => invoice.id !== invoiceId
    );
    Cache.set("invoices", filteredInvoices);
  }
  return response;
}

async function updateInvoice(invoiceId, invoice) {
  invoice.amount = Number(invoice.amount);
  const response = await axios.put(INVOICES_API + "/" + invoiceId, {
    ...invoice,
    customer: `/api/customers/${invoice.customer}`,
  });
  const cachedInvoice = await Cache.get("invoices." + invoiceId);
  const cachedInvoices = await Cache.get("invoices");
  if (cachedInvoice) {
    Cache.set("invoices." + invoiceId, response.data);
  }
  if (cachedInvoices) {
    cachedInvoices[cachedInvoices.findIndex((invoice) => invoice.id === +invoiceId)] =
      response.data;
    Cache.set("invoices", cachedInvoices);
  }
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
