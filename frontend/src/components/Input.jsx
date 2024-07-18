export default function Input({
  placeholder,
  readOnly,
  label,
  type = "text",
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block my-2 font-semibold text-sm text-gray-700">
          {label}
        </label>
      )}
      <input
        required
        type={type}
        className="py-3 px-4 block border-gray-200 border-2 w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        readOnly={readOnly}
        style={
          readOnly
            ? {
                borderColor: "#e5e7eb",
              }
            : undefined
        }
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
