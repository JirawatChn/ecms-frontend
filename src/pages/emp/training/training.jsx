import { Card, Col, Container, Row } from "react-bootstrap";
import { Header } from "../../../components/header";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Training = ({ empDataRaw, setEmpDataRaw }) => {
  const navigate = useNavigate();

  const sendData = (id,sid) =>{
    navigate(`request/${id}/${sid}`);
  }

  const [empData, setEmpData] = useState({});
  const [courseDetailsRaw, setCourseDetailsRaw] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);

  const fetchCourseDetails = () => {
    const data = [
      {
        courseID: "TLS121",
        sessionID: "S007",
        courseName: "เตรียมความพร้อมสู่การทำงาน 4",
        trainingDate: "2010-08-01",
        completeDate: "2010-08-01",
        periods: "10:00-17:00",
        trainingLocation: "มหาวิทยาลัยศรีปทุม บางเขน",
        status: "processing",
      },
      {
        courseID: "TLS122",
        sessionID: "S007",
        courseName: "เตรียมความพร้อมสู่การทำงาน 4",
        trainingDate: "2010-08-01",
        completeDate: "2010-08-01",
        periods: "10:00-17:00",
        trainingLocation: "มหาวิทยาลัยศรีปทุม บางเขน",
        status: "processing",
      },
    ];
    setCourseDetailsRaw(data);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(() => {
    setCourseDetails(courseDetailsRaw);
  }, [courseDetailsRaw]);

  const tableData = courseDetails.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td className="text-center">{i + 1}</td>
        <td>{data.courseID}</td>
        <td>{data.sessionID}</td>
        <td>{data.courseName}</td>
        <td>{data.trainingLocation}</td>
        <td className="text-center">{data.trainingDate}</td>
        <td className="text-center">
          <Button size="sm" variant="link" onClick={()=>sendData(data.courseID,data.sessionID)}>
            เปิด
          </Button>
        </td>
      </tr>
    );
  });

  

  return (
    <div>
      <Header content={"ผลลัพธ์การอบรม"} />
      <div className="mt-3 d-flex justify-content-center">
        <div style={{ width: "80rem" }} className="mt-4">
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-primary"
              onClick={() => navigate("/emp/dashboard")}
              className="shadow"
            >
              <MdArrowBackIosNew /> กลับสู่หน้าหลัก
            </Button>
            <Button
              variant="link"
              onClick={() => navigate("/emp/trainings/history")}
              className="ms-auto"
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
