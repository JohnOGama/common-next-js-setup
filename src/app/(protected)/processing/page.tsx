"use client";
import AppProcessingPage from "@/src/shared/components/AppProcessingPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProcessingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AppProcessingPage
      title="Processing your account"
      description="We are processing your account. Please wait..."
    />
  );
};

export default ProcessingPage;
