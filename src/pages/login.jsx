import { useState } from "react";
import { useNavigate } from "react-router";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    
    navigate('/dashboard');
  };

  return (
    <div className="login-form">
      <div className="wrapper">
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
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};
