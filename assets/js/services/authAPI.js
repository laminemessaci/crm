import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";
import { toast } from "react-toastify";

/**
 * Authenticates the user using the provided credentials.
 *
 * @param {object} credentials - The user's login credentials.
 * @return {Promise<void>} - A Promise that resolves with no value.
 */
async function authenticate(credentials) {
  const response = await axios.post(LOGIN_API, credentials);
  const token = response.data.token;
  window.localStorage.setItem("authToken", token);
  setAxiosToken(token);
}

/**
 * Sets the Axios token in the default headers.
 *
 * @param {string} token - The token to be set.
 */
function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Removes the authentication token from the local storage and deletes the
 * "Authorization" header from the default axios headers.
 *
 * @return {void} No return value.
 */
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

/**
 * Sets up the function by checking for a valid authentication token in the local storage.
 * If a valid token is found, it sets the Axios token to the found token.
 * @return {void} No return value.
 */
function setup() {
  const token = window.localStorage.getItem("authToken");

  if (token) {
    const { exp: tokenExpiration } = jwtDecode(token);
    if (tokenExpiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    } else {
      logout();
    }
  }
}

/**
 * Checks if the user is authenticated by verifying the presence and validity of an authentication token.
 *
 * @return {boolean} Returns true if the user is authenticated, false otherwise.
 */
function isAuthenticated() {
  let authToken = null;
  try {
    const authToken = window.localStorage.getItem("authToken");
  } catch (e) {
    toast.error("Une erreur est survenue lors de l'authentification");
    return false;
  }

  if (authToken) {
    const { exp: tokenExpiration } = jwtDecode(authToken);
    return tokenExpiration * 1000 > Date.now();
  }

  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated,
};
