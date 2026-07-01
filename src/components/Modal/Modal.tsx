import type React from "react";
import styled from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface FormProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: FormProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);
  const handleBackdropModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styled.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropModal}
    >
      <div className={styled.modal}>
        <button
          className={styled.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
