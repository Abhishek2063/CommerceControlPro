import { sendEmail } from "@/lib/api/sendEmail";
import { user_register_email } from "@/lib/email_content/user_registration_email";
import bcrypt from "bcrypt";
export const createUserAndSendEmail = async (
  first_name,
  last_name,
  email,
  password,
  username,
  role_id,
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
        if (existingUser) {
          return {
            success: false,
            message: "Email already exists. Please use a different email.",
          };
        }
      }

      if (username) {
        const existingUser = await tx.users.findUnique({
          where: { username },
        });

        // If the username is already taken, return an error response
        if (existingUser) {
          return {
            success: false,
            message: "Username already exists. Please use a different username.",
          };
        }
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const newUser = await tx.users.create({
        data: {
          first_name,
          last_name,
          email,
          password: hashedPassword,
          username,
          role_id,
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
        "Account Information",
        user_register_email({
          first_name,
          last_name,
          email,
          username,
          password,
        })
      );
      return {
        success: true,
        message: "user created success.",
        data: newUser,
      };
    });
  } catch (err) {
    return {
      success: false,
      message: "Transaction server error",
      data: err,
    };
  }
};
