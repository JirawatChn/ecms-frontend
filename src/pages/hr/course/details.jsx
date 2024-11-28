import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";

import { useNavigate, useParams } from "react-router";
import { MdArrowBackIosNew, MdEditNote } from "react-icons/md";
import { useEffect, useState } from "react";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";

export const CourseDetails = () => {
  const { courseID, sessionID } = useParams();
  const navigate = useNavigate();

  const [courseDataRaw, setCourseDataRaw] = useState({});
  const [courseData, setCourseData] = useState({});

  const sendData = () =>{
    navigate(`/hr/course/edit/${courseID}/${sessionID}`);
  }

  const fetchCourseData = () => {
    const data = {
      courseID: "TLS123",
      courseName: "เตรียมความพร้อมสู่การทำงาน",
      sessionID: "S001",
      courseLimit: 10,
      hours: 8,
      periods: "9.00-17.00",
      trainingLocation: "5-505",
      trainingDate: "2024-04-01",
      status: "open",
    };
    setCourseDataRaw(data);
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    setCourseData(courseDataRaw);
  }, [courseDataRaw]);

  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState("");

  const requestModal = (status) => {
    setModalShow(true);
    console.log(status);
    setModalStatus(status);
  };

  const completeCourse = () => {
    setModalShow(false);
    window.location.reload();
  };

  const openCourse = () => {
    setModalShow(false);
    window.location.reload();
  };

  const startCourse = () => {
    setModalShow(false);
    window.location.reload();
  };

  const closeCourse = () => {
    setModalShow(false);
    window.location.reload();
  };

  const WarningModal = (props) => {
    return (
      <>
        {modalStatus === "complete" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>
                คุณแน่ใจหรือไม่ที่จะเสร็จสิ้นการอบรม รหัสคอร์ส {courseID} รอบ{" "}
                {sessionID}
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
                onClick={() => completeCourse()}
                variant="success"
                className="flex-grow-1"
              >
                เสร็จสิ้น
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {modalStatus === "close" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>
                คุณแน่ใจหรือไม่ที่จะปิดการอบรม รหัสคอร์ส {courseID} รอบ{" "}
                {sessionID}
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
                onClick={() => closeCourse()}
                variant="danger"
                className="flex-grow-1"
              >
                ปิด
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {modalStatus === "open" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>
                คุณแน่ใจหรือไม่ที่จะเริ่มการอบรม รหัสคอร์ส {courseID} รอบ{" "}
                {sessionID}
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
                onClick={() => startCourse()}
                variant="success"
                className="flex-grow-1"
              >
                เริ่ม
              </Button>
            </Modal.Footer>
          </Modal>
        )}
         {modalStatus === "start" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>
                คุณแน่ใจหรือไม่ที่จะเปิดการอบรม รหัสคอร์ส {courseID} รอบ{" "}
                {sessionID}
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
                onClick={() => openCourse()}
                variant="success"
                className="flex-grow-1"
              >
                เปิด
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
        actived="course"
        iconActive={{ opacity: "100%" }}
        courseCollapse={true}
        highlight={{ textDecoration: "underline" }}
      />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"คอร์สอบรม"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <Button
                variant="link"
                onClick={() => navigate("/hr/course")}
                className="back-button"
              >
                <MdArrowBackIosNew /> กลับหน้าคอร์สอบรม
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                รายละเอียดคอร์สอบรม รหัส {courseID} รอบ {sessionID}
                <h6 className="mx-3 mt-2">
                  {courseData.status === "ongoing" ? (
                    <Badge pill bg="warning">
                      กำลังอบรม
                    </Badge>
                  ) : courseData.status === "complete" ? (
                    <Badge pill bg="primary">
                      อบรมเสร็จสิ้น
                    </Badge>
                  ) : courseData.status === "close" ? (
                    <Badge pill bg="secondary">
                      ปิด
                    </Badge>
                  ) : courseData.status === "open" ? (
                    <Badge pill bg="success">
                      กำลังเปิด
                    </Badge>
                  ) : (
                    ""
                  )}
                </h6>
              </div>
              <Button
                variant="warning"
                className="mb-2 shadow-sm text-white"
                onClick={()=>sendData()}
              >
                <MdEditNote />
                แก้ไขข้อมูล
              </Button>
              <Row className="align-items-stretch">
                <Col>
                  <Card className="h-100 shadow-sm">
                    <div className="p-4">
                      <h5 className="mb-3 border-bottom pb-2">
                        รายละเอียดคอร์ส
                      </h5>
                      <p>
                        <strong>รหัสคอร์ส:</strong> {courseData.courseID}
                      </p>
                      <p>
                        <strong>ชื่อคอร์ส:</strong> {courseData.courseName}
                      </p>
                      <p>
                        <strong>รอบ:</strong> {courseData.sessionID}
                      </p>
                      <p>
                        <strong>จำนวนที่นั่ง:</strong> {courseData.courseLimit}
                      </p>
                      <p>
                        <strong>จำนวนชั่วโมงอบรม:</strong> {courseData.hours}
                      </p>
                      <p>
                        <strong>เวลาอบรม:</strong> {courseData.periods}
                      </p>
                      <p>
                        <strong>สถานที่อบรม:</strong>{" "}
                        {courseData.trainingLocation}
                      </p>
                      <p>
                        <strong>วันที่อบรม:</strong> {courseData.trainingDate}
                      </p>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="mt-3 shadow-sm">
                    <div className="p-4">
                      <div className="d-flex align-items-center ">
                        <h5 className="mb-0">สถานะคอร์ส</h5>
                        <h6 className="mb-0 ">
                          {courseData.status === "ongoing" ? (
                            <Badge pill bg="warning" className="mx-3">
                              กำลังอบรม
                            </Badge>
                          ) : courseData.status === "close" ? (
                            <Badge pill bg="secondary" className="mx-3">
                              ปิด
                            </Badge>
                          ) : courseData.status === "open" ? (
                            <Badge pill bg="success" className="mx-3">
                              กำลังเปิด
                            </Badge>
                          ) : courseData.status === "complete" ? (
                            <Badge pill bg="primary" className="mx-3">
                              อบรมเสร็จสิ้น
                            </Badge>
                          ) : (
                            ""
                          )}
                        </h6>
                      </div>
                      {courseData.status === "ongoing" ? (
                        <div className="mt-3">
                          <Button
                            className="request-button"
                            variant="success"
                            onClick={() =>
                              requestModal("complete")
                            }
                          >
                            อบรมเสร็จสิ้น
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2 request-button"
                            onClick={() =>
                              requestModal("close")
                            }
                          >
                            ปิดการอบรม
                          </Button>
                        </div>
                      ) : courseData.status === "open" ? (
                        <div className="mt-3">
                          <Button
                            className="request-button"
                            variant="success"
                            onClick={() =>
                              requestModal("open")
                            }
                          >
                            เริ่มการอบรม
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2 request-button"
                            onClick={() =>
                              requestModal("close")
                            }
                          >
                            ปิดการอบรม
                          </Button>
                        </div>
                      ) : courseData.status === "close" ? (
                        <div className="mt-3">
                          <Button
                            className="request-button"
                            variant="success"
                            onClick={() =>
                              requestModal("start")
                            }
                          >
                            เปิดการอบรม
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
