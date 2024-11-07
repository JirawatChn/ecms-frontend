import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export const Header = ({content}) => {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand className="me-auto fw-bold">E<span className="fw-bold" style={{color:"#FFBB00"}}>C</span>MS : {content}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Logout
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{marginBottom: '30px'}}></div>
    </div>
  );
};
