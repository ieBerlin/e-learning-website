import ProcessingIndicator from "./ProcessingIndicator";
export default function Button({ label, isLoading, props }) {
  return (
    <button
      disabled={isLoading}
      style={
        isLoading
          ? {
              backgroundColor: "#9ca3af",
            }
          : {
              backgroundColor: "#3b82f6",
            }
      }
      className="my-4 rounded-md text-white font-semibold w-full text-center p-2"
      {...props}
    >
      {isLoading ? <ProcessingIndicator /> : label}
    </button>
  );
}
