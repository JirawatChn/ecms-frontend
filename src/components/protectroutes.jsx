// import { Navigate } from "react-router";

const ProtectRoutes = ({ isAllowed, redirectPath = "/", children }) => {
    // if (!isAllowed) {
    //     return <Navigate to={redirectPath} replace />;
    // }
    return children;
};


export default ProtectRoutes