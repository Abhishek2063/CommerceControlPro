import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const PasswordInput = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const isError = props.error
    ? "border-red-500 hover:border-red-700"
    : "border-gray-300 hover:border-gray-700";
  const labelClassName = props.isRequired
    ? "block text-sm font-medium "
    : "block text-sm font-medium ";

  return (
    <div className="mb-4 relative">
      <label htmlFor={props.name} className={labelClassName}>
        <span className="text-dark">{props.label}</span>
        {props.isRequired && <span className="text-red-600">*</span>}
      </label>
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          id={props.name}
          name={props.name}
          value={props.value}
          className={`p-2 w-full border ${isError} inputTextField bg-transparent pr-11`}
          onChange={props.handleChange}
          onBlur={props.handleChange}
          onKeyDown={props.onKeyDown}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
        />
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
          onClick={(e) => {
            e.preventDefault();
            setIsVisible(!isVisible);
          }}
        >
          {isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </button>
      </div>
      {props.error && <p className="text-red-600 max-w-xs">{props.error}</p>}
    </div>
  );
};

export default PasswordInput;
