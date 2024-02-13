import NextAuth from "next-auth";
import { sendResponse } from "@/lib/api/responseHandler";
import { validateUserLoginInput } from "@/lib/api/validation/user_login";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { user_login_message_list } from "@/lib/api/message_list/user_message_list";
import { loginUserServices } from "@/services/user/user_login.service";

const authOptions = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  providers: [
    CredentialsProvider({
      name: "credentails",
      credentials: {
        email : {},
        password  : {}
      },
      async authorize(credentials) {
        const { email = "", password = "" } = credentials;
        console.log(email, "email");
        console.log(password, "password");

        try {
          // Validate user input and check for errors
          const validationErrors = validateUserLoginInput({
            email,
            password,
          });

          // If validation errors exist, return a response with the errors
          if (validationErrors.length > 0) {
            return sendResponse(
              NextResponse,
              400,
              false,
              user_login_message_list.validation_message,
              {
                errors: validationErrors,
              }
            );
          }

          const loginUserService = await loginUserServices({
            email,
            password,
          });

          if (loginUserService && loginUserService.success) {
            return sendResponse(
              NextResponse,
              200,
              true,
              loginUserService.message,
              loginUserService.data
            );
          } else {
            return sendResponse(
              NextResponse,
              400,
              false,
              loginUserService.message
            );
          }
        } catch (error) {
          return sendResponse(
            NextResponse,
            400,
            false,
            user_login_message_list.internal_server_error
          );
        }
      },
    }),
  ],
  callbacks: {},
  session: {
    strategy: "jwt", // allow us to track user through json web tokens
  },
  secret: process.env.NEXTAUTH_SECRET, // secret is mandatory in production
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
