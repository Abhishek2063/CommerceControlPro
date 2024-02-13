import { user_logout_message_list } from "@/lib/api/message_list/user_message_list"; // Import message list for user logout functionality
import { sendResponse } from "@/lib/api/responseHandler"; // Import response handler utility
import { logoutUserService } from "@/services/user/user_logout.service"; // Import service function for logging out user
import { NextResponse } from "next/server"; // Import Next.js server response utility

// Handler function for handling HTTP PUT request for user logout
export const PUT = async (req, { params }) => {
  try {
    const userId = parseInt(params.id);
    
    // Call the service function to handle logout
    const logoutResult = await logoutUserService(userId);

    // Return the response from the service function
    return sendResponse(
      NextResponse,
      logoutResult.statusCode,
      logoutResult.success,
      logoutResult.message
    );
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error logging out user:", error);
    return sendResponse(
      NextResponse,
      500,
      false,
      user_logout_message_list.internal_server_error
    );
  }
};
