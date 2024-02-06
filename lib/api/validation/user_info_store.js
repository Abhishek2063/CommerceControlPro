import validator from "validator";
import { user_create_message_list } from "../message_list/user_message_list";

export const validateUserInput = ({
  first_name,
  last_name,
  email,
  password,
  username,
  role_id,
}) => {
  const errors = [];

  // Validate first_name
  if (!validator.isLength(first_name, { min: 1, max: 50 })) {
    errors.push(user_create_message_list.first_name_validation_message);
  }

  // Validate last_name
  if (last_name && !validator.isLength(last_name, { min: 1, max: 50 })) {
    errors.push(user_create_message_list.last_name_validation_message);
  }

  // Validate email
  if (
    !validator.isLength(email, { min: 1, max: 255 }) ||
    !validator.isEmail(email)
  ) {
    errors.push(user_create_message_list.email_validation_message);
  }

  // Validate password
  if (!validator.isLength(password, { min: 8, max: 25 })) {
    errors.push(user_create_message_list.password_validation_message);
  }

  // Validate username
  if (!validator.isLength(username, { min: 4, max: 255 })) {
    errors.push(user_create_message_list.username_validation_message);
  }

  // Validate role_id
  if (!validator.isInt(String(role_id))) {
    errors.push(user_create_message_list.role_id_validation_message);
  }

  return errors;
};
