import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export const Topbar = ({ content}) => {
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext)
  const [name,setName] = useState('');

  const handleLogout = () => {
    logout(); 
    sessionStorage.clear()
    navigate('/login'); 
  };

  const fetchName = async () =>{
    const token = localStorage.getItem("token");
    const empId = localStorage.getItem("empId");
    try {
      const response = await axios.post(
        "http://localhost:9999/checkdata/profile",
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
      setName(response.data.data.empName || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  }

  useEffect(()=>{
    fetchName()
  },[])

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
            <Dropdown align="end" id="dropdown">
              <Dropdown.Toggle variant="primary">
                <span>{name || "ไม่มีข้อมูล"}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>navigate('/hr/profile')} id="my-profile">My Profile</Dropdown.Item>
                <Dropdown.Item onClick={()=>handleLogout()} id="logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};
