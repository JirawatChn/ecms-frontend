import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [roles, setRoles] = useState(localStorage.getItem("roles") || "");
  const [empId, setEmpId] = useState(localStorage.getItem("empId") || "");
  const navigate = useNavigate()


  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("roles", roles);
    localStorage.setItem("empId", empId);
  }, [token, roles, empId]);

  useEffect(() => {
    if (!token || !empId) {
      navigate("/login");
    }
  }, [token, empId, navigate]);

  const logout = async () => {
    try {
        setToken('');
        setRoles('');
        setEmpId('');

        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        localStorage.removeItem('empId');
        sessionStorage.removeItem("hasRefreshed")
    } catch (error) {
        throw new Error('Logout failed');
    } finally {
        window.location.reload();
    }
};

  return (
    <AuthContext.Provider
      value={{
        token,
        roles,
        empId,
        setToken,
        setRoles,
        setEmpId,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
