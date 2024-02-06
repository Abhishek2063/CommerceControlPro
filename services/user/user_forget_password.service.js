import { sendEmail } from "@/lib/api/sendEmail";
import { forget_password } from "@/lib/email_content/forget_password_email";
import { getCurrentConfig } from "@/config/config";
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
          message: "Email is not exists. Please use a correct email address.",
        };
      }
    }

    const app_url = await getCurrentConfig();

    await sendEmail(
      email,
      "Forget Password Verification",
      forget_password(existingUser,app_url)
    );
    return {
      success: true,
      message: "Email send to your email address for verification.",
    };
  } catch (err) {
    return {
      success: false,
      message: "Internal server error",
      data: err,
    };
  }
};
