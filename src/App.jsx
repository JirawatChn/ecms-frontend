import { Route, Routes } from "react-router";
import { EmpDashboard } from "./pages/emp/dashboard";
import { BrowserRouter } from "react-router-dom";
import "./bootstrap.min.css";
import { CourseList } from "./pages/emp/course/courselist";
import { ManageCourse } from "./pages/emp/course/managecourse";
import { useEffect, useState } from "react";
import { TrainingHistory } from "./pages/emp/training/traininghistory";
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
import { CreateEmp } from "./pages/hr/emp/create";
import { EmpDetails } from "./pages/hr/emp/details";
import { EditEmp } from "./pages/hr/emp/edit";
import { ProfileHr } from "./pages/hr/profile/profile";
import { EditHrProfile } from "./pages/hr/profile/edit";
import { Training } from "./pages/emp/training/training";
import { TrainingListDetails } from "./pages/emp/training/traininglist";
import { TrainingDetails } from "./pages/emp/training/trainingdetails";
import ProtectRoutes from "./components/protectroutes";
import { Course } from "./pages/hr/course/course";
import { CreateCourse } from "./pages/hr/course/create";
import { CreateSession } from "./pages/hr/course/createsession";
import { CourseDetails } from "./pages/hr/course/details";
import { EditCourse } from "./pages/hr/course/edit";
import { Custom404 } from "./pages/404";
import axios from "axios";

function App() {
  const [empDataRaw, setEmpDataRaw] = useState({});
  const [enrollmentDataRaw, setEnrollmentDataRaw] = useState([]);

  const fetchEmpData = async () => {
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
      setEmpDataRaw(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchEmpData();
      fetchEnrollmentData();
    }
  }, []);

  const fetchEnrollmentData = async () => {
    const token = localStorage.getItem("token");
    const empId = localStorage.getItem("empId");
    try {
      const response = await axios.post(
        "http://localhost:9999/checkdata/enrollments",
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
      setEnrollmentDataRaw(response.data.data || []);      
      console.log(response.data.data);
      
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const PageValue1 = 5;
  const PageValue2 = 10;
  const PageValue3 = 20;

  return (
    <div>
      <BrowserRouter basename="ecms">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Custom404 />} />
          <Route element={<ProtectRoutes isAllowed="Emp" />}>
            <Route
              path="/emp/dashboard"
              element={
                <EmpDashboard
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                  enrollmentDataRaw={enrollmentDataRaw}
                  setEnrollmentDataRaw={setEnrollmentDataRaw}
                />
              }
            />
            <Route
              path="/emp/course"
              element={
                <CourseList
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={empDataRaw}
                />
              }
            />
            <Route
              path="/emp/course/manage"
              element={
                <ManageCourse
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={empDataRaw}
                  enrollmentDataRaw={enrollmentDataRaw}
                  setEnrollmentDataRaw={setEnrollmentDataRaw}
                />
              }
            />
            <Route
              path="/emp/trainings"
              element={
                <Training
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
            <Route
              path="/emp/trainings/request/:courseId/:sessionId"
              element={
                <TrainingListDetails
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
            <Route
              path="/emp/trainings/request/:courseId/:sessionId"
              element={
                <TrainingListDetails
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
            <Route
              path="/emp/trainings/history"
              element={
                <TrainingHistory
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
            <Route
              path="/emp/trainings/details/:courseId/:sessionId"
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
                <EmpData
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
            <Route
              path="/emp/reimbursement"
              element={
                <Reimbursement
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
            <Route
              path="/emp/reimbursement/details/:requestId"
              element={
                <ReimbursementDetails
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
            <Route
              path="/emp/reimbursement/request"
              element={
                <RequestReimbursement
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
          </Route>
          <Route element={<ProtectRoutes isAllowed="Hr" />}>
            <Route path="/hr/dashboard" element={<HrDashboard />} />
            <Route
              path="/hr/reimbursement/requests"
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
              path="/hr/withdraw/requests"
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
              path="/hr/course"
              element={
                <Course
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  PageValue1={PageValue1}
                  PageValue2={PageValue2}
                  PageValue3={PageValue3}
                />
              }
            />
            <Route
              path="/hr/course/create/course"
              element={
                <CreateCourse
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  PageValue1={PageValue1}
                  PageValue2={PageValue2}
                  PageValue3={PageValue3}
                />
              }
            />
            <Route
              path="/hr/course/create/session"
              element={
                <CreateSession
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  PageValue1={PageValue1}
                  PageValue2={PageValue2}
                  PageValue3={PageValue3}
                />
              }
            />
            <Route
              path="/hr/course/details/:courseId/:sessionId"
              element={
                <CourseDetails
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  PageValue1={PageValue1}
                  PageValue2={PageValue2}
                  PageValue3={PageValue3}
                />
              }
            />
            <Route
              path="/hr/course/edit/:courseId/:sessionId"
              element={<EditCourse />}
            />
            <Route
              path="/hr/results"
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
              path="/hr/emp"
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
              path="/hr/withdraw/details/:requestId"
              element={<RequestWithdrawCourseDetails />}
            />
            <Route
              path="/hr/reimbursement/details/:requestId"
              element={<RequestReimbursementDetails />}
            />
            <Route
              path="/hr/results/details/:requestId"
              element={<TrainingResultDetails />}
            />
            <Route path="/hr/emp/create" element={<CreateEmp />} />
            <Route path="/hr/emp/details/:empId" element={<EmpDetails />} />

            <Route path="/hr/emp/edit/:empId" element={<EditEmp />} />
            <Route
              path="/hr/profile"
              element={
                <ProfileHr
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
            <Route
              path="/hr/edit/profile"
              element={
                <EditHrProfile
                  empDataRaw={empDataRaw}
                  setEmpDataRaw={setEmpDataRaw}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
