const Input = (props) => {
  const isError = props.error ? "border-red-500" : "";
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
            className={`p-2 w-full border ${isError} rounded-2xl inputTextField bg-transparent border-gray-900`}
            onChange={props.handleChange}
            onBlur={props.handleChange}
            onKeyDown={props.onKeyDown}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
          />
        </div>
        {props.error && <p className="text-red-600">{props.error}</p>}
      </div>
    </>
  );
};

export default Input;
