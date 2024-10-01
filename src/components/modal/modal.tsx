// app/components/Modal.tsx
"use client"; // Ensure this is present

import React, { useEffect } from 'react';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const AppModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  useEffect(() => {
    Modal.setAppElement('#__next'); // Set the app element for accessibility
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      {children}
    </Modal>
  );
};

export default AppModal;
