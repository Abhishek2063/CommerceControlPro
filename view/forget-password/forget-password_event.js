import { post } from "@/utils/api";
import { FORGET_PASSWORD_ACCOUNT } from "@/utils/api_routes";
import { public_routes } from "@/utils/app_routes";
import { message } from "antd";

const { fieldValidator } = require("@/utils/custom");

// Check Validation Function
const checkValidation = (field, value, type, maxLength, minLength, state) => {
  return fieldValidator(
    field,
    value,
    type,
    maxLength,
    minLength,
    state.password
  );
};

export const handleInputValue = (
  event,
  type,
  maxLength,
  minLength,
  state,
  setState,
  errorState,
  setErrorState
) => {
  let value = event.target.value;
  if (type === "password" || type === "email") {
    value = value.replace(/\s+/g, "");
  }
  let error = checkValidation(
    event.target.name,
    value,
    type,
    maxLength,
    minLength,
    state
  );
  setErrorState({
    ...errorState,
    [error.fieldNameErr]: error.errorMsg,
    [error.fieldCls]: error.setClassName,
  });
  setState({
    ...state,
    [event.target.name]: value,
  });
};

export const handleSubmit = async (
  event,
  state,
  setState,
  errorState,
  setErrorState,
  router
) => {
  event.preventDefault();
  const isFormValid = validateForm(state, setErrorState);
  if (isFormValid) {
    const newData = {
      email: state.email,
    };
    await post(FORGET_PASSWORD_ACCOUNT, newData)
      .then((response) => {
        if (response.data.success) {
          setState({
            email: "",
          });
          setErrorState({
            email: "",
          });
          message.success(response.data.message);
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  } else {
    message.error("Fix the highlighted error");
  }
};

export const validateForm = (state, setErrorState) => {
  const errors = {};
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      let type = "";
      let maxLength = null;
      let minLength = null;

      if (key === "email") {
        type = "email";
        maxLength = 255;
        minLength = 8;
      }

      const error = checkValidation(
        key,
        state[key],
        type,
        maxLength,
        minLength,
        state
      );
      if (error.errorMsg) {
        errors[error.fieldNameErr] = error.errorMsg;
        errors[error.fieldCls] = error.setClassName;
      }
    }
  }
  setErrorState(errors);
  return Object.keys(errors).length === 0; // Form is valid if no errors are present
};

export const handleKeyDown = (
  event,
  state,
  setState,
  errorState,
  setErrorState,
  router
) => {
  if (event.key === "Enter" || event.key === "enter") {
    handleSubmit(event, state, setState, errorState, setErrorState, router);
  }
};
