export default function Input({ placeholder, type = "text", ...props }) {
  return (
    <input
      required
      type={type}
      className="py-3 px-4 block border-gray-200 border-2 w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
      placeholder={placeholder}
      {...props}
    />
  );
}
