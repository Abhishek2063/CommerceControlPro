import { sendResponse } from "@/lib/api/responseHandler";
import { validateUserInput } from "@/lib/api/validation/user_info_store";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/lib/api/sendEmail";
import { user_register_email } from "@/lib/email_content/user_registration_email";
import { createUserAndSendEmail } from "@/services/user/user_create.service";
// Initialize Prisma client
const prisma = new PrismaClient();

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
      return sendResponse(NextResponse, 400, false, "Validation errors", {
        errors: validationErrors,
      });
    }

    const newUser = await createUserAndSendEmail(
      first_name,
      last_name,
      email,
      password,
      username,
      role_id,
      prisma
    );

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
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
