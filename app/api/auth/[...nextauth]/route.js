import NextAuth from "next-auth";
import { sendResponse } from "@/lib/api/responseHandler";
import { validateUserLoginInput } from "@/lib/api/validation/user_login";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { user_login_message_list } from "@/lib/api/message_list/user_message_list";
import { loginUserServices } from "@/services/user/user_login.service";
import { setUserDetails } from "@/storage/user";
import { setToken } from "@/storage/token";

const authOptions = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  providers: [
    CredentialsProvider({
      name: "credentails",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email = "", password = "" } = credentials;

        try {
          // Validate user input and check for errors
          const validationErrors = validateUserLoginInput({
            email,
            password,
          });

          // If validation errors exist, return a response with the errors
          if (validationErrors.length > 0) {
            return {
              statusCode: 400,
              success: false,
              message: user_login_message_list.validation_message,
              data: {
                errors: validationErrors,
              },
            };
          }

          const loginUserService = await loginUserServices({
            email,
            password,
          });

          if (loginUserService && loginUserService.success) {
            return {
              statusCode: 200,
              success: true,
              message: loginUserService.message,
              data: loginUserService.data,
            };
          } else {
            return {
              statusCode: 400,
              success: false,
              message: loginUserService.message,
              data: null,
            };
          }
        } catch (error) {
          return {
            statusCode: 400,
            success: false,
            message: user_login_message_list.internal_server_error,
            data: null,
          };
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return {session, user, token};
    },
    async jwt({ token, user, account, profile, isNewUser }) {
    
      return {token, user, account};
    },
  },
  session: {
    strategy: "jwt", // allow us to track user through json web tokens
  },
  secret: process.env.NEXTAUTH_SECRET, // secret is mandatory in production
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
