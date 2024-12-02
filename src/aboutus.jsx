import { Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import imgSrc1 from "./image/65039678.png";
import imgSrc2 from "./image/65042386.png";
import imgSrc3 from "./image/65061447.jpg";
import imgSrc4 from "./image/65065930.png";
import imgSrc5 from "./image/65070100.jpg";

export const Aboutus = () => {
  const navigate = useNavigate();
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
      <div className="aboutus-form d-flex justify-content-center">
        <h3 className="fw-bold">ECMS Members</h3>
      </div>
      <div className="d-flex justify-content-center fw-semibold mt-2">
        จัดทำโดย
      </div>
      <div className="d-flex justify-content-center fw-semibold">
        จัดทำโดย
        นักศึกษาสาขาวิชาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ชั้นปีที่
        3 มหาวิทยาลัยศรีปทุม บางเขน
      </div>
      <Container className="aboutus-form">
        <Row className="d-flex justify-content-center">
          <Col md={2}>
            <Card>
              <Card.Img variant="top" src={imgSrc1} />
              <div className="d-flex justify-content-center fw-semibold">
                นายนคเรศ โพธิรัตน์
              </div>
            </Card>
          </Col>
          <Col md={2}>
            <Card>
              <Card.Img variant="top" src={imgSrc2} />
              <div className="d-flex justify-content-center fw-semibold">
                นายธีภพ เพ็ชรเปี่ยม
              </div>
            </Card>
          </Col>
          <Col md={2}>
            <Card>
              <Card.Img variant="top" src={imgSrc3} />
              <div className="d-flex justify-content-center fw-semibold">
                นายสมิทธ์ ทีปรัตนะ
              </div>
            </Card>
          </Col>
          <Col md={2}>
            <Card>
              <Card.Img variant="top" src={imgSrc4} />
              <div className="d-flex justify-content-center fw-semibold">
                นายจิรวัฒน์ ชนะสิทธิ์
              </div>
            </Card>
          </Col>
          <Col md={2}>
            <Card>
              <Card.Img variant="top" src={imgSrc5} />
              <div className="d-flex justify-content-center fw-semibold">
                นายขรรค์ชัย แพทย์จัตุรัส
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
