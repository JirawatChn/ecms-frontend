import { Header } from "../../../components/header";
import { MdArrowBackIosNew } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

export const Reimbursement = ({
  empDataRaw,
  setEmpDataRaw,
  reimbursementDataRaw,
}) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [reimbursementData, setReimbursementData] = useState([]);

  useEffect(() => {
    setReimbursementData(reimbursementDataRaw);
  }, [reimbursementDataRaw]);

  const sendData = (id) => {
    navigate(`/emp/reimbursement/details/${id}`);
  };

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  const tableData = reimbursementData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td className="text-center">{i + 1}</td>
        <td>{data.reqId}</td>
        <td>{data.courseId}</td>
        <td>{data.empId}</td>
        <td className="text-center">
          {data.createdAt.toString().split("T")[0]}
        </td>
        <td className="text-center">{data.amount}</td>
        <td className="text-center">
          {data.status === "approved" ? (
            <Badge pill bg="success">
              อนุมัติ
            </Badge>
          ) : data.status === "denied" ? (
            <Badge pill bg="danger">
              ไม่อนุมัติ
            </Badge>
          ) : data.status === "pending" ? (
            <Badge pill bg="warning">
              รออนุมัติ
            </Badge>
          ) : (
            "ไม่มีข้อมูล"
          )}
        </td>
        <td className="text-center">
          <Button variant="link" onClick={() => sendData(data.reqId)} id={"open-"+i}>
            เปิด
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Header content={"เบิกค่าอบรม"} />
      <div className="mt-3 d-flex justify-content-center">
        <div style={{ width: "80rem" }} className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/emp/dashboard")}
            className="shadow"
            id="back"
          >
            <MdArrowBackIosNew /> กลับสู่หน้าหลัก
          </Button>

          <Card bg="primary" className="mt-2 shadow" text="white">
            <Card bg="dark" text="white" className="mt-3 h4">
              <Card.Body>รายการขอเบิกค่าอบรม</Card.Body>
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
                <Col md={2} className="d-flex justify-content-end">
                  <Button
                    variant="dark"
                    onClick={() => navigate("/emp/reimbursement/request")}
                    id="request"
                  >
                    ส่งคำร้องขอเบิกค่าอบรม
                  </Button>
                </Col>
              </Row>
            </Container>

            <Table striped borderless hover className="mt-2">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>รหัสคำร้อง</th>
                  <th>รหัสคอร์ส</th>
                  <th>รหัสพนักงาน</th>
                  <th className="text-center">วันที่ส่งคำขอ</th>
                  <th className="text-center">จำนวนเงิน (บาท)</th>
                  <th className="text-center">สถานะ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      ไม่มีคำขอเบิกเงิน
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};
