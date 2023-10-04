import jwtDecode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext.js";

const useAuth = () => {
  // const token = useSelector(selectCurrentToken);
  const { isAuthenticated } = useContext(AuthContext);

  let isAdmin = false;
  let status = "USER_ROLE";

  if (isAuthenticated) {
    const authToken = window.localStorage.getItem("authToken");
    const decoded = jwtDecode(authToken);

    const {
      username,
      roles,
      firstname,
      lastname,
      totalTransactions,
      customerCount,
    } = decoded;

    //     console.log("decoded", decoded.UserInfo);

    isAdmin = roles.includes("USER_ADMIN");

    if (isAdmin) status = "Admin";

    return {
      username,
      roles,
      status,
      isAdmin,
      firstname,
      lastname,
      totalTransactions,
      customerCount,
    };
  }

  return {
    username: "",
    roles: [],
    isAdmin,
    status,
    firstname: "",
    lastname: "",
    totalTransactions: 0,
  };
};
export default useAuth;
