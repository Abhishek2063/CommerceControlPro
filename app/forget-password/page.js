"use client";
import NavigationButton from "@/components/NavigationButton";
import { public_routes } from "@/utils/app_routes";
import ForgetPasswordForm from "@/view/forget-password/forget-password";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgetPassword() {
  const router = useRouter()
  const [forgetPassword, setForgetPassword] = useState({
    email: "",
  });
  const [forgetPasswordError, setForgetPasswordError] = useState({
    email: "",
  });

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-opacity-50"
      style={{ backgroundImage: "url('/images/background.webp')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className="rounded-full overflow-hidden mb-8">
          <Image
            src="/images/commerce-control-pro-high-resolution-logo.png"
            width={100}
            height={100}
            alt="Logo"
          />
        </div>
        <h1 className="mb-2 text-center text-lg font-bold text-cyan-500">
          Forget Password
        </h1>
        <ForgetPasswordForm
          state={forgetPassword}
          setState={setForgetPassword}
          errorState={forgetPasswordError}
          setErrorState={setForgetPasswordError}
          router={router}
        />
        <div className="mt-3 flex items-center justify-between inline-block align-baseline text-sm font-bold">
          Back to login page
          <NavigationButton
            class="text-blue-500 hover:text-blue-800"
            text="Sign In"
            navigate_path={public_routes.login}
          />
        </div>
      </div>
    </div>
  );
}
