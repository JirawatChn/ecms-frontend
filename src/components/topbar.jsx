import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";

export const Topbar = ({content}) => {
    const [personalData,setPersonalData] = useState({});
    const fetchPersonalData = () =>{
        const data = {
            name:"I'm HR"
        }
        setPersonalData(data)
    }

    useEffect(()=>{
        fetchPersonalData()
    },[])

  return (
    <div>
      <div>
        <Navbar expand="lg" className="bg-white topbar">
          <Navbar.Brand className="mx-1"> <span className="fs-5 fw-bold">{content || 'ไม่มีข้อมูล'}</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Dropdown align="end">
              <Dropdown.Toggle variant="primary"><span>{personalData.name || 'ไม่มีข้อมูล'}</span></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/profile">My Profile</Dropdown.Item>
                <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};
