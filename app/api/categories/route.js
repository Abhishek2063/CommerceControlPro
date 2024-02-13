import { categoryCreate } from "@/lib/api/message_list/category_message_list"; // Import message list for category creation
import { sendResponse } from "@/lib/api/responseHandler"; // Import response handler utility
import { validateCategoryInput } from "@/lib/api/validation/category_create"; // Import validation function for category input
import { createCategory } from "@/services/category/category.service"; // Import service function for creating a category
import { NextResponse } from "next/server"; // Import Next.js server response utility

// Handler function for handling HTTP POST request to create a category
export const POST = async (req) => {
  try {
    // Validate input data
    const data = await req.json();
    const { name = "", description = "" } = data;

    // Validate user input and check for errors
    const validationErrors = validateCategoryInput({
      name,
      description,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return sendResponse(
        NextResponse,
        400,
        false,
        categoryCreate.validation_message,
        { errors: validationErrors }
      );
    }

    // Create category
    const createCategoryResult = await createCategory(name, description);

    // Return response based on the result of category creation
    return sendResponse(
      NextResponse,
      createCategoryResult.statusCode,
      createCategoryResult.success,
      createCategoryResult.message
    );
  } catch (error) {
    // Handle any errors that occur during the category creation process
    console.error("Error creating category:", error);
    return sendResponse(
      NextResponse,
      500,
      false,
      categoryCreate.internal_server_error
    );
  }
};
