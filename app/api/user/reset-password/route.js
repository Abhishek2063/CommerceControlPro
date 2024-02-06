import { reset_password_message_list } from "@/lib/api/message_list/user_message_list";
import { sendResponse } from "@/lib/api/responseHandler";
import { validateUserRestPasswordInput } from "@/lib/api/validation/user_reset_password";
import { userUpdatePasswordAndSendEmail } from "@/services/user/user_reset_password.service";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// Initialize Prisma client
const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    // Validate input data
    const data = await req.json();
    const { email = "", password = "" } = data;

    // Validate user input and check for errors
    const validationErrors = validateUserRestPasswordInput({
      email,
      password,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return sendResponse(
        NextResponse,
        400,
        false,
        reset_password_message_list.validation_message,
        {
          errors: validationErrors,
        }
      );
    }

    const reset_password = await userUpdatePasswordAndSendEmail(
      email,
      password,
      prisma
    );

    if (reset_password && reset_password.success) {
      return sendResponse(NextResponse, 200, true, reset_password.message);
    } else {
      return sendResponse(NextResponse, 400, false, reset_password.message);
    }
  } catch (error) {
    // Handle any errors that occur during the user creation process
    console.error("Error creating user:", error);
    return sendResponse(
      NextResponse,
      500,
      false,
      reset_password_message_list.internal_server_error
    );
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
