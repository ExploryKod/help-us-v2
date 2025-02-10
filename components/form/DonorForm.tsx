"use client";
import { Form, Input, message, Select } from "antd";
import React, { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { IDonor } from "@/types/IDonor";
import { useModal } from "@/app/store/modalStore";

export interface DonorFormRef {
  submit: () => void;
  validateFields: () => Promise<void>;
}

interface DonorFormProps {
  donor?: IDonor;
  onSuccess?: () => void; // ✅ Ajout pour rafraîchir la liste après soumission
}

const DonorForm = forwardRef<DonorFormRef, DonorFormProps>(({ donor, onSuccess }, ref) => {
  const [form] = Form.useForm();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (donor) {
      form.setFieldsValue(donor);
    } else  {
      form.resetFields();
    }
  }, [donor, form]);

  useImperativeHandle(ref, () => ({
    submit: () => form.submit(),
    validateFields: () => form.validateFields(),
  }));

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/donors${donor?._id ? `/${donor._id}` : ""}`, {
        method: donor?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la ${donor?._id ? "mise à jour" : "création"}`);
      }

      message.success(`Donateur ${donor?._id ? "mis à jour" : "ajouté"} avec succès`);
      onSuccess?.(); // ✅ Rafraîchit la liste après soumission
    } catch (error) {
      message.error(`Échec de la ${donor?._id ? "mise à jour" : "création"}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Nom" name="name" rules={[{ required: true, message: "Nom requis" }]}>
        <Input placeholder="Entrez le nom" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ type: "email", required: true, message: "Email requis" }]}>
        <Input placeholder="Entrez l’email" />
      </Form.Item>

      <Form.Item label="Téléphone" name="phone">
        <Input placeholder="Renseignez un numéro de téléphone" />
      </Form.Item>

      <Form.Item label="Type de donation" name="donationType" rules={[{ required: true, message: "Type de donation requis" }]}>
        <Select placeholder="Type de donation">
          <Select.Option value="financial">Financier</Select.Option>
          <Select.Option value="material">Matériel</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Statut" name="status" rules={[{ required: true, message: "Statut requis" }]}>
        <Select placeholder="Statut">
          <Select.Option value="active">Actif</Select.Option>
          <Select.Option value="inactive">Inactif</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
});

DonorForm.displayName = "DonorForm";
export default DonorForm;
