import { Header } from "../../components/header";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MdArrowBackIosNew } from "react-icons/md";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

export const EmpData = ({ empDataRaw, setEmpDataRaw }) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  return (
    <div>
      <Header content={"ข้อมูลพนักงาน"} />
      <div className="mt-3 d-flex justify-content-center">
        <div style={{ width: "80rem" }} className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/emp/dashboard")}
            className="shadow"
          >
            <MdArrowBackIosNew /> กลับสู่หน้าหลัก
          </Button>
          <Card bg="primary" text="white" className="mt-2 shadow">
            <Card bg="dark" text="white" className="mt-3 h4">
              <Card.Body>รหัสพนักงาน {empData.empId}</Card.Body>
            </Card>
            <Card.Body>
              <Card bg="white">
                <Card.Header className="align-items-center">
                  <p className="h4">{empData.empName}</p>
                  <p className="h5">{empData.department}</p>
                </Card.Header>
                <ListGroup variant="flush">
                  <div className="h5 mx-3 mt-3">ข้อมูลส่วนตัว</div>
                  <ListGroup.Item>
                    <Container>
                      <Row>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3" >
                              <Form.Label>รหัสพนักงาน</Form.Label>
                              <Form.Control
                                type="text"
                                value={empData.empId ?? ""}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>  
                        <Col md={6}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>ชื่อพนักงาน</Form.Label>
                              <Form.Control
                                type="text"
                                value={empData.empName ?? ""}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={4}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>ฝ่ายหรือแผนกที่สังกัด</Form.Label>
                              <Form.Control
                                type="text"
                                value={empData.department ?? ""}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                      <Col md={4}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>อีเมลพนักงาน</Form.Label>
                              <Form.Control
                                type="email"
                                value={empData.email ?? ""}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={3}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>หมายเลขโทรศัพท์</Form.Label>
                              <Form.Control
                                type="text"
                                value={empData.tel ?? ""}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={3}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>วันที่อบรมครั้งแรก</Form.Label>
                              <Form.Control
                                type="date"
                                value={empData.firstTrainingDate ?? ""}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={3}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>วันหมดอายุการอบรม</Form.Label>
                              <Form.Control
                                type="date"
                                value={empData.expiryDate ?? ""}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={3}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>อบรมครั้งถัดไปอีก</Form.Label>
                              <Form.Control
                                type="text"
                                value={empData.nextExpiryDate ?? ""}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                    </Container>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
