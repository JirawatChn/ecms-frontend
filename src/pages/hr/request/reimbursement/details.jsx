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
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const RequestReimbursementDetails = () => {
  const { reqId } = useParams();
  const navigate = useNavigate();

  const [requestReimbursementDataRaw, setRequestReimbursementDataRaw] =
    useState({});
  const [requestReimbursementData, setRequestReimbursementData] = useState({});

  useEffect(() => {
    const fetchRequestData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:9999/reimbursement/requestsid",
          {
            reqId: reqId,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        setRequestReimbursementDataRaw(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchRequestData();
  }, [reqId]);

  useEffect(() => {
    setRequestReimbursementData(requestReimbursementDataRaw);
  }, [requestReimbursementDataRaw]);

  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState("");
  const remark = useRef();

  const requestModal = (id, status) => {
    setModalShow(true);
    setModalStatus(status);
  };

  const approvedRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:9999/reimbursement/approved",
        {
          reqId: reqId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
    setModalShow(false);
  };

  const deniedRequest = async () => {
    if (remark.current.value === "") {
      alert("กรุณากรอกหมายเหตุ");
    } else {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          "http://localhost:9999/reimbursement/denied",
          {
            reqId: reqId,
            remark: remark.current.value,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
    setModalShow(false);
  };

  const WarningModal = (props) => {
    return (
      <>
        {modalStatus === "approved" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>คุณแน่ใจหรือไม่ที่จะอนุมัติรายการ รหัสคำร้อง {reqId}</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button
                onClick={props.onHide}
                variant="outline-secondary"
                className="flex-grow-1 me-2"
                id="modal-cancel"
              >
                ยกเลิก
              </Button>
              <Button
                onClick={() => approvedRequest()}
                variant="success"
                className="flex-grow-1"
                id="modal-approve"
              >
                อนุมัติ
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {modalStatus === "denied" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div>
                <h4>ยืนยันหรือไม่</h4>
                <p>คุณแน่ใจหรือไม่ที่จะไม่อนุมัติรายการ รหัสคำร้อง {reqId}</p>
                <Form.Group className="mb-3">
                  <Form.Label>หมายเหตุ</Form.Label>
                  <Form.Control
                    type="text"
                    ref={remark}
                    required
                    id="modal-remark"
                  />
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button
                onClick={props.onHide}
                variant="outline-secondary"
                className="flex-grow-1 me-2"
                id="modal-cancel"
              >
                ยกเลิก
              </Button>
              <Button
                onClick={() => deniedRequest()}
                variant="danger"
                className="flex-grow-1"
                id="modal-deny"
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
        actived="reim"
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
                onClick={() => navigate("/hr/Reimbursement/requests")}
                className="back-button"
                id="back"
              >
                <MdArrowBackIosNew /> กลับหน้าคำร้อง
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                รายละเอียดรหัสคำร้อง {reqId}
                <h6 className="mx-3 mt-2">
                  {requestReimbursementData.status === "pending" ? (
                    <Badge pill bg="warning">
                      รออนุมัติ
                    </Badge>
                  ) : requestReimbursementData.status === "approved" ? (
                    <Badge pill bg="success">
                      อนุมัติ
                    </Badge>
                  ) : requestReimbursementData.status === "denied" ? (
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
                        {requestReimbursementData.createdAt
                          ? requestReimbursementData.createdAt
                              .toString()
                              .split("T")[0]
                          : "ไม่มีข้อมูล"}
                      </p>
                      <p>
                        <strong>รหัสคำร้อง:</strong>{" "}
                        {requestReimbursementData.reqId}
                      </p>
                      <p>
                        <strong>รหัสคอร์ส:</strong>{" "}
                        {requestReimbursementData.courseId}
                      </p>
                      <div>
                        <strong>จำนวนเงิน (บาท):</strong>{" "}
                      </div>
                      <div>{requestReimbursementData.amount}</div>
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
                        {requestReimbursementData.empId}
                      </p>
                      <p>
                        <strong>ชื่อผู้อบรม:</strong>{" "}
                        {requestReimbursementData.empName}
                      </p>
                      <p>
                        <strong>แผนกที่สังกัด:</strong>{" "}
                        {requestReimbursementData.department}
                      </p>
                      <p>
                        <strong>เลขประจำตัวประชาชน:</strong>{" "}
                        {requestReimbursementData.cardId}
                      </p>
                      <p>
                        <strong>เลขที่บัญชีเงินฝากธนาคาร:</strong>{" "}
                        {requestReimbursementData.bankAccount}
                      </p>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  {requestReimbursementData.status === "pending" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">คำร้องพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestReimbursementData.status === "pending" ? (
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
                                requestReimbursementData.reqId,
                                "approved"
                              )
                            }
                            id="approve"
                          >
                            อนุมัติคำร้อง
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2 request-button"
                            onClick={() =>
                              requestModal(
                                requestReimbursementData.reqId,
                                "denied"
                              )
                            }
                            id="deny"
                          >
                            ไม่อนุมัติคำร้อง
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ) : requestReimbursementData.status === "approved" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">คำร้องพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestReimbursementData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รออนุมัติ
                              </Badge>
                            ) : requestReimbursementData.status ===
                              "approved" ? (
                              <Badge pill bg="success" className="mx-3">
                                อนุมัติ
                              </Badge>
                            ) : requestReimbursementData.status === "denied" ? (
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
                                <Form.Label>วันที่อนุมัติ</Form.Label>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={
                                    requestReimbursementData.createdAt
                                      .toString()
                                      .split("T")[0] || "ไม่มีข้อมูล"
                                  }
                                  id="approved-date"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  ) : requestReimbursementData.status === "denied" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">คำร้องพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestReimbursementData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รออนุมัติ
                              </Badge>
                            ) : requestReimbursementData.status ===
                              "approved" ? (
                              <Badge pill bg="success" className="mx-3">
                                อนุมัติ
                              </Badge>
                            ) : requestReimbursementData.status === "denied" ? (
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
                                <Form.Label>หมายเหตุ</Form.Label>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={
                                    requestReimbursementData.remark ||
                                    "ไม่มีข้อมูล"
                                  }
                                  id="remark"
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
                                    requestReimbursementData.createdAt
                                      .toString()
                                      .split("T")[0] || "ไม่มีข้อมูล"
                                  }
                                  id="approved-date"
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
