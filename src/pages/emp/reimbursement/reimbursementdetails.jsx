import { Header } from "../../../components/header";
import { MdArrowBackIosNew } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";

export const ReimbursementDetails = ({
  empDataRaw,
  setEmpDataRaw,
  reimbursementDataRaw,
  setReimbursementDataRaw,
}) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [reimbursementData, setReimbursementData] = useState([]);
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(() => {
    setReimbursementData(reimbursementDataRaw);
  }, [reimbursementDataRaw]);

  const { requestID } = useParams();

  const fetchReimbursementData = useCallback(() => {
    if (!requestID) return;
    const filteredData = reimbursementData.filter(
      (item) => item.requestID === requestID
    );
    setFilterData(filteredData);
  }, [requestID, reimbursementData]);

  useEffect(() => {
    fetchReimbursementData();
  }, [fetchReimbursementData]);

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
              <Card.Body>
                {filterData.length > 0 ? (
                  filterData.map((item) => (
                    <div key={item.requestID}>
                      <p>รหัสคำขอเบิกเงิน: {item.requestID}</p>
                    </div>
                  ))
                ) : (
                  <p>ไม่มีข้อมูลคำขอเบิกเงิน</p>
                )}
              </Card.Body>{" "}
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
                <ListGroup variant="flush" className="mb-3">
                  <ListGroup.Item>
                    <Container>
                      <Row>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>รหัสคำขอเบิกเงิน</Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  filterData.length > 0
                                    ? filterData
                                        .map((item) => item.requestID)
                                        .join(",")
                                    : "ไม่มีข้อมูล"
                                }
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>รหัสคอร์ส</Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  filterData.length > 0
                                    ? filterData
                                        .map((item) => item.courseID)
                                        .join(",")
                                    : "ไม่มีข้อมูล"
                                }
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={2}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>รหัสพนักงาน</Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  filterData.length > 0
                                    ? filterData
                                        .map((item) => item.empID)
                                        .join(",")
                                    : "ไม่มีข้อมูล"
                                }
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>ชื่อพนักงาน</Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  filterData.length > 0
                                    ? filterData
                                        .map((item) => item.empName)
                                        .join(",")
                                    : "ไม่มีข้อมูล"
                                }
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                        <Col md={4}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>ฝ่ายหรือแผนกที่สังกัด</Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  filterData.length > 0
                                    ? filterData
                                        .map((item) => item.department)
                                        .join(",")
                                    : "ไม่มีข้อมูล"
                                }
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>วันที่ส่งคำขอเบิก</Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  filterData.length > 0
                                    ? filterData
                                        .map((item) => item.sendDate)
                                        .join(",")
                                    : "ไม่มีข้อมูล"
                                }
                                disabled
                              />
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                    </Container>
                  </ListGroup.Item>
                  {/* dd */}
                  <Container className="mt-3">
                    <Row>
                      <Col>
                        <ListGroup.Item variant="dark" className="mt-1">
                          ข้อมูลผู้รับเงิน
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col md={4}>
                              <Form>
                                <Form.Group className="mb-3">
                                  <Form.Label>เลขประจำตัวประชาชน</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={
                                      filterData.length > 0
                                        ? filterData
                                            .map((item) => item.cardID)
                                            .join(",")
                                        : "ไม่มีข้อมูล"
                                    }
                                    disabled
                                  />
                                </Form.Group>
                              </Form>
                            </Col>
                            <Col md={4}>
                              <Form>
                                <Form.Group className="mb-3">
                                  <Form.Label>
                                    เลขที่บัญชีเงินฝากธนาคาร
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                      filterData.length > 0
                                        ? filterData
                                            .map((item) => item.bankAccount)
                                            .join(",")
                                        : "ไม่มีข้อมูล"
                                    }
                                  />
                                </Form.Group>
                              </Form>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item variant="dark" className="mt-3">
                          รายการขอเบิก
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col md={4}>
                              <Form>
                                <Form.Group className="mb-3">
                                  <Form.Label>จำนวนเงิน (บาท)</Form.Label>
                                  <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                      filterData.length > 0
                                        ? filterData
                                            .map((item) => item.amount)
                                            .join(",")
                                        : "ไม่มีข้อมูล"
                                    }
                                  />
                                </Form.Group>
                              </Form>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item variant="dark" className="mt-3">
                          สถานะการเบิก
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col md={4}>
                              <Form>
                                <Form.Group className="mb-3">
                                  <Form.Label>สถานะ</Form.Label>
                                  <Form.Control
                                    type="text"
                                    disabled
                                    value={
                                      filterData.length > 0
                                        ? filterData
                                            .map((item) => item.status)
                                            .join(",")
                                        : "ไม่มีข้อมูล"
                                    }
                                  />
                                </Form.Group>
                              </Form>
                            </Col>
                            <Col md={4}>
                              <Form>
                                {filterData.length > 0 &&
                                filterData.some(
                                  (item) =>
                                    item.approvedDate !== "" &&
                                    item.approvedDate
                                ) ? (
                                  <Form.Group className="mb-3">
                                    <Form.Label>วันที่ยืนยัน</Form.Label>
                                    <Form.Control
                                      type="text"
                                      disabled
                                      value={
                                        filterData.length > 0
                                          ? filterData
                                              .map((item) => item.approvedDate)
                                              .join(",")
                                          : "ไม่มีข้อมูล"
                                      }
                                    />
                                  </Form.Group>
                                ) : null}
                              </Form>
                            </Col>
                            <Col md={4}>
                              <Form>
                                {filterData.length > 0 &&
                                filterData.some(
                                  (item) => item.vertifier !== "" &&
                                  item.vertifier
                                ) ? (
                                  <Form.Group className="mb-3">
                                    <Form.Label>ผู้อนุมัติการเบิก</Form.Label>
                                    <Form.Control
                                      type="text"
                                      disabled
                                      value={
                                        filterData.length > 0
                                          ? filterData
                                              .map((item) => item.vertifier)
                                              .join(",")
                                          : "ไม่มีข้อมูล"
                                      }
                                    />
                                  </Form.Group>
                                ) : (
                                  ""
                                )}
                              </Form>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup>
              </Card>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
