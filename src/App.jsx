import { Route, Routes } from "react-router";
import { Dashboard } from "./pages/emp/dashboard";
import { BrowserRouter } from "react-router-dom";
import './bootstrap.min.css';
import { Course } from "./pages/emp/course/courselist";
import { RegisterCourse } from "./pages/emp/course/registercourse";

function App() {
  return (
    <div>
      <BrowserRouter basename="ecms">
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/course" element={<Course/>} />
          <Route path="/course/register" element={<RegisterCourse/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
