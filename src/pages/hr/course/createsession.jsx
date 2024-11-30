import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const CreateSession = () => {
  const navigate = useNavigate();

  const sessionId = useRef();
  const courseLimit = useRef();
  const hours = useRef();
  const trainingLocation = useRef();
  const trainingDate = useRef();
  const periods = useRef();
  const courseId = useRef();

  const [courseData, setCourseData] = useState([]);

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
      setCourseData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    const courseArray = courseData.map((course) => ({
      courseId: course.courseId,
      courseName: course.courseName,
      sessions: course.sessions.map((session) => session.sessionId),
    }));

    setSelectCourseId(courseArray);
  }, [courseData]);

  const [selectCourseId, setSelectCourseId] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [newSession, setNewSession] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    setSelectedCourse(selectedValue);

    const selectedCourseData = selectCourseId.find(
      (course) => course.courseId === selectedValue
    );

    if (selectedCourseData) {
      const nextSession =
        "S" +
        (selectedCourseData.sessions.length + 1).toString().padStart(3, "0");
      setNewSession(nextSession);
    } else {
      setNewSession("");
    }
  };
  const createSession = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:9999/courses/addsession`,
        {
          courseId: courseId.current.value,
          sessionId: sessionId.current.value,
          trainingDate: trainingDate.current.value,
          trainingLocation: trainingLocation.current.value,
          periods: periods.current.value,
          hours: hours.current.value,
          courseLimit: courseLimit.current.value,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        }
      );
      navigate("/hr/course/");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      couresId: courseId.current.value,
      sessionId: sessionId.current.value,
      trainingDate: trainingDate.current.value,
      trainingLocation: trainingLocation.current.value,
      periods: periods.current.value,
      hours: hours.current.value,
      courseLimit: courseLimit.current.value,
    });

    createSession();
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
                onClick={() => navigate("/hr/course/create/course")}
                className="back-button"
              >
                <MdArrowBackIosNew /> กลับหน้าสร้างคอร์สอบรม
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
                            ref={courseId}
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
                            ref={sessionId}
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
                          <Form.Label>เวลาอบรม</Form.Label>
                          <Form.Control type="number" ref={periods} />
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
