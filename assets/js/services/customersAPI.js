import axios from "axios";
import { CUSTOMERS_API } from "../config";
import Cache from "./cache";

/**
 * Retrieves all customers from the cache or the API.
 *
 * @return {Promise<Array>} An array of customer objects.
 */
async function findAll() {
  const cachedCustomers = await Cache.get("customers");

  if (cachedCustomers) {
    return cachedCustomers;
  }

  return axios.get(CUSTOMERS_API).then((response) => {
    const customers = response.data["hydra:member"];
    Cache.set("customers", customers);

    return customers;
  });
}

/**
 * Deletes a customer with the given ID.
 *
 * @param {string} customerId - The ID of the customer to delete.
 * @return {Promise} A Promise that resolves with the response from the delete request.
 */
async function deleteCustomer(customerId) {
  const response = await axios.delete(CUSTOMERS_API + "/" + customerId);
  const cachedCustomers = await Cache.get("customers");
  if (cachedCustomers) {
    Cache.set(
      "customers",
      cachedCustomers.filter((c) => c.id !== customerId)
    );
  }
  return await response;
}

/**
 * Retrieves a customer from either the cache or the API based on the provided customerId.
 *
 * @param {string} customerId - The ID of the customer to retrieve.
 * @return {Promise<object>} A Promise that resolves to the retrieved customer.
 */
async function findCustomer(customerId) {
  const cachedCustomer = await Cache.get("customers." + customerId);

  if (cachedCustomer) {
    return cachedCustomer;
  }

  return axios.get(CUSTOMERS_API + "/" + customerId).then((response) => {
    const customer = response.data;
    Cache.set("customers." + customerId, customer);

    return customer;
  });
}

/**
 * Updates a customer in the database.
 *
 * @param {string} customerId - The ID of the customer to update.
 * @param {Object} customer - The updated customer object.
 * @returns {Promise} - A promise that resolves to the response from the API call.
 */
async function updateCustomer(customerId, customer) {
  const response = await axios.put(CUSTOMERS_API + "/" + customerId, customer);
  const cachedCustomers = await Cache.get("customers");
  const cachedCustomer = await Cache.get("customers." + customerId);
  if (cachedCustomer) {
    Cache.set("customers." + customerId, response.data);
  }
  if (cachedCustomers) {
    cachedCustomers[cachedCustomers.findIndex((c) => c.id === +customerId)] =
      response.data;
    Cache.set("customers", cachedCustomers);
  }
  return response;
}

 /**
  * Creates a new customer record.
  *
  * @param {Object} customer - The customer object containing the information of the customer.
  * @return {Promise} A promise that resolves to the response from the server.
  */
 function createCustomer(customer) {
  const response =  axios
    .post(CUSTOMERS_API, customer)
    .then(async (response) => {
      const cachedCustomers = await Cache.get("customers");

      if (cachedCustomers) {
        Cache.set("customers", [...cachedCustomers, response.data]);
      }

      return response;
    });
  return response;
}

export default {
  findAll,
  delete: deleteCustomer,
  find: findCustomer,
  update: updateCustomer,
  create: createCustomer,
};
