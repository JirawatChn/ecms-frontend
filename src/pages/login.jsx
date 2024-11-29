import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setRoles, setEmpId } = useContext(AuthContext);

  const login = async (username, pwd) => {
    try {
      const response = await fetch("http://localhost:9999/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: pwd,
        }),
      });

      const newData = await response.json();
      const { token, roles, empId} = newData.data;
      setToken(token);
      setRoles(roles);
      setEmpId(empId)

      // console.log("Roles:", roles); // ตรวจสอบค่า roles
      // console.log("Token:", token);

      localStorage.setItem("token", token);
      localStorage.setItem("roles", roles);

      if (roles === "Hr") {
        navigate("/hr/dashboard");
      } else if (roles === "Emp") {
        navigate("/emp/dashboard");
      }
    } catch (error) {
      console.error("Error occurred during login:", error.message);
    }
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login-form">
      <div className="login-wrapper">
        <div className="title">ECMS Login</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="field">
            <input type="submit" value="Login" className="mt-3" />
          </div>
        </form>
      </div>
    </div>
  );
};
