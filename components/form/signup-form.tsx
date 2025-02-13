"use client";

import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignUpWithCredentialsParams } from "@/lib/actions/auth.actions";

interface SignUpFormProps {
  signUpWithCredentials: (values: SignUpWithCredentialsParams) => Promise<{ success?: boolean }>;
}

const SignUpForm = ({ signUpWithCredentials }: SignUpFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: SignUpWithCredentialsParams) => {
    console.log(values);
    setLoading(true);
    try {
      const res = await signUpWithCredentials(values);
      if (res?.success) {
        message.success("Vous êtes inscris. Nous vous recontactons pour adherer.");
        router.push("/signin");
      } else {
        message.error("Échec de l'inscription.");
      }
    } catch (error) {
      message.error("Il y a eu une erreur, réessayer plus tard.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">S&apos;inscrire</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        }}
      >
        <Form.Item
          label="Pseudo"
          name="name"
          rules={[{ required: true, message: "Entrez vos pseudo!" }]}
        >
          <Input placeholder="Votre pseudo" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Entrez un email valide!" }]}
        >
          <Input placeholder="mail@example.com" />
        </Form.Item>

        <Form.Item
          label="Prénom"
          name="firstName"
          rules={[{ required: true, message: "Veuillez entrer votre prénom!" }]}
        >
          <Input placeholder="Votre prénom" />
        </Form.Item>

        <Form.Item
          label="Nom"
          name="lastName"
          rules={[{ required: true, message: "Veuillez entrer votre nom!" }]}
        >
          <Input placeholder="Votre nom" />
        </Form.Item>

        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: "Entrez votre mot de passe!" }]}
        >
          <Input.Password placeholder="Your password" />
        </Form.Item>

        <Form.Item
          label="Confirmer le mot de passe"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Confirmez votre mot de passe!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Les mot de passe sont différents !"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirmer le mot de passe" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
          S&apos;inscrire
        </Button>
      </Form>

      <div className="text-center mt-4">
        <span className="text-gray-600">Dejà adhérant ? </span>
        <Link href="/signin" className="text-hu-tertiary font-bold hover:underline">
         Se connecter
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
