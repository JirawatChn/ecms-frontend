import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const newData = await response.json();
      const { token, roles, empId } = newData.data;
      setToken(token);
      setRoles(roles);
      setEmpId(empId);

      localStorage.setItem("token", token);
      localStorage.setItem("roles", roles);

      if (roles === "Hr") {
        navigate("/hr/dashboard");
      } else if (roles === "Emp") {
        navigate("/emp/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    login(email, password);
  };

  return (
    <div>
      <Navbar
        expand="lg"
        bg="primary"
        data-bs-theme="dark"
        fixed="top"
        className="shadow"
      >
        <Container fluid>
          <Navbar.Brand className="me-auto fw-bold">
            E<span className="fw-bold color">C</span>MS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-3">
              <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
              <Nav.Link onClick={() => navigate("/aboutus")}>Aboutus</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="login-form">
        <div className="login-wrapper">
          <div className="title">ECMS Login</div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />
              <label>Email Address</label>
            </div>
            <div className="field">
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
              <label>Password</label>
            </div>
            {errorMessage && (
              <div className="error-message text-danger d-flex justify-content-end mt-2">
                {errorMessage}
              </div>
            )}
            <div className="field">
              <input type="submit" value="Login" className="mt-3" id="submit"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
