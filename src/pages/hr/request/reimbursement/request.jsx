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
import { ButtonPage } from "../../../../components/buttonpages";
import { useEffect, useRef, useState } from "react";
import { MdCheck, MdClear } from "react-icons/md";
import { useNavigate } from "react-router";
import axios from "axios";

export const ReimbursementRequestsList = ({
  itemsPerPage,
  setItemsPerPage,
  PageValue1,
  PageValue2,
  PageValue3,
}) => {
  const navigate = useNavigate();
  const sendData = (id) => {
    navigate(`/hr/reimbursement/details/${id}`);
  };

  const [reimbursementRequestDataRaw, setReimbursementRequestDataRaw] =
    useState([]);
  const [reimbursementRequestData, setReimbursementRequestData] = useState([]);
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

  const fetchReimbursementRequestData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:9999/reimbursement/requests",
        {
          headers: {
            authorization: token,
          },
        }
      );
      setReimbursementRequestDataRaw(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedValue(value);
    setItemsPerPage(value); // ปรับค่า showtable เมื่อมีการเลือกค่าใน dropdown
    setCurPage(1); // ให้กลับไปที่หน้าที่ 1 เมื่อเปลี่ยนค่า showtable
    // console.log(value);
  };

  useEffect(() => {
    fetchReimbursementRequestData();
  }, []);

  useEffect(() => {
    const selectedItem = reimbursementRequestDataRaw.filter((data) => {
      if (status.all === "all") {
        return reimbursementRequestDataRaw;
      }
      return status.pending === data.status;
    });

    setReimbursementRequestData(selectedItem);
    setAmount(selectedItem.length);
  }, [reimbursementRequestDataRaw, status]);

  useEffect(() => {
    setCurrentLenght(reimbursementRequestData.length);
  }, [reimbursementRequestData]);

  useEffect(() => {
    setNumPages(Math.ceil(reimbursementRequestData.length / itemsPerPage));
  }, [reimbursementRequestData, itemsPerPage]);

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

  const tableData = reimbursementRequestData.map((data, i) => {
    const start = (curPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    if (start <= i && i < end) {      
      return (
        <tr key={i + 1} className="tr-cell">
          <td className="text-center">{i + 1}</td>
          <td>{data.reqId}</td>
          <td>{data.courseId}</td>
          <td>{data.empId}</td>
          <td>{data.empName}</td>
          <td className="text-center">{data.createdAt.toString().split('T')[0]}</td>
          <td className="text-center">{data.amount}</td>
          <td className="text-center">
            {data.status === "pending" ? (
              <Badge pill bg="warning">
                รออนุมัติ
              </Badge>
            ) : data.status === "approved" ? (
              <Badge pill bg="success">
                อนุมัติ
              </Badge>
            ) : data.status === "denied" ? (
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
                onClick={() => requestModal(data.reqId, "approved")}
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
                onClick={() => requestModal(data.reqId, "denied")}
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
              onClick={() => sendData(data.reqId)}
            >
              เปิด
            </Button>
          </td>
        </tr>
      );
    }
    return null;
  });    

  const [reqId, setRequestId] = useState({});
  const [modalStatus, setModalStatus] = useState("");
  const remark = useRef()

  const requestModal = (id, status) => {
    setModalShow(true);
    setRequestId(id);
    setModalStatus(status);
  };

  const approvedRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:9999/reimbursement/approved",
        {
          reqId: reqId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
    setModalShow(false);
  };

  const deniedRequest = async () => {
    if (remark.current.value === "") {
      alert("กรุณากรอกหมายเหตุ");
    } else {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          "http://localhost:9999/reimbursement/denied",
          {
            reqId: reqId,
            remark: remark.current.value,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
    setModalShow(false);
  };

  const WarningModal = (props) => {
    return (
      <>
        {modalStatus === "approved" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>ยืนยันหรือไม่</h4>
              <p>คุณแน่ใจหรือไม่ที่จะอนุมัติรายการ รหัสคำร้อง {reqId}</p>
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
                onClick={() => approvedRequest()}
                variant="success"
                className="flex-grow-1"
              >
                อนุมัติ
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {modalStatus === "denied" && (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div>
                <h4>ยืนยันหรือไม่</h4>
                <p>
                  คุณแน่ใจหรือไม่ที่จะไม่อนุมัติรายการ รหัสคำร้อง {reqId}
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
                onClick={() => deniedRequest()}
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
        actived="reim"
        collapse={true}
        highlight={{ textDecoration: "underline" }}
        iconActive={{ opacity: "100%" }}
      />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"คำร้องพนักงาน"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <div className="h3 fw-bold mb-4">คำร้องขอเบิกค่าอบรม</div>

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
                      <th>รหัสพนักงาน</th>
                      <th>ชื่อผู้ขอ</th>
                      <th className="text-center">วันส่งคำร้อง</th>
                      <th className="text-center">จำนวนเงิน (บาท)</th>
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
                        <td colSpan="11" className="text-center">
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
