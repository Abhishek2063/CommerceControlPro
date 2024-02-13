"use client";
import NavigationButton from "@/components/NavigationButton";
import { public_routes } from "@/utils/app_routes";
import LoginForm from "@/view/login/loginForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginErrorData, setLoginErrorData] = useState({
    email: "",
    password: "",
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
          Sign In Your Account
        </h1>
        <LoginForm
          state={loginData}
          setState={setLoginData}
          errorState={loginErrorData}
          setErrorState={setLoginErrorData}
          router={router}
        />
        <div className="mt-3 flex items-center justify-between inline-block align-baseline text-sm font-bold">
          Don't have an account?
          <NavigationButton
            class="text-blue-500 hover:text-blue-800"
            text="Sign In"
            navigate_path={public_routes.register}
          />
        </div>
      </div>
    </div>
  );
}
