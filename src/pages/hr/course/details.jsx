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
import axios from "axios";

export const CourseDetails = () => {
  const { courseId, sessionId } = useParams();
  const navigate = useNavigate();

  const [courseDataRaw, setCourseDataRaw] = useState({});
  const [courseData, setCourseData] = useState({});

  const sendData = () => {
    navigate(`/hr/course/edit/${courseId}/${sessionId}`);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:9999/courses/coursedetail",
          {
            courseId: courseId,
            sessionId: sessionId,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        setCourseDataRaw(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchCourseData();
  }, [courseId, sessionId]);

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

  const completeCourse = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:9999/courses/completecourse",
        {
          courseId:courseId,
          sessionId:sessionId
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

  const activeCourse = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:9999/courses/opencourse",
        {
          courseId:courseId,
          sessionId:sessionId
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

  const startCourse = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:9999/courses/startcourse",
        {
          courseId:courseId,
          sessionId:sessionId
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

  const closeCourse = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:9999/courses/closecourse",
        {
          courseId:courseId,
          sessionId:sessionId
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
                คุณแน่ใจหรือไม่ที่จะเสร็จสิ้นการอบรม รหัสคอร์ส {courseId} รอบ{" "}
                {sessionId}
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
                คุณแน่ใจหรือไม่ที่จะปิดการอบรม รหัสคอร์ส {courseId} รอบ{" "}
                {sessionId}
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
        {modalStatus === "active" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>
                คุณแน่ใจหรือไม่ที่จะเริ่มการอบรม รหัสคอร์ส {courseId} รอบ{" "}
                {sessionId}
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
                คุณแน่ใจหรือไม่ที่จะเปิดการอบรม รหัสคอร์ส {courseId} รอบ{" "}
                {sessionId}
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
                onClick={() => activeCourse()}
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
                รายละเอียดคอร์สอบรม รหัส {courseId} รอบ {sessionId}
                <h6 className="mx-3 mt-2">
                  {courseData.sessions &&
                    courseData.sessions.length > 0 &&
                    courseData.sessions.map((session) => {
                      return session.status === "ongoing" ? (
                        <Badge pill bg="warning" key={session._id}>
                          กำลังอบรม
                        </Badge>
                      ) : session.status === "complete" ? (
                        <Badge pill bg="primary" key={session._id}>
                          อบรมเสร็จสิ้น
                        </Badge>
                      ) : session.status === "close" ? (
                        <Badge pill bg="secondary" key={session._id}>
                          ปิด
                        </Badge>
                      ) : session.status === "active" ? (
                        <Badge pill bg="success" key={session._id}>
                          กำลังเปิด
                        </Badge>
                      ) : (
                        ""
                      );
                    })}
                </h6>
              </div>
              <Button
                variant="warning"
                className="mb-2 shadow-sm text-white"
                onClick={() => sendData()}
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
                        <strong>รหัสคอร์ส:</strong> {courseData.courseId}
                      </p>
                      <p>
                        <strong>ชื่อคอร์ส:</strong> {courseData.courseName}
                      </p>
                      {courseData.sessions &&
                        courseData.sessions.length > 0 &&
                        courseData.sessions.map((session) => (
                          <div key={session._id}>
                            <p>
                              <strong>รอบ:</strong> {session.sessionId}
                            </p>
                            <p>
                              <strong>จำนวนที่นั่ง:</strong>{" "}
                              {session.courseLimit}
                            </p>
                            <p>
                              <strong>จำนวนชั่วโมงอบรม:</strong> {session.hours}
                            </p>
                            <p>
                              <strong>เวลาอบรม:</strong> {session.periods}
                            </p>
                            <p>
                              <strong>สถานที่อบรม:</strong>{" "}
                              {session.trainingLocation}
                            </p>
                            <p>
                              <strong>วันที่อบรม:</strong>{" "}
                              {session.trainingDate}
                            </p>
                          </div>
                        ))}
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
                        <h6 className="mb-0 mx-3">
                          {courseData.sessions &&
                            courseData.sessions.length > 0 &&
                            courseData.sessions.map((session) => {
                              return session.status === "ongoing" ? (
                                <Badge pill bg="warning" key={session._id}>
                                  กำลังอบรม
                                </Badge>
                              ) : session.status === "complete" ? (
                                <Badge pill bg="primary" key={session._id}>
                                  อบรมเสร็จสิ้น
                                </Badge>
                              ) : session.status === "close" ? (
                                <Badge pill bg="secondary" key={session._id}>
                                  ปิด
                                </Badge>
                              ) : session.status === "active" ? (
                                <Badge pill bg="success" key={session._id}>
                                  กำลังเปิด
                                </Badge>
                              ) : (
                                ""
                              );
                            })}
                        </h6>
                      </div>
                      {courseData.sessions &&
                        courseData.sessions.length > 0 &&
                        courseData.sessions.map((session) =>
                          session.status === "ongoing" ? (
                            <div className="mt-3" key={session._id}>
                              <Button
                                className="request-button"
                                variant="success"
                                onClick={() => requestModal("complete")}
                              >
                                อบรมเสร็จสิ้น
                              </Button>
                          
                            </div>
                          ) : session.status === "active" ? (
                            <div className="mt-3" key={session._id}>
                              <Button
                                className="request-button"
                                variant="success"
                                onClick={() => requestModal("active")}
                              >
                                เริ่มการอบรม
                              </Button>
                              <Button
                                variant="danger"
                                className="mx-2 request-button"
                                onClick={() => requestModal("close")}
                              >
                                ปิดการอบรม
                              </Button>
                            </div>
                          ) : session.status === "close" ? (
                            <div className="mt-3" key={session._id}>
                              <Button
                                className="request-button"
                                variant="success"
                                onClick={() => requestModal("start")}
                              >
                                เปิดการอบรม
                              </Button>
                            </div>
                          ) : (
                            ""
                          )
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
