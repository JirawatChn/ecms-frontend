import { Col, Container, Row } from "react-bootstrap";
import { Header } from "../../components/header";
import Card from "react-bootstrap/Card";
import {
  MdAssignment,
  MdOutlineWifiProtectedSetup,
  MdOutlineAttachMoney,
  MdInsertChart,
  MdAccountCircle,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";

export const Dashboard = ({
  empDataRaw,
  setEmpDataRaw,
  courseDataRaw,
  setCourseDataRaw,
}) => {
  const navigate = useNavigate();

  const [empData, setEmpData] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [courseDetailsRaw, setCourseDetailsRaw] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});

  const fetchCourseDetails = () => {
    const data = 
      {
        courseID: "TLS123",
        applicantID: "APP099",
        courseName: "เตรียมความพร้อมสู่การทำงาน 3",
        trainingDate: "20-10-01",
        completeDate: "20-10-01",
        periods: "10:00-17:00",
        trainingLocation: "มหาวิทยาลัยศรีปทุม บางเขน",
        status: "Pass",
      }
    ;
    setCourseDetailsRaw(data);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(() => {
    setCourseData(courseDataRaw);
  }, [courseDataRaw]);

  useEffect(() => {
    setCourseDetails(courseDetailsRaw);
  }, [courseDetailsRaw]);


  const tableData = courseData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td>{i + 1}</td>
        <td>{data.courseID}</td>
        <td>{data.courseName}</td>
        <td className="text-center">{data.trainingDate}</td>
        <td className="text-center">{data.periods}</td>
        <td>{data.trainingLocation}</td>
      </tr>
    );
  });

  return (
    <div>
      <Header content={"Employee Course Management Systems"} />
      <Container fluid>
        <Row>
          <Col xl="auto">
            <Card
              bg="primary"
              text="white"
              style={{ width: "22rem", borderRadius: "8px" }}
              className="mt-3 shadow"
            >
              <Card.Body>
                <Card.Title className="fw-bold">
                  ID: {empData.empID || "ไม่มีข้อมูล"}
                </Card.Title>
                <p className="fw-bold h5"> {empData.empName || "ไม่มีข้อมูล"}</p>
                <p>
                  แผนก: {empData.department || "ไม่มีข้อมูล"}
                </p>
                <p>หมายเลขโทรศัพท์: {empData.tel || "ไม่มีข้อมูล"}</p>
                <p>อีเมล: {empData.email || "ไม่มีข้อมูล"}</p>
              </Card.Body>
            </Card>
            <Card
              bg="dark"
              text="white"
              style={{ width: "22rem", borderRadius: "8px" }}
              className="mt-3 shadow"
            >
              <Card.Body>
                <Card.Title>การอบรม</Card.Title>
                <p>
                  วันที่อบรมครั้งแรก: {empData.firstTrainingDate || "ไม่มีข้อมูล"}
                </p>
                <p>วันหมดอายุการอบรม: {empData.expiryDate || "ไม่มีข้อมูล"}</p>
                <p>
                  อบรมครั้งถัดไปอีก: {empData.nextExpiryDate || "ไม่มีข้อมูล"}
                </p>
              </Card.Body>
            </Card>
            <Card
              bg="primary"
              text="white"
              style={{ width: "22rem", borderRadius: "8px" }}
              className="mt-3 shadow"
            >
              <Card.Body>
                <Card.Title>ผลลัพธ์การอบรมครั้งล่าสุด</Card.Title>
                <p>รหัสคอร์ส: {courseDetails.courseID || "ไม่มีข้อมูล"}</p>
                <p>ชื่อคอร์ส: {courseDetails.courseName || "ไม่มีข้อมูล"}</p>
                <p>วันที่อบรมสำเร็จ: {courseDetails.trainingDate || "ไม่มีข้อมูล"}</p>
                <div>ผลลัพธ์:</div>
                <div className="h4">
                  {courseDetails.status === "Pass"
                    ? "ผ่าน"
                    : empData.status === "Fail"
                    ? "ไม่ผ่าน"
                    : empData.status === "Processing"
                    ? "กำลังตรวจสอบ"
                    : "ไม่มีข้อมูล"}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* row 2 */}
          <Col>
            <Row className="mt-3">
              <Col xl={1}>
                <Card
                  text="white"
                  className="card-menu-container shadow"
                  style={{
                    "--icon-color": "#B64848",
                    "--icon-hover": "#9b3e3e",
                  }}
                  onClick={() => navigate("/course")}
                >
                  <div className="card-menu-circle">
                    <MdAssignment className="icon" />
                  </div>
                  <div className="card-menu-title">ลงทะเบียนอบรม</div>
                </Card>
              </Col>
              <Col xl={1}>
                <Card
                  text="white"
                  className="card-menu-container shadow"
                  style={{
                    "--icon-color": "#B67248",
                    "--icon-hover": "#9b5f3f",
                  }}
                  onClick={() => navigate("/course/manage")}
                >
                  <div className="card-menu-circle">
                    <MdOutlineWifiProtectedSetup className="icon" />
                  </div>
                  <div className="card-menu-title">
                    เพิ่ม-ถอน
                    <br />
                    คอร์สอบรม
                  </div>
                </Card>
              </Col>
              <Col xl={1}>
                <Card
                  text="white"
                  className="card-menu-container  shadow"
                  style={{
                    "--icon-color": "#77B648",
                    "--icon-hover": "#6a9e3f",
                  }}
                  onClick={() => navigate('/reimbursement')}
                >
                  <div className="card-menu-circle">
                    <MdOutlineAttachMoney className="icon" />
                  </div>
                  <div className="card-menu-title">เบิกค่าอบรม</div>
                </Card>
              </Col>
              <Col xl={1}>
                <Card
                  text="white"
                  className="card-menu-container  shadow"
                  style={{
                    "--icon-color": "#4895B6",
                    "--icon-hover": "#3c7a99",
                  }}
                  onClick={() => navigate("/course/results")}
                >
                  <div className="card-menu-circle">
                    <MdInsertChart className="icon" />
                  </div>
                  <div className="card-menu-title">ผลลัพธ์การอบรม</div>
                </Card>
              </Col>
              <Col xl={1}>
                <Card
                  text="white"
                  className="card-menu-container shadow"
                  style={{
                    "--icon-color": "#4862B6",
                    "--icon-hover": "#3d549b",
                  }}
                  onClick={() => navigate('/emp/details')}
                >
                  <div className="card-menu-circle">
                    <MdAccountCircle className="icon" />
                  </div>
                  <div className="card-menu-title">ข้อมูลพนักงาน</div>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3" style={{ width: "60rem" }}>
              <div>
                <Card bg="primary" text="white" className="shadow">
                  <Card bg="dark" text="white" className="mt-3 h4">
                    <Card.Body>คอร์สอบรมที่ได้ทำการลงทะเบียน</Card.Body>
                  </Card>
                  <Table striped borderless hover className="mt-2">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>รหัสคอร์ส</th>
                        <th>ชื่อคอร์ส</th>
                        <th className="text-center">วันที่อบรม</th>
                        <th className="text-center">เวลา</th>
                        <th>สถานที่</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.length > 0 ? (
                        tableData
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            ไม่มีคอร์สที่ได้ลงทะเบียนไว้
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card>
              </div>
              {/* <div className="d-flex justify-content-end">
                <Button className="mt-1" variant="primary">
                  รายละเอียดเพิ่มเติม
                </Button>
              </div> */}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
