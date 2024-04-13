import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        minWidth: "30vw",
        transform: "translate(-50%, -50%)",
        zIndex: 9999, // Ensure the modal appears on top of everything
      }}
    >
      <div
        className="modal"
        onClick={onClose}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="modal-content"
          onClick={handleModalClick}
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            alignItems: "center",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Box shadow
            maxWidth: "400px", // Adjust width as needed
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
