import { Header } from "../../../components/header";
import { MdArrowBackIosNew } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Badge, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { AlertToast } from "../../../components/toast";

export const CourseList = ({ empDataRaw, setEmpDataRaw }) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [courseDataRaw, setCourseDataRaw] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    setCourseData(courseDataRaw);
  }, [courseDataRaw]);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  const fetchCourseData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:9999/courses/browse", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      setCourseDataRaw(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const tableData = courseData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td className="text-center">{i + 1}</td>
        <td id={"courseId-" + i}>{data.courseId}</td>
        <td id={"courseName-" + i}>{data.courseName}</td>
        <td className="text-end">
          <Button
            variant="primary"
            size="sm"
            onClick={() => showCourseDetails(data.courseId)}
            id={"open-" + i}
          >
            เลือก
          </Button>
        </td>
      </tr>
    );
  });

  const selectedSessionId = useRef();

  const [modalShow, setModalShow] = useState(false);
  const [courseDetailsData, setCourseDetailsData] = useState({});
  const [sessions, setSessions] = useState([]);
  const [sessionIdData, setSessionsIdData] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState({});

  const [selectedSId, setSelectedSId] = useState({});

  const showCourseDetails = async (data) => {
    const newData = courseData.find((item) => item.courseId === data);
    setSelectedCourseId(data);
    if (newData) {
      setCourseDetailsData(newData);
      if (newData.sessions && newData.sessions.length > 0) {
        setSessions(newData.sessions);
      } else {
        setSessions([]);
      }
      const sessionId = newData.sessions.map((item) => item.sessionId);
      // console.log(sessions);
      setSessionsIdData(sessionId);
      setModalShow(true);
    } else {
      console.log("Course not found");
    }
  };

  useEffect(() => {
    if (selectedSessionId.current) {
      selectedSessionId.current.value = "";
    }
  }, [selectedCourseId]);

  const sessionTable = sessionIdData.map((data, i) => {
    const sessionData = sessions.find((item) => item.sessionId === data);

    return (
      <tr key={i + 1}>
        <td className="text-center">
          {sessionData ? (
            sessionData.courseLeft === 0 ? (
              ""
            ) : (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setSelectedSId(data)}
                id={"select-" + i}
              >
                {data}
              </Button>
            )
          ) : (
            "ไม่มีข้อมูล"
          )}
        </td>

        <td>
          {sessionData
            ? sessionData.trainingDate.toString().split("T")[0]
            : "ไม่มีข้อมูล"}
        </td>
        <td className="text-center">
          {sessionData ? sessionData.periods : "ไม่มีข้อมูล"}
        </td>
        <td>{sessionData ? sessionData.trainingLocation : "ไม่มีข้อมูล"}</td>
        <td className="text-center">
          {sessionData ? sessionData.courseLimit : "ไม่มีข้อมูล"}
        </td>
        <td className="text-center">
          {sessionData ? (
            sessionData.courseLeft === 0 ? (
              <Badge pill bg="danger">
                เต็ม
              </Badge>
            ) : (
              sessionData.courseLeft
            )
          ) : (
            "ไม่มีข้อมูล"
          )}
        </td>
      </tr>
    );
  });
  const [toastText, setToastText] = useState("");

  const registerData = async (id, sid) => {
    if (selectedSessionId.current.value === "") {
      setToastText("กรุณาเลือก Sessions");
    } else {
      const token = localStorage.getItem("token");
      const empId = localStorage.getItem("empId");
      try {
        const response = await axios.post(
          "http://localhost:9999/courses/register",
          {
            empId: empId,
            courseId: id,
            sessionId: sid,
          },
          {
            headers: {
              "content-type": "application/json",
              authorization: token,
            },
          }
        );
        console.log(response.data);
        setToastText("ลงทะเบียนสำเร็จ!");

        setTimeout(() => {
          navigate("/emp/dashboard");
          window.location.reload();
        }, 1500);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setToastText("เวลาอบรมซ้ำหรือลงคอร์สอบรมเดิม");
        } else {
          console.error("Error fetching employee data:", error);
          setToastText("เกิดข้อผิดพลาดบางอย่าง");
        }
      }
    }
  };

  const registerCourse = (id, sid) => {
    registerData(id, sid);
    setModalShow(false);
  };

  const CourseDetails = (props) => {
    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            รายละเอียดคอร์ส {courseDetailsData.courseId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Card className="p-3">
              <Row>
                <Col md={3}>
                  <Form>
                    <Form.Label>รอบอบรม</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={
                        typeof selectedSId === "object" && selectedSId !== null
                          ? ""
                          : selectedSId
                      }
                      required
                      ref={selectedSessionId}
                    />
                  </Form>
                </Col>
                <Col md={3}>
                  <Form>
                    <Form.Label>รหัสหลักสูตรการอบรม</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={courseDetailsData.courseId ?? "ไม่มีข้อมูล"}
                    />
                  </Form>
                </Col>
                <Col md={4}>
                  <Form.Label>ชื่อหลักสูตร</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={courseDetailsData.courseName ?? "ไม่มีข้อมูล"}
                  />
                </Col>
                <Col md={2} className="d-flex flex-column justify-content-end">
                  <Button
                    variant="primary"
                    onClick={() =>
                      registerCourse(
                        courseDetailsData.courseId,
                        selectedSessionId.current.value
                      )
                    }
                    id="register"
                  >
                    ลงทะเบียน
                  </Button>
                </Col>
              </Row>
              <Table striped borderless hover className="mt-3">
                <thead>
                  <tr>
                    <th className="text-center"></th>
                    <th>วันที่</th>
                    <th className="text-center">เวลา</th>
                    <th>สถานที่</th>
                    <th className="text-center">จำนวน</th>
                    <th className="text-center">เหลือ</th>
                  </tr>
                </thead>
                <tbody>{sessionTable}</tbody>
              </Table>
            </Card>
          </Container>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div>
      <CourseDetails show={modalShow} onHide={() => setModalShow(false)} />
      <Header content={"รายการคอร์สอบรม"} />
      <div className="mt-3 d-flex justify-content-center">
        <div style={{ width: "80rem" }} className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/emp/dashboard")}
            id="back"
          >
            <MdArrowBackIosNew /> กลับสู่หน้าหลัก
          </Button>
          <Card bg="primary" className="mt-2 shadow" text="white">
            <Card bg="dark" text="white" className="mt-3 h4">
              <Card.Body>รายการคอร์สอบรมที่เปิดให้ลงทะเบียน</Card.Body>
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
                <Col md={2} className="d-flex justify-content-end">
                  <Button
                    variant="dark"
                    onClick={() => navigate("/emp/course/manage")}
                    id="add-remove"
                  >
                    ไปที่หน้าเพิ่ม-ถอน
                  </Button>
                </Col>
              </Row>
            </Container>

            <Table striped borderless hover className="mt-2">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>รหัสคอร์ส</th>
                  <th>ชื่อคอร์ส</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      ไม่มีคอร์สเปิดให้ลงทะเบียน
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
      <AlertToast
        text={toastText}
        onClose={() => setToastText("")}
      />
    </div>
  );
};
