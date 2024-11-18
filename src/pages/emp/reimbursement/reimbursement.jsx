import { Header } from "../../../components/header";
import { MdArrowBackIosNew } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

export const Reimbursement = ({ empDataRaw, setEmpDataRaw,reimbursementDataRaw,setReimbursementDataRaw}) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [reimbursementData, setReimbursementData] = useState([]); 

  const sendData = (id) =>{
    navigate(`/emp/reimbursement/details/${id}`);
  }

  useEffect(() => {
    setReimbursementData(reimbursementDataRaw);
  }, [reimbursementDataRaw]);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  const tableData = reimbursementData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td className="text-center">{i + 1}</td>
        <td>{data.requestID}</td>
        <td>{data.courseID}</td>
        <td>{data.empID}</td>
        <td className="text-center">{data.sendDate}</td>
        <td className="text-center">{data.amount}</td>
        <td className="text-center">
          {data.status === "approve"
            ? <Badge pill bg="success">อนุมัติ</Badge>
            : data.status === "deny"
            ? <Badge pill bg="danger">ไม่อนุมัติ</Badge>
            : data.status === "processing"
            ? <Badge pill bg="warning">รออนุมัติ</Badge>
            : "ไม่มีข้อมูล"}
        </td>
        <td className="text-center">
          <Button variant="link" onClick={()=>sendData(data.requestID)}>เปิด</Button>
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
                <Col md={2} className="d-flex justify-content-end">
                  <Button variant="dark" onClick={()=>navigate('/emp/reimbursement/request')}>ส่งคำร้องขอเบิกค่าอบรม</Button>
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
                    <td colSpan="7" className="text-center">
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
