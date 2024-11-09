import { Header } from "../../../components/header";
import Button from "react-bootstrap/Button";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Course = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header content={"รายการคอร์สอบรม"} />
      <div className="mt-3 d-flex justify-content-center">
        <div  style={{ width: "80rem" }} className="mt-4">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/dashboard")}
          >
            <MdArrowBackIosNew /> กลับสู่หน้าหลัก
          </Button>
        </div>
      </div>
    </div>
  );
};
