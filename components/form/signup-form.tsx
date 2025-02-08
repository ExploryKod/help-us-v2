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
        message.success("Sign up successfully.");
        router.push("/signin");
      } else {
        message.error("Sign up failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
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
          label="Username"
          name="name"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Your username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
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
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Your password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
          Sign Up
        </Button>
      </Form>

      <div className="text-center mt-4">
        <span className="text-gray-600">Already have an account? </span>
        <Link href="/signin" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
