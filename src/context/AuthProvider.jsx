import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [roles, setRoles] = useState(localStorage.getItem("roles") || "");
  const [empId, setEmpId] = useState(localStorage.getItem("empId") || "");


  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("roles", roles);
    localStorage.setItem("empId", empId);
  }, [token, roles, empId]);

  const logout = async () => {
    try {
        setToken('');
        setRoles('');
        setEmpId('');

        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        localStorage.removeItem('empId');
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
