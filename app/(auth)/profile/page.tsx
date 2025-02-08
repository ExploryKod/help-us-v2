"use client";

import { useEffect } from "react";
import { UpdateUserProfileParams } from "@/lib/actions/auth.actions";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip } from "antd";
import { useSession } from "next-auth/react";

const UserProfileFormInfo = () => {
  interface UpdateFormProps {
    updateUserProfile: (values: UpdateUserProfileParams) => Promise<{ success?: boolean }>;
  }

  const { data: session } = useSession();
  const [form] = Form.useForm(); // 🔥 Utilisation d'Ant Design pour gérer le formulaire

  // ✅ Met à jour les valeurs du formulaire quand `session` est chargé
  useEffect(() => {
    if (session?.user) {
      form.setFieldsValue({
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        email: session.user.email || "",
        mobile: session.user.mobile || "", // Ajoute un champ mobile s'il est disponible
      });
    }
  }, [session, form]);

  return (
    <>
      <Form form={form} layout="vertical">
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
                width: "3rem",
                height: "3rem",
                marginRight: "1.5rem",
              }}
            />
          </Tooltip>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item name="firstName" label="Prénom">
            <Input />
          </Form.Item>

          <Form.Item name="lastName" label="Nom">
            <Input />
          </Form.Item>
        </div>

        <Form.Item name="mobile" label="Téléphone">
          <Input />
        </Form.Item>

        <hr className="mt-6 border-b-1" />
        <h6 className="text-pz-blue text-sm mt-3 mb-6 font-bold uppercase">
          Changer mon adresse email
        </h6>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>

        <hr className="mt-6 border-b-1" />
        <h6 className="text-pz-blue text-sm mt-3 mb-6 font-bold uppercase">
          Supprimer le compte
        </h6>
        <div className="flex flex-wrap">
          <div className="flex w-full mt-3 justify-center space-x-4">
            <Button className="btn btn-primary">Supprimer mon compte</Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default UserProfileFormInfo;
