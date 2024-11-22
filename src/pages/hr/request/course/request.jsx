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
import { Sidebar } from "../../../../components/sidebar";
import { Topbar } from "../../../../components/topbar";
import { useEffect, useRef, useState } from "react";
import { ButtonPage } from "../../../../components/buttonpages";
import { MdCheck, MdClear } from "react-icons/md";
import { useNavigate } from "react-router";

export const CourseRequestsList = ({
  itemsPerPage,
  setItemsPerPage,
  PageValue1,
  PageValue2,
  PageValue3,
}) => {
  const navigate = useNavigate();
  const sendData = (id) => {
    navigate(`/hr/withdraw/details/${id}`);
  };

  const [requestCourseDataRaw, setRequestCourseDataRaw] = useState([]);
  const [requestCourseData, setRequestCourseData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState({
    pending: "pending",
    all: "",
  });
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [currentLenght, setCurrentLenght] = useState(0);

  const [selectedValue, setSelectedValue] = useState(itemsPerPage);

  const fetchRequestCourseData = () => {
    const data = [
      {
        requestID: "withdraw-001",
        sessionID: "S001",
        courseID: "TLS123",
        empID: "EMP001",
        empName: "HSY",
        date: "2024-04-01",
        status: "pending",
      },
      {
        requestID: "withdraw-002",
        sessionID: "S001",
        courseID: "TLS123",
        empID: "EMP001",
        empName: "HSY",
        date: "2024-04-01",
        status: "approve",
      },
      {
        requestID: "withdraw-001",
        sessionID: "S001",
        courseID: "TLS123",
        empID: "EMP001",
        empName: "HSY",
        date: "2024-04-01",
        status: "deny",
      },
      {
        requestID: "withdraw-002",
        sessionID: "S001",
        courseID: "TLS123",
        empID: "EMP001",
        empName: "HSY",
        date: "2024-04-01",
        status: "pending",
      },
      {
        requestID: "withdraw-003",
        sessionID: "S001",
        courseID: "TLS123",
        empID: "EMP001",
        empName: "HSY",
        date: "2024-04-01",
        status: "pending",
      },
      {
        requestID: "withdraw-004",
        sessionID: "S001",
        courseID: "TLS123",
        empID: "EMP001",
        empName: "HSY",
        date: "2024-04-01",
        status: "approve",
      },
      {
        requestID: "withdraw-005",
        sessionID: "S001",
        courseID: "TLS123",
        empID: "EMP001",
        empName: "HSY",
        date: "2024-04-01",
        status: "deny",
      },
    ];
    setRequestCourseDataRaw(data);
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedValue(value);
    setItemsPerPage(value); // ปรับค่า showtable เมื่อมีการเลือกค่าใน dropdown
    setCurPage(1); // ให้กลับไปที่หน้าที่ 1 เมื่อเปลี่ยนค่า showtable
    // console.log(value);
  };

  useEffect(() => {
    fetchRequestCourseData();
  }, []);

  useEffect(() => {
    const selectedItem = requestCourseDataRaw.filter((data) => {
      if (status.all === "all") {
        return requestCourseDataRaw;
      }
      return status.pending === data.status;
    });

    setRequestCourseData(selectedItem);
    setAmount(selectedItem.length);
  }, [requestCourseDataRaw, status]);

  useEffect(() => {
    setCurrentLenght(requestCourseData.length);
  }, [requestCourseData]);

  useEffect(() => {
    setNumPages(Math.ceil(requestCourseData.length / itemsPerPage));
  }, [requestCourseData, itemsPerPage]);

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

  const tableData = requestCourseData.map((data, i) => {
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
          <td className="text-center">{data.date}</td>
          <td className="text-center">
            {data.status === "pending" ? (
              <Badge pill bg="warning">
                รออนุมัติ
              </Badge>
            ) : data.status === "approve" ? (
              <Badge pill bg="success">
                อนุมัติ
              </Badge>
            ) : data.status === "deny" ? (
              <Badge pill bg="danger">
                ไม่อนุมัติ
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
                onClick={() => requestModal(data.requestID, "approve")}
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
                onClick={() => requestModal(data.requestID, "deny")}
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

  const [requestID, setRequestID] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalStatus, setModalStatus] = useState("");

  const requestModal = (id, status) => {
    setModalShow(true);
    setRequestID(id);
    setModalStatus(status);
  };

  const approveRequest = () => {
    setModalShow(false);
    window.location.reload();
  };

  const remark = useRef()

  const denyRequest = () => {
    if(remark.current.value === ""){
      alert('กรุณากรอกหมายเหตุ')
    }else{
      // console.log(remark.current.value);
    }
    setModalShow(false);
  };

  const WarningModal = (props) => {
    return (
      <>
        {modalStatus === "approve" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>คุณแน่ใจหรือไม่ที่จะอนุมัติรายการ รหัสคำร้อง {requestID}</p>
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
                onClick={() => approveRequest()}
                variant="success"
                className="flex-grow-1"
              >
                อนุมัติ
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {modalStatus === "deny" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
            <div>
                <h4>ยืนยันหรือไม่</h4>
                <p>
                  คุณแน่ใจหรือไม่ที่จะไม่อนุมัติรายการ รหัสคำร้อง {requestID}
                </p>
                <Form.Group className="mb-3">
                  <Form.Label>หมายเหตุ</Form.Label>
                  <Form.Control
                    type="text"
                    ref={remark}
                    required
                  />
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
                onClick={() => denyRequest()}
                variant="danger"
                className="flex-grow-1"
              >
                ไม่อนุมัติ
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
      <Sidebar
        actived="withdraw"
        collapse={true}
        highlight={{ textDecoration: "underline" }}
        iconActive={{ opacity: "100%" }}
      />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"คำร้องพนักงาน"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <div className="h3 fw-bold mb-4">คำร้องขอถอนคอร์สอบรม</div>

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
                      รออนุมัติ
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
                      <th>ชื่อผู้ขอ</th>
                      <th className="text-center">วันส่งคำร้อง</th>
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
                        <td colSpan="10" className="text-center">
                          ไม่มีคำร้องขอถอนคอร์สอบรม
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
