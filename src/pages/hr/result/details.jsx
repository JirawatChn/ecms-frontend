import { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { AlertToast } from "../../../components/toast";

export const TrainingResultDetails = () => {
  const { reqId } = useParams();
  const navigate = useNavigate();

  const [requestResultDataRaw, setRequestResultDataRaw] = useState({});
  const [requestResultData, setRequestResultData] = useState({});

  useEffect(() => {
    const fetchRequestData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:9999/courseresult/resultsId",
          { reqId },
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (
          response.data?.message &&
          response.data.message.toLowerCase().includes("not found")
        ) {
          navigate("/notfound");
          return;
        }

        setRequestResultDataRaw(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching request data:", error);
        const msg = error?.response?.data?.message;
        if (msg && msg.toLowerCase().includes("failed")) {
          navigate("/notfound");
        } else {
          navigate("/error");
        }
      }
    };

    if (reqId) {
      fetchRequestData();
    }
  }, [reqId, navigate]);

  useEffect(() => {
    setRequestResultData(requestResultDataRaw);
  }, [requestResultDataRaw]);

  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState("");

  const requestModal = (id, status) => {
    setModalShow(true);
    setModalStatus(status);
  };

  const remark = useRef();

  const passRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:9999/courseresult/pass",
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

  const [toastText, setToastText] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const failRequest = async () => {
    if (remark.current.value === "") {
      setToastText("กรุณากรอกหมายเหตุ");
      setToastVariant("warning");
    } else {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          "http://localhost:9999/courseresult/fail",
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
        {modalStatus === "pass" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>คุณแน่ใจหรือไม่ที่จะให้ผ่านรายการ รหัส {reqId}</p>
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
                onClick={() => passRequest()}
                variant="success"
                className="flex-grow-1"
                id="modal-pass"
              >
                ผ่าน
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {modalStatus === "fail" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div>
                <h4>ยืนยันหรือไม่</h4>
                <p>คุณแน่ใจหรือไม่ที่จะให้ไม่ผ่านรายการ รหัส {reqId}</p>
                <Form.Group className="mb-3">
                  <Form.Label>หมายเหตุ</Form.Label>
                  <Form.Control type="text" ref={remark} required id="remark" />
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
                onClick={() => failRequest()}
                variant="danger"
                className="flex-grow-1"
                id="modal-fail"
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
                id="back"
              >
                <MdArrowBackIosNew /> กลับหน้าผลลัพธ์
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                รายละเอียดการอบรม รหัส {reqId}
                <h6 className="mx-3 mt-2">
                  {requestResultData.status === "pending" ? (
                    <Badge pill bg="warning">
                      รอตรวจสอบ
                    </Badge>
                  ) : requestResultData.status === "pass" ? (
                    <Badge pill bg="success">
                      อนุมัติ
                    </Badge>
                  ) : requestResultData.status === "fail" ? (
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
                            {requestResultData.createdAt
                              ? requestResultData.createdAt
                                  .toString()
                                  .split("T")[0]
                              : "ไม่มีข้อมูล"}
                          </p>
                          <p>
                            <strong>รหัส:</strong> {requestResultData.reqId}
                          </p>
                          <p>
                            <strong>รหัสคอร์ส:</strong>{" "}
                            {requestResultData.courseId}
                          </p>
                          <p>
                            <strong>ชื่อคอร์ส:</strong>{" "}
                            {requestResultData.courseName}
                          </p>
                          <p>
                            <strong>รอบ:</strong> {requestResultData.sessionId}
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>วันที่อบรม:</strong>{" "}
                            {requestResultData.trainingDate
                              ? requestResultData.trainingDate
                                  .toString()
                                  .split("T")[0]
                              : "ไม่มีข้อมูล"}
                          </p>
                          <p>
                            <strong>เวลาอบรม:</strong>{" "}
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
                        <strong>รหัสพนักงาน:</strong> {requestResultData.empId}
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
                            onClick={() => requestModal(reqId, "pass")}
                            id="pass-button"
                          >
                            ผ่าน
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2 request-button"
                            onClick={() => requestModal(reqId, "fail")}
                            id="fail-button"
                          >
                            ไม่ผ่าน
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ) : requestResultData.status === "pass" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">ผลลัพธ์การอบรมพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestResultData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รอตรวจสอบ
                              </Badge>
                            ) : requestResultData.status === "pass" ? (
                              <Badge pill bg="success" className="mx-3">
                                อนุมัติ
                              </Badge>
                            ) : requestResultData.status === "fail" ? (
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
                                    requestResultData.createdAt
                                      .toString()
                                      .split("T")[0] || "ไม่มีข้อมูล"
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  ) : requestResultData.status === "fail" ? (
                    <Card className="mt-3 shadow-sm">
                      <div className="p-4">
                        <div className="d-flex align-items-center ">
                          <h5 className="mb-0">ผลลัพธ์การอบรมพนักงาน</h5>
                          <h6 className="mb-0 ">
                            {requestResultData.status === "pending" ? (
                              <Badge pill bg="warning" className="mx-3">
                                รอตรวจสอบ
                              </Badge>
                            ) : requestResultData.status === "pass" ? (
                              <Badge pill bg="success" className="mx-3">
                                อนุมัติ
                              </Badge>
                            ) : requestResultData.status === "fail" ? (
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
                                    requestResultData.createdAt
                                      .toString()
                                      .split("T")[0] || "ไม่มีข้อมูล"
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
      <AlertToast
        text={toastText}
        variant={toastVariant}
        onClose={() => setToastText("")}
      />
    </div>
  );
};
