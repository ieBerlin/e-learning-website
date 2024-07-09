export default function ErrorMessage({ title, message }) {
  return (
    <div
      className="bg-red-100 border-s-4 border-red-500 p-4 my-2 "
      style={{
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
      }}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 ">
            {/* SVG */}
          </span>
        </div>
        <div className="ms-3">
          <h3 className="text-gray-800 font-semibold capitalize">
            {title || "An error occurred"}
          </h3>
          <p className="text-sm text-gray-700 capitalize">
            {message || "An error occurred while processing your request."}
          </p>
        </div>
      </div>
    </div>
  );
}
