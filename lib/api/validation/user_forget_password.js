import validator from "validator";

export const validateUserForgetPasswordInput = ({ email }) => {
  const errors = [];

  // Validate email
  if (
    !validator.isLength(email, { min: 1, max: 255 }) ||
    !validator.isEmail(email)
  ) {
    errors.push("Invalid email address.");
  }

  return errors;
};
