import { reset_password_message_list } from "@/lib/api/message_list/user_message_list";
import { sendEmail } from "@/lib/api/sendEmail";
import { reset_password_email } from "@/lib/email_content/reset_password_email";
import bcrypt from "bcrypt";
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

        // If the email is already taken, return an error response
        if (!existingUser) {
          return {
            success: false,
            message: reset_password_message_list.email_not_exist_error,
          };
        }
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
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
      return {
        success: true,
        message: reset_password_message_list.reset_password_success_message,
        data: updateUserPassword,
      };
    });
  } catch (err) {
    return {
      success: false,
      message: reset_password_message_list.internal_server_error,
      data: err,
    };
  }
};
