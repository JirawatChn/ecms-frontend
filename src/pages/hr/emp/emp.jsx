import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Nav,
  Row,
  Table,
} from "react-bootstrap";
import { Sidebar } from "../../../components/sidebar";
import { Topbar } from "../../../components/topbar";
import { ButtonPage } from "../../../components/buttonpages";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const Emp = ({
  itemsPerPage,
  setItemsPerPage,
  PageValue1,
  PageValue2,
  PageValue3,
}) => {
  const navigate = useNavigate();
  const [empDataRaw, setEmpDataRaw] = useState([]);
  const [empData, setEmpData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [currentLenght, setCurrentLenght] = useState(0);

  const sendData = (id) => {
    navigate(`/hr/emp/details/${id}`);
  };

  const [status, setStatus] = useState({
    active: "active",
    all: "",
  });

  const [selectedValue, setSelectedValue] = useState(itemsPerPage);

  const fetchEmpData = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get("http://localhost:9999/checkData/checkEmp", {
        headers: {
          "content-type": "application/json",
          "authorization": token,
        },
      });
        setEmpDataRaw(response.data.data || []);
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
    fetchEmpData();
  }, []);

  useEffect(() => {
    const selectedItem = empDataRaw.filter((data) => {
      if (status.all === "all") {
        return empDataRaw;
      }
      return status.active === data.status; // กรองเฉพาะตามสถานะที่ต้องการ
    });

    setEmpData(selectedItem);
    setAmount(selectedItem.length);
  }, [empDataRaw, status]);

  useEffect(() => {
    setCurrentLenght(empData.length);
  }, [empData]);

  useEffect(() => {
    setNumPages(Math.ceil(empData.length / itemsPerPage));
  }, [empData, itemsPerPage]);

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

  const tableData = empData.map((data, i) => {
    const start = (curPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    if (start <= i && i < end) {
      return (
        <tr key={i + 1} className="tr-cell">
          <td className="text-center">{i + 1}</td>
          <td>{data.empId}</td>
          <td>{data.empName}</td>
          <td>{data.department}</td>
          <td>{data.email}</td>
          <td>{data.tel}</td>
          <td className="text-center">{data.roles}</td>
          <td className="text-center">
            {data.status === "active" ? (
              <Badge pill bg="success">
                กำลังทำงาน
              </Badge>
            ) : data.status === "inactive" ? (
              <Badge pill bg="secondary">
                ออกแล้ว
              </Badge>
            ) : (
              ""
            )}
          </td>
          <td className="text-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => sendData(data.empId)}
            >
              เปิด
            </Button>
          </td>
        </tr>
      );
    }
    return null;
  });
  return (
    <div className="wrapper">
      <Sidebar actived="emp" iconactive={{ opacity: "100%" }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"พนักงาน"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
              <div className="h3 fw-bold mb-4">พนักงานทั้งหมด</div>

              <Card bg="primary" className="mt-4 mb-2 shadow-sm">
                <Card bg="dark" text="white" className="mt-3 h4">
                  <Card.Body>จำนวนรายการทั้งหมด {amount} รายการ</Card.Body>
                </Card>
                <Row>
                  <Col>
                    <Nav
                      variant="underline"
                      className="mx-2"
                      defaultActiveKey="#"
                    >
                      <Nav.Item>
                        <Nav.Link
                          eventKey="#"
                          onClick={() => setStatus({ active: "active" })}
                          className="text-white"
                        >
                          ปัจจุบัน
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
                  </Col>

                  <Col className="d-flex justify-content-end mx-2">
                    <Button
                      variant="dark"
                      onClick={() => navigate("/hr/emp/create")}
                    >
                      สร้างพนักงานใหม่
                    </Button>
                  </Col>
                </Row>

                <Table striped borderless hover className="mt-2">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>รหัสพนักงาน</th>
                      <th>ชื่อ</th>
                      <th>แผนก</th>
                      <th>อีเมลล์</th>
                      <th>เบอร์</th>
                      <th className="text-center">สิทธิ์การใช้</th>
                      <th className="text-center">สถานะ</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length > 0 ? (
                      tableData
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          ไม่มีพนักงานในระบบ
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
