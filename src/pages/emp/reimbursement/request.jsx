import { Header } from "../../../components/header";
import { MdArrowBackIosNew } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import axios from "axios";

export const RequestReimbursement = ({
  empDataRaw,
  setEmpDataRaw,
  reimbursementDataRaw,
  setReimbursementRaw,
}) => {
  const [empData, setEmpData] = useState({});
  const [reimbursementData, setReimbursementData] = useState([]);
  // const [filteredData,setFilteredData] = useState([]);

  const navigate = useNavigate();

  // const fetchEnrollment = async () =>{
  //   const data = []
  //   setFetchData(data)
  // }

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(() => {
    setReimbursementData(reimbursementDataRaw || []);
  }, [reimbursementDataRaw]);

  const [enrollmentData, setEnrollmentData] = useState("");

  useEffect(() => {
    fetchEnrollment();
  }, []);

  const fetchEnrollment = async () => {
    const token = localStorage.getItem("token");
    const empId = localStorage.getItem("empId");
    try {
      const response = await axios.post(
        "http://localhost:9999/checkdata/enrollment/pass",
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
      setEnrollmentData(response.data.data || []);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const filteredData = Array.isArray(enrollmentData)
    ? enrollmentData.map((item) => item.courseId)
    : [];

  const findRequestLenght = reimbursementData.map((item) => item.reqId);
  const reqIdLenght = findRequestLenght.length;

  const createRequestId = "R" + (reqIdLenght + 1).toString().padStart(3, "0");
  // console.log(createRequestId);

  const reqId = useRef();
  const courseId = useRef();
  const empId = useRef();
  const empName = useRef();
  const department = useRef();
  const cardId = useRef();
  const bankAccount = useRef();
  const amount = useRef();

  const handleSubmit = (event) => {
    event.preventDefault(); // ป้องกันไม่ให้ form รีเฟรชหน้า
    createRequest(); // เรียกฟังก์ชันสร้างคำร้อง
  };

  const createRequest = async () => {
    const token = localStorage.getItem("token");
    const empId = localStorage.getItem("empId");
    try {
      await axios.post(
        "http://localhost:9999/reimbursements/requests",
        {
          reqId: reqId.current.value,
          courseId: courseId.current.value,
          amount: amount.current.value,
          empId: empId,
          bankAccount: bankAccount.current.value,
          empName: empName.current.value,
          department: department.current.value,
          cardId: cardId.current.value,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        }
      );
      navigate("/emp/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  return (
    <div>
      <Header content={"เบิกค่าอบรม"} />
      <div className="mt-3 d-flex justify-content-center">
        <div style={{ width: "80rem" }} className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/emp/reimbursement")}
            id="back"
          >
            <MdArrowBackIosNew /> กลับหน้าเบิกค่าอบรม
          </Button>
          <Card bg="primary" className="mt-2" text="white">
            <Card bg="dark" text="white" className="mt-3 h4">
              <Card.Body>ส่งคำร้องขอเบิกค่าอบรม</Card.Body>
            </Card>
            <Container>
              <Row>
                <Col md={10} className="d-flex align-items-center">
                  รหัสพนักงาน:
                  <input
                    disabled
                    value={empData.empId ?? "ไม่มีข้อมูล"}
                    className="mx-1"
                  />
                  ชื่อ:
                  <input
                    disabled
                    value={empData.empName ?? "ไม่มีข้อมูล"}
                    className="mx-1"
                  />
                  แผนก:
                  <input
                    disabled
                    value={empData.department ?? "ไม่มีข้อมูล"}
                    className="mx-1"
                  />
                </Col>
              </Row>
            </Container>
            <Card.Body>
              <Card bg="white">
                <Card.Header className="align-items-center">
                  <p className="h4">รายละเอียดคำขอการเบิก</p>
                </Card.Header>
                <Form onSubmit={handleSubmit}>
                  <ListGroup variant="flush" className="mb-3">
                    <ListGroup.Item>
                      <Container>
                        <Row>
                          <Col md={3}>
                            <Form.Label>รหัสคำขอเบิกเงิน</Form.Label>
                            <Form.Control
                              type="text"
                              ref={reqId}
                              value={createRequestId}
                              disabled
                              required
                            />
                          </Col>
                          <Col md={3}>
                            <Form.Label>รหัสคอร์ส</Form.Label>
                            <Form.Select
                              ref={courseId}
                              id="courseId"
                              required
                              disabled={filteredData.length === 0}
                            >
                              {filteredData.length === 0 ? (
                                <option value="">ไม่มีคอร์สที่ผ่าน</option>
                              ) : (
                                filteredData.map((data, i) => (
                                  <option
                                    key={i}
                                    value={data ?? "ไม่มีข้อมูล"}
                                    id={"courseId-" + i}
                                  >
                                    {data}
                                  </option>
                                ))
                              )}
                            </Form.Select>
                          </Col>
                          <Col md={3}>
                            <Form.Label>รหัสพนักงาน</Form.Label>
                            <Form.Control
                              type="text"
                              ref={empId}
                              disabled
                              value={empData.empId ?? "ไม่มีข้อมูล"}
                              required
                            />
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col md={4}>
                            <Form.Label>ชื่อพนักงาน</Form.Label>
                            <Form.Control
                              type="text"
                              disabled
                              value={empData.empName ?? "ไม่มีข้อมูล"}
                              ref={empName}
                            />
                          </Col>
                          <Col md={4}>
                            <Form.Label>ฝ่ายหรือแผนกที่สังกัด</Form.Label>
                            <Form.Control
                              type="text"
                              disabled
                              value={empData.department ?? "ไม่มีข้อมูล"}
                              ref={department}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col md={4}>
                            <Form.Label>วันที่ส่งคำขอเบิก</Form.Label>
                            <Form.Control
                              type="date"
                              disabled
                              value={formattedDate}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </ListGroup.Item>
                    {/* dd */}
                    <Container className="mt-1">
                      <Row>
                        <Col>
                          <ListGroup.Item variant="dark" className="mt-1">
                            ข้อมูลผู้รับเงิน
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Row>
                              <Col md={4}>
                                <Form.Label>เลขประจำตัวประชาชน</Form.Label>
                                <Form.Control
                                  type="text"
                                  ref={cardId}
                                  id="cardId"
                                  required
                                />
                              </Col>
                              <Col md={4}>
                                <Form.Label>
                                  เลขที่บัญชีเงินฝากธนาคาร
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  ref={bankAccount}
                                  id="bankAccount"
                                  required
                                />
                              </Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item variant="dark" className="mt-3">
                            รายการขอเบิก
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Row>
                              <Col md={4}>
                                <Form.Label>จำนวนเงิน (บาท)</Form.Label>
                                <Form.Control
                                  type="text"
                                  ref={amount}
                                  id="amount"
                                  required
                                />
                              </Col>
                            </Row>
                          </ListGroup.Item>
                          <Container>
                            <Row
                              className="mt-3 d-flex justify-content-end"
                              md={6}
                            >
                              <Button
                                type="submit"
                                id="submit"
                                disabled={filteredData.length === 0}
                              >
                                ส่งคำร้อง
                              </Button>
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </ListGroup>
                </Form>
              </Card>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
