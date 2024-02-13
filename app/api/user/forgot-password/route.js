import { forget_password_message_list } from "@/lib/api/message_list/user_message_list"; // Import message list for forget password functionality
import { sendResponse } from "@/lib/api/responseHandler"; // Import response handler utility
import { validateUserForgetPasswordInput } from "@/lib/api/validation/user_forget_password"; // Import validation function for forget password input
import { sendEmailForForgetPassword } from "@/services/user/user_forget_password.service"; // Import service function for sending forget password email
import { PrismaClient } from "@prisma/client"; // Import Prisma client for database interaction
import { NextResponse } from "next/server"; // Import Next.js server response utility

// Initialize Prisma client
const prisma = new PrismaClient();

// Handler function for handling HTTP POST request for forget password functionality
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

    // Send forget password email
    const forgetPasswordEmailResult = await sendEmailForForgetPassword(email, prisma);

    // Return response based on the result of sending forget password email
    if (forgetPasswordEmailResult && forgetPasswordEmailResult.success) {
      return sendResponse(
        NextResponse,
        200,
        true,
        forgetPasswordEmailResult.message
      );
    } else {
      return sendResponse(
        NextResponse,
        400,
        false,
        forgetPasswordEmailResult.message
      );
    }
  } catch (error) {
    // Handle any errors that occur during the forget password process
    console.error("Error sending forget password email:", error);
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
