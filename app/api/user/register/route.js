import { sendResponse } from "@/lib/api/responseHandler"; // Import response handler utility
import { validateUserInput } from "@/lib/api/validation/user_info_store"; // Import validation function for user information
import { PrismaClient } from "@prisma/client"; // Import Prisma client for database interaction
import { NextResponse } from "next/server"; // Import Next.js server response utility
import { createUserAndSendEmail } from "@/services/user/user_create.service"; // Import service function for creating user and sending email
import { user_create_message_list } from "@/lib/api/message_list/user_message_list"; // Import message list for user creation

// Initialize Prisma client
const prisma = new PrismaClient();

// Handler function for handling HTTP POST request to create a user
export const POST = async (req) => {
  try {
    // Validate input data
    const data = await req.json();
    const {
      first_name = "",
      last_name = "",
      email = "",
      password = "",
      username = "",
      role_id = "",
    } = data;

    // Validate user input and check for errors
    const validationErrors = validateUserInput({
      first_name,
      last_name,
      email,
      password,
      username,
      role_id,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return sendResponse(
        NextResponse,
        400,
        false,
        user_create_message_list.validation_message,
        {
          errors: validationErrors,
        }
      );
    }

    // Create user and send email
    const newUser = await createUserAndSendEmail(
      first_name,
      last_name,
      email,
      password,
      username,
      role_id,
      prisma
    );

    // Return response based on the result of user creation
    if (newUser && newUser.success) {
      return sendResponse(
        NextResponse,
        200,
        true,
        newUser.message,
        newUser.data
      );
    } else {
      return sendResponse(NextResponse, 400, false, newUser.message);
    }
  } catch (error) {
    // Handle any errors that occur during the user creation process
    console.error("Error creating user:", error);
    return sendResponse(
      NextResponse,
      500,
      false,
      user_create_message_list.internal_server_error
    );
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
