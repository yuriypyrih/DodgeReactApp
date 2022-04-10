import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import AuthRoutes from "./AuthRoutes";

const Routes: React.FC<unknown> = () => {
  const accessToken = useSelector(
    (state: RootState) => state.authSlice.accessToken
  );
  return <Router>{accessToken ? <ProtectedRoutes /> : <AuthRoutes />}</Router>;
};

export default Routes;
