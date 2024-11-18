import { Header } from "../../../components/header";
import { MdArrowBackIosNew } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Badge, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";

export const CourseList = ({ empDataRaw, setEmpDataRaw }) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [courseDataRaw, setCourseDataRaw] = useState([]);
  const [courseData, setCourseData] = useState([]);


  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(()=>{
    setCourseData(courseDataRaw)
  },[courseDataRaw])

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  const fetchCourseData = () => {
    const data = [
      {
        courseID: "ABC100",
        courseName: "เตรียมความพร้อมสู่การทำงาน",
        sessions: [
          {
            sessionID: "S003",
            trainingDate: "26/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-507",
            courseLimit: "50",
            courseLeft: "10",
          },
        ],
      },
      {
        courseID: "ABC101",
        courseName: "เตรียมความพร้อมสู่การทำงาน",
        sessions: [
          {
            sessionID: "S001",
            trainingDate: "24/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-505",
            courseLimit: "50",
            courseLeft: "0",
          },
          {
            sessionID: "S002",
            trainingDate: "25/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-506",
            courseLimit: "50",
            courseLeft: "20",
          },
        ],
      },
      {
        courseID: "ABC102",
        courseName: "เตรียมความพร้อมสู่การทำงาน",
        sessions: [
          {
            sessionID: "S001",
            trainingDate: "24/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-505",
            courseLimit: "50",
            courseLeft: "10",
          },
          {
            sessionID: "S002",
            trainingDate: "24/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-505",
            courseLimit: "50",
            courseLeft: "0",
          },
          {
            sessionID: "S003",
            trainingDate: "24/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-505",
            courseLimit: "50",
            courseLeft: "0",
          },
        ],
      },
      {
        courseID: "ABC103",
        courseName: "เตรียมความพร้อมสู่การทำงาน",
        sessions: [
          {
            sessionID: "S001",
            trainingDate: "24/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-505",
            courseLimit: "50",
            courseLeft: "0",
          },
          {
            sessionID: "S002",
            trainingDate: "25/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-506",
            courseLimit: "50",
            courseLeft: "20",
          },
          {
            sessionID: "S003",
            trainingDate: "26/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-507",
            courseLimit: "50",
            courseLeft: "10",
          },
          {
            sessionID: "S004",
            trainingDate: "24/10/2024",
            periods: "09:00-17:00",
            trainingLocation: "5-505",
            courseLimit: "50",
            courseLeft: "0",
          },
        ],
      },
    ];
    setCourseDataRaw(data);
  };

  const tableData = courseData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td className="text-center">{i + 1}</td>
        <td>{data.courseID}</td>
        <td>{data.courseName}</td>
        <td className="text-end">
          <Button
            variant="primary"
            size="sm"
            onClick={() => showCourseDetails(data.courseID)}
          >
            เลือก
          </Button>
        </td>
      </tr>
    );
  });

  const selectedSessionID = useRef();

  const [modalShow, setModalShow] = useState(false);
  const [courseDetailsData, setCourseDetailsData] = useState({});
  const [sessions, setSessions] = useState([]);
  const [sessionIDData, setSessionsIDData] = useState([]);
  const [selectedCourseID, setSelectedCourseID] = useState({});

  const [selectedSID, setSelectedSID] = useState({});

  const showCourseDetails = async (data) => {
    const newData = courseData.find((item) => item.courseID === data);
    setSelectedCourseID(data);
    if (newData) {
      setCourseDetailsData(newData);
      if (newData.sessions && newData.sessions.length > 0) {
        setSessions(newData.sessions);
      } else {
        setSessions([]);
      }
      const sessionID = newData.sessions.map((item) => item.sessionID);
      // console.log(sessions);
      setSessionsIDData(sessionID);

      setModalShow(true);
    } else {
      console.log("Course not found");
    }
  };

  useEffect(() => {
    if (selectedSessionID.current) {
      selectedSessionID.current.value = "";
    }
  }, [selectedCourseID]);

  const sessionTable = sessionIDData.map((data, i) => {
    const sessionData = sessions.find((item) => item.sessionID === data);

    return (
      <tr key={i + 1}>
        <td className="text-center">
          {sessionData ? (
            sessionData.courseLeft === "0" ? (
              ""
            ) : (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setSelectedSID(data)}
              >
                {data}
              </Button>
            )
          ) : (
            "ไม่มีข้อมูล"
          )}
        </td>

        <td>{sessionData ? sessionData.trainingDate : "ไม่มีข้อมูล"}</td>
        <td className="text-center">
          {sessionData ? sessionData.periods : "ไม่มีข้อมูล"}
        </td>
        <td>{sessionData ? sessionData.trainingLocation : "ไม่มีข้อมูล"}</td>
        <td className="text-center">
          {sessionData ? sessionData.courseLimit : "ไม่มีข้อมูล"}
        </td>
        <td className="text-center">
          {sessionData ? (
            sessionData.courseLeft === "0" ? (
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

  const registerData = (id, sid) => {
    if (selectedSessionID.current.value === "") {
      alert("กรุณาเลือก Sessions");
    } else {
      const newData = {
        courseID: id,
        empID: empData.empID,
        sessions: sid,
      };
      console.log(newData);
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
            รายละเอียดคอร์ส {courseDetailsData.courseID}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Card className="p-3">
              <Row>
                <Col md={3}>
                  <Form>
                    <Form.Label >รอบอบรม</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={
                        typeof selectedSID === "object" && selectedSID !== null
                          ? ""
                          : selectedSID
                      }
                      required
                      ref={selectedSessionID}
                    />
                  </Form>
                </Col>
                <Col md={3}>
                  <Form>
                    <Form.Label >
                      รหัสหลักสูตรการอบรม
                    </Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={courseDetailsData.courseID ?? "ไม่มีข้อมูล"}
                    />
                  </Form>
                </Col>
                <Col md={4}>
                  <Form.Label >ชื่อหลักสูตร</Form.Label>
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
                        courseDetailsData.courseID,
                        selectedSessionID.current.value
                      )
                    }
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
                    value={empData.empID ?? "ไม่มีข้อมูล"}
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
    </div>
  );
};
