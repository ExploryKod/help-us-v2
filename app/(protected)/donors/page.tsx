"use client"
import React, { useRef, useState } from "react";
import { Button, Form } from 'antd'
import PageCanvas from '../../PageCanvas'
import DonorTable from '@/components/ui/DonorTable'
import { useModal } from "@/app/store/modalStore";
import DonorForm, { DonorFormRef } from "@/components/form/DonorForm";

const page = () => {

  const { openModal, closeModal } = useModal();
  const [refreshTable, setRefreshTable] = useState(false);
  

  const formRef = useRef<DonorFormRef | null>(null);

  const addDonorModal = () => {
    openModal({
      title: "Ajouter un donateur",
      component: <DonorForm ref={formRef} onSuccess={() => setRefreshTable((prev) => !prev)} />, // ✅ Passe onSuccess
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
        <Button type='primary' onClick={addDonorModal} >Ajouter un donateur</Button>
      </PageCanvas.Actions>  
      <PageCanvas.Content>
        <DonorTable key={refreshTable} />
      </PageCanvas.Content>
    </PageCanvas>
  )
}

export default page