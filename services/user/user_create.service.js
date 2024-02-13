import { user_create_message_list } from "@/lib/api/message_list/user_message_list"; // Import message list for user creation
import { sendEmail } from "@/lib/api/sendEmail"; // Import sendEmail function for sending registration email
import { user_register_email } from "@/lib/email_content/user_registration_email"; // Import email content for user registration
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

/**
 * Create a new user in the database and send registration email.
 * @param {string} first_name - First name of the user.
 * @param {string} last_name - Last name of the user.
 * @param {string} email - Email address of the user.
 * @param {string} password - Password of the user.
 * @param {string} username - Username of the user.
 * @param {number} role_id - ID of the user's role.
 * @param {PrismaClient} prisma - Prisma client instance.
 * @returns {Object} - Object containing success status, message, and data.
 */
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
            message: user_create_message_list.email_exist_error_message,
          };
        }
      }

      // Check if the username already exists in the database
      if (username) {
        const existingUser = await tx.users.findUnique({
          where: { username },
        });

        // If the username is already taken, return an error response
        if (existingUser) {
          return {
            success: false,
            message: user_create_message_list.username_exist_error_message,
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
        // Select specific fields to include in the response
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          username: true,
          role: {
            select: {
              id: true,
              role: true,
            },
          },
        },
      });

      // Send registration email
      await sendEmail(
        email,
        user_create_message_list.user_create_email_subject,
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
        message: user_create_message_list.success_user_create_message,
        data: newUser,
      };
    });
  } catch (err) {
    // Handle any errors that occur during user creation
    return {
      success: false,
      message: user_create_message_list.internal_server_error,
      data: err,
    };
  }
};
