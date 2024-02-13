import { user_login_message_list } from "@/lib/api/message_list/user_message_list";
import { sendResponse } from "@/lib/api/responseHandler";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Initialize Prisma client
const prisma = new PrismaClient();

export const loginUserServices = async ({ email, password }) => {
  try {
    let existingUser;
    // Check if the email already exists in the database
    if (email) {
      existingUser = await prisma.users.findUnique({
        where: { email },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          password: true,
          username: true,
          role: {
            select: {
              id: true,
              role: true,
            },
          },
        },
      });

      // If the email is not found, return an error response
      if (!existingUser) {
        return {
          success: false,
          message: user_login_message_list.email_not_found_error_message,
        };
      }
    }

    // If there's an existing user, proceed with password validation
    if (existingUser && password) {
      const passwordsMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordsMatch) {
        return {
          success: false,
          message: user_login_message_list.password_not_match_error_message,
        };
      }
    }

    // Generate token using user data
    const token = jwt.sign(
      { id: existingUser.id },
      process.env.NEXT_PUBLIC_JWT_SECRET
    );

    // Check if a token record for the user already exists
    const existingToken = await prisma.token.findFirst({
      where: {
        user_id: existingUser.id,
      },
    });

    let token_create;

    if (existingToken) {
      // Update the existing token record
      token_create = await prisma.token.update({
        where: { id: existingToken.id },
        data: {
          token: token,
          refresh_token: token,
        },
      });
    } else {
      // Create a new token record
      token_create = await prisma.token.create({
        data: {
          token: token,
          refresh_token: token,
          user_id: existingUser.id,
        },
      });
    }

    return {
      success: true,
      message: user_login_message_list.login_success_message,
      data: {
        user: existingUser,
        token: token_create,
      },
    };
  } catch (error) {
    // Handle any errors that occur during the user creation process
    console.error("Error creating user:", error);
    return {
      success: false,
      message: user_login_message_list.internal_server_error,
    };
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
