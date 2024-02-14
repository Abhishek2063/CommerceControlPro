"use client";
import Input from "@/components/Input";
import { handleInputValue, handleKeyDown, handleSubmit } from "./forget-password_event";
import Button from "@/components/Button";

const ForgetPasswordForm = (props) => {
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

      <Button
        class="bg-blue-500 text-white px-4 py-2 rounded-full w-full mt-4"
        text="Submit"
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

export default ForgetPasswordForm;
