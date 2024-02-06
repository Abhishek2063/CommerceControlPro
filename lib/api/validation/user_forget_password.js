import validator from "validator";
import { forget_password_message_list } from "../message_list/user_message_list";

export const validateUserForgetPasswordInput = ({ email }) => {
  const errors = [];

  // Validate email
  if (
    !validator.isLength(email, { min: 1, max: 255 }) ||
    !validator.isEmail(email)
  ) {
    errors.push(forget_password_message_list.email_validation_message);
  }

  return errors;
};
