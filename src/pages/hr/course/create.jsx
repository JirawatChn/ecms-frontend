import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router";
import { useRef } from "react";

export const CreateCourse = () => {
  const navigate = useNavigate();

  const courseID = useRef();
  const courseName = useRef();
  const sessionID = useRef();
  const courseLimit = useRef();
  const hours = useRef();
  const periods = useRef()
  const trainingLocation = useRef();
  const trainingDate = useRef();

  const createCourse = () => {
    const newData = {
        courseID:courseID.current.value,
        courseName:courseName.current.value,
        sessionID:sessionID.current.value,
        courseLimit:courseLimit.current.value,
        hours:hours.current.value,
        periods:periods.current.value,
        trainingLocation:trainingLocation.current.value,
        trainingDate:trainingDate.current.value,
    };
    console.log(newData);
  };

  const handleSubmit = () => {
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
              <Button
                variant="link"
                onClick={() => navigate("/hr/course")}
                className="back-button"
              >
                <MdArrowBackIosNew /> กลับหน้าคอร์สอบรม
              </Button>
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
                          <Form.Control type="text" required ref={courseID} />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Label>ชื่อคอร์ส</Form.Label>
                          <Form.Control type="text" ref={courseName} />
                        </Form.Group>
                        <h5 className="mb-3 border-bottom pb-2">รายละเอียดรอบ</h5>
                        <Form.Group className="mb-3">
                          <Form.Label>รหัสรอบ</Form.Label>
                          <Form.Control type="text" required ref={sessionID} disabled value={'S001' || ''}/>
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
                          <Form.Control type="text" ref={periods}  />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>สถานที่อบรม</Form.Label>
                          <Form.Control type="text" ref={trainingLocation} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>วันที่อบรม</Form.Label>
                          <Form.Control type="date" ref={trainingDate} min={new Date().toISOString().split("T")[0]}  />
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
