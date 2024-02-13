// services/category.service.js

import { PrismaClient } from "@prisma/client";
import { categoryCreate } from "@/lib/api/message_list/category_message_list";

// Initialize Prisma client
const prisma = new PrismaClient();

export const createCategory = async (name, description) => {
  try {
    const existingCategory = await prisma.categories.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return {
        success: false,
        statusCode: 400,
        message: categoryCreate.category_already_exist,
      };
    }

    await prisma.categories.create({
      data: {
        name,
        description,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: categoryCreate.success_message,
    };
  } catch (error) {
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
