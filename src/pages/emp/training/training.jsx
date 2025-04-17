import { Card, Col, Container, Row } from "react-bootstrap";
import { Header } from "../../../components/header";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Training = ({ empDataRaw, enrollmentDataRaw}) => {
  const navigate = useNavigate();

  const sendData = (id,sid) =>{
    navigate(`details/${id}/${sid}`);
  }

  const [empData, setEmpData] = useState({});
  const [enrollmentData, setEnrollmentData] = useState([]);


  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(() => {
    setEnrollmentData(enrollmentDataRaw);
  }, [enrollmentDataRaw]);

  const tableData = enrollmentData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td className="text-center">{i + 1}</td>
        <td id={"courseId-"+i}>{data.courseId}</td>
        <td id={"sessionId-"+i}>{data.sessionId}</td>
        <td id={"courseName-"+i}>{data.courseName}</td>
        <td id={"trainingLocation-"+i}>{data.trainingLocation}</td>
        <td id={"trainingDate-"+i} className="text-center">{data.trainingDate.toString().split('T')[0]}</td>
        <td className="text-center">
          <Button size="sm" variant="link" onClick={()=>sendData(data.courseId,data.sessionId)} id={"open-"+i}>
            เปิด
          </Button>
        </td>
      </tr>
    );
  });

  

  return (
    <div>
      <Header content={"การอบรม"} />
      <div className="mt-3 d-flex justify-content-center">
        <div style={{ width: "80rem" }} className="mt-4">
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-primary"
              onClick={() => navigate("/emp/dashboard")}
              className="shadow"
              id="back"
            >
              <MdArrowBackIosNew /> กลับสู่หน้าหลัก
            </Button>
            <Button
              variant="link"
              onClick={() => navigate("/emp/trainings/history")}
              className="ms-auto"
              id="history"
            >
              ประวัติการอบรม
            </Button>
          </div>
          <Card bg="primary" text="white" className="mt-2 shadow">
            <Card bg="dark" text="white" className="mt-3 h4">
              <Card.Body>รายการการอบรม</Card.Body>
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
                  <th>รหัสคอร์ส</th>
                  <th>รอบ</th>
                  <th>ชื่อคอร์ส</th>
                  <th>สถานที่อบรม</th>
                  <th className="text-center">วันที่อบรม</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
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
