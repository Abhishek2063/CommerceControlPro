import { reset_password_message_list } from "@/lib/api/message_list/user_message_list"; // Import message list for reset password
import { sendEmail } from "@/lib/api/sendEmail"; // Import sendEmail function for sending emails
import { reset_password_email } from "@/lib/email_content/reset_password_email"; // Import reset password email template
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

/**
 * Service function for updating user password and sending reset password email.
 * @param {string} email - The email of the user.
 * @param {string} password - The new password for the user.
 * @param {PrismaClient} prisma - The Prisma client instance.
 * @returns {Object} - Object containing success status, message, and data.
 */
export const userUpdatePasswordAndSendEmail = async (
  email,
  password,
  prisma
) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Check if the email already exists in the database
      if (email) {
        const existingUser = await tx.users.findUnique({
          where: { email },
        });

        // If the email is not found, return an error response
        if (!existingUser) {
          return {
            success: false,
            message: reset_password_message_list.email_not_exist_error,
          };
        }
      }

      // Hash the new password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password in the database
      const updateUserPassword = await tx.users.update({
        where: {
          email,
        },
        data: {
          password: hashedPassword,
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

      // Send reset password email to the user
      await sendEmail(
        email,
        reset_password_message_list.reset_password_email_subject,
        reset_password_email({
          first_name: updateUserPassword.first_name,
          last_name: updateUserPassword.last_name,
          email,
          username: updateUserPassword.username,
          password,
        })
      );

      // Return success response
      return {
        success: true,
        message: reset_password_message_list.reset_password_success_message,
        data: updateUserPassword,
      };
    });
  } catch (err) {
    // Handle any errors that occur during the update password process
    return {
      success: false,
      message: reset_password_message_list.internal_server_error,
      data: err,
    };
  }
};
