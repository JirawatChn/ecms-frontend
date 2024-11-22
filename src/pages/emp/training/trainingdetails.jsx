import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Header } from "../../../components/header";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const TrainingDetails = ({ empDataRaw }) => {
  const [empData, setEmpData] = useState({});
  const navigate = useNavigate();
  const { courseID, sessionID } = useParams();

  const [resultData, setRequestResultData] = useState({});

  const fetchRequestResult = () => {
    const data = {
      requestID: "result-001",
      empID: "EMP001",
      courseID: "ABC101",
      sessionID: "S099",
      courseName: "เตรียมความพร้อมสู่การทำงาน 2",
      trainingDate: "2022-10-01",
      completeDate: "2022-10-01",
      periods: "10:00-17:00",
      trainingHours: "8",
      trainingLocation: "มหาวิทยาลัยศรีปทุม บางเขน",
      status: "pending",
      approvedDate: "",
      vertifier: "",
    };
    setRequestResultData(data);
  };

  useEffect(() => {
    fetchRequestResult();
  }, []);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  return (
    <div>
      <Header content={"เบิกค่าอบรม"} />
      <div className="mt-3 d-flex justify-content-center">
        <div style={{ width: "80rem" }} className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/emp/trainings")}
          >
            <MdArrowBackIosNew /> กลับสู่หน้าการอบรม
          </Button>

          <Card bg="primary" className="mt-2" text="white">
            <Card bg="dark" text="white" className="mt-3 h4">
              <Card.Body>
                <p>คำร้องขอผลลัพธ์การอบรม รหัส {resultData.requestID}</p>
              </Card.Body>{" "}
            </Card>
            <Container>
              <Row>
                <Col md={10} className="d-flex align-items-center">
                  รหัสพนักงาน:
                  <input
                    disabled
                    value={empData.empID ?? "ไม่มีข้อมูล"}
                    className="mx-1"
                  />
                  ชื่อ:
                  <input
                    disabled
                    value={empData.empName ?? "ไม่มีข้อมูล"}
                    className="mx-1"
                  />
                  แผนก:
                  <input
                    disabled
                    value={empData.department ?? "ไม่มีข้อมูล"}
                    className="mx-1"
                  />
                </Col>
              </Row>
            </Container>
            <Card.Body>
              <Card bg="white">
                <Card.Header className="align-items-center">
                  <p className="h4">รายละเอียดการอบรม</p>
                </Card.Header>
                <ListGroup variant="flush" className="mb-3">
                  <ListGroup.Item>
                    <Container>
                      <Row>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>รหัสคำร้อง</Form.Label>
                              <Form.Control
                                type="text"
                                value={resultData.requestID || "ไม่มีข้อมูล"}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>รหัสคอร์ส</Form.Label>
                              <Form.Control
                                type="text"
                                value={courseID}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>รอบ</Form.Label>
                              <Form.Control
                                type="text"
                                value={sessionID}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>รหัสพนักงาน</Form.Label>
                              <Form.Control
                                type="text"
                                value={resultData.empID || "ไม่มีข้อมูล"}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row></Row>
                      <Row>
                        <Col md={4}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>ชื่อคอร์ส</Form.Label>
                              <Form.Control
                                type="text"
                                value={resultData.courseName || "ไม่มีข้อมูล"}
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={4}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>สถานที่อบรม</Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  resultData.trainingLocation || "ไม่มีข้อมูล"
                                }
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>เวลาอบรม</Form.Label>
                              <Form.Control
                                type="text"
                                disabled
                                value={resultData.periods || "ไม่มีข้อมูล"}
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>วันที่อบรม</Form.Label>
                              <Form.Control
                                type="text"
                                disabled
                                value={resultData.trainingDate || "ไม่มีข้อมูล"}
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={4}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>วันที่อบรมสำเร็จ</Form.Label>
                              <Form.Control
                                type="text"
                                disabled
                                value={resultData.completeDate || "ไม่มีข้อมูล"}
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>จำนวนชั่วโมง</Form.Label>
                              <Form.Control
                                type="text"
                                disabled
                                value={
                                  resultData.trainingHours || "ไม่มีข้อมูล"
                                }
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <ListGroup.Item variant="dark" className="mt-3">
                          ผลลัพธ์การอบรม
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col md={4}>
                              <Form>
                                <Form.Group className="mb-3">
                                  <Form.Label>สถานะ</Form.Label>
                                  <Form.Control
                                    type="text"
                                    disabled
                                    value={resultData.status}
                                  />
                                </Form.Group>
                              </Form>
                            </Col>
                            <Col md={4}>
                              <Form>
                                {resultData.approvedDate ? (
                                  <Form.Group className="mb-3">
                                    <Form.Label>วันที่ยืนยัน</Form.Label>
                                    <Form.Control
                                      type="text"
                                      disabled
                                      value={
                                        resultData.approvedDate || "ไม่มีข้อมูล"
                                      }
                                    />
                                  </Form.Group>
                                ) : (
                                  ""
                                )}
                              </Form>
                            </Col>
                            <Col md={4}>
                              {resultData.vertifier ? (
                                <Form.Group className="mb-3">
                                  <Form.Label>ผู้อนุมัติการอบรม</Form.Label>
                                  <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                      resultData.vertifier || "ไม่มีข้อมูล"
                                    }
                                  />
                                </Form.Group>
                              ) : (
                                ""
                              )}
                            </Col>
                          </Row>
                        </ListGroup.Item>
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
