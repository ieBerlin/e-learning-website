/* eslint-disable react/prop-types */
import {
  LogoutModalContent,
  DeleteNotificationModalContent,
  ArchiveCourseModalContent,
  MyListsModalContent,
  ShareCourseModalContent,
} from "./";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { closeModal } from "../../features/modal/modalSlice";
import { ConfirmationModalContent } from "./modal-contents";

function Modal() {
  const { isOpen, type } = useSelector((state) => state.modal);
  if (!type || Object.keys(type).length === 0) {
    return;
  }
  return (
    <dialog open={isOpen}>
      <div className="fixed inset-0 z-[9999] flex justify-center items-center w-full h-full bg-black bg-opacity-50">
        <ModalContent />
      </div>
    </dialog>
  );
}
function ModalContent() {
  const type = useSelector((state) => state.modal.type);
  const dispatch = useDispatch();

  const MODAL_CONTENTS = {
    "logout-modal": {
      title: "Are You Sure You Want to Logout?",
      ...LogoutModalContent(),
    },
    "delete-notification-modal": {
      title: "Are You Sure You Want to Delete This Notification?",
      ...DeleteNotificationModalContent(),
    },
    "show-my-lists": {
      title: "View Your Saved Lists?",
      ...MyListsModalContent(),
    },
    "archive-course": {
      title: "Do You Want to Archive This Course?",
      ...ArchiveCourseModalContent(),
    },
    "share-course": {
      title: "Do You Want to Share This Course?",
      ...ShareCourseModalContent(),
    },
    confirmation: {
      ...ConfirmationModalContent(),
    },
  };

  switch (type) {
    case "logout-modal":
    case "delete-notification-modal":
    case "show-my-lists":
    case "archive-course":
    case "share-course":
    case "confirmation": {
      const { title, bodyContent, actionsButtons } = MODAL_CONTENTS[type] || {};
      return (
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
      );
    }
    default:
      return null;
  }
}
export default Modal;
