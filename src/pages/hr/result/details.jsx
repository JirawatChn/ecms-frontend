import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Topbar } from "../../../components/topbar";
import { Sidebar } from "../../../components/sidebar";
import { MdArrowBackIosNew } from "react-icons/md";

export const TrainingResultDetails = () => {
  const { requestID } = useParams();
  const navigate = useNavigate();

  const [requestResultDataRaw, setRequestResultDataRaw] = useState({});
  const [requestResultData, setRequestResultData] = useState({});

  const fetchRequestData = () => {
    const data = {
      requestID: "result-001",
      courseID: "TLS123",
      sessionID:"S001",
      empID: "EMP001",
      empName: "HSY",
      department: "Sales",
      courseName: "เตรียมความพร้อมสู่การทำงาน 3",
      trainingDate: "20-10-01",
      completeDate: "20-10-01",
      periods: "10:00-17:00",
      trainingHours: "8",
      trainingLocation: "มหาวิทยาลัยศรีปทุม บางเขน",
      sendDate: "2024-03-01",
      status: "pending",
    };
    setRequestResultDataRaw(data);
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  useEffect(() => {
    setRequestResultData(requestResultDataRaw);
  }, [requestResultDataRaw]);

  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState("");

  const requestModal = (id, status) => {
    setModalShow(true);
    setModalStatus(status);
  };

  const approveRequest = () => {
    setModalShow(false);
    window.location.reload();
  };

  const denyRequest = () => {
    setModalShow(false);
    window.location.reload();
  };
  const WarningModal = (props) => {
    return (
      <>
        {modalStatus === "approve" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>
                คุณแน่ใจหรือไม่ที่จะให้ผ่านรายการ รหัสคอร์ส {requestResultData.courseID} รอบ{" "}
                {requestResultData.sessionID}
              </p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button
                onClick={props.onHide}
                variant="outline-secondary"
                className="flex-grow-1 me-2"
              >
                ยกเลิก
              </Button>
              <Button
                onClick={() => approveRequest()}
                variant="success"
                className="flex-grow-1"
              >
                ผ่าน
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {modalStatus === "deny" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>
                คุณแน่ใจหรือไม่ที่จะไม่ให้ผ่านรายการ รหัสคอร์ส {requestResultData.courseID} รอบ{" "}
                {requestResultData.sessionID}
              </p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button
                onClick={props.onHide}
                variant="outline-secondary"
                className="flex-grow-1 me-2"
              >
                ยกเลิก
              </Button>
              <Button
                onClick={() => denyRequest()}
                variant="danger"
                className="flex-grow-1"
              >
                ไม่ผ่าน
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  };
  return (
    <div className="wrapper">
      <WarningModal show={modalShow} onHide={() => setModalShow(false)} />
      <Sidebar actived="results" iconActive={{ opacity: "100%" }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"ผลลัพธ์การอบรม"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <Button
                variant="link"
                onClick={() => navigate("/hr/results")}
                className="back-button"
              >
                <MdArrowBackIosNew /> กลับหน้าผลลัพธ์
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                รายละเอียดการอบรม รหัสคำร้อง {requestID}
                <h6 className="mx-3 mt-2">
                  {requestResultData.status === "pending" ? (
                    <Badge pill bg="warning">
                      รอตรวจสอบ
                    </Badge>
                  ) : requestResultData.status === "approve" ? (
                    <Badge pill bg="success">
                      อนุมัติ
                    </Badge>
                  ) : requestResultData.status === "deny" ? (
                    <Badge pill bg="danger">
                      ไม่อนุมัติ
                    </Badge>
                  ) : (
                    ""
                  )}
                </h6>
              </div>
              <Row className="align-items-stretch">
                <Col>
                  <Card className="h-100 shadow-sm">
                    <div className="p-4">
                      <h5 className="mb-3 border-bottom pb-2">
                        รายละเอียดการอบรม
                      </h5>
                      <Row>
                        <Col>
                          <p>
                            <strong>วันที่ส่งคำร้อง:</strong>{" "}
                            {requestResultData.sendDate}
                          </p>
                          <p>
                            <strong>รหัสคำร้อง</strong>{" "}
                            {requestResultData.requestID}
                          </p>
                          <p>
                            <strong>รหัสคอร์ส:</strong>{" "}
                            {requestResultData.courseID}
                          </p>
                          <p>
                            <strong>ชื่อคอร์ส:</strong>{" "}
                            {requestResultData.courseName}
                          </p>
                          <p>
                            <strong>รอบ:</strong> {requestResultData.sessionID}
                          </p>
                          <p>
                            <strong>จำนวนอบรม:</strong>{" "}
                            {requestResultData.trainingHours} ชั่วโมง
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>วันที่อบรม:</strong>{" "}
                            {requestResultData.trainingDate}
                          </p>
                          <p>
                            <strong>วันที่อบรมสำเร็จ</strong>{" "}
                            {requestResultData.trainingHours}
                          </p>
                          <p>
                            <strong>เวลาอบรม</strong>{" "}
                            {requestResultData.periods}
                          </p>
                          <p>
                            <strong>สถานที่อบรม:</strong>{" "}
                            {requestResultData.trainingLocation}
                          </p>
   
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
                <Col>
                  <Card className="h-100 shadow-sm">
                    <div className="p-4">
                      <h5 className="mb-3 border-bottom pb-2">
                        รายละเอียดผู้อบรม
                      </h5>
                      <p>
                        <strong>รหัสพนักงาน:</strong> {requestResultData.empID}
                      </p>
                      <p>
                        <strong>ชื่อผู้อบรม:</strong>{" "}
                        {requestResultData.empName}
                      </p>
                      <p>
                        <strong>แผนกที่สังกัด:</strong>{" "}
                        {requestResultData.department}
                      </p>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  {requestResultData.status === "pending" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">ผลลัพธ์การอบรมพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestResultData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รอตรวจสอบ
                              </Badge>
                            ) : (
                              ""
                            )}
                          </h6>
                        </div>
                        <div className="mt-3">
                          <Button
                          className="request-button"
                            variant="success"
                            onClick={() =>
                              requestModal(
                                requestResultData.courseID,
                                "approve"
                              )
                            }
                          >
                            ผ่าน
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2 request-button"
                            onClick={() =>
                              requestModal(requestResultData.courseID, "deny")
                            }
                          >
                            ไม่ผ่าน
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ) : requestResultData.status === "approve" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">ผลลัพธ์การอบรมพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestResultData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รอตรวจสอบ
                              </Badge>
                            ) : requestResultData.status === "approve" ? (
                              <Badge pill bg="success" className="mx-3">
                                อนุมัติ
                              </Badge>
                            ) : requestResultData.status === "deny" ? (
                              <Badge pill bg="danger" className="mx-3">
                                ไม่อนุมัติ
                              </Badge>
                            ) : (
                              ""
                            )}
                          </h6>
                        </div>
                        <div className="mt-4">
                          <Row>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>ผู้อนุมัติการเบิก</Form.Label>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={
                                    requestResultData.vertifier || "ไม่มีข้อมูล"
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>วันที่อนุมัติ</Form.Label>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={
                                    requestResultData.approvedDate ||
                                    "ไม่มีข้อมูล"
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  ) : requestResultData.status === "deny" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">ผลลัพธ์การอบรมพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestResultData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รอตรวจสอบ
                              </Badge>
                            ) : requestResultData.status === "approve" ? (
                              <Badge pill bg="success" className="mx-3">
                                อนุมัติ
                              </Badge>
                            ) : requestResultData.status === "deny" ? (
                              <Badge pill bg="danger" className="mx-3">
                                ไม่อนุมัติ
                              </Badge>
                            ) : (
                              ""
                            )}
                          </h6>
                        </div>
                        <div className="mt-4">
                          <Row>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>ผู้อนุมัติการเบิก</Form.Label>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={
                                    requestResultData.vertifier || "ไม่มีข้อมูล"
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>วันที่อนุมัติ</Form.Label>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={
                                    requestResultData.approvedDate ||
                                    "ไม่มีข้อมูล"
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
