"use client";

import { useEffect } from "react";
import { updateUserProfile, UpdateUserProfileParams } from "@/lib/actions/auth.actions";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip, message } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";

const UserProfileFormInfo = () => {
  const { data: session, update: updateSession } = useSession();
  const [form] = Form.useForm();

  useEffect(() => {
    if (session?.user) {
      form.setFieldsValue({
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        email: session.user.email || "",
      });
    }
  }, [session, form]);

  const handleSubmit = async (values: UpdateUserProfileParams) => {
    try {
      const messageKey = 'updating';
      message.loading({ content: 'Mise à jour du profil...', key: messageKey });
      
      await updateUserProfile(values);
      
      
      message.success({ 
        content: 'Profil mis à jour avec succès !', 
        key: messageKey,
        duration: 3 
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="flex justify-between">
          <h6 className="text-pz-blue text-sm mt-10 mb-6 font-bold uppercase">
            Informations personnelles
          </h6>
          <Tooltip title="Enregistrer">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              style={{
                marginRight: "1.5rem",
              }}
            >
              Enregistrer
            </Button>
          </Tooltip>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item 
            name="firstName" 
            label="Prénom"
            rules={[{ required: true, message: 'Le prénom est requis' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name="lastName" 
            label="Nom"
            rules={[{ required: true, message: 'Le nom est requis' }]}
          >
            <Input />
          </Form.Item>
        </div>

        <hr className="mt-6 border-b-1" />
        <h6 className="text-pz-blue text-sm mt-3 mb-6 font-bold uppercase">
          Changer mon adresse email
        </h6>
        <Form.Item 
          name="email" 
          label="Email"
          rules={[
            { required: true, message: 'L\'email est requis' },
            { type: 'email', message: 'Email invalide' }
          ]}
        >
          <Input />
        </Form.Item>

        <hr className="mt-6 border-b-1" />
      
        <div className="flex flex-wrap">
          <div className="flex w-full mt-3 justify-center space-x-4">
            <Button danger>Supprimer mon compte</Button>
          </div>
        </div>
      </Form>
      <div>
        <Button
            type="primary"
            className="bg-hu-black text-white hover:opacity-75 p-2"
            onClick={() => router.back()}
        >
          Retour
        </Button>
      </div>
    </>
  );
};

export default UserProfileFormInfo;
