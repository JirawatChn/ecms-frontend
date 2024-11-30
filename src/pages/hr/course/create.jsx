import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router";
import { useRef } from "react";
import axios from "axios";

export const CreateCourse = () => {
  const navigate = useNavigate();

  const courseId = useRef();
  const courseName = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const createCourse = async () => {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          `http://localhost:9999/courses/createcourse`,
          {
            courseId: courseId.current.value,
            courseName: courseName.current.value,
          },
          {
            headers: {
              "content-type": "application/json",
              authorization: token,
            },
          }
        );
        navigate("/hr/course/create/session");
        window.location.reload();
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    createCourse();
  };

  return (
    <div className="wrapper">
      <Sidebar
        actived="create-course"
        iconActive={{ opacity: "100%" }}
        courseCollapse={true}
        highlight={{ textDecoration: "underline" }}
      />{" "}
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"คอร์สอบรม"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <div className="d-flex justify-content-between">
                <Button
                  variant="link"
                  onClick={() => navigate("/hr/course")}
                  className="back-button d-flex justify-content-start"
                >
                  <MdArrowBackIosNew /> กลับหน้าคอร์สอบรม
                </Button>
                <Button
                  variant="link"
                  onClick={() => navigate("/hr/course/create/session")}
                  className="back-button  d-flex justify-content-end"
                >
                  ไปหน้าสร้างรอบอบรม <MdArrowForwardIos />
                </Button>
              </div>

              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                สร้างคอร์สใหม่
              </div>
              <Card className="h-100 shadow-sm">
                <div className="p-4">
                  <h5 className="mb-3 border-bottom pb-2">รายละเอียดคอร์ส</h5>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>รหัสคอร์ส</Form.Label>
                          <Form.Control type="text" required ref={courseId} />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Label>ชื่อคอร์ส</Form.Label>
                          <Form.Control type="text" ref={courseName} />
                        </Form.Group>
                      </Col>
                      <Container>
                        <Row className="mt-3 d-flex justify-content-end" md={6}>
                          <Button type="submit">สร้างคอร์ส</Button>
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
