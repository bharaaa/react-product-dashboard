import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const PrivateRoute = ({ element }) => {
  const { state } = useContext(GlobalContext);

  const isAuthenticated = state.user && state.user.token;

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
