import "../modal/Modal.css";

export const Modal = ({ children, Modal }) => {
  return (
    <Modal>
      <div className="modal">
        <div className="modalContent">{children}</div>
      </div>
    </Modal>
  );
};
