"use client";
import Input from "@/components/Input";
import {
  handleInputValue,
  handleKeyDown,
  handleSubmit,
} from "./regiater_form_event";
import PasswordInput from "@/components/passwordInput";
import Button from "@/components/Button";

const AdminRegistartionForm = (props) => {
  return (
    <>
      <div className="flex flex-wrap -mx-4 w-full">
        <div className="w-full md:w-1/2 px-4">
          <Input
            name="first_name"
            label="First Name"
            type="text"
            placeholder="Enter first name."
            value={props.state.first_name}
            isRequired="true"
            error={props.errorState.first_name}
            handleChange={(e) =>
              handleInputValue(
                e,
                "alphabetics",
                50,
                2,
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
        </div>
        <div className="w-full md:w-1/2 px-4">
          <Input
            name="last_name"
            label="Last Name"
            type="text"
            placeholder="Enter last name."
            value={props.state.last_name}
            isRequired="true"
            error={props.errorState.last_name}
            handleChange={(e) =>
              handleInputValue(
                e,
                "alphabetics",
                50,
                2,
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
        </div>
      </div>
      <div className="flex flex-wrap -mx-4 w-full">
        <div className="w-full md:w-1/2 px-4">
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
        </div>
        <div className="w-full md:w-1/2 px-4">
          <Input
            name="username"
            label="Username"
            type="text"
            placeholder="Enter username."
            value={props.state.username}
            isRequired="true"
            error={props.errorState.username}
            handleChange={(e) =>
              handleInputValue(
                e,
                "string",
                50,
                2,
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
        </div>
      </div>
      <div className="flex flex-wrap -mx-4 w-full">
        <div className="w-full md:w-1/2 px-4">
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
        </div>
        <div className="w-full md:w-1/2 px-4">
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
                props.router,
                props.setLoader
              )
            }
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 px-4">
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
      </div>
    </>
  );
};

export default AdminRegistartionForm;
