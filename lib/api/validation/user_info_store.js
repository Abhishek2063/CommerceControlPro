import validator from "validator";

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
    errors.push("First name must be between 1 and 50 characters.");
  }

  // Validate last_name
  if (last_name && !validator.isLength(last_name, { min: 1, max: 50 })) {
    errors.push("Last name must be between 1 and 50 characters.");
  }

  // Validate email
  if (
    !validator.isLength(email, { min: 1, max: 255 }) ||
    !validator.isEmail(email)
  ) {
    errors.push("Invalid email address.");
  }

  // Validate password
  if (!validator.isLength(password, { min: 8, max: 25 })) {
    errors.push("Password must be between 8 and 25 characters.");
  }

  // Validate username
  if (!validator.isLength(username, { min: 4, max: 255 })) {
    errors.push("Username must be between 4 and 255 characters.");
  }

  // Validate role_id
  if (!validator.isInt(String(role_id))) {
    errors.push("Role ID must be an integer.");
  }

  return errors;
};
