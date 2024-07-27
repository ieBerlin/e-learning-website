import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice";
function Modal({ title, bodyContent, actionsButtons }) {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <dialog open={isOpen}>
      <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-2xl bg-gray-100 rounded-lg shadow max-h-[90%]  overflow-auto">
          <div className="flex items-center justify-between p-2 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">{title}</h3>
            <button
              onClick={() => dispatch(closeModal())}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">{bodyContent} </div>
          <div className="flex items-center p-4 border-t border-gray-200 rounded-b gap-3">
            {actionsButtons.map((button) => button)}
          </div>
        </div>
      </div>
    </dialog>
  );
}
export default Modal;
