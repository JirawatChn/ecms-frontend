import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export const EditEmp = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const { empID } = useParams();

  const [empName, setEmpName] = useState("");
  const [department, setDepartment] = useState("");
  const [cardID, setCardID] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [firstTrainingDate, setFirstTrainingDate] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const updatedEmpName = empName || empData.empName;
  //   const updatedDepartment = department ||  empData.department;
  //   const updatedCardID = cardID ||  empData.cardID;
  //   const updatedTel = tel ||  empData.tel;
  //   const updatedEmail = email ||  empData.email;
  //   const updatedFirstTrainingDate = firstTrainingDate ||  empData.firstTrainingDate;

  //   console.log("empID:", empID);
  //   console.log("empName:", updatedEmpName);
  //   console.log("department:", updatedDepartment);
  //   console.log("cardID:", updatedCardID);
  //   console.log("tel:", updatedTel);
  //   console.log("email:", updatedEmail);
  //   console.log("firstTrainingDate:", updatedFirstTrainingDate);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const dataToSubmit = {};
  
    if (empID) {
      dataToSubmit.empID = empID;
    }
    if (empName) {
      dataToSubmit.empName = empName;
    }
    if (department) {
      dataToSubmit.department = department;
    }
    if (cardID) {
      dataToSubmit.cardID = cardID;
    }
    if (tel) {
      dataToSubmit.tel = tel;
    }
    if (email) {
      dataToSubmit.email = email;
    }
    if (firstTrainingDate) {
      dataToSubmit.firstTrainingDate = firstTrainingDate;
    }
  
    if (Object.keys(dataToSubmit).length > 0) {
      console.log("Data to submit:", dataToSubmit);
    } else {
      console.log("No new data to submit.");
    }
  };
  

  const fetchEmpData = () => {
    const data = {
      empID: "EMP001",
      empName: "HSY",
      department: "Sales",
      cardID: "1000000000000",
      tel: "06612345678",
      email: " johndoe@example.com",
      firstTrainingDate: "2024-10-01",
      expiryDate: "2025-09-30",
      nextExpiryDate: "11 เดือน 30 วัน",
    };
    setEmpData(data);
  };

  const sendData = (id) => {
    navigate(`/hr/emp/details/${id}`);
  };

  useEffect(() => {
    fetchEmpData();
  }, []);

  

  return (
    <div className="wrapper">
      
      <Sidebar actived="emp" iconActive={{ opacity: "100%" }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"พนักงาน"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <Button
                variant="link"
                onClick={() => sendData(empID)}
                className="back-button"
              >
                <MdArrowBackIosNew /> ยกเลิกการแก้ไข
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                แก้ไขรายละเอียดพนักงาน รหัส {empID}
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
                            onChange={(e) => setDepartment(e.target.value)}
                            defaultValue={empData.department}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ชื่อพนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setEmpName(e.target.value)}
                            defaultValue={empData.empName}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            เลขที่ประจําตัวประชาชนของพนักงาน
                          </Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setCardID(e.target.value)}
                            defaultValue={empData.cardID}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อีเมลล์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={empData.email}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>เบอร์โทรศัพท์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setTel(e.target.value)}
                            defaultValue={empData.tel}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>วันที่อบรมครั้งแรก</Form.Label>
                          <Form.Control
                            type="date"
                            onChange={(e) =>
                              setFirstTrainingDate(e.target.value)
                            }
                            defaultValue={empData.firstTrainingDate}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>วันหมดอายุการอบรม</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            value={empData.expiryDate || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อบรมครั้งถัดไปอีก</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            value={empData.nextExpiryDate || "ไม่มีข้อมูล"}
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
