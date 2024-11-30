import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export const EditCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({});
  const { courseId, sessionId } = useParams();

  const [courseName, setCourseName] = useState("");
  const [courseLimit, setCourseLimit] = useState("");
  const [hours, setHours] = useState("");
  const [periods, setPeriods] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  const [trainingLocation, setTrainingLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {};

    dataToSubmit.courseId = courseId
    dataToSubmit.sessionId = sessionId

    if (courseName) {
      dataToSubmit.courseName = courseName;
    }
    if (courseLimit) {
      dataToSubmit.courseLimit = courseLimit;
    }
    if (hours) {
      dataToSubmit.hours = hours;
    }
    if (periods) {
      dataToSubmit.periods = periods;
    }
    if (trainingDate) {
      dataToSubmit.trainingDate = trainingDate;
    }
    if (trainingLocation) {
      dataToSubmit.trainingLocation = trainingLocation;
    }

    if (Object.keys(dataToSubmit).length > 0) {
      const editCourse = async () => {
        const token = localStorage.getItem("token");
        try {
          await axios.post(
            `http://localhost:9999/courses/editcourse`,
            dataToSubmit,
            {
              headers: {
                "content-type": "application/json",
                authorization: token,
              },
            }
          );
          window.location.reload();
          navigate(-1);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };
      editCourse();
    } else {
      console.log("No new data to submit.");
    }
  };

  const sendData = () => {
    navigate(`/hr/course/details/${courseId}/${sessionId}`);
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
        setCourseData(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchCourseData();
  }, [courseId, sessionId]);

  return (
    <div className="wrapper">
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
                onClick={() => sendData()}
                className="back-button"
              >
                <MdArrowBackIosNew /> ยกเลิกการแก้ไข
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                แก้ไขรายละเอียดคอร์ส รหัส {courseId} รอบ {sessionId}
              </div>
              <Card className="h-100 shadow-sm">
                <div className="p-4">
                  <h5 className="mb-3 border-bottom pb-2 d-flex">
                    ข้อมูลทั่วไป
                  </h5>
                  <Form onSubmit={handleSubmit}>
                    <Row className="d-flex justify-content-center">
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>รหัสคอร์ส</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            disabled
                            value={courseId || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>รอบ</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            value={sessionId || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ชื่อคอร์ส</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            onChange={(e) => setCourseName(e.target.value)}
                            defaultValue={courseData.courseName}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>จำนวนที่นั่ง</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setCourseLimit(e.target.value)}
                            defaultValue={
                              courseData.sessions?.[0]?.courseLimit || ""
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>จำนวนชั่วโมงอบรม</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setHours(e.target.value)}
                            defaultValue={courseData.sessions?.[0]?.hours || ""}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>เวลาอบรม</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setPeriods(e.target.value)}
                            defaultValue={
                              courseData.sessions?.[0]?.periods || ""
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>สถานที่อบรม</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setTrainingLocation(e.target.value)
                            }
                            defaultValue={
                              courseData.sessions?.[0]?.trainingLocation || ""
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>วันที่อบรม</Form.Label>
                          <Form.Control
                            type="date"
                            onChange={(e) => setTrainingDate(e.target.value)}
                            defaultValue={
                              courseData.sessions?.[0]?.trainingDate ||
                              new Date().toISOString().split("T")[0]
                            }
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </Form.Group>
                      </Col>
                      <Container>
                        <Row className="mt-3 d-flex justify-content-end" md={6}>
                          <Button type="submit">แก้ไขข้อมูล</Button>
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
