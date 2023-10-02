import axios from "axios";
import { USERS_API } from "../config";
import { async } from "regenerator-runtime";

function register(user) {
  return axios.post(USERS_API, user);
}

/**
 * Retrieves all users.
 *
 * @return {Promise<Array<Object>>} Returns a promise that resolves to an array of user objects.
 */
async function findAll() {
  const cachedUsers = await Cache.get("users");

  if (cachedUsers) {
    return cachedUsers;
  }
  return axios.get(USERS_API).then( (response) => {
    const users =  response.data["hydra:member"];
    Cache.set("users", users);

    return users;
  });
}

export default {
  register,
  findAll,
};
