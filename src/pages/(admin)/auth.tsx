import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  Button, Card, CardBody, CardHeader, Form } from "@heroui/react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Input from "../../components/ui/Input";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  otp: yup
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

type AdminFormData = yup.InferType<typeof schema>;

const AdminAuth = () => {
  const { isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formdata: AdminFormData) => {
    console.log("Login Data:", formdata);
  };

  if (isAuthenticated) return <Navigate to="/admin-panel/dashboard" />;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md shadow-lg">
        <h1 className="text-center text-lg font-bold">Admin Login</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            fullWidth
            label="Email"
            {...register("email")}
            type="email"
            placeholder="Enter email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <Input
            fullWidth
            label="Password"
            {...register("password")}
            type="password"
            placeholder="Enter password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <Input
            fullWidth
            label="OTP"
            {...register("otp")}
            type="text"
            placeholder="Enter OTP"
            isInvalid={!!errors.otp}
            errorMessage={errors.otp?.message}
          />

          <Button type="submit" color="warning" fullWidth>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminAuth;
