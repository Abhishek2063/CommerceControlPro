import { reset_password_message_list } from "@/lib/api/message_list/user_message_list"; // Import message list for reset password functionality
import { sendResponse } from "@/lib/api/responseHandler"; // Import response handler utility
import { validateUserRestPasswordInput } from "@/lib/api/validation/user_reset_password"; // Import validation function for reset password input
import { userUpdatePasswordAndSendEmail } from "@/services/user/user_reset_password.service"; // Import service function for updating user password and sending email
import { PrismaClient } from "@prisma/client"; // Import Prisma client for database interaction
import { NextResponse } from "next/server"; // Import Next.js server response utility

// Initialize Prisma client
const prisma = new PrismaClient();

// Handler function for handling HTTP POST request for resetting user password
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

    // Update user password and send email
    const resetPasswordResult = await userUpdatePasswordAndSendEmail(
      email,
      password,
      prisma
    );

    // Return response based on the result of resetting password
    if (resetPasswordResult && resetPasswordResult.success) {
      return sendResponse(NextResponse, 200, true, resetPasswordResult.message);
    } else {
      return sendResponse(NextResponse, 400, false, resetPasswordResult.message);
    }
  } catch (error) {
    // Handle any errors that occur during the password reset process
    console.error("Error resetting user password:", error);
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
