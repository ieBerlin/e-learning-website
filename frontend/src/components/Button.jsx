import ProcessingIndicator from "./ProcessingIndicator";
export default function Button({ label, isLoading, styles,...props }) {
  return (
    <button
      disabled={isLoading}
      style={{
        ...styles,
        backgroundColor: isLoading ? "#9ca3af" : "#3b82f6",
      }}
      className="my-4 rounded-md text-white font-semibold text-center p-2"
      {...props}
    >
      {isLoading ? <ProcessingIndicator /> : label}
    </button>
  );
}
