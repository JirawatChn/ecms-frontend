import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Topbar = ({ content }) => {
  const [empName, setEmpName] = useState({});
  const fetchEmpName = () => {
    const data = {
      empName: "HRyoung",
    };
    setEmpName(data);
  };

  useEffect(() => {
    fetchEmpName();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Navbar expand="lg" className="bg-white topbar">
          <Navbar.Brand className="mx-1">
            {" "}
            <span className="fs-5 fw-bold">{content || "ไม่มีข้อมูล"}</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Dropdown align="end">
              <Dropdown.Toggle variant="primary">
                <span>{empName.empName || "ไม่มีข้อมูล"}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>navigate('/hr/profile')}>My Profile</Dropdown.Item>
                <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};
