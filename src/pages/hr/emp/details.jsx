import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew, MdEditNote,MdClose   } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export const EmpDetails = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const { empID } = useParams();

  const sendData = (id) => {
    navigate(`/hr/emp/edit/${id}`);
  };

  const deleteEmp = (id) =>{
    const data = {
      empID:id,
      status:'inactive'
    }
    console.log(data);
  }

  useEffect(() => {
    const fetchEmpData = () => {
      const data = 
        {
          empID: "EMP001",
          empName: "HSY",
          department: "Sales",
          firstTrainingDate: "2024-10-01",
          email:"x.x@gmail.com",
          tel:"0000000",
          cardId:"123123",
          status: "active",
        }
      ;
      setEmpData(data);
    };
  
    fetchEmpData();
  }, [empID]);      

  const [modalShow, setModalShow] = useState(false);

  const WarningModal = (props) => {
    return (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>คุณแน่ใจหรือไม่ที่จะลบพนักงาน รหัส {empID}</p>
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
                onClick={() => deleteEmp(empID)}
                variant="danger"
                className="flex-grow-1"
              >
                ลบ
              </Button>
            </Modal.Footer>
          </Modal>
          )}

  return (
    <div className="wrapper">
            <WarningModal show={modalShow} onHide={() => setModalShow(false)} />
      <Sidebar actived="emp" iconActive={{ opacity: "100%" }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"พนักงาน"} />
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
                รายละเอียดพนักงาน รหัส {empID}
              </div>
              <Button variant="warning" className="mb-2 shadow-sm text-white" onClick={()=>sendData(empID)}><MdEditNote />แก้ไขข้อมูล</Button>              
              <Button variant="danger" className="mb-2 shadow-sm text-white mx-2" onClick={()=>setModalShow(true)}><MdClose  />ลบพนักงาน</Button>
              <Card className="h-100 shadow-sm">
                <div className="p-4">
                  <h5 className="mb-3 border-bottom pb-2 d-flex">
                    ข้อมูลทั่วไป
                  </h5>
                  <Row>
                    <Col>
                      <Col md={8}>
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
                    </Col>
                    <Col>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>วันที่อบรมครั้งแรก</Form.Label>
                          <Form.Control
                            type="date"
                            disabled
                            required
                            value={
                              empData.expiryDate
                                ? new Date(empData.firstTrainingDate).toISOString().split("T")[0]
                                : ""
                            }                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>วันหมดอายุการอบรม</Form.Label>
                          <Form.Control
                            type="date"
                            disabled
                            required
                            value={
                              empData.expiryDate
                                ? new Date(empData.expiryDate).toISOString().split("T")[0]
                                : ""
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อบรมครั้งถัดไปอีก</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.nextExpiryDate || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                      </Col>
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
