import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router";

export const Header = ({content}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" fixed="top" className="shadow">
        <Container fluid>
          <Navbar.Brand className="me-auto fw-bold">E<span className="fw-bold color">C</span>MS : {content}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="dark" onClick={()=>navigate('/')}>Logout</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{paddingBottom: "56px"}}></div>
    </div>
  );
};
