"use client";

import { useModal } from "@/app/store/modalStore";
import { Modal } from "antd";
import { useState } from "react";

const GlobalModal = () => {
  const { isOpen, title, component, okText, cancelText, onOk, onCancel, width, closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    if (onOk) {
      try {
        setLoading(true);
        onOk(); // ✅ Attendre l'action avant de fermer
        closeModal(); // ✅ Ferme la modal après exécution réussie
      } catch (error) {
        console.error("Erreur lors de l'exécution de onOk:", error);
      } finally {
        setLoading(false);
      }
    } else {
      closeModal();
    }
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={onCancel || closeModal}
      okText={okText}
      cancelText={cancelText}
      width={width}
      confirmLoading={loading} // ✅ Affiche un loader sur le bouton "OK"
    >
      {component}
    </Modal>
  );
};

export default GlobalModal;
