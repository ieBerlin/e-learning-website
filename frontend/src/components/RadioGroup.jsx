
const RadioGroup = ({ title, name, options }) => {
  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-gray-800 text-base lg:text-lg font-medium mb-2">
        {title}
      </h2>
      <div className="flex justify-center items-center gap-4 lg:gap-6">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              className="form-radio h-4 w-4 text-blue-600"
              defaultChecked={option.defaultChecked}
            />
            <span className="font-semibold text-sm lg:text-base">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
