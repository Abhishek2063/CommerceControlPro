import { sendResponse } from "@/lib/api/responseHandler";
import { validateUserInput } from "@/lib/api/validation/user_info_store";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
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

    // Check if the email already exists in the database
    if (email) {
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });

      // If the email is already taken, return an error response
      if (existingUser) {
        return sendResponse(
          NextResponse,
          400,
          false,
          "Email already exists. Please use a different email."
        );
      }
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        username,
        role_id,
      },
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
    return sendResponse(
      NextResponse,
      200,
      true,
      "User created successfully.",
      newUser
    );
  } catch (error) {
    // Handle any errors that occur during the user creation process
    console.error("Error creating user:", error);
    return sendResponse(NextResponse, 500, false, "Internal server error");
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
