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

  const [requestCourseDataRaw, setRequestCourseDataRaw] = useState([]);
  const [requestCourseData, setRequestCourseData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState({
    open: "open",
    ongoing: "",
    all: "",
  });
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [currentLenght, setCurrentLenght] = useState(0);

  const [selectedValue, setSelectedValue] = useState(itemsPerPage);

  const fetchRequestCourseData = () => {
    const data = [
      {
        courseId: "TLS123",
        courseName: "Leadership Fundamentals",
        sessions: [
          {
            trainingDate: "2023-08-15",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S001",
            status: "open",
          },
        ],
      },
      {
        courseId: "TLS123",
        courseName: "Leadership Fundamentals",
        sessions: [
          {
            trainingDate: "2023-08-15",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S002",
            status: "close",
          },
        ],
      },
      {
        courseId: "TLS123",
        courseName: "Leadership Fundamentals",
        sessions: [
          {
            trainingDate: "2023-08-15",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S003",
            status: "open",
          },
        ],
      },
      {
        courseId: "TLS122",
        courseName: "Leadership Fundamentals",
        sessions: [
          {
            trainingDate: "2023-08-15",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S003",
            status: "ongoing",
          },
        ],
      },
      {
        courseId: "TLS122",
        courseName: "Leadership Fundamentals",
        sessions: [
          {
            trainingDate: "2023-08-15",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S004",
            status: "ongoing",
          },
        ],
      },
      {
        courseId: "TLS121",
        courseName: "Leadership Fundamentals",
        sessions: [
          {
            trainingDate: "2023-08-15",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S003",
            status: "complete",
          },
        ],
      },
      {
        courseId: "TLS121",
        courseName: "Leadership Fundamentals",
        sessions: [
          {
            trainingDate: "2023-08-15",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S001",
            status: "complete",
          },
        ],
      },
    ];
    setRequestCourseDataRaw(data);
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedValue(value);
    setItemsPerPage(value); // ปรับค่า showtable เมื่อมีการเลือกค่าใน dropdown
    setCurPage(1); // ให้กลับไปที่หน้าที่ 1 เมื่อเปลี่ยนค่า showtable
    // console.log(value);
  };

  useEffect(() => {
    fetchRequestCourseData();
  }, []);

  useEffect(() => {
    const selectedItem = requestCourseDataRaw.filter((data) => {
      if (status.all === "all") {
        return true;
      } else if (status.open === "open") {
        return data.sessions.some((session) => session.status === status.open);
      } else if (status.ongoing === "ongoing") {
        return data.sessions.some(
          (session) => session.status === status.ongoing
        );
      }
      return false;
    });

    setRequestCourseData(selectedItem);
    setAmount(selectedItem.length);
  }, [requestCourseDataRaw, status]);

  useEffect(() => {
    setCurrentLenght(requestCourseData.length);
  }, [requestCourseData]);

  useEffect(() => {
    setNumPages(Math.ceil(requestCourseData.length / itemsPerPage));
  }, [requestCourseData, itemsPerPage]);

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

  const tableData = requestCourseData.flatMap((data, i) => {
    const start = (curPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    if (start <= i && i < end) {
      return data.sessions.map((session) => (
        <tr key={`${data.courseId}-${session.sessionId}`} className="tr-cell">
          <td className="text-center">{i + 1}</td>
          <td>{data.courseId}</td>
          <td>{session.sessionId}</td>
          <td>{data.courseName}</td>
          <td>{session.trainingDate}</td>
          <td>{session.trainingLocation}</td>
          <td className="text-center">{session.hours}</td>
          <td className="text-center">
            {session.status === "open" ? (
              <>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() =>
                    changeStatusModal(data.courseId, session.sessionId, "start")
                  }
                >
                  เริ่มการอบรม  
                </Button>
                <Button
                  size="sm"
                  className="mx-3"
                  variant="danger"
                  onClick={() =>
                    changeStatusModal(data.courseId, session.sessionId, "close")
                  }
                >
                  ปิดการอบรม
                </Button>
              </>
            ) : session.status === "close" ? (
              <Button
                size="sm"
                variant="success"
                onClick={() =>
                  changeStatusModal(data.courseId, session.sessionId, "open")
                }
              >
                เปิดการอบรม
              </Button>
            ) : session.status === "ongoing" ? (
              <Button
                size="sm"
                variant="success"
                onClick={() =>
                  changeStatusModal(data.courseId, session.sessionId, "")
                }
              >
                อบรมเสร็จสิ้น
              </Button>
            ) : (
              ""
            )}
          </td>
          <td className="text-center">
            {session.status === "open" ? (
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
              onClick={() => sendData(data.courseId, session.sessionId)}
            >
              เปิด
            </Button>
          </td>
        </tr>
      ));
    }
    return [];
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

  const openCourse = () => {
    setModalShow(false);
    window.location.reload();
  };

  const closeCourse = () => {
    setModalShow(false);
  };

  const startCourse = () => {
    setModalShow(false);
  };


  const WarningModal = (props) => {
    return (
      <>
        {modalStatus === "open" && (
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
                onClick={() => openCourse()}
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
                  คุณแน่ใจหรือไม่ที่จะเริ่มการอบรมรหัส {courseId} รอบ {sessionId}
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
                      onClick={() => setStatus({ open: "open" })}
                      className="text-white"
                    >
                      กำลังเปิด
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="1"
                      onClick={() => setStatus({ ongoing: "ongoing" })}
                      className="text-white"
                    >
                      กำลังอบรม
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="2"
                      onClick={() => setStatus({ all: "all" })}
                      className="text-white"
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
