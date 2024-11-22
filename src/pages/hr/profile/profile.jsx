import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew, MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const ProfileHr = ({empDataRaw,setEmpDataRaw}) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  
  useEffect(()=>{
    setEmpData(empDataRaw)
  },[empDataRaw])

  return (
    <div className="wrapper">
      <Sidebar actived="emp" iconActive={{ opacity: "100%" }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"พนักงาน"} name={empData.empName}/>
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <Button
                variant="link"
                onClick={() => navigate("/hr/emp")}
                className="back-button"
              >
                <MdArrowBackIosNew /> กลับหน้าพนักงาน
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                ข้อมูลส่วนตัว
              </div>
              <Button variant="warning" className="mb-2 shadow-sm text-white" onClick={()=>navigate('/hr/edit/profile')}>
                <MdEditNote />
                แก้ไขข้อมูล
              </Button>
              <Card className="h-100 shadow-sm">
                <div className="p-4">
                  <h5 className="mb-3 border-bottom pb-2 d-flex">
                    ข้อมูลทั่วไป
                  </h5>
                  <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>รหัสพนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.empID || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ฝ่ายหรือแผนกที่สังกัด</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.department || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ชื่อพนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.empName || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            เลขที่ประจําตัวประชาชนของพนักงาน
                          </Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.cardID || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อีเมลล์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.email || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>เบอร์โทรศัพท์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.tel || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
