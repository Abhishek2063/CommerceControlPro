"use client";
import NavigationButton from "@/components/NavigationButton";
import { public_routes } from "@/utils/app_routes";
import RegistartionForm from "@/view/register/register_form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter()
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    username: "",
  });
  const [registerDataError, setRegisterDataError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    username: "",
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
          Create an account?
        </h1>
        <RegistartionForm
          state={registerData}
          setState={setRegisterData}
          errorState={registerDataError}
          setErrorState={setRegisterDataError}
          router={router}
        />
        <div className="mt-3 flex items-center justify-between inline-block align-baseline text-sm font-bold">
          Already have an account?
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
