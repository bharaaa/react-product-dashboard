import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
  const { state } = useContext(GlobalContext);

  const isAuthenticated = state.user && state.user.token;

  return isAuthenticated ? element : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.shape({
    element: PropTypes.number.isRequired,
  }).isRequired,
};

export default PrivateRoute;
