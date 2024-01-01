import React, { useEffect } from "react";
import { Navigate } from "react-router";
// import { useAuth, useUpdateLoginModalStatus } from "../context/AuthContext";

const ProtectedRoute = ({ Component }) => {
  //  const loginStatus = useAuth();
  // const setShowLoginModal = useUpdateLoginModalStatus();
  const Username = localStorage.getItem("Token");

  if (Username != null) {
    // setShowLoginModal(true)
    return <Navigate to={"/"} />;
  }
  return <div>{Component}</div>;
};

export default ProtectedRoute;
