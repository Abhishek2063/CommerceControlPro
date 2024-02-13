import { user_logout_message_list } from "@/lib/api/message_list/user_message_list"; // Import message list for user logout
import { PrismaClient } from "@prisma/client"; // Import Prisma client

// Initialize Prisma client
const prisma = new PrismaClient();

/**
 * Service function for logging out a user.
 * @param {number} userId - The ID of the user to logout.
 * @returns {Object} - Object containing success status, status code, and message.
 */
export const logoutUserService = async (userId) => {
  try {
    // Check if a token record for the user already exists
    const existingToken = await prisma.token.findFirst({
      where: {
        AND: [
          { user_id: userId },
          {
            OR: [
              { token: null },
              { token: "" },
            ]
          }
        ]
      }
    });

    // If the user does not exist, return a not found response
    if (!existingToken) {
      return {
        success: false,
        statusCode: 404,
        message: user_logout_message_list.user_already_logout,
      };
    }

    // Update the existing token record to mark it as deleted
    await prisma.token.update({
      where: { id: existingToken.id },
      data: {
        token: null,
        refresh_token: null,
      },
    });

    // Return a success response
    return {
      success: true,
      statusCode: 200,
      message: user_logout_message_list.success_message,
    };
  } catch (error) {
    // Handle any errors that occur during the logout process
    console.error("Error logging out user:", error);
    return {
      success: false,
      statusCode: 500,
      message: user_logout_message_list.internal_server_error,
    };
  } finally {
    // Disconnect from the Prisma client to close the database connection
    await prisma.$disconnect();
  }
};
