import { Route, Routes } from "react-router";
import { Dashboard } from "./pages/emp/dashboard";
import { BrowserRouter } from "react-router-dom";
import "./bootstrap.min.css";
import { Course } from "./pages/emp/course/courselist";
import { RegisterCourse } from "./pages/emp/course/registercourse";
import { ManageCourse } from "./pages/emp/course/managecourse";
import { useEffect, useState } from "react";
import { TrainingResult } from "./pages/emp/course/trainingresult";
import { EmpData } from "./pages/emp/empdata";
import { Reimbursement } from "./pages/emp/reimbursement/reimbursement";
import { ReimbursementDetails } from "./pages/emp/reimbursement/reimbursementdetails";
import { RequestReimbursement } from "./pages/emp/reimbursement/request";

function App() {
  const [empDataRaw, setEmpDataRaw] = useState({});
  const [courseDataRaw, setCourseDataRaw] = useState([]);
  const [reimbursementDataRaw, setReimbursementDataRaw] = useState([]);

  const fetchEmpData = () => {
    const data = {
      empID: "EMP001",
      empName: "Sooyoung",
      department: "Sales",
      cardID: "1000000000000",
      tel: "06612345678",
      email: " johndoe@example.com",
      firstTrainingDate: "2024-10-01",
      expiryDate: "2025-09-30",
      nextExpiryDate: "11 เดือน 30 วัน",
    };
    setEmpDataRaw(data);
  };

  const fetchCourseData = () => {
    const data = [
      {
        courseID: "ABC100",
        applicantID: "APP047",
        courseName: "เตรียมความพร้อมสู่การทำงาน",
        trainingDate: "24-10-01",
        periods: "09:00-17:00",
        trainingLocation: "5-505",
        status: "withdraw",
      },
      {
        courseID: "ABC101",
        applicantID: "APP099",
        courseName: "เตรียมความพร้อมสู่การทำงาน 2",
        trainingDate: "25-10-01",
        periods: "10:00-17:00",
        trainingLocation: "มหาวิทยาลัยศรีปทุม บางเขน",
      },
    ];
    setCourseDataRaw(data);
  };

  const fetchReimbursementData = () => {
    const data = [
      {
        requestID: "REQ001",
        courseID: "TLS123",
        empID: "EMP001",
        empName: "Sooyoung",
        department: "Sales",
        sendDate: "2024-09-26",
        amount: "500",
        cardID: "100000000000",
        bankAccount: "123123213",
        status: "Processing",
        vertifier: "hr_name",
      },
      {
        requestID: "REQ002",
        courseID: "TLS122",
        empID: "EMP001",
        empName: "Sooyoung",
        department: "Sales",
        sendDate: "2024-09-26",
        amount: "500",
        cardID: "100000000000",
        bankAccount: "123123213",
        status: "Processing",
        vertifier: "hr_name",
      },
    ];
    setReimbursementDataRaw(data);
  };

  useEffect(() => {
    fetchEmpData();
    fetchCourseData();
    fetchReimbursementData();
  }, []);

  return (
    <div>
      <BrowserRouter basename="ecms">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                empDataRaw={empDataRaw}
                setEmpDataRaw={setEmpDataRaw}
                courseDataRaw={courseDataRaw}
                setCourseDataRaw={setCourseDataRaw}
              />
            }
          />
          <Route path="/course" element={<Course />} />
          <Route path="/course/register" element={<RegisterCourse />} />
          <Route
            path="/course/manage"
            element={
              <ManageCourse
                empDataRaw={empDataRaw}
                setEmpDataRaw={empDataRaw}
                courseDataRaw={courseDataRaw}
                setCourseDataRaw={setCourseDataRaw}
              />
            }
          />
          <Route
            path="/course/results"
            element={
              <TrainingResult
                empDataRaw={empDataRaw}
                setEmpDataRaw={setEmpDataRaw}
              />
            }
          />
          <Route
            path="/emp/details"
            element={
              <EmpData empDataRaw={empDataRaw} setEmpDataRaw={setEmpDataRaw} />
            }
          />
          <Route
            path="/reimbursement"
            element={
              <Reimbursement
                empDataRaw={empDataRaw}
                setEmpDataRaw={setEmpDataRaw}
                reimbursementDataRaw={reimbursementDataRaw}
                setReimbursementDataRaw={setReimbursementDataRaw}
              />
            }
          />
          <Route
            path="/reimbursement/details"
            element={
              <ReimbursementDetails
                empDataRaw={empDataRaw}
                setEmpDataRaw={setEmpDataRaw}
                reimbursementDataRaw={reimbursementDataRaw}
                setReimbursementDataRaw={setReimbursementDataRaw}
              />
            }
          />
           <Route
            path="/reimbursement/request"
            element={
              <RequestReimbursement
                empDataRaw={empDataRaw}
                setEmpDataRaw={setEmpDataRaw}
                reimbursementDataRaw={reimbursementDataRaw}
                setReimbursementDataRaw={setReimbursementDataRaw}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
