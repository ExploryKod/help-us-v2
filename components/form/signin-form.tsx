"use client";

import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface SignInFormProps {
  callbackUrl: string;
}

const SignInForm = ({ callbackUrl }: SignInFormProps) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl,
        redirect: false, // Ne pas rediriger automatiquement
      });

      if (result?.error) {
        message.error("Email ou mot de passe invalide.");
      } else {
        message.success("Vous êtes logué!");
        window.location.href = callbackUrl; // Redirection manuelle
      }
    } catch (error) {
      message.error("Une erreur a été déclenchée, réessayez.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Se connecter</h2>
      
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Email invalide ou manquant ?" }]}
        >
          <Input placeholder="mail@example.com" />
        </Form.Item>

        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: "Mot de passe nécessaire!" }]}
        >
          <Input.Password placeholder="Your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
          Se connecter
        </Button>
      </Form>

      <div className="text-center my-4 text-gray-600">ou</div>

      <p className="text-center text-sm text-gray-600 mt-4">
        Pas encore de compte?&nbsp;
        <Link href="/signup" className="text-hu-tertiary hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
