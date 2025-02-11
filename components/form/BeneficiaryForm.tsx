"use client";
import { Form, Input, message, Select } from "antd";
import React, {forwardRef, useImperativeHandle, useEffect, useState} from "react";
import {IBeneficiary} from "@/types/IBeneficiary";
import {useModal} from "@/app/store/modalStore";

export interface BeneficiaryFormRef {
    submit: () => void;
    validateFields: () => Promise<void>;
}

interface BeneficiaryFormProps {
    beneficiary?: IBeneficiary;
    onSuccess?: () => void; // ✅ Ajout pour rafraîchir la liste après soumission
}

const BeneficiaryForm = forwardRef<BeneficiaryFormRef, BeneficiaryFormProps>(
  ({ beneficiary, onSuccess }, ref) => {
    const [form] = Form.useForm();
    const { closeModal } = useModal();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (beneficiary) {
          console.log("Beneficiary ", beneficiary);
        form.setFieldsValue(beneficiary);
      } else  {
        form.resetFields();
      }
    }, [beneficiary, form]);


    useImperativeHandle(ref, () => ({
      submit: () => form.submit(),
      validateFields: () => form.validateFields(),
    }));

    const handleSubmit = async (values: any) => {
      setLoading(true);
      try {
        console.warn("benef", beneficiary);
        const response = await fetch(`/api/beneficiaries${beneficiary?._id ? `/${beneficiary._id}` : ""}`, {
          method: beneficiary?._id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          console.error(`Erreur lors de la ${beneficiary?._id ? "mise à jour" : "création"}`);
          setLoading(false);
        }

        message.success(`Donateur ${beneficiary?._id ? "mis à jour" : "ajouté"} avec succès`);
        onSuccess?.(); // ✅ Rafraîchit la liste après soumission
      } catch (error) {
        message.error(`Échec de la ${beneficiary?._id ? "mise à jour" : "création"}`);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Nom"
          name="name"
          rules={[{ required: true, message: "Nom requis" }]}
        >
          <Input placeholder="Entrez le nom" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email", required: true, message: "Email requis" }]}
        >
          <Input placeholder="Entrez l'email" />
        </Form.Item>

        <Form.Item
          label="Besoins"
          name="needs"
          rules={[{ required: true, message: "Besoins requis" }]}
        >
          <Input placeholder="Quel est le besoin ?" />
        </Form.Item>

        <Form.Item
          label="Statut"
          name="status"
          rules={[{ required: true, message: "Statut requis" }]}
        >
          <Select placeholder="Statut">
            <Select.Option value="active">Actif</Select.Option>
            <Select.Option value="inactive">Inactif</Select.Option>
            <Select.Option value="urgent">Urgent</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    );
  }
);

// ✅ Ajout du displayName pour éviter l'erreur ESLint
BeneficiaryForm.displayName = "BeneficiaryForm";

export default BeneficiaryForm;
