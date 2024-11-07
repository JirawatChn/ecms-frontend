import { Col, Container, Row } from "react-bootstrap";
import { Header } from "../../components/header";
import Card from "react-bootstrap/Card";
import { MdAssignment, MdOutlineWifiProtectedSetup ,MdOutlineAttachMoney,MdInsertChart, MdAccountCircle} from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header content={"Employee Course Management Systems"} />
      <Container fluid>
        <Row>
          <Col md="auto">
            <Card
              bg="primary"
              text="white"
              style={{ width: "22rem", borderRadius: "8px" }}
            >
              <Card.Body>
                <Card.Title>
                  ID: <span>EMP001</span>
                </Card.Title>
                <p>John Doe</p>
                <p>
                  แผนก: <span>Sales</span>
                </p>
                <p>
                  หมายเลขโทรศัพท์: <span>06612345678</span>
                </p>
                <p>
                  อีเมล: <span>johndoe@example.com</span>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md="1">
            <Card
              text="white"
              className="text-center d-flex flex-column justify-content-center align-items-center card-menu-container"
              style={{ "--icon-color": "#B64848" }}
              onClick={() => navigate("/course")}
            >
              <div className="card-menu-circle">
                <MdAssignment className="icon" />
              </div>
              <div className="card-menu-title">ลงทะเบียนอบรม</div>
            </Card>
          </Col>
          <Col md="1">
            <Card
              text="white"
              className="text-center d-flex flex-column justify-content-center align-items-center card-menu-container"
              style={{ "--icon-color": "#B67248" }}
              onClick={() => {}}
            >
              <div className="card-menu-circle">
                <MdOutlineWifiProtectedSetup className="icon" />
              </div>
              <div className="card-menu-title">
                เพิ่ม-ถอน
                <br />
                คอร์สอบรม
              </div>
            </Card>
          </Col>
          <Col md="1">
            <Card
              text="white"
              className="text-center d-flex flex-column justify-content-center align-items-center card-menu-container"
              style={{ "--icon-color": "#77B648" }}
              onClick={() => {}}
            >
              <div className="card-menu-circle">
                <MdOutlineAttachMoney className="icon" />
              </div>
              <div className="card-menu-title">เบิกค่าอบรม</div>
            </Card>
          </Col>
          <Col md="1">
            <Card
              text="white"
              className="text-center d-flex flex-column justify-content-center align-items-center card-menu-container"
              style={{ "--icon-color": "#4895B6" }}
              onClick={() => {}}
            >
              <div className="card-menu-circle">
                <MdInsertChart className="icon" />
              </div>
              <div className="card-menu-title">ผลลัพธ์การอบรม</div>
            </Card>
          </Col>
          <Col md="1">
            <Card
              text="white"
              className="text-center d-flex flex-column justify-content-center align-items-center card-menu-container"
              style={{ "--icon-color": "#4862B6" }}
              onClick={() => {}}
            >
              <div className="card-menu-circle">
                <MdAccountCircle className="icon" />
              </div>
              <div className="card-menu-title">ข้อมูลส่วนตัว</div>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </div>
  );
};
