import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Nav,
  Row,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { Topbar } from "../../../components/topbar";
import { Sidebar } from "../../../components/sidebar";
import { ButtonPage } from "../../../components/buttonpages";
import axios from "axios";

export const Course = ({
  itemsPerPage,
  setItemsPerPage,
  PageValue1,
  PageValue2,
  PageValue3,
}) => {
  const navigate = useNavigate();
  const sendData = (id, sid) => {
    navigate(`/hr/course/details/${id}/${sid}`);
  };

  const [courseDataRaw, setCourseDataRaw] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState({
    active: "active",
    ongoing: "",
    all: "",
  });
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [currentLenght, setCurrentLenght] = useState(0);

  const [selectedValue, setSelectedValue] = useState(itemsPerPage);

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedValue(value);
    setItemsPerPage(value); // ปรับค่า showtable เมื่อมีการเลือกค่าใน dropdown
    setCurPage(1); // ให้กลับไปที่หน้าที่ 1 เมื่อเปลี่ยนค่า showtable
    // console.log(value);
  };

  const fetchCourseData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:9999/courses/showcourse",
        {
          headers: {
            authorization: token,
          },
        }
      );
      setCourseDataRaw(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    let selectedItem = [];

    if (status.all === "all") {
      selectedItem = courseDataRaw;
    } else if (status.active === "active") {
      selectedItem = courseDataRaw
        .map((data) => ({
          ...data,
          sessions: data.sessions.filter(
            (session) => session.status === "active"
          ),
        }))
        .filter((data) => data.sessions.length > 0);
    } else if (status.ongoing === "ongoing") {
      selectedItem = courseDataRaw
        .map((data) => ({
          ...data,
          sessions: data.sessions.filter(
            (session) => session.status === "ongoing"
          ),
        }))
        .filter((data) => data.sessions.length > 0);
    }

    setCourseData(selectedItem);

    // 👇 คำนวณจำนวน session รวมทั้งหมดของคอร์สที่เหลืออยู่
    const totalSessions = selectedItem.reduce((acc, course) => {
      return acc + (course.sessions?.length || 0);
    }, 0);

    setAmount(totalSessions); // แก้ตรงนี้
    setCurrentLenght(totalSessions); // ตรงนี้ด้วยถ้าต้องใช้ร่วมกัน
  }, [courseDataRaw, status]);

  useEffect(() => {
    const totalSessions = courseData.reduce((acc, course) => {
      return acc + (course.sessions?.length || 0);
    }, 0);
    setCurrentLenght(totalSessions);
  }, [courseData]);

  useEffect(() => {
    const totalSessions = courseData.reduce((acc, course) => {
      return acc + (course.sessions?.length || 0);
    }, 0);
    setNumPages(Math.ceil(totalSessions / itemsPerPage));
  }, [courseData, itemsPerPage]);

  useEffect(() => {
    if (numPages === 0) {
      setCurPage(0);
    } else {
      if (curPage === 0) {
        setCurPage(1);
      } else if (curPage > numPages) {
        setCurPage(numPages);
      }
    }
  }, [curPage, numPages]);

  const priority = {
    active: 0,
    ongoing: 1,
    complete: 3,
    close: 2,
  };
  
  let indexCounter = 0;
  
  const allSessions = courseData
    .flatMap((course) =>
      course.sessions.map((session) => ({
        courseId: course.courseId,
        courseName: course.courseName,
        session,
      }))
    )
    .sort((a, b) => priority[a.session.status] - priority[b.session.status]);
  
  const tableData = allSessions.map(({ courseId, courseName, session }) => {
    const isInRange =
      indexCounter >= (curPage - 1) * itemsPerPage &&
      indexCounter < curPage * itemsPerPage;
  
    const row = isInRange ? (
      <tr key={`${courseId}-${session.sessionId}`} className="tr-cell">
        <td className="text-center">{indexCounter + 1}</td>
        <td>{courseId}</td>
        <td>{session.sessionId}</td>
        <td>{courseName}</td>
        <td>
          {session.trainingDate
            ? session.trainingDate.toString().split("T")[0]
            : ""}
        </td>
        <td>{session.trainingLocation}</td>
        <td className="text-center">{session.hours}</td>
        <td className="text-center">
          {session.courseLimit - session.courseLeft < 0
            ? 0
            : session.courseLimit - session.courseLeft}
        </td>
        <td className="text-center">
          {session.status === "active" ? (
            <>
              <Button
                size="sm"
                variant="success"
                onClick={() =>
                  changeStatusModal(courseId, session.sessionId, "start")
                }
                id={"start-" + indexCounter}
              >
                เริ่มการอบรม
              </Button>
              <Button
                size="sm"
                className="mx-3"
                variant="danger"
                onClick={() =>
                  changeStatusModal(courseId, session.sessionId, "close")
                }
                id={"close-" + indexCounter}
              >
                ปิดการอบรม
              </Button>
            </>
          ) : session.status === "close" ? (
            <Button
              size="sm"
              variant="success"
              onClick={() =>
                changeStatusModal(courseId, session.sessionId, "active")
              }
              id={"open-" + indexCounter}
            >
              เปิดการอบรม
            </Button>
          ) : session.status === "ongoing" ? (
            <Button
              size="sm"
              variant="success"
              onClick={() =>
                changeStatusModal(courseId, session.sessionId, "complete")
              }
              id={"complete-" + indexCounter}
            >
              อบรมเสร็จสิ้น
            </Button>
          ) : (
            ""
          )}
        </td>
        <td className="text-center">
          {session.status === "active" ? (
            <Badge pill bg="success">
              กำลังเปิด
            </Badge>
          ) : session.status === "close" ? (
            <Badge pill bg="secondary">
              ปิด
            </Badge>
          ) : session.status === "complete" ? (
            <Badge pill bg="primary">
              อบรมเสร็จสิ้น
            </Badge>
          ) : session.status === "ongoing" ? (
            <Badge pill bg="warning">
              กำลังอบรม
            </Badge>
          ) : (
            ""
          )}
        </td>
        <td className="text-center">
          <Button
            variant="link"
            size="sm"
            onClick={() => sendData(courseId, session.sessionId)}
            id={"detail-" + indexCounter}
          >
            เปิด
          </Button>
        </td>
      </tr>
    ) : null;
  
    indexCounter++;
    return row;
  });
  

  const [courseId, setCourseId] = useState({});
  const [sessionId, setSessionId] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState("");

  const changeStatusModal = (id, sid, status) => {
    setModalShow(true);
    setCourseId(id);
    setSessionId(sid);
    setModalStatus(status);
  };

  const completeCourse = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:9999/courses/completecourse",
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
          courseId: courseId,
          sessionId: sessionId,
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
          courseId: courseId,
          sessionId: sessionId,
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
          courseId: courseId,
          sessionId: sessionId,
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
        {modalStatus === "active" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>
                คุณแน่ใจหรือไม่ที่จะเปิดการอบรมรหัส {courseId} รอบ {sessionId}
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
        {modalStatus === "close" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div>
                <h4>ยืนยันหรือไม่</h4>
                <p>
                  คุณแน่ใจหรือไม่ที่จะปิดการอบรมรหัส {courseId} รอบ {sessionId}
                </p>
              </div>
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
        {modalStatus === "start" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div>
                <h4>ยืนยันหรือไม่</h4>
                <p>
                  คุณแน่ใจหรือไม่ที่จะเริ่มการอบรมรหัส {courseId} รอบ{" "}
                  {sessionId}
                </p>
              </div>
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
        {modalStatus === "complete" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div>
                <h4>ยืนยันหรือไม่</h4>
                <p>
                  คุณแน่ใจหรือไม่ที่จะเสร็จสิ้นการอบรมรหัส {courseId} รอบ{" "}
                  {sessionId}
                </p>
              </div>
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
              <div className="h3 fw-bold mb-4">คอร์สอบรม</div>

              <Card bg="primary" className="mt-4 mb-2 shadow-sm">
                <Card bg="dark" text="white" className="mt-3 h4">
                  <Card.Body>จำนวนรายการทั้งหมด {amount} รายการ</Card.Body>
                </Card>
                <Nav variant="underline" className="mx-2" defaultActiveKey="#">
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      onClick={() => setStatus({ active: "active" })}
                      className="text-white"
                      id="active"
                    >
                      กำลังเปิด
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="1"
                      onClick={() => setStatus({ ongoing: "ongoing" })}
                      className="text-white"
                      id="ongoing"
                    >
                      กำลังอบรม
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="2"
                      onClick={() => setStatus({ all: "all" })}
                      className="text-white"
                      id="all"
                    >
                      ทั้งหมด
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Table striped borderless hover className="mt-2">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>รหัสคอร์ส</th>
                      <th>รอบ</th>
                      <th>ชื่อคอร์ส</th>
                      <th>วันที่อบรม</th>
                      <th>สถานที่</th>
                      <th className="text-center">จำนวนชั่วโมง</th>
                      <th className="text-center">จำนวนคน</th>
                      <th></th>
                      <th className="text-center">สถานะ</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length > 0 ? (
                      tableData
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center">
                          ไม่มีคอร์สอบรม
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card>
              <Row>
                <Col className="d-flex justify-content-start">
                  <ButtonPage
                    length={currentLenght}
                    itemsPerPage={itemsPerPage}
                    curPage={curPage}
                    numPages={numPages}
                    setCurPage={setCurPage}
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  <div className="d-flex align-items-center mx-2">
                    จำนวนต่อหน้า
                  </div>
                  <select value={selectedValue} onChange={handleChange}>
                    <option value={PageValue1}>{PageValue1}</option>
                    <option value={PageValue2}>{PageValue2}</option>
                    <option value={PageValue3}>{PageValue3}</option>
                  </select>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
