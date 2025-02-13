"use client";
import React, { useRef, useState } from "react";
import PageCanvas from "../../PageCanvas";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BeneficiaryTable from "@/components/ui/BeneficiaryTable";
import { useModal } from "@/app/store/modalStore";
import BeneficiaryForm, { BeneficiaryFormRef } from "@/components/form/BeneficiaryForm";

const Page = () => {
  const { openModal, closeModal } = useModal();
  const [refreshTable, setRefreshTable] = useState(false);
  
  // ✅ Correction du typage de la ref
  const formRef = useRef<BeneficiaryFormRef | null>(null);

  const addBeneficiaryModal = () => {
    openModal({
      title: "Ajouter un bénéficiaire",
      component: <BeneficiaryForm ref={formRef} onSuccess={() => setRefreshTable((prev) => !prev)} />, // ✅ Passe correctement la ref
      okText: "Ajouter",
      cancelText: "Annuler",
      onOk: async () => {
        if (formRef.current) {
          try {
            await formRef.current.validateFields(); // ✅ Valide les champs avant soumission
            await formRef.current.submit(); // ✅ Soumet le formulaire
            closeModal(); // ✅ Ferme la modale après soumission
            setRefreshTable((prev) => !prev); // ✅ Rafraîchit la table
          } catch (error) {
            console.error("Validation échouée", error);
          }
        }
      },
    });
  };

  return (
    <PageCanvas title="Bénéficiaires">
      <PageCanvas.Actions>
        <Button 
          type="primary"
          onClick={addBeneficiaryModal}
          icon={<PlusOutlined />}
          className="flex items-center gap-2 px-4 py-2 text-sm md:text-base"
        >
          <span className="hidden sm:inline">Ajouter un bénéficiaire</span>
          <span className="sm:hidden">Ajouter</span>
        </Button>
      </PageCanvas.Actions>
      <PageCanvas.Content>
        <div className="w-full overflow-x-auto bg-transparent rounded-lg">
          <BeneficiaryTable refresh={refreshTable} />
        </div>
      </PageCanvas.Content>
    </PageCanvas>
  );
};

export default Page;
