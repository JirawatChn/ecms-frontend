import { useState } from "react";
import { useNavigate } from "react-router";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      if (response.ok) {
        const token = newData.data.token;
        localStorage.setItem("token", token);

        const payload = JSON.parse(atob(token.split(".")[1]));
        const role = payload.roles;

        console.log(role);
        if (role === "hr") {
          navigate('hr/dashboard')
        } else if(role === "emp"){
          navigate('emp/dashboard')
        }
      } else {
        console.log("invalid password");
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
