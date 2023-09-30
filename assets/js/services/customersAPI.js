import axios from "axios";
import { CUSTOMERS_API } from "../config";
import Cache from "./cache";

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

async function findCustumer(customerId) {
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

async function createCustomer(customer) {
  const response = await axios
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
  find: findCustumer,
  update: updateCustomer,
  create: createCustomer,
};
