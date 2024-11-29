import { Header } from "../../../components/header";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Badge, Col, Container, Row } from "react-bootstrap";
import axios from "axios";

export const ManageCourse = ({
  enrollmentDataRaw,
  setEnrollmentDataRaw,
  empDataRaw,
  setEmpDataRaw,
}) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [enrollmentData, setEnrollmentData] = useState([]);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(() => {
    setEnrollmentData(enrollmentDataRaw);
  }, [enrollmentDataRaw]);

  const [courseId, setCourseId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const withdrawCourseModal = (id, sid) => {
    setModalShow(true);
    setCourseId(id);
    setSessionId(sid);
  };

  const withdrawCourse = async () => {
    const token = localStorage.getItem("token");
    const empId = localStorage.getItem("empId");
    try {
      const response = await axios.post(
        "http://localhost:9999/checkdata/dashboard",
        {
          empId: empId,
          courseId: courseId,
          sessionId: sessionId,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        }
      );
      setModalShow(false);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const tableData = enrollmentData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td className="text-center">{i + 1}</td>
        <td>{data.courseId}</td>
        <td className="text-center">{data.sessionId}</td>
        <td>{data.courseName}</td>
        <td className="text-center">{data.trainingDate}</td>
        <td className="text-center">{data.periods}</td>
        <td>{data.trainingLocation}</td>
        <td className="text-center">
          {data.status === "pending" ? (
            <Badge pill bg="danger">
              รอยืนยันการถอน
            </Badge>
          ) : (
            ""
          )}
        </td>
        <td className="text-center">
          <Button
            variant="link"
            onClick={() =>
              withdrawCourseModal(data.courseId, data.sessionId)
            }
          >
            ลบ
          </Button>
        </td>
      </tr>
    );
  });

  const [modalShow, setModalShow] = useState(false);
  const WarningModal = (props) => {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>ยืนยันหรือไม่</h4>
          <p>
            คุณแน่ใจหรือไม่ที่จะถอนรายการ รหัสคอร์ส {courseId} รอบ {sessionId}
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            onClick={props.onHide}
            variant="outline-secondary"
            className="flex-grow-1 me-2"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={() => withdrawCourse()}
            variant="primary"
            className="flex-grow-1"
          >
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <WarningModal show={modalShow} onHide={() => setModalShow(false)} />
      <Header content={"เพิ่ม-ถอนคอร์สอบรม"} />
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
              <Card.Body>คอร์สอบรมที่ได้ทำการลงทะเบียน</Card.Body>
            </Card>
            <Container>
              <Row className="d-flex justify-content-start">
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
            <Table bordered className="mt-2">
              <thead className="strip-table">
                <tr>
                  <th className="text-center">#</th>
                  <th>รหัสคอร์ส</th>
                  <th className="text-center">รอบ</th>
                  <th>ชื่อคอร์ส</th>
                  <th className="text-center">วันที่อบรม</th>
                  <th className="text-center">เวลา</th>
                  <th>สถานที่</th>
                  <th className="text-center">สถานะ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center">
                      ไม่มีคอร์สที่ได้ลงทะเบียนไว้
                    </td>
                  </tr>
                )}
                {tableData.length >= 0 && (
                  <tr className="strip-table">
                    <td colSpan={9}>
                      <Button
                        variant="primary"
                        className="text-decoration-none"
                        onClick={() => navigate("/emp/course")}
                      >
                        + ลงทะเบียนคอร์สเพิ่ม
                      </Button>
                    </td>
                  </tr>
                )}
                {tableData.length > 0 && (
                  <tr>
                    <td colSpan={8}>รวม</td>
                    <td className="text-center">{tableData.length}</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="mx-2 d-flex justify-content-end text-light">
              *คอร์สจะถูกลบหลังผู้มีสิทธิ์อนุมัติการถอน
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
