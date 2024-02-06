import { forget_password_message_list } from "@/lib/api/message_list/user_message_list";
import { sendResponse } from "@/lib/api/responseHandler";
import { validateUserForgetPasswordInput } from "@/lib/api/validation/user_forget_password";
import { sendEmailForForgetPassword } from "@/services/user/user_forget_password.service";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma client
const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    // Validate input data
    const data = await req.json();
    const { email = "" } = data;

    // Validate user input and check for errors
    const validationErrors = validateUserForgetPasswordInput({
      email,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return sendResponse(
        NextResponse,
        400,
        false,
        forget_password_message_list.validation_message,
        {
          errors: validationErrors,
        }
      );
    }

    const forget_password_email = await sendEmailForForgetPassword(
      email,
      prisma
    );

    if (forget_password_email && forget_password_email.success) {
      return sendResponse(
        NextResponse,
        200,
        true,
        forget_password_email.message
      );
    } else {
      return sendResponse(
        NextResponse,
        400,
        false,
        forget_password_email.message
      );
    }
  } catch (error) {
    // Handle any errors that occur during the user creation process
    console.error("Error creating user:", error);
    return sendResponse(
      NextResponse,
      500,
      false,
      forget_password_message_list.internal_server_error
    );
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
