// services/category.service.js

import { PrismaClient } from "@prisma/client"; // Import Prisma client for database interaction
import { categoryCreate } from "@/lib/api/message_list/category_message_list"; // Import message list for category creation

// Initialize Prisma client
const prisma = new PrismaClient();

/**
 * Create a new category in the database.
 * @param {string} name - Name of the category.
 * @param {string} description - Description of the category.
 * @returns {Object} - Object containing success status, HTTP status code, and message.
 */
export const createCategory = async (name, description) => {
  try {
    // Check if category with the given name already exists
    const existingCategory = await prisma.categories.findUnique({
      where: { name },
    });

    // If category already exists, return error response
    if (existingCategory) {
      return {
        success: false,
        statusCode: 400,
        message: categoryCreate.category_already_exist,
      };
    }

    // Create new category
    await prisma.categories.create({
      data: {
        name,
        description,
      },
    });

    // Return success response
    return {
      success: true,
      statusCode: 200,
      message: categoryCreate.success_message,
    };
  } catch (error) {
    // Handle any errors that occur during category creation
    console.error("Error creating category:", error);
    return {
      success: false,
      statusCode: 500,
      message: categoryCreate.internal_server_error,
    };
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
