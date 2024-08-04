import { useDispatch } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice";

export function ActionButton({ label = "Save", isLoading, onConfirm }) {
  return (
    <button
      onClick={onConfirm}
      className={`px-2 py-1 rounded-md font-medium text-md lg:text-lg ${
        isLoading
          ? "bg-gray-300 text-gray-700"
          : "bg-orange-500 hover:bg-orange-400 text-white"
      }`}
    >
      {label}
    </button>
  );
}
export function CancelButton({ isLoading }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(closeModal())}
      className={`px-2 py-1 rounded-md font-medium text-md lg:text-lg ${
        isLoading
          ? "bg-gray-300 text-gray-700"
          : "bg-gray-500 hover:bg-gray-400 text-white"
      }`}
    >
      Cancel
    </button>
  );
}
