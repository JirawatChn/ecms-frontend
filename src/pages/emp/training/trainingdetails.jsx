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
import axios from "axios";

export const TrainingDetails = ({ empDataRaw }) => {
  const [empData, setEmpData] = useState({});
  const navigate = useNavigate();
  const [courseResultData,setCourseResultData] = useState([])

  const {reqId} = useParams();  

  useEffect(()=>{
    const fetchResultById = async () =>{
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:9999/courses/result/id",
          {
            reqId: reqId,
          },
          {
            headers: {
              "content-type": "application/json",
              authorization: token,
            },
          }
        );
        setCourseResultData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
  
    fetchResultById()
  },[reqId])  

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  return (
    <div>
      <Header content={"ผลลัพธ์การอบรม"} />
      <div className="mt-3 d-flex justify-content-center">
        <div style={{ width: "80rem" }} className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() => navigate(-1)}
            id="back"
          >
            <MdArrowBackIosNew /> กลับสู่หน้าการอบรม
          </Button>

          <Card bg="primary" className="mt-2" text="white">
            <Card bg="dark" text="white" className="mt-3 h4">
              <Card.Body>
                <p>ผลลัพธ์การอบรม รหัส {reqId}</p>
              </Card.Body>{" "}
            </Card>
            <Container>
              <Row>
                <Col md={10} className="d-flex align-items-center">
                  รหัสพนักงาน:
                  <input
                    disabled
                    value={empData.empId ?? "ไม่มีข้อมูล"}
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
                              <Form.Label>รหัส</Form.Label>
                              <Form.Control
                                type="text"
                                value={reqId || "ไม่มีข้อมูล"}
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
                                value={courseResultData.courseId || "ไม่มีข้อมูล"}
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
                                value={courseResultData.sessionId || "ไม่มีข้อมูล"}
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
                                value={courseResultData.empId || "ไม่มีข้อมูล"}
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
                                value={courseResultData.courseName || "ไม่มีข้อมูล"}
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
                                  courseResultData.trainingLocation || "ไม่มีข้อมูล"
                                }
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
                              <Form.Label>วันที่อบรม</Form.Label>
                              <Form.Control
                                type="date"
                                disabled
                                value={courseResultData.trainingDate ? courseResultData.trainingDate.toString().split('T')[0] : ""}
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
                                value={courseResultData.periods || "ไม่มีข้อมูล"}
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
                                    value={courseResultData.status || "ไม่มีข้อมูล"}
                                  />
                                </Form.Group>
                              </Form>
                            </Col>
                            <Col md={4}>
                              <Form>
                                {courseResultData.approvedDate ? (
                                  <Form.Group className="mb-3">
                                    <Form.Label>วันที่ยืนยัน</Form.Label>
                                    <Form.Control
                                      type="text"
                                      disabled
                                      value={
                                        courseResultData.approvedDate || "ไม่มีข้อมูล"
                                      }
                                    />
                                  </Form.Group>
                                ) : (
                                  ""
                                )}
                              </Form>
                            </Col>
                            <Col md={4}>
                              {courseResultData.vertifier ? (
                                <Form.Group className="mb-3">
                                  <Form.Label>ผู้อนุมัติการอบรม</Form.Label>
                                  <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                      courseResultData.vertifier || "ไม่มีข้อมูล"
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
