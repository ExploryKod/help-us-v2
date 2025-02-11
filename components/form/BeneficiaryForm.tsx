"use client";
import { Form, Input, message, Select } from "antd";
import React, { forwardRef, useImperativeHandle, useEffect } from "react";

// ✅ Définition du type pour la ref du formulaire
export interface BeneficiaryFormRef {
  submit: () => void;
  validateFields: () => Promise<void>;
}

interface BeneficiaryFormProps {
  beneficiaryId?: string; // ID du bénéficiaire pour la mise à jour
  initialValues?: {
    name: string;
    email: string;
    needs: string;
    status: string;
  };
}

const BeneficiaryForm = forwardRef<BeneficiaryFormRef, BeneficiaryFormProps>(
  ({ beneficiaryId, initialValues }, ref) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }, [initialValues, form]);

    useImperativeHandle(ref, () => ({
      submit: () => form.submit(),
      validateFields: () => form.validateFields(),
    }));

    const handleSubmit = async (values: any) => {
      try {
        const response = await fetch(
          `/api/beneficiaries${beneficiaryId ? `/${beneficiaryId}` : ""}`,
          {
            method: beneficiaryId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur lors de la ${beneficiaryId ? "mise à jour" : "création"}`);
        }

        message.success(
          `Bénéficiaire ${beneficiaryId ? "mis à jour" : "ajouté"} avec succès`
        );
        form.resetFields();
      } catch (error) {
        message.error(`Échec de la ${beneficiaryId ? "mise à jour" : "création"}`);
        console.error(error);
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
