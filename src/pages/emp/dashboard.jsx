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
import { useLocation, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";

export const EmpDashboard = ({ empDataRaw, enrollmentDataRaw }) => {
  const navigate = useNavigate();

  const [empData, setEmpData] = useState({});
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [lastResult, setLastResult] = useState({});
  const location = useLocation(); // Current route

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, [location]);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(() => {
    setEnrollmentData(enrollmentDataRaw);
  }, [enrollmentDataRaw]);

  useEffect(() => {
    fetchLastResult();
  }, []);

  const fetchLastResult = async () => {
    const token = localStorage.getItem("token");
    const empId = localStorage.getItem("empId");
    try {
      const response = await axios.post(
        "http://localhost:9999/checkdata/dashboard",
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
      setLastResult(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  // console.log(lastResult);

  const tableData = enrollmentData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td>{i + 1}</td>
        <td>{data.courseId}</td>
        <td className="text-center">{data.sessionId}</td>
        <td>{data.courseName}</td>
        <td className="text-center">
          {data.trainingDate.toString().split("T")[0]}
        </td>
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
                  ID: {empData.empId || "ไม่มีข้อมูล"}
                </Card.Title>
                <p className="fw-bold h5">
                  {" "}
                  {empData.empName || "ไม่มีข้อมูล"}
                </p>
                <p>แผนก: {empData.department || "ไม่มีข้อมูล"}</p>
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
                  วันที่อบรมครั้งแรก:{" "}
                  {empData.firstTrainingDate
                    ? empData.firstTrainingDate.toString().split("T")[0]
                    : "ไม่มีข้อมูล"}
                </p>
                <p>
                  วันหมดอายุการอบรม:{" "}
                  {empData.expiryDate
                    ? empData.expiryDate.toString().split("T")[0]
                    : "ไม่มีข้อมูล"}
                </p>
                <p>
                  อบรมครั้งถัดไปอีก: {empData.nextExpiryDate + " วัน" || "ไม่มีข้อมูล"}
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
                <p>รหัสคอร์ส: {lastResult.courseId || "ไม่มีข้อมูล"}</p>
                <p>ชื่อคอร์ส: {lastResult.courseName || "ไม่มีข้อมูล"}</p>
                <p>
                  วันที่อบรมสำเร็จ:{" "}
                  {lastResult.trainingDate
                    ? lastResult.trainingDate.toString().split("T")[0]
                    : "ไม่มีข้อมูล"}
                </p>
                <div>ผลลัพธ์:</div>
                <div className="h4">
                  {lastResult.status === "pass"
                    ? "ผ่าน"
                    : lastResult.status === "fail"
                    ? "ไม่ผ่าน"
                    : lastResult.status === "pending"
                    ? "กำลังตรวจสอบ"
                    : ""}
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
                  onClick={() => navigate("/emp/course")}
                  id="course"
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
                  onClick={() => navigate("/emp/course/manage")}
                  id="manage"
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
                  onClick={() => navigate("/emp/reimbursement")}
                  id="reimbursement"
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
                  onClick={() => navigate("/emp/trainings")}
                  id="trainings"
                >
                  <div className="card-menu-circle">
                    <MdInsertChart className="icon" />
                  </div>
                  <div className="card-menu-title">การอบรม</div>
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
                  onClick={() => navigate("/emp/details")}
                  id="details"
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
                        <th className="text-center">รอบ</th>
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
                          <td colSpan="7" className="text-center">
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
