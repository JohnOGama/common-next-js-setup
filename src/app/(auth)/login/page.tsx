"use client";

import { Button, Input } from "@/src/shared/components/ui";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaT } from "./forms/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/src/shared/constants/constants";

const LoginPage = () => {
  const router = useRouter();

  const form = useForm<LoginSchemaT>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit = async (data: LoginSchemaT) => {
    const result = fetch(`${BASE_URL}/auth/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }) as unknown as Response;

    const response = await result.json();
    console.log("response", response);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/processing");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center  space-y-4 max-w-sm mx-auto">
      <div>
        <h1 className="text-xl font-semibold">Sign in to your account</h1>
        <p className="text-xs text-gray-400">
          Enter your email and password to sign in
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="john@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          placeholder="password@123"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button
          loading={isSubmitting}
          disabled={!isDirty || !isValid || isSubmitting}
          className="w-full"
        >
          Sign In with Email
        </Button>
      </form>

      <p className="text-xs text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="hover:underline ">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
