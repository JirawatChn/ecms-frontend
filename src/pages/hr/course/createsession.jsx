import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

export const CreateSession = () => {
  const navigate = useNavigate();

  const sessionID = useRef();
  const courseLimit = useRef();
  const hours = useRef();
  const trainingLocation = useRef();
  const trainingDate = useRef();

  useEffect(() => {
    const data = [
      {
        courseId: "C001",
        courseName: "Leadership Fundamentals",
        sessions: [
          {
            trainingDate: "2023-09-20",
            trainingLocation: "2023-09-20",
            periods: "08:00-17:00",
            hours: 777,
            courseLimit: 877,
            courseLeft: 877,
            sessionId: "S001",
            status: "open",
          },
          {
            trainingDate: "2023-09-20",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S002",
            status: "complete",
          },
          {
            trainingDate: "2023-10-25",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S003",
            status: "active",
          },
        ],
      },
      {
        courseId: "C002",
        courseName: "Leadership Fundamentals",
        sessions: [
          {
            trainingDate: "2023-09-20",
            trainingLocation: "2023-09-20",
            periods: "08:00-17:00",
            hours: 777,
            courseLimit: 877,
            courseLeft: 877,
            sessionId: "S001",
            status: "open",
          },
          {
            trainingDate: "2023-09-20",
            trainingLocation: "Bangkok Training Center",
            periods: "09:00-17:00",
            hours: 8,
            courseLimit: 20,
            courseLeft: 10,
            sessionId: "S002",
            status: "complete",
          },
        ],
      },
    ];
    const courseArray = data.map((course) => ({
      courseId: course.courseId,
      courseName: course.courseName,
      sessions: course.sessions.map((session) => session.sessionId),
    }));

    setSelectCourseId(courseArray);
  }, []);

  const [selectCourseId, setSelectCourseId] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [newSession, setNewSession] = useState("");

  console.log(selectCourseId);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCourse(selectedValue);
  
    const selectedCourseData = selectCourseId.find(
      (course) => course.courseId === selectedValue
    );
  
    if (selectedCourseData) {
      const nextSession = 
        "S" + (selectedCourseData.sessions.length + 1).toString().padStart(3, "0");
      setNewSession(nextSession);
    } else {
      setNewSession(""); // หากไม่พบ courseId ที่เลือก
    }
  };

  const createCourse = () => {
    const newData = {
      sessionID: sessionID.current.value,
      courseLimit: courseLimit.current.value,
      hours: hours.current.value,
      trainingLocation: trainingLocation.current.value,
      trainingDate: trainingDate.current.value,
    };
    console.log(newData);
  };

  const handleSubmit = () => {
    createCourse();
  };

  return (
    <div className="wrapper">
      <Sidebar
        actived="create-session"
        iconActive={{ opacity: "100%" }}
        courseCollapse={true}
        highlight={{ textDecoration: "underline" }}
      />{" "}
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
                สร้างรอบใหม่
              </div>
              <Card className="h-100 shadow-sm">
                <div className="p-4">
                  <h5 className="mb-3 border-bottom pb-2">รายละเอียดคอร์ส</h5>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>คอร์ส</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            value={selectedCourse}
                            required
                            onChange={handleSelectChange}
                          >
                            <option value="">กรุณาเลือกคอร์ส</option>
                            {selectCourseId.map((course) => (
                              <option
                                key={course.courseId}
                                value={course.courseId}
                              >
                                {course.courseId} - {course.courseName}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <h5 className="mb-3 border-bottom pb-2">
                          รายละเอียดรอบ
                        </h5>
                        <Form.Group className="mb-3">
                          <Form.Label>รหัสรอบ</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            ref={sessionID}
                            disabled
                            value={newSession || ""}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>จำนวนที่นั่ง</Form.Label>
                          <Form.Control type="number" ref={courseLimit} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>จำนวนชั่วโมงอบรม</Form.Label>
                          <Form.Control type="number" ref={hours} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>สถานที่อบรม</Form.Label>
                          <Form.Control type="text" ref={trainingLocation} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>วันที่อบรม</Form.Label>
                          <Form.Control
                            type="date"
                            ref={trainingDate}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </Form.Group>
                      </Col>
                      <Container>
                        <Row className="mt-3 d-flex justify-content-end" md={6}>
                          <Button type="submit">สร้างรอบ</Button>
                        </Row>
                      </Container>
                    </Row>
                  </Form>
                </div>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
