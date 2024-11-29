import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ProtectRoutes = ({ isAllowed }) => {
  const {roles} = useContext(AuthContext);

  if (roles !== isAllowed) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default ProtectRoutes;
