import validator from "validator";
import { validation_message } from "../message_list/category_message_list";

export const validateCategoryInput = ({ name, description }) => {
  const errors = [];

  // Validate name
  if (!name || !validator.isLength(name, { min: 1, max: 255 })) {
    errors.push(validation_message.name_validation_message);
  }

  // Validate description
  if (!description) {
    errors.push(validation_message.description_validation_message);
  }

  return errors;
};
