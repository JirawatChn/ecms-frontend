import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const EditEmp = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const { empId } = useParams();

  const [empName, setEmpName] = useState("");
  const [department, setDepartment] = useState("");
  const [cardId, setCardId] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [firstTrainingDate, setFirstTrainingDate] = useState("");
  const roles = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {};

    if (empId) {
      dataToSubmit.empId = empId;
    }
    if (empName) {
      dataToSubmit.empName = empName;
    }
    if (department) {
      dataToSubmit.department = department;
    }
    if (cardId) {
      dataToSubmit.cardId = cardId;
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
    if (roles) {
      dataToSubmit.roles = roles.current.value;
    }

    if (Object.keys(dataToSubmit).length > 0) {
      const editEmp = async () => {
        const token = localStorage.getItem("token");
        try {
          await axios.post(
            `http://localhost:9999/manageemp/editemp`,
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
      editEmp();
    } else {
      console.log("No new data to submit.");
    }
  };

  const sendData = (id) => {
    navigate(`/hr/emp/details/${id}`);
  };

  useEffect(() => {
    const fetchEmpData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `http://localhost:9999/checkdata/checkempid/`,
          {
            empId: empId,
          },
          {
            headers: {
              "content-type": "application/json",
              authorization: token,
            },
          }
        );
        setEmpData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmpData();
  }, [empId]);

  useEffect(() => {
    if (empData.roles) {
      setSelectedRole(empData.roles);
    }
  }, [empData]);

  const [selectedRole, setSelectedRole] = useState("Emp");

  const roleChange = (e) => {
    setSelectedRole(e.target.value);
  };

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
                onClick={() => sendData(empId)}
                className="back-button"
                id="back"
              >
                <MdArrowBackIosNew /> ยกเลิกการแก้ไข
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                แก้ไขรายละเอียดพนักงาน รหัส {empId}
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
                            value={empData.empId || "ไม่มีข้อมูล"}
                            id="empId"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ฝ่ายหรือแผนกที่สังกัด</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setDepartment(e.target.value)}
                            defaultValue={empData.department}
                            id="department"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ชื่อพนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setEmpName(e.target.value)}
                            defaultValue={empData.empName}
                            id="empName"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            เลขที่ประจําตัวประชาชนของพนักงาน
                          </Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setCardId(e.target.value)}
                            defaultValue={empData.cardId}
                            id="cardId"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อีเมลล์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={empData.email}
                            id="email"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>เบอร์โทรศัพท์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setTel(e.target.value)}
                            defaultValue={empData.tel}
                            id="tel"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>วันที่อบรมครั้งแรก</Form.Label>
                          <Form.Control
                          disabled
                            type="date"
                            onChange={(e) =>
                              setFirstTrainingDate(e.target.value)
                            }
                            defaultValue={
                              empData.firstTrainingDate
                                ? empData.firstTrainingDate
                                    .toString()
                                    .split("T")[0]
                                : "ไม่มีข้อมูล"
                            }
                            id="firstTrainingDate"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>วันหมดอายุการอบรม</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            value={
                              empData.expiryDate
                                ? empData.expiryDate.toString().split("T")[0]
                                : "ไม่มีข้อมูล"
                            }
                            id="expiryDate"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อายุการเข้ารับการอบรมรวม</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            value={
                              empData.trainingDuration
                                ? empData.trainingDuration
                                : "ไม่มีข้อมูล"
                            }
                            id="expiryDate"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อบรมครั้งถัดไปอีก</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            value={empData.nextExpiryDate || "ไม่มีข้อมูล"}
                            id="nextExpiryDate"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>สิทธิ์การใช้งาน</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            ref={roles}
                            value={selectedRole}
                            onChange={roleChange}
                            id="roles"
                          >
                            <option value="Emp" id="emp">Emp</option>
                            <option value="Hr" id="hr">Hr</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Container>
                        <Row className="mt-3 d-flex justify-content-end" md={6}>
                          <Button type="submit" id="submit">แก้ไขข้อมูล</Button>
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
