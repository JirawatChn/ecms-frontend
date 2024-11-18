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
import { Sidebar } from "../../../../components/sidebar";
import { Topbar } from "../../../../components/topbar";
import { useNavigate, useParams } from "react-router";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect, useState } from "react";

export const RequestWithdrawCourseDetails = () => {
  const { requestID } = useParams();
  const navigate = useNavigate();

  const [requestWithdrawDataRaw, setRequestWithdrawDataRaw] = useState({});
  const [requestWithdrawData, setRequestWithdrawData] = useState({});

  const fetchRequestData = () => {
    const data = {
      requestID: "withdraw-001",
      sessionID: "S001",
      courseID: "TLS123",
      courseName: "เตรียมความพร้อมสู่การทำงาน",
      empID: "EMP001",
      empName: "HSY",
      department:"Sales",
      trainingDate: "2024-04-01",
      sendDate: "2024-03-01",
      status: "pending",
    };
    setRequestWithdrawDataRaw(data);
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  useEffect(() => {
    setRequestWithdrawData(requestWithdrawDataRaw);
  }, [requestWithdrawDataRaw]);

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
              <p>คุณแน่ใจหรือไม่ที่จะอนุมัติรายการ รหัสคำร้อง {requestID}</p>
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
                อนุมัติ
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
              <p>คุณแน่ใจหรือไม่ที่จะไม่อนุมัติรายการ รหัสคำร้อง {requestID}</p>
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
                ไม่อนุมัติ
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
      <Sidebar
        actived="withdraw"
        collapse={true}
        highlight={{ textDecoration: "underline" }}
        iconActive={{ opacity: "100%" }}
      />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"คำร้องพนักงาน"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <Button
                variant="link"
                onClick={() => navigate("/hr/withdraw/requests")}
                className="back-button"
              >
                <MdArrowBackIosNew /> กลับหน้าคำร้อง
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                รายละเอียดรหัสคำร้อง {requestID}
                <h6 className="mx-3 mt-2">
                  {requestWithdrawData.status === "pending" ? (
                    <Badge pill bg="warning">
                      รออนุมัติ
                    </Badge>
                  ) : requestWithdrawData.status === "approve" ? (
                    <Badge pill bg="success">
                      อนุมัติ
                    </Badge>
                  ) : requestWithdrawData.status === "deny" ? (
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
                        รายละเอียดคำร้อง
                      </h5>
                      <p>
                        <strong>วันที่ส่งคำร้อง:</strong>{" "}
                        {requestWithdrawData.sendDate}
                      </p>
                      <p>
                        <strong>รหัสคำร้อง:</strong>{" "}
                        {requestWithdrawData.requestID}
                      </p>
                      <p>
                        <strong>รหัสคอร์ส:</strong>{" "}
                        {requestWithdrawData.courseID}
                      </p>
                      <p>
                        <strong>ชื่อคอร์ส:</strong>{" "}
                        {requestWithdrawData.courseName}
                      </p>
                      <p>
                        <strong>รอบ:</strong> {requestWithdrawData.sessionID}
                      </p>
                      <p>
                        <strong>วันที่อบรม:</strong>{" "}
                        {requestWithdrawData.trainingDate}
                      </p>
                    </div>
                  </Card>
                </Col>
                <Col>
                  <Card className="h-100 shadow-sm">
                    <div className="p-4">
                      <h5 className="mb-3 border-bottom pb-2">
                        รายละเอียดผู้ส่งคำร้อง
                      </h5>
                      <p>
                        <strong>รหัสพนักงาน:</strong>{" "}
                        {requestWithdrawData.empID}
                      </p>
                      <p>
                        <strong>ชื่อผู้อบรม:</strong>{" "}
                        {requestWithdrawData.empName}
                      </p>
                      <p>
                        <strong>แผนกที่สังกัด:</strong>{" "}
                        {requestWithdrawData.department}
                      </p>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  {requestWithdrawData.status === "pending" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">คำร้องพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestWithdrawData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รออนุมัติ
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
                                requestWithdrawData.requestID,
                                "approve"
                              )
                            }
                          >
                            อนุมัติคำร้อง
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2 request-button"
                            onClick={() =>
                              requestModal(
                                requestWithdrawData.requestID,
                                "deny"
                              )
                            }
                          >
                            ไม่อนุมัติคำร้อง
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ) : requestWithdrawData.status === "approve" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">คำร้องพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestWithdrawData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รออนุมัติ
                              </Badge>
                            ) : requestWithdrawData.status === "approve" ? (
                              <Badge pill bg="success" className="mx-3">
                                อนุมัติ
                              </Badge>
                            ) : requestWithdrawData.status === "deny" ? (
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
                                    requestWithdrawData.vertifier ||
                                    "ไม่มีข้อมูล"
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
                                    requestWithdrawData.approvedDate ||
                                    "ไม่มีข้อมูล"
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  ) : requestWithdrawData.status === "deny" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">คำร้องพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestWithdrawData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รออนุมัติ
                              </Badge>
                            ) : requestWithdrawData.status === "approve" ? (
                              <Badge pill bg="success" className="mx-3">
                                อนุมัติ
                              </Badge>
                            ) : requestWithdrawData.status === "deny" ? (
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
                                    requestWithdrawData.vertifier ||
                                    "ไม่มีข้อมูล"
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
                                    requestWithdrawData.approvedDate ||
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
