import { Navigate } from "react-router";

const ProtectRoutes = ({ isAllowed, redirectPath = "/", children }) =>{
    if (!isAllowed) {
        return <Navigate to={redirectPath || "/ecms/login"} replace />;
    }
      return children;
} 

export default ProtectRoutes