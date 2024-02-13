"use client";
import Input from "@/components/Input";
import {
  handleInputValue,
  handleKeyDown,
  handleSubmit,
} from "./reset_password_event";
import PasswordInput from "@/components/passwordInput";
import Button from "@/components/Button";

const ResetPasswordForm = (props) => {
  return (
    <>
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter email."
        value={props.state.email}
        isRequired="true"
        error={props.errorState.email}
        handleChange={(e) =>
          handleInputValue(
            e,
            "email",
            255,
            8,
            props.state,
            props.setState,
            props.errorState,
            props.setErrorState
          )
        }
        maxLength="255"
        handleKeyDown={(e) =>
          handleKeyDown(
            e,
            props.state,
            props.setState,
            props.errorState,
            props.setErrorState,
            props.router
          )
        }
        disabled
      />

      <PasswordInput
        name="password"
        label="Password"
        placeholder="Enter password."
        value={props.state.password}
        isRequired="true"
        error={props.errorState.password}
        handleChange={(e) =>
          handleInputValue(
            e,
            "string",
            50,
            8,
            props.state,
            props.setState,
            props.errorState,
            props.setErrorState
          )
        }
        maxLength="50"
        handleKeyDown={(e) =>
          handleKeyDown(
            e,
            props.state,
            props.setState,
            props.errorState,
            props.setErrorState,
            props.router
          )
        }
      />

      <PasswordInput
        name="confirm_password"
        label="Confirm Password"
        placeholder="Enter confirm password."
        value={props.state.confirm_password}
        isRequired="true"
        error={props.errorState.confirm_password}
        handleChange={(e) =>
          handleInputValue(
            e,
            "string",
            50,
            8,
            props.state,
            props.setState,
            props.errorState,
            props.setErrorState
          )
        }
        maxLength="50"
        handleKeyDown={(e) =>
          handleKeyDown(
            e,
            props.state,
            props.setState,
            props.errorState,
            props.setErrorState,
            props.router
          )
        }
      />

      <Button
        class="bg-blue-500 text-white px-4 py-2 rounded-full w-full mt-4"
        text="Reset Password"
        handleClick={(e) =>
          handleSubmit(
            e,
            props.state,
            props.setState,
            props.errorState,
            props.setErrorState,
            props.router
          )
        }
      />
    </>
  );
};

export default ResetPasswordForm;
