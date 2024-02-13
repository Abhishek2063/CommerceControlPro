import { sendEmail } from "@/lib/api/sendEmail"; // Import sendEmail function for sending forget password email
import { forget_password } from "@/lib/email_content/forget_password_email"; // Import email content for forget password
import { getCurrentConfig } from "@/config/config"; // Import function to get current configuration
import { forget_password_message_list } from "@/lib/api/message_list/user_message_list"; // Import message list for forget password

/**
 * Send forget password email to the user.
 * @param {string} email - Email address of the user.
 * @param {PrismaClient} prisma - Prisma client instance.
 * @returns {Object} - Object containing success status and message.
 */
export const sendEmailForForgetPassword = async (email, prisma) => {
  try {
    // Check if the email exists in the database
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    // If email does not exist, return error response
    if (!existingUser) {
      return {
        success: false,
        message: forget_password_message_list.email_not_exist_error,
      };
    }

    // Get current app URL from configuration
    const app_url = await getCurrentConfig();

    // Send forget password email
    await sendEmail(
      email,
      forget_password_message_list.send_email_subject,
      forget_password(existingUser, app_url)
    );

    return {
      success: true,
      message: forget_password_message_list.success_forget_password,
    };
  } catch (err) {
    // Handle any errors that occur during email sending
    return {
      success: false,
      message: forget_password_message_list.internal_server_error,
      data: err,
    };
  }
};
