import { post } from "@/utils/api";
import { REGISTER_ACCOUNT } from "@/utils/api_routes";
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
  router,
  setLoader
) => {
  event.preventDefault();
  const isFormValid = validateForm(state, setErrorState);
  if (isFormValid) {
    setLoader(true);
    const newData = {
      first_name: state.first_name,
      last_name: state.last_name,
      email: state.email,
      password: state.password,
      username: state.username,
      role_id: 1,
    };
    await post(REGISTER_ACCOUNT, newData)
      .then((response) => {
        if (response.data.success) {
          setState({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            username: "",
          });
          setErrorState({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            username: "",
          });
          setLoader(false);
          message.success(response.data.message);
          router.push(public_routes.login);
        } else {
          setLoader(false);
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        setLoader(false);
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
      if (key === "first_name" || key === "last_name") {
        type = "alphabetics";
        maxLength = 50;
        minLength = 2;
      }
      if (key === "email") {
        type = "email";
        maxLength = 255;
        minLength = 8;
      }
      if (key === "username") {
        type = "string";
        maxLength = 50;
        minLength = 2;
      }
      if (key === "password" || key === "confirm_password") {
        type = "password";
        maxLength = 50;
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
  router,
  setLoader
) => {
  if (event.key === "Enter" || event.key === "enter") {
    handleSubmit(
      event,
      state,
      setState,
      errorState,
      setErrorState,
      router,
      setLoader
    );
  }
};
