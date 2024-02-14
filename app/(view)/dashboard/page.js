"use client";
import  { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserDetails, setUserDetails } from "@/storage/user";
import { getToken, setToken } from "@/storage/token";
const page = () => {
  const { data: session, status, update } = useSession();

  useEffect(() => {
    const tokenDetails = getToken()
    const userDetails = getUserDetails()
    if (!tokenDetails && !userDetails) {
      if (session.token) {
        const userData = session.token.token.user.data.user;
        const tokenData = session.token.token.user.data.token.token;
        setUserDetails(userData);
        setToken(tokenData);
      }
    }
  },[session]);

  return <div>page</div>;
};

export default page;
