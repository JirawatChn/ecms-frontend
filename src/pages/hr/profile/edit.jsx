import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const EditHrProfile = ({ empDataRaw, setEmpDataRaw }) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});

  const [empId] = useState("");
  const [empName, setEmpName] = useState("");
  const [department, setDepartment] = useState("");
  const [cardId, setCardId] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {};
    if (empId) {
      dataToSubmit.empId = empData.empId;
    }
    if (empName) {
      dataToSubmit.empName = empName;
    }
    if (department) {
      dataToSubmit.department = department;
    }
    if (cardId) {
      dataToSubmit.cardId = cardId;
    }
    if (tel) {
      dataToSubmit.tel = tel;
    }
    if (email) {
      dataToSubmit.email = email;
    }

    if (Object.keys(dataToSubmit).length > 0) {
      console.log("Data to submit:", dataToSubmit);
    } else {
      console.log("No new data to submit.");
    }
  };

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  return (
    <div className="wrapper">
      <Sidebar actived="emp" iconActive={{ opacity: "100%" }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"พนักงาน"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <Button
                variant="link"
                onClick={() => navigate("/hr/profile")}
                className="back-button"
                id="back"
              >
                <MdArrowBackIosNew /> ยกเลิกการแก้ไข
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                แก้ไขข้อมูล
              </div>
              <Card className="h-100 shadow-sm">
                <div className="p-4">
                  <h5 className="mb-3 border-bottom pb-2 d-flex">
                    ข้อมูลทั่วไป
                  </h5>
                  <Form onSubmit={handleSubmit}>
                    <Row className="d-flex justify-content-center">
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>รหัสพนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.empId || "ไม่มีข้อมูล"}
                            id="empId"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ฝ่ายหรือแผนกที่สังกัด</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setDepartment(e.target.value)}
                            defaultValue={empData.department}
                            id="department"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ชื่อพนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setEmpName(e.target.value)}
                            defaultValue={empData.empName}
                            id="empName"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            เลขที่ประจําตัวประชาชนของพนักงาน
                          </Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setCardId(e.target.value)}
                            defaultValue={empData.cardId}
                            id="cardId"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อีเมลล์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={empData.email}
                            id="email"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>เบอร์โทรศัพท์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setTel(e.target.value)}
                            defaultValue={empData.tel}
                            id="tel"
                          />
                        </Form.Group>
                      </Col>
                      <Container>
                        <Row className="mt-3 d-flex justify-content-end" md={6}>
                          <Button type="submit" id="submit">แก้ไขข้อมูล</Button>
                        </Row>
                      </Container>
                    </Row>
                  </Form>
                </div>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
