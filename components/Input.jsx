const Input = (props) => {
  const isError = props.error ? "border-red-500 hover:border-red-700" : "border-gray-300 hover:border-gray-700";
  const labelClassName = props.isRequired
    ? "block text-sm font-medium "
    : "block text-sm font-medium ";
  return (
    <>
      <div className="mb-4 relative w-full">
        <label htmlFor={props.name} className={labelClassName}>
          <span className="text-dark">{props.label}</span>
          {props.isRequired && <span className="text-red-600">*</span>}
        </label>
        <div className="relative">
          <input
            type={props.type}
            id={props.name}
            name={props.name}
            value={props.value}
            className={`p-2 w-full border ${isError} inputTextField bg-transparent `}
            onChange={props.handleChange}
            onBlur={props.handleChange}
            onKeyDown={props.onKeyDown}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            disabled={props.disabled || false}
          />
        </div>
        {props.error && (
          <p className="text-red-600 max-w-xs">{props.error}</p> // Set max-width for the error message container
        )}
      </div>
    </>
  );
};

export default Input;
