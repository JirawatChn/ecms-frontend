import { Header } from "../../../components/header";
import { MdArrowBackIosNew } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";

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

  // const fetchReimbursementData = async () =>{
  //   const data = []
  //   setFetchData(data)
  // }

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(() => {
    setReimbursementData(reimbursementDataRaw);
  }, [reimbursementDataRaw]);

  const filteredData = reimbursementData.map((item) => item.courseID);

  const findRequestLenght = reimbursementData.map((item) => item.requestID);
  const requestIDLenght = findRequestLenght.length;

  const createRequestID =
    "reim-" + (requestIDLenght + 1).toString().padStart(3, "0");
  // console.log(createRequestID);



  const requestID = useRef();
  const courseID = useRef();
  const empID = useRef();
  const empName = useRef();
  const department = useRef();
  const cardID = useRef();
  const bankAccount = useRef();
  const amount = useRef();

  const [sendData,setSendData] = useState({})

  const handleSubmit = () => {
    createRequest()
  };
  
  const createRequest = async () =>{
    const newData = {
      requestID: requestID.current.value,
      courseID: courseID.current.value,
      empID: empID.current.value,
      empName: empName.current.value,
      department: department.current.value,
      cardID: cardID.current.value,
      bankAccount: bankAccount.current.value,
      amount: amount.current.value
    };
    setSendData(newData);
    console.log(sendData);
    // sessionStorage.setItem('data',JSON.stringify(newData))
  }

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
                    value={empData.empID ?? "ไม่มีข้อมูล"}
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
                              ref={requestID}
                              value={createRequestID}
                              disabled
                              required
                            />
                          </Col>
                          <Col md={3}>
                            <Form.Label>รหัสคอร์ส</Form.Label>
                            <Form.Select ref={courseID}>
                              {filteredData.map((data, i) => (
                                <option key={i} value={data ?? "ไม่มีข้อมูล"}>
                                  {data}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col md={3}>
                            <Form.Label>รหัสพนักงาน</Form.Label>
                            <Form.Control type="text" ref={empID} disabled value={empData.empID ?? "ไม่มีข้อมูล"} required />
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col md={4}>
                            <Form.Label>ชื่อพนักงาน</Form.Label>
                            <Form.Control type="text" disabled value={empData.empName ?? "ไม่มีข้อมูล"} ref={empName}/>
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
                                  ref={cardID}
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
                                  type="number"
                                  ref={amount}
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
                              <Button type="submit" onClick={() => {}}>
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
