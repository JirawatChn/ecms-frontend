import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const CreateEmp = () => {
  const navigate = useNavigate();
  const [empAmountRaw, setEmpAmountRaw] = useState();
  const [empAmount, setEmpAmount] = useState();

  const fetchAmountData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:9999/dashboard/dashboard",
        {
          headers: {
            authorization: token,
          },
        }
      );
      setEmpAmountRaw(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchAmountData();
  }, []);

  useEffect(() => {
    if (empAmountRaw && typeof empAmountRaw.allEmps === "number") {
      setEmpAmount(empAmountRaw.allEmps);
    }
  }, [empAmountRaw]);

  const createEmpId = "EMP" + (empAmount + 1).toString().padStart(3, "0");
  //   console.log(createEmpId);

  const empId = useRef();
  const department = useRef();
  const empName = useRef();
  const cardId = useRef();
  const email = useRef();
  const tel = useRef();
  const roles = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const createEmp = async () => {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          `http://localhost:9999/manageemp/createemp`,
          {
            empId: empId.current.value,
            department: department.current.value,
            empName: empName.current.value,
            cardId: cardId.current.value,
            email: email.current.value,
            tel: tel.current.value,
            roles: roles.current.value,
            status: "active",
          },
          {
            headers: {
              "content-type": "application/json",
              authorization: token,
            },
          }
        );
        window.location.reload()
        navigate(-1)
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    createEmp();
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
                onClick={() => navigate("/hr/emp")}
                className="back-button"
              >
                <MdArrowBackIosNew /> กลับหน้าพนักงาน
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                สร้างพนักงานใหม่
              </div>
              <Card className="h-100 shadow-sm">
                <div className="p-4">
                  <h5 className="mb-3 border-bottom pb-2">รายละเอียดพนักงาน</h5>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>รหัสพนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            ref={empId}
                            value={createEmpId}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ฝ่ายหรือแผนกที่สังกัด</Form.Label>
                          <Form.Control type="text" ref={department} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ชื่อพนักงาน</Form.Label>
                          <Form.Control type="text" ref={empName} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            เลขที่ประจําตัวประชาชนของพนักงาน
                          </Form.Label>
                          <Form.Control type="text" required ref={cardId} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อีเมลล์พนักงาน</Form.Label>
                          <Form.Control type="text" required ref={email} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>เบอร์โทรศัพท์พนักงาน</Form.Label>
                          <Form.Control type="text" ref={tel} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>สิทธิ์การใช้งาน</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            ref={roles}
                          >
                            <option value="Emp">Emp</option>
                            <option value="Hr">Hr</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Container>
                        <Row className="mt-3 d-flex justify-content-end" md={6}>
                          <Button type="submit">สร้างพนักงาน</Button>
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
