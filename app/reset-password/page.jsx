"use client";
import NavigationButton from "@/components/NavigationButton";
import { public_routes } from "@/utils/app_routes";
import ResetPasswordForm from "@/view/reset_password/reset_password_form";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState ,useEffect} from "react";

export default function ResetPassword() {
  const router = useRouter()
  const [resetPassword, setResetPassword] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [resetPasswordError, setResetPasswordError] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

    useEffect(() => {
    const searchParams = useSearchParams()
  const emailParams = searchParams.get('email')
    if (emailParams) {
      setResetPassword((prevState) => ({
        ...prevState,
        email:emailParams,
      }));
    }
  }, []);

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
          Reset Password
        </h1>
        <ResetPasswordForm
          state={resetPassword}
          setState={setResetPassword}
          errorState={resetPasswordError}
          setErrorState={setResetPasswordError}
          router={router}
        />
        <div className="mt-3 flex items-center justify-between inline-block align-baseline text-sm font-bold">
          Want to go back to login?
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
