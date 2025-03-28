import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Header } from "../../../components/header";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export const TrainingListDetails = ({ empDataRaw }) => {
  const [empData, setEmpData] = useState({});
  const navigate = useNavigate();
  const { courseId, sessionId } = useParams();

  const [requestResultData, setListResultData] = useState({});

  useEffect(() => {
    const fetchListResult = async () => {
      const token = localStorage.getItem("token");
      const cid = courseId;
      const sid = sessionId;
      try {
        const response = await axios.post(
          "http://localhost:9999/checkdata/enrollment/id",
          {
            courseId: cid,
            sessionId: sid,
          },
          {
            headers: {
              "content-type": "application/json",
              authorization: token,
            },
          }
        );
        setListResultData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchListResult();
  }, [courseId, sessionId]);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  return (
    <div>
      <Header content={"การอบรม"} />
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
                <p>
                  รายละเอียดการอบรม รหัส {courseId} รอบ {sessionId}
                </p>
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

                <Container>
                  <Row>
                    <Col md={2}>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>รหัสคอร์ส</Form.Label>
                          <Form.Control type="text" value={courseId} disabled />
                        </Form.Group>
                      </Form>
                    </Col>
                    <Col md={2}>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>รอบ</Form.Label>
                          <Form.Control
                            type="text"
                            value={sessionId}
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
                            value={requestResultData.empId || "ไม่มีข้อมูล"}
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
                            value={
                              requestResultData.courseName || "ไม่มีข้อมูล"
                            }
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
                              requestResultData.trainingLocation ||
                              "ไม่มีข้อมูล"
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
                            value={
                              requestResultData.trainingDate
                                ? requestResultData.trainingDate
                                    .toString()
                                    .split("T")[0]
                                : ""
                            }
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
                            value={requestResultData.periods || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                    
                  </Row>
                </Container>
              </Card>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
