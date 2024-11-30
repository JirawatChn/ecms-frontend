import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { MdArrowBackIosNew, MdEditNote, MdClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export const EmpDetails = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const { empId } = useParams();
  const [status,setStatus] = useState('')

  const sendData = (id) => {
    navigate(`/hr/emp/edit/${id}`);
  };

  const deleteEmp = (id) => {
    console.log(id);
    
    const removeEmp = async () => {
      const token = localStorage.getItem("token");
      try {
       await axios.post(
          `http://localhost:9999/manageemp/removeemp`,
          {
            empId: id,
            status:status
          },
          {
            headers: {
              "content-type": "application/json",
              authorization: token,
            },
          }
        );
        window.location.reload()
        navigate(-1)
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    removeEmp()
  };

  useEffect(() => {
    const fetchEmpData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `http://localhost:9999/checkdata/checkempid/`,
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
        setEmpData(response.data.data[0] || []);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    const fetchCourseData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `http://localhost:9999/checkdata/enrollments`,
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
        setCourseData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchCourseData();
    fetchEmpData();
  }, [empId]);

  useEffect(()=>{
    setStatus(empData.status)
  },[empData])

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
          <p>คุณแน่ใจหรือไม่ที่จะลบพนักงาน รหัส {empId}</p>
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
            onClick={() => deleteEmp(empId)}
            variant="danger"
            className="flex-grow-1"
          >
            ลบ
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const [courseData, setCourseData] = useState([]);

  const tableData = courseData.map((data, i) => {
    return (
      <tr key={i + 1} className="tr-cell">
        <td>{i + 1}</td>
        <td>{data.courseId}</td>
        <td>{data.sessionId}</td>
        <td>{data.courseName}</td>
        <td className="text-center">{data.trainingDate.toString().split('T')[0]}</td>
        <td className="text-center">{data.periods}</td>
        <td>{data.trainingLocation}</td>
      </tr>
    );
  });

  return (
    <div className="wrapper">
      <WarningModal show={modalShow} onHide={() => setModalShow(false)} />
      <Sidebar actived="emp" iconActive={{ opacity: "100%" }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"พนักงาน"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <Button
                variant="link"
                onClick={() => navigate("/hr/emp")}
                className="back-button"
              >
                <MdArrowBackIosNew /> กลับหน้าพนักงาน
              </Button>
              <div className="h3 fw-bold mb-4 d-flex align-items-center">
                รายละเอียดพนักงาน รหัส {empId}
              </div>
              <Button
                variant="warning"
                className="mb-2 shadow-sm text-white"
                onClick={() => sendData(empId)}
              >
                <MdEditNote />
                แก้ไขข้อมูล
              </Button>
              <Button
                variant="danger"
                className="mb-2 shadow-sm text-white mx-2"
                onClick={() => setModalShow(true)}
              >
                <MdClose />
                ลบพนักงาน
              </Button>
              <Card className="h-100 shadow-sm">
                <div className="p-4">
                  <h5 className="mb-3 border-bottom pb-2 d-flex">
                    ข้อมูลทั่วไป
                  </h5>
                  <Row>
                    <Col>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>รหัสพนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.empId || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ฝ่ายหรือแผนกที่สังกัด</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.department || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>ชื่อพนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.empName || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            เลขที่ประจําตัวประชาชนของพนักงาน
                          </Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.cardId || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อีเมลล์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.email || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>เบอร์โทรศัพท์พนักงาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.tel || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>สิทธิ์การใช้งาน</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.roles || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                      </Col>
                    </Col>
                    <Col>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>วันที่อบรมครั้งแรก</Form.Label>
                          <Form.Control
                            type="date"
                            disabled
                            required
                            value={empData.firstTrainingDate ? empData.firstTrainingDate.toString().split('T')[0] : ""}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>วันหมดอายุการอบรม</Form.Label>
                          <Form.Control
                            type="date"
                            disabled
                            required
                            value={empData.expiryDate ? empData.expiryDate.toString().split('T')[0] : ""}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>อบรมครั้งถัดไปอีก</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            required
                            value={empData.nextExpiryDate || "ไม่มีข้อมูล"}
                          />
                        </Form.Group>
                      </Col>
                      <div>คอร์สอบรมที่ได้ทำการลงทะเบียน</div>
                      <Table striped borderless hover className="mt-2">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>รหัสคอร์ส</th>
                            <th>รอบ</th>
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
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
