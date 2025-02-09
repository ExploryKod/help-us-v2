"use client";

import { useModal } from "@/app/store/modalStore";
import { Modal } from "antd";

const GlobalModal = () => {
  const { isOpen, title, component, okText, cancelText, onOk, onCancel, width, closeModal, footer } =
    useModal();

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={onOk || closeModal}
      onCancel={onCancel || closeModal}
      okText={okText}
      cancelText={cancelText}
      width={width}
      footer={footer}
    >
      {component}
    </Modal>
  );
};

export default GlobalModal;
