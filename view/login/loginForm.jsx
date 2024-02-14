"use client";
import Input from "@/components/Input";
import PasswordInput from "@/components/passwordInput";
import Button from "@/components/Button";
import { handleInputValue, handleKeyDown, handleSubmit } from "./login_event";

const LoginForm = (props) => {
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
            props.router,
            props.setLoader
          )
        }
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
            props.router,
            props.setLoader
          )
        }
      />

      <Button
        class="bg-blue-500 text-white px-4 py-2 rounded-full w-full mt-4"
        text="Sign Up"
        handleClick={(e) =>
          handleSubmit(
            e,
            props.state,
            props.setState,
            props.errorState,
            props.setErrorState,
            props.router,
            props.setLoader
          )
        }
      />
    </>
  );
};

export default LoginForm;
