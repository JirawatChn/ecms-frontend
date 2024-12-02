import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    if (email === "hr") {
      navigate("/hr/dashboard");
    } else if (email === "emp") {
      navigate("/emp/dashboard");
    }
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
              <Nav.Link onClick={() => navigate("/")}>Login</Nav.Link>
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
    </div>
  );
};
