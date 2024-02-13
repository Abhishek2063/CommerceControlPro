import { public_routes } from "@/utils/app_routes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
        <div className="mb-8">
          <Image
            src="/images/welcome.png"
            width={200}
            height={200}
            alt="Welcome"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-center">
          Commerce Control Pro
        </h1>
        <p className="text-lg mb-8 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex justify-between w-full">
          <Link
            href={public_routes.login}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </Link>
          <Link
            href={public_routes.register}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
