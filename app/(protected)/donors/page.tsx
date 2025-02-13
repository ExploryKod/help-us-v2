"use client"
import React, { useRef, useState } from "react";
import { Button, Form } from 'antd'
import PageCanvas from '../../PageCanvas'
import DonorTable from '@/components/ui/DonorTable'
import { useModal } from "@/app/store/modalStore";
import DonorForm, { DonorFormRef } from "@/components/form/DonorForm";
import { PlusOutlined } from "@ant-design/icons";

const DonorPage = () => {

  const { openModal, closeModal } = useModal();
  const [refreshTable, setRefreshTable] = useState(false);
  

  const formRef = useRef<DonorFormRef | null>(null);

  const addDonorModal = () => {
    openModal({
      title: "Ajouter un donateur",
      component: <DonorForm ref={formRef} onSuccess={() => setRefreshTable((prev) => !prev)} />, // ✅ Passe onSuccess ici appel direct (bug ?)
      okText: "Ajouter",
      cancelText: "Annuler",
      onOk: async () => {
        if (formRef.current) {
          try {
            await formRef.current.validateFields(); // ✅ Valide les champs avant soumission
            await formRef.current.submit(); // ✅ Soumet le formulaire            
          } catch (error) {
            console.error("Validation échouée (donateur)", error);
          }
        }
      },
    });
  };
  

  return (
    <PageCanvas title='Donateurs'>
      <PageCanvas.Actions>
        <Button type='primary' onClick={addDonorModal} icon={<PlusOutlined />}
          className="flex items-center gap-2 px-4 py-2 text-sm md:text-base"
        >
          <span className="hidden sm:inline">Ajouter un Donateur</span>
          <span className="sm:hidden">Ajouter</span>
        </Button>
      </PageCanvas.Actions>  
      <PageCanvas.Content>
        <div className="w-full overflow-x-auto bg-transparent rounded-lg">
          <DonorTable key={refreshTable} />
        </div>
      </PageCanvas.Content>
    </PageCanvas>
  )
}

export default DonorPage