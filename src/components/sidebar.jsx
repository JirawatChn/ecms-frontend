import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdNoteAdd,
  MdInsertChart,
  MdAccountCircle,
  MdEvent 
} from "react-icons/md";
import { useState } from "react";

export const Sidebar = ({ actived, iconActive, courseCollapse,collapse, highlight}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapse);
  const [isCourseCollapsed, setIsCourseCollapsed] = useState(courseCollapse);


  // ฟังก์ชันสำหรับ toggle การเปิดและปิด
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setIsCourseCollapsed(false)
  };

  const toggleCourseCollapse = () => {
    setIsCourseCollapsed(!isCourseCollapsed);
    setIsCollapsed(false);
  };

  return (
    <ul className="navbar-nav bg-primary sidebar sidebar-dark">
      <div className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon"></div>
        <div className="sidebar-brand-text fs-5 fw-bold">
          E<span className="color fs-5 fw-bold">C</span>MS <br />
          HR Management
        </div>
      </div>

      <hr className="sidebar-divider my-0" />

      <li className={"nav-item" + (actived === "dashboard" ? " active" : "")}>
        <Link
          to={"/hr/dashboard"}
          className="nav-link  d-flex align-items-center"
        >
          <div
            className="sidebar-icon-container"
            style={{
              opacity: actived === "dashboard" ? 1 : 0.35,
            }}
          >
            <MdDashboard
              className="sidebar-icon"
              style={actived === "dashboard" ? iconActive : {}}
            />
          </div>
          <span className="mx-2 fw-bold fs-7">แดชบอร์ด</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Operations</div>
      
      {/*  */}
      <li
        className={
          "nav-item" +
          (isCourseCollapsed || actived === "course" || actived === "attendance"
            ? " active"
            : "")
        }
      >
        <Link
          className="nav-link collapsed d-flex align-items-center"
          onClick={toggleCourseCollapse} // เมื่อคลิกจะสลับสถานะ collapse
          aria-expanded={isCourseCollapsed ? "true" : "false"}
          aria-controls="collapseTwo"
        >
          <div
            className="sidebar-icon-container"
            style={{
              opacity:
                isCourseCollapsed || actived === "course" || actived === "attendance"
                  ? 1
                  : 0.35
            }}
          >
            <MdEvent
              className="sidebar-icon"
              style={
                isCourseCollapsed || actived === "course" || actived === "attendance"
                  ? 1
                  : 0.35
              }
            />
          </div>
          <span className="mx-2 fw-bold fs-7">คอร์สอบรม</span>
        </Link>

        <div
          className={`collapse ${isCourseCollapsed ? "show" : ""}`}
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <div className="collapse-header">คอร์สอบรม</div>
            <Link
              className="collapse-item"
              to="/hr/course/create/course"
              style={actived === "create-course" ? highlight : {}}
            >
              สร้างคอร์สอบรม
            </Link>
            <Link
              className="collapse-item"
              to="/hr/course/create/session"
              style={actived === "create-session" ? highlight : {}}
            >
              สร้างรอบอบรม
            </Link>
            <Link
              className="collapse-item"
              to="/hr/course"
              style={actived === "course" ? highlight : {}}
            >
              คอร์สอบรม
            </Link>
          </div>
        </div>
      </li>
      {/*  */}
    

      <li
        className={
          "nav-item" +
          (isCollapsed || actived === "withdraw" || actived === "reim"
            ? " active"
            : "")
        }
      >
        <Link
          className="nav-link collapsed d-flex align-items-center"
          onClick={toggleCollapse} // เมื่อคลิกจะสลับสถานะ collapse
          aria-expanded={isCollapsed ? "true" : "false"}
          aria-controls="collapseTwo"
        >
          <div
            className="sidebar-icon-container"
            style={{
              opacity:
                isCollapsed || actived === "withdraw" || actived === "reim"
                  ? 1
                  : 0.35,
            }}
          >
            <MdNoteAdd
              className="sidebar-icon"
              style={
                isCollapsed || actived === "withdraw" || actived === "reim"
                  ? iconActive
                  : {}
              }
            />
          </div>
          <span className="mx-2 fw-bold fs-7">คำร้องพนักงาน</span>
        </Link>

        <div
          className={`collapse ${isCollapsed ? "show" : ""}`}
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <div className="collapse-header">คำร้องขอพนักงาน</div>
            <Link
              className="collapse-item"
              to="/hr/withdraw/requests"
              style={actived === "withdraw" ? highlight : {}}
            >
              ถอนคอร์สอบรม
            </Link>
            <Link
              className="collapse-item"
              to="/hr/reimbursement/requests"
              style={actived === "reim" ? highlight : {}}
            >
              เบิกค่าอบรม
            </Link>
          </div>
        </div>
      </li>

      <li className={"nav-item" + (actived === "results" ? " active" : "")}>
        <Link to={"/hr/results"} className="nav-link d-flex align-items-center">
          <div
            className="sidebar-icon-container"
            style={{
              opacity: actived === "results" ? 1 : 0.35,
            }}
          >
            <MdInsertChart
              className="sidebar-icon"
              style={actived === "results" ? iconActive : {}}
            />
          </div>
          <span className="mx-2 fw-bold fs-7">ผลลัพธ์การอบรม</span>
        </Link>
      </li>

      <li className={"nav-item" + (actived === "emp" ? " active" : "")}>
        <Link to={"/hr/emp"} className="nav-link d-flex align-items-center">
          <div
            className="sidebar-icon-container"
            style={{
              opacity: actived === "emp" ? 1 : 0.35,
            }}
          >
            <MdAccountCircle
              className="sidebar-icon"
              style={actived === "emp" ? iconActive : {}}
            />
          </div>
          <span className="mx-2 fw-bold fs-7">พนักงาน</span>
        </Link>
      </li>
    </ul>
  );
};
