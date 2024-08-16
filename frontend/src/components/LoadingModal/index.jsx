import React from "react";
import Modal from "react-modal";
import { ClockLoader } from "react-spinners";

export default function LoadingModal({ isLoading }) {
  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "300px",
      paddingY: "20px",
      display: "flex",
      justifyContent: "center",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };
  return (
    <Modal
      isOpen={isLoading}
      onRequestClose={() => null}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <ClockLoader color="#FBC02D" />
    </Modal>
  );
}
