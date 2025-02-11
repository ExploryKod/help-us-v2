"use client";
import { Form, Input, InputNumber, message, Select } from "antd";
import React, { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { IBeneficiary } from "@/types/IBeneficiary";
import { IDonor } from "@/types/IDonor";

interface DonationFormProps {
  donationId?: string;
  initialValues?: any;
}

// ✅ Définition du type pour la ref du formulaire
export interface DonationFormRef {
  submit: () => void;
  validateFields: () => Promise<void>;
}

// ✅ Ajoutez forwardRef et le bon typage
const DonationForm = forwardRef<DonationFormRef, DonationFormProps>(
  ({ donationId, initialValues }, ref) => {
    const [form] = Form.useForm();
    const [beneficiaries, setBeneficiaries] = useState<IBeneficiary[]>([]);
    const [donors, setDonors] = useState<IDonor[]>([]);

    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }, [initialValues, form]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [beneficiariesRes, donorsRes] = await Promise.all([
            fetch('/api/beneficiaries'),
            fetch('/api/donors')
          ]);
          
          const beneficiariesData = await beneficiariesRes.json();
          const donorsData = await donorsRes.json();
          
          setBeneficiaries(beneficiariesData);
          setDonors(donorsData);
        } catch (error) {
          console.error('Error fetching data:', error);
          message.error('Erreur lors du chargement des données');
        }
      };

      fetchData();
    }, []);

    useImperativeHandle(ref, () => ({
      submit: () => form.submit(),
      validateFields: () => form.validateFields(),
    }));

    const handleSubmit = async (values: any) => {
      try {
        const response = await fetch(
          `/api/donations${donationId ? `/${donationId}` : ""}`,
          {
            method: donationId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur lors de la ${donationId ? "mise à jour" : "création"}`);
        }

        message.success(
          `Donation ${donationId ? "mise à jour" : "ajoutée"} avec succès`
        );
        form.resetFields();
      } catch (error) {
        message.error(`Échec de la ${donationId ? "mise à jour" : "création"}`);
        console.error(error);
      }
    };

    return (
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item 
          label="Bénéficiaire" 
          name="beneficiaryId" 
          rules={[{ required: true, message: "Bénéficiaire requis" }]}
        >
          <Select placeholder="Sélectionnez un bénéficiaire">
            {beneficiaries.map((beneficiary) => (
              <Select.Option key={beneficiary._id.toString()} value={beneficiary._id.toString()}>
                {beneficiary.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item 
          label="Donateur" 
          name="donorId" 
          rules={[{ required: true, message: "Donateur requis" }]}
        >
          <Select placeholder="Sélectionnez un donateur">
            {donors.map((donor) => (
              <Select.Option key={donor._id.toString()} value={donor._id.toString()}>
                {donor.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item 
          label="Montant" 
          name="amount" 
          rules={[{ required: true, message: "Montant requis" }]}
        >
          <InputNumber addonAfter={"€"} placeholder="Entrez le montant" />
        </Form.Item>

        <Form.Item 
          label="Type de montant" 
          name="type" 
          rules={[{ required: true, message: "Type de montant requis" }]}
        >
          <Input placeholder="Entrez le type de montant" />
        </Form.Item>

        <Form.Item 
          label="Date" 
          name="date" 
          rules={[{ required: true, message: "Date requise" }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item 
          label="Notes" 
          name="notes"
        >
          <Input.TextArea placeholder="Entrez des notes" />
        </Form.Item>
      </Form>
    );
  }
);

// ✅ Ajout du displayName pour éviter l'erreur ESLint
DonationForm.displayName = "DonationForm";

export default DonationForm;
