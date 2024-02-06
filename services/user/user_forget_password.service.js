import { sendEmail } from "@/lib/api/sendEmail";
import { forget_password } from "@/lib/email_content/forget_password_email";
import { getCurrentConfig } from "@/config/config";
import { forget_password_message_list } from "@/lib/api/message_list/user_message_list";
export const sendEmailForForgetPassword = async (email, prisma) => {
  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
    // Check if the email already exists in the database
    if (email) {
      // If the email is already taken, return an error response
      if (!existingUser) {
        return {
          success: false,
          message: forget_password_message_list.email_not_exist_error,
        };
      }
    }

    const app_url = await getCurrentConfig();

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
    return {
      success: false,
      message: forget_password_message_list.internal_server_error,
      data: err,
    };
  }
};
