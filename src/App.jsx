import { Route, Routes } from "react-router";
import { EmpDashboard } from "./pages/emp/dashboard";
import { BrowserRouter } from "react-router-dom";
import "./bootstrap.min.css";
import { CourseList } from "./pages/emp/course/courselist";
import { ManageCourse } from "./pages/emp/course/managecourse";
import { useEffect, useState } from "react";
import { TrainingDetails } from "./pages/emp/course/trainingdetails";
import { EmpData } from "./pages/emp/empdata";
import { Reimbursement } from "./pages/emp/reimbursement/reimbursement";
import { ReimbursementDetails } from "./pages/emp/reimbursement/reimbursementdetails";
import { RequestReimbursement } from "./pages/emp/reimbursement/request";
import { Login } from "./pages/login";
import { HrDashboard } from "./pages/hr/dashboard";
import { Emp } from "./pages/hr/emp/emp";
import { Results } from "./pages/hr/result/result";
import { ReimbursementRequestsList } from "./pages/hr/request/reimbursement/request";
import { CourseRequestsList } from "./pages/hr/request/course/request";
import { RequestWithdrawCourseDetails } from "./pages/hr/request/course/details";
import { RequestReimbursementDetails } from "./pages/hr/request/reimbursement/details";
import { TrainingResultDetails } from "./pages/hr/result/details";

function App() {
  const [empDataRaw, setEmpDataRaw] = useState({});
  const [registerCourseDataRaw, setregisterCourseDataRaw] = useState([]);
  const [reimbursementDataRaw, setReimbursementDataRaw] = useState([]);

  const fetchEmpData = () => {
    const data = {
      empID: "EMP001",
      empName: "HSY",
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

  const fetchRegisterCourseData = () => {
    const data = [
      {
        courseID: "ABC100",
        sessionID: "S047",
        courseName: "เตรียมความพร้อมสู่การทำงาน",
        trainingDate: "24-10-01",
        periods: "09:00-17:00",
        trainingLocation: "5-505",
        status: "pending",
      },
      {
        courseID: "ABC101",
        sessionID: "S099",
        courseName: "เตรียมความพร้อมสู่การทำงาน 2",
        trainingDate: "25-10-01",
        periods: "10:00-17:00",
        trainingLocation: "มหาวิทยาลัยศรีปทุม บางเขน",
        status: "registered",
      },
    ];
    setregisterCourseDataRaw(data);
  };

  const fetchReimbursementData = () => {
    const data = [
      {
        requestID: "reim-001",
        courseID: "TLS123",
        empID: "EMP001",
        empName: "Sooyoung",
        department: "Sales",
        sendDate: "2024-09-26",
        amount: "500",
        cardID: "100000000000",
        bankAccount: "123123213",
        approvedDate: "2024-10-27",
        status: "approve",
        vertifier: "hr_name",
      },
      {
        requestID: "reim-002",
        courseID: "TLS122",
        empID: "EMP001",
        empName: "Sooyoung",
        department: "Sales",
        sendDate: "2024-09-26",
        amount: "500",
        cardID: "100000000000",
        bankAccount: "123123213",
        status: "processing",
        vertifier: "",
      },
      {
        requestID: "reim-003",
        courseID: "TLS122",
        empID: "EMP001",
        empName: "Sooyoung",
        department: "Sales",
        sendDate: "2024-09-26",
        amount: "500",
        cardID: "100000000000",
        bankAccount: "123123213",
        status: "deny",
      },
      {
        requestID: "reim-004",
        courseID: "TLS122",
        empID: "EMP001",
        empName: "Sooyoung",
        department: "Sales",
        sendDate: "2024-09-26",
        amount: "500",
        cardID: "100000000000",
        bankAccount: "123123213",
        status: "approve",
      },
    ];
    setReimbursementDataRaw(data);
  };

  useEffect(() => {
    fetchEmpData();
    fetchRegisterCourseData();
    fetchReimbursementData();
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const PageValue1 = 5;
  const PageValue2 = 10;
  const PageValue3 = 20;

  return (
    <div>
      <BrowserRouter basename="ecms">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/emp/dashboard"
            element={
              <EmpDashboard
                empDataRaw={empDataRaw}
                setEmpDataRaw={setEmpDataRaw}
                registerCourseDataRaw={registerCourseDataRaw}
                setregisterCourseDataRaw={setregisterCourseDataRaw}
              />
            }
          />
          <Route
            path="/emp/course"
            element={
              <CourseList empDataRaw={empDataRaw} setEmpDataRaw={empDataRaw} />
            }
          />
          <Route
            path="/emp/course/manage"
            element={
              <ManageCourse
                empDataRaw={empDataRaw}
                setEmpDataRaw={empDataRaw}
                registerCourseDataRaw={registerCourseDataRaw}
                setregisterCourseDataRaw={setregisterCourseDataRaw}
              />
            }
          />
          <Route
            path="/emp/course/trainings"
            element={
              <TrainingDetails
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
            path="/emp/reimbursement"
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
            path="/emp/reimbursement/details/:requestID"
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
            path="/emp/reimbursement/request"
            element={
              <RequestReimbursement
                empDataRaw={empDataRaw}
                setEmpDataRaw={setEmpDataRaw}
                reimbursementDataRaw={reimbursementDataRaw}
                setReimbursementDataRaw={setReimbursementDataRaw}
              />
            }
          />
          <Route path="hr/dashboard" element={<HrDashboard />} />
          <Route
            path="hr/reimbursement/requests"
            element={
              <ReimbursementRequestsList
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                PageValue1={PageValue1}
                PageValue2={PageValue2}
                PageValue3={PageValue3}
              />
            }
          />
          <Route
            path="hr/withdraw/requests"
            element={
              <CourseRequestsList
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                PageValue1={PageValue1}
                PageValue2={PageValue2}
                PageValue3={PageValue3}
              />
            }
          />
          <Route
            path="hr/results"
            element={
              <Results
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                PageValue1={PageValue1}
                PageValue2={PageValue2}
                PageValue3={PageValue3}
              />
            }
          />
          <Route
            path="hr/emp"
            element={
              <Emp
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                PageValue1={PageValue1}
                PageValue2={PageValue2}
                PageValue3={PageValue3}
              />
            }
          />
          <Route
            path="hr/withdraw/details/:requestID"
            element={<RequestWithdrawCourseDetails />}
          />
            <Route
            path="hr/reimbursement/details/:requestID"
            element={<RequestReimbursementDetails />}
          />
            <Route
            path="hr/results/details/:requestID"
            element={<TrainingResultDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
