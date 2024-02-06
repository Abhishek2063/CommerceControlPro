import validator from "validator";
import { reset_password_message_list } from "../message_list/user_message_list";

export const validateUserRestPasswordInput = ({ email, password }) => {
  const errors = [];

  // Validate email
  if (
    !validator.isLength(email, { min: 1, max: 255 }) ||
    !validator.isEmail(email)
  ) {
    errors.push(reset_password_message_list.email_validation_message);
  }

  // Validate password
  if (!validator.isLength(password, { min: 8, max: 25 })) {
    errors.push(reset_password_message_list.password_validation_message);
  }

  return errors;
};
