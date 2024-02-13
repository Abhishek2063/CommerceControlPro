import React from "react";

const Button = (props) => {
  return (
    <>
    <div className="w-full">
    <button type="button" className={props.class} onClick={props.handleClick}>
        {props.text}
      </button>
    </div>
      
    </>
  );
};

export default Button;
