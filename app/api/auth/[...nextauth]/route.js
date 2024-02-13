import NextAuth from "next-auth";
import { sendResponse } from "@/lib/api/responseHandler";
import { validateUserLoginInput } from "@/lib/api/validation/user_login";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { user_login_message_list } from "@/lib/api/message_list/user_message_list";
import { loginUserServices } from "@/services/user/user_login.service";
import { setUserDetails } from "@/storage/user";
import { setToken } from "@/storage/token";

// Configuration options for NextAuth
const authOptions = {
  // Define custom pages for authentication flows
  pages: {
    signIn: "/auth/login",   // Page for signing in
    newUser: "/auth/register",  // Page for registering a new user
  },

  // Configure authentication providers
  providers: [
    // Use CredentialsProvider for email/password authentication
    CredentialsProvider({
      name: "credentials",   // Provider name
      credentials: {
        email: {},    // Credential field for email
        password: {}, // Credential field for password
      },
      // Authorization function for handling login attempts
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

          // Attempt to authenticate user via provided credentials
          const loginUserService = await loginUserServices({
            email,
            password,
          });

          // Return response based on authentication result
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
          // Handle internal server error during authentication
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

  // Define callbacks for session and JWT handling
  callbacks: {
    // Callback for handling session creation
    async session({ session, user, token }) {
      return { session, user, token }; // Return session data
    },
    // Callback for handling JWT creation
    async jwt({ token, user, account, profile, isNewUser }) {
      return { token, user, account }; // Return JWT data
    },
  },

  // Configuration for session handling
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },

  // Secret key for encrypting session data (mandatory in production)
  secret: process.env.NEXTAUTH_SECRET,
};

// Create NextAuth handler with defined options
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
