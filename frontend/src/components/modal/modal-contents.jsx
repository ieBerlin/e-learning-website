import listItems from "../../dummy_data/lists";
import { useFetch } from "../../utils/http";
import { ActionButton, CancelButton } from "./ActionsButtons";
import { useSelector } from "react-redux";
import LoadingIndicator from "./../LoadingIndicator";
import { useDispatch } from "react-redux";
import {
  closeModal,
  openConfirmationModal,
} from "../../features/modal/modalSlice";
export function ConfirmationModalContent() {
  const { message } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return {
    title: message,
    bodyContent: (
      <div>
        <p className="text-gray-900 font-light">{message}</p>
      </div>
    ),
    actionsButtons: [
      <ActionButton
        key="confirmation-ok"
        label="OK"
        onConfirm={() => dispatch(closeModal())}
      />,
    ],
  };
}

export function LogoutModalContent() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(closeModal());
    dispatch(
      openConfirmationModal({ message: "You have successfully logged out." })
    );
  };

  return {
    bodyContent: (
      <div>
        <p className="text-gray-900 font-light">
          Are you sure you want to log out?
        </p>
      </div>
    ),
    actionsButtons: [
      <ActionButton
        key="logout-confirm"
        label="Logout"
        onConfirm={handleLogout}
      />,
      <CancelButton key="logout-cancel" />,
    ],
  };
}

export function DeleteNotificationModalContent() {
  const { isFetching } = useFetch(undefined, undefined);
  const dispatch = useDispatch();
  const handleDelete = () => {
    // Perform delete logic here
    dispatch(closeModal());
    dispatch(
      openConfirmationModal({ message: "Notification has been deleted." })
    );
  };

  return {
    bodyContent: (
      <div>
        <p className="text-gray-900 font-light">
          Are you sure you want to delete this notification? This action cannot
          be undone.
        </p>
      </div>
    ),
    actionsButtons: [
      <ActionButton
        isLoading={isFetching}
        key="delete-confirm"
        label="Delete"
        onConfirm={handleDelete}
      />,
      <CancelButton isLoading={isFetching} key="delete-cancel" />,
    ],
  };
}

export function ArchiveCourseModalContent() {
  const dispatch = useDispatch();

  const handleArchive = () => {
    // Perform archive logic here
    dispatch(closeModal());
    dispatch(openConfirmationModal({ message: "Course has been archived." }));
  };

  return {
    bodyContent: (
      <div>
        <p className="text-gray-900 font-light">
          Are you sure you want to archive this course? You can access it later
          in your archived courses section.
        </p>
      </div>
    ),
    actionsButtons: [
      <ActionButton
        key="archive-confirm"
        label="Archive"
        onConfirm={handleArchive}
      />,
      <CancelButton key="archive-cancel" />,
    ],
  };
}

export function MyListsModalContent() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.modal);
  const { isFetching, data: listsData } = useFetch(undefined, listItems);
  const handleSave = () => {
    // Perform save logic here
    dispatch(closeModal());
    dispatch(openConfirmationModal({ message: "Your lists have been saved." }));
  };

  let bodyContent;
  let actionsButtons = [<CancelButton key="view-cancel" />];

  if (isFetching) {
    bodyContent = (
      <div className="flex items-center justify-center w-full py-10">
        <LoadingIndicator
          dimension="w-8 h-8"
          fill="#d1d5db"
          stroke="fill-gray-700"
        />
      </div>
    );
  } else if (!data || !data.courseId) {
    bodyContent = (
      <h3 className="text-gray-800 font-semibold">
        Nothing to show for the moment
      </h3>
    );
  } else if (listsData) {
    bodyContent = (
      <ul className="flex flex-col gap-1">
        {listsData.map((item) => (
          <li key={item.id}>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                name="list"
                defaultChecked={item.isChecked}
              />
              <h3>{item.name}</h3>
            </div>
          </li>
        ))}
      </ul>
    );
    actionsButtons = [
      <ActionButton key="view-save" label="Save" onConfirm={handleSave} />,
      <CancelButton key="view-cancel" />,
    ];
  }

  return {
    bodyContent: <div>{bodyContent}</div>,
    actionsButtons,
  };
}

export function ShareCourseModalContent() {
  const dispatch = useDispatch();

  const handleShare = () => {
    // Perform share logic here
    dispatch(closeModal());
    dispatch(openConfirmationModal({ message: "Course has been shared." }));
  };

  return {
    bodyContent: (
      <div>
        <p className="text-gray-900 font-light">
          Do you want to share this course? You can share it via email, social
          media, or other platforms.
        </p>
      </div>
    ),
    actionsButtons: [
      <ActionButton
        key="share-confirm"
        label="Share"
        onConfirm={handleShare}
      />,
      <CancelButton key="share-cancel" />,
    ],
  };
}
