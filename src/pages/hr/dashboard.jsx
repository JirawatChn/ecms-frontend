import { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { Topbar } from "../../components/topbar";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import axios from "axios";
// import AreaChart from "./chart";

export const HrDashboard = () => {
  const location = useLocation(); // Current route

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, [location]);

  const [dashboardData,setDashboardData] = useState({});

  const fetchDashboardData = async () =>{
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:9999/dashboard/dashboard",
        {
          headers: {
            authorization: token,
          },
        }
      );
      setDashboardData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  }

  useEffect(()=>{
    fetchDashboardData()
  },[])

  return (
    <div className="wrapper">
      <Sidebar actived="dashboard" iconActive={{ opacity: "100%" }} />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar content={"แดชบอร์ด"} />
        <div className="content">
          <div className="mx-2">
            <Container fluid>
                <div className="h3 fw-bold mb-4">ภาพรวม</div>
              <Row>
                <Col xl={3} md={6} className="mb-4">
                  <Card className="border-left-warning shadow h-100 py-2">
                    <Card.Body>
                      <Row className="no-gutters align-items-center">
                        <Col className="mr-2">
                          <div className="text-xs fw-bold  text-uppercase mb-1">
                           คำร้องขอถอนคอร์สอบรม
                          </div>
                          <div className="h5 mb-0 fw-bold text-warning" id="courseRequests">
                            {dashboardData.courseRequests}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={3} md={6} className="mb-4">
                  <Card className="border-left-warning shadow h-100 py-2">
                    <Card.Body>
                      <Row className="no-gutters align-items-center">
                        <Col className="mr-2">
                          <div className="text-xs fw-bold text-uppercase mb-1">
                           คำร้องขอเบิกค่าอบรม
                          </div>
                          <div className="h5 mb-0 fw-bold text-warning" id="refunds">
                          {dashboardData.refunds}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={3} md={6} className="mb-4">
                  <Card className="border-left-success shadow h-100 py-2">
                    <Card.Body>
                      <Row className="no-gutters align-items-center">
                        <Col className="mr-2">
                          <div className="text-xs fw-bold text-uppercase mb-1">
                           พนักงานปัจจุบัน
                          </div>
                          <div className="h5 mb-0 fw-bold text-success" id="empActives">
                          {dashboardData.empActives}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={3} md={6} className="mb-4">
                  <Card className="border-left-primary shadow h-100 py-2">
                    <Card.Body>
                      <Row className="no-gutters align-items-center">
                        <Col className="mr-2">
                          <div className="text-xs fw-bold  text-uppercase mb-1">
                           พนักงานทั้งหมดในระบบ
                          </div>
                          <div className="h5 mb-0 fw-bold text-primary" id="allEmps">
                          {dashboardData.allEmps}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xl={6} md={6} className="mb-4">
                  <Card className="border-left-warning shadow h-100 py-2">
                    <Card.Body>
                      <Row className="no-gutters align-items-center">
                        <Col className="mr-2">
                          <div className="text-xs fw-bold  text-uppercase mb-1">
                          กำลังรอผลการอบรม
                          </div>
                          <div className="h5 mb-0 fw-bold text-warning" id="courseResults">
                          {dashboardData.courseResults}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={6} md={6} className="mb-4">
                  <Card className="border-left-primary shadow h-100 py-2">
                    <Card.Body>
                      <Row className="no-gutters align-items-center">
                        <Col className="mr-2">
                          <div className="text-xs fw-bold  text-uppercase mb-1">
                           จำนวนคอร์สทั้งหมด
                          </div>
                          <div className="h5 mb-0 fw-bold text-primary" id="courses">
                          {dashboardData.courses}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {/* <Row className="mt-3">
                <Col xl={12} lg={6} className="mb-4">
                  <Card className="shadow h-100 py-2">
                <Card.Header className="fw-bold">จำนวนคอร์สที่ลงทะเบียนในแต่ละเดือน</Card.Header>
                    <Card.Body>
                    <AreaChart />
                    </Card.Body>
                  </Card>
                </Col>
              </Row> */}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
