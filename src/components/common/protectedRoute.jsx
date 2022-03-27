import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const location = useLocation();

  return !auth.getCurrentUser() ? (
    <Navigate to={"/login"} replace state={{ from: location }} />
  ) : (
    children
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;
