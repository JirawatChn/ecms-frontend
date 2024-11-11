import { Header } from "../../../components/header";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Badge, Col, Container, Row } from "react-bootstrap";

export const ManageCourse = ({
  registerCourseDataRaw,
  setregisterCourseDataRaw,
  empDataRaw,
  setEmpDataRaw,
}) => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    setEmpData(empDataRaw);
  }, [empDataRaw]);

  useEffect(() => {
    setCourseData(registerCourseDataRaw);
  }, [registerCourseDataRaw]);

  const [course, setCourse] = useState({});

  const deleteCourseModal = (id) => {
    setModalShow(true);
    setCourse({ courseID: id });
  };

  const deleteCourse = () => {
    setModalShow(false);
    window.location.reload();
  };

  const tableData = courseData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td className="text-center">{i + 1}</td>
        <td>{data.courseID}</td>
        <td>{data.courseName}</td>
        <td className="text-center">{data.trainingDate}</td>
        <td className="text-center">{data.periods}</td>
        <td>{data.trainingLocation}</td>
        <td className="text-center">
          {data.status === "withdraw" ? (
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
            onClick={() => deleteCourseModal(data.courseID)}
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
          <h4>ลบหรือไม่</h4>
          <p>คุณแน่ใจหรือไม่ที่จะลบรายการ รหัสคอร์ส {course.courseID}</p>
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
            onClick={() => deleteCourse()}
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
            onClick={() => navigate("/dashboard")}
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
            <Table bordered className="mt-2">
              <thead className="strip-table">
                <tr>
                  <th className="text-center">#</th>
                  <th>รหัสคอร์ส</th>
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
                    <td colSpan={8} className="text-center">
                      ไม่มีคอร์สที่ได้ลงทะเบียนไว้
                    </td>
                  </tr>
                )}
                {tableData.length >= 0 && (
                  <tr className="strip-table">
                    <td colSpan={8}>
                      <Button
                        variant="primary"
                        className="text-decoration-none"
                        onClick={() => navigate("/course")}
                      >
                        + ลงทะเบียนคอร์สเพิ่ม
                      </Button>
                    </td>
                  </tr>
                )}
                {tableData.length > 0 && (
                  <tr>
                    <td colSpan={7}>รวม</td>
                    <td className="text-center">{tableData.length}</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="mx-2 d-flex justify-content-end text-light">
              *คอร์สจะถูกลบหลังผู้มีสิทธิ์ยืนยันการถอน
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
