import { Toast, ToastContainer } from "react-bootstrap";

export const AlertToast = ({ text, onClose, variant }) => {
    return (
      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={onClose} show={!!text} delay={3000} autohide bg={variant || "light"}>
          <Toast.Header>
            <strong className="me-auto">แจ้งเตือน</strong>
            <small className="text-muted">Just Now</small>
          </Toast.Header>
          <Toast.Body>{text}</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  };