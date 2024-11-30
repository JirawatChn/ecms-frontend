import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Header } from "../../../components/header";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const TrainingHistory = ({ empDataRaw,courseResultDataRaw}) => {
  const navigate = useNavigate();
  const sendData = (id) =>{
    navigate(`/emp/trainings/history/${id}`);
  }

  const [empData, setEmpData] = useState({});
  const [courseResultData, setCourseResultData] = useState([]);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(()=>{
    setCourseResultData(courseResultDataRaw || [])
  },[courseResultDataRaw])

  const tableData = courseResultData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td className="text-center">{i + 1}</td>
        <td>{data.reqId}</td>
        <td>{data.courseId}</td>
        <td>{data.sessionId}</td>
        <td>{data.courseName}</td>
        <td className="text-center">{data.trainingDate.toString().split('T')[0]}</td>
        <td className="text-center">
          {data.status === "pass"
            ? <Badge pill bg="success">ผ่าน</Badge>
            : data.status === "fail"
            ? <Badge pill bg="danger">ไม่ผ่าน</Badge>
            : data.status === "pending"
            ? <Badge pill bg="warning">กำลังตรวจสอบ</Badge>
            : "ไม่มีข้อมูล"}
        </td>
        <td><Button variant="link" size="sm" onClick={()=>sendData(data.reqId)}>เปิด</Button></td>
      </tr>
    );
  });

  return (
    <div>
      <Header content={"ผลลัพธ์การอบรม"} />
      <div className="mt-3 d-flex justify-content-center">
        <div style={{ width: "80rem" }} className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/emp/trainings")}
            className="shadow"
          >
            <MdArrowBackIosNew /> กลับสู่หน้าการอบรม
          </Button>
          <Card bg="primary" text="white" className="mt-2 shadow">
            <Card bg="dark" text="white" className="mt-3 h4">
              <Card.Body>รายการประวัติการอบรม</Card.Body>
            </Card>
            <Container>
              <Row>
                <Col md={10}>
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
            <Table striped borderless hover className="mt-2">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>รหัส</th>
                  <th>รหัสคอร์ส</th>
                  <th>รอบ</th>
                  <th>ชื่อคอร์ส</th>
                  <th className="text-center">วันที่อบรม</th>
                  <th className="text-center">สถานะ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">
                      ไม่มีคอร์สที่เคยอบรม
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
