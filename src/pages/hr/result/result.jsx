import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  Row,
  Table,
} from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { ButtonPage } from "../../../components/buttonpages";
import { useEffect, useRef, useState } from "react";
import { MdCheck, MdClear } from "react-icons/md";
import { useNavigate } from "react-router";

export const Results = ({
  itemsPerPage,
  setItemsPerPage,
  PageValue1,
  PageValue2,
  PageValue3,
}) => {
  const navigate = useNavigate();
  const sendData = (id) => {
    navigate(`/hr/results/details/${id}`);
  };

  const [resultsDataRaw, setResultsDataRaw] = useState([]);
  const [resultsData, setResultsData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [currentLenght, setCurrentLenght] = useState(0);
  const [status, setStatus] = useState({
    pending: "pending",
    all: "",
  });

  const [selectedValue, setSelectedValue] = useState(itemsPerPage);
  const [modalShow, setModalShow] = useState(false);
  const fetchResultsData = () => {
    const data = [
      {
        requestID: "result-001",
        courseID: "TLS123",
        sessionID: "S001",
        empID: "EMP001",
        empName: "HSY",
        traningDate: "2024-04-01",
        completeDate: "2024-5-01",
        amount: "1000",
        status: "pending",
      },
      {
        requestID: "result-001",
        courseID: "TLS123",
        sessionID: "S002",
        empID: "EMP001",
        empName: "HSY",
        traningDate: "2024-04-01",
        completeDate: "2024-5-01",
        amount: "1000",
        status: "pass",
      },
      {
        requestID: "result-001",
        courseID: "TLS123",
        sessionID: "S003",
        empID: "EMP001",
        empName: "HSY",
        traningDate: "2024-04-01",
        completeDate: "2024-5-01",
        amount: "1000",
        status: "fail",
      },
      {
        requestID: "result-001",
        courseID: "TLS123",
        sessionID: "S004",
        empID: "EMP001",
        empName: "HSY",
        traningDate: "2024-04-01",
        completeDate: "2024-5-01",
        amount: "600",
        status: "pending",
      },
      {
        requestID: "result-001",
        courseID: "TLS123",
        sessionID: "S005",
        empID: "EMP001",
        empName: "HSY",
        traningDate: "2024-04-01",
        completeDate: "2024-5-01",
        amount: "1000",
        status: "pending",
      },
      {
        requestID: "result-001",
        courseID: "TLS123",
        sessionID: "S006",
        empID: "EMP001",
        empName: "HSY",
        traningDate: "2024-04-01",
        completeDate: "2024-5-01",
        amount: "1000",
        status: "pass",
      },
      {
        requestID: "result-001",
        courseID: "TLS123",
        sessionID: "S007",
        empID: "EMP001",
        empName: "HSY",
        traningDate: "2024-04-01",
        completeDate: "2024-5-01",
        amount: "1000",
        status: "fail",
      },
    ];
    setResultsDataRaw(data);
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedValue(value);
    setItemsPerPage(value); // ปรับค่า showtable เมื่อมีการเลือกค่าใน dropdown
    setCurPage(1); // ให้กลับไปที่หน้าที่ 1 เมื่อเปลี่ยนค่า showtable
    // console.log(value);
  };

  useEffect(() => {
    fetchResultsData();
  }, []);

  useEffect(() => {
    const selectedItem = resultsDataRaw.filter((data) => {
      if (status.all === "all") {
        return resultsDataRaw;
      }
      return status.pending === data.status;
    });

    setResultsData(selectedItem);
    setAmount(selectedItem.length);
  }, [resultsDataRaw, status]);

  useEffect(() => {
    setCurrentLenght(resultsData.length);
  }, [resultsData]);

  useEffect(() => {
    setNumPages(Math.ceil(resultsData.length / itemsPerPage));
  }, [resultsData, itemsPerPage]);

  useEffect(() => {
    if (numPages === 0) {
      setCurPage(0);
    } else {
      if (curPage === 0) {
        setCurPage(1);
      } else if (curPage > numPages) {
        setCurPage(numPages);
      }
    }
  }, [curPage, numPages]);

  const tableData = resultsData.map((data, i) => {
    const start = (curPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    if (start <= i && i < end) {
      return (
        <tr key={i + 1} className="tr-cell">
          <td className="text-center">{i + 1}</td>
          <td>{data.requestID}</td>
          <td>{data.courseID}</td>
          <td>{data.sessionID}</td>
          <td>{data.empID}</td>
          <td>{data.empName}</td>
          <td className="text-center">{data.traningDate}</td>
          <td className="text-center">{data.completeDate}</td>
          <td className="text-center">
            {data.status === "pending" ? (
              <Badge pill bg="warning">
                รอตรวจสอบ
              </Badge>
            ) : data.status === "pass" ? (
              <Badge pill bg="success">
                ผ่าน
              </Badge>
            ) : data.status === "fail" ? (
              <Badge pill bg="danger">
                ไม่ผ่าน
              </Badge>
            ) : (
              ""
            )}
          </td>
          <td className="text-end">
            {data.status === "pending" ? (
              <Button
                variant="success"
                size="sm"
                onClick={() =>
                  requestModal(data.courseID, data.sessionID, "pass")
                }
              >
                <MdCheck />
              </Button>
            ) : (
              ""
            )}
          </td>
          <td className="text-start">
            {data.status === "pending" ? (
              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  requestModal(data.courseID, data.sessionID, "fail")
                }
              >
                <MdClear />
              </Button>
            ) : (
              ""
            )}
          </td>
          <td className="text-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => sendData(data.requestID)}
            >
              เปิด
            </Button>
          </td>
        </tr>
      );
    }
    return null;
  });

  // console.log(resultsData);
  

  const [courseID, setCourseID] = useState({});
  const [sessionID, setSessionID] = useState({});
  const [modalStatus, setModalStatus] = useState("");

  const requestModal = (id, sid, status) => {
    setModalShow(true);
    setCourseID(id);
    setSessionID(sid);
    setModalStatus(status);
  };

  const passRequest = () => {
    setModalShow(false);
    window.location.reload();
  };

  const remark = useRef();

  const failRequest = () => {
    if (remark.current.value === "") {
      alert("กรุณากรอกหมายเหตุ");
    } else {
      window.location.reload();
    }
    setModalShow(false);
  };

  const WarningModal = (props) => {
    return (
      <>
        {modalStatus === "pass" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>
                คุณแน่ใจหรือไม่ที่จะให้ผ่านรายการ รหัสคอร์ส {courseID} รอบ{" "}
                {sessionID}
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
                onClick={() => passRequest()}
                variant="success"
                className="flex-grow-1"
              >
                ผ่าน
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {modalStatus === "fail" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div>
                <h4>ยืนยันหรือไม่</h4>
                <p>
                  คุณแน่ใจหรือไม่ที่จะให้ไม่ผ่านรายการ รหัสคอร์ส {courseID} รอบ{" "}
                  {sessionID}
                </p>
                <Form.Group className="mb-3">
                  <Form.Label>หมายเหตุ</Form.Label>
                  <Form.Control type="text" ref={remark} required />
                </Form.Group>
              </div>
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
                onClick={() => failRequest()}
                variant="danger"
                className="flex-grow-1"
              >
                ไม่ผ่าน
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  };

  return (
    <div className="wrapper">
      <WarningModal show={modalShow} onHide={() => setModalShow(false)} />
      <Sidebar actived="results" iconActive={{ opacity: "100%" }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"ผลลัพธ์การอบรม"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <div className="h3 fw-bold mb-4">ผลลัพธ์การอบรมของพนักงาน</div>

              <Card bg="primary" className="mt-4 mb-2 shadow-sm">
                <Card bg="dark" text="white" className="mt-3 h4">
                  <Card.Body>จำนวนรายการทั้งหมด {amount} รายการ</Card.Body>
                </Card>
                <Nav variant="underline" className="mx-2" defaultActiveKey="#">
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      onClick={() => setStatus({ pending: "pending" })}
                      className="text-white"
                    >
                      รอตรวจสอบ
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="1"
                      onClick={() => setStatus({ all: "all" })}
                      className="text-white"
                    >
                      ทั้งหมด
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Table striped borderless hover className="mt-2">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>รหัสคำร้อง</th>
                      <th>รหัสคอร์ส</th>
                      <th>รอบ</th>
                      <th>รหัสพนักงาน</th>
                      <th>ชื่อผู้อบรม</th>
                      <th className="text-center">วันที่อบรม</th>
                      <th className="text-center">วันที่อบรมสำเร็จ</th>
                      <th className="text-center">สถานะ</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length > 0 ? (
                      tableData
                    ) : (
                      <tr>
                        <td colSpan="12" className="text-center">
                          ไม่มีคำร้องผลลัพธ์การอบรม
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card>
              <Row>
                <Col className="d-flex justify-content-start">
                  <ButtonPage
                    length={currentLenght}
                    itemsPerPage={itemsPerPage}
                    curPage={curPage}
                    numPages={numPages}
                    setCurPage={setCurPage}
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  <div className="d-flex align-items-center mx-2">
                    จำนวนต่อหน้า
                  </div>
                  <select value={selectedValue} onChange={handleChange}>
                    <option value={PageValue1}>{PageValue1}</option>
                    <option value={PageValue2}>{PageValue2}</option>
                    <option value={PageValue3}>{PageValue3}</option>
                  </select>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
