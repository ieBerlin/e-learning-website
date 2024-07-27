import { notifications as notificationsItems } from "./../../dummy_data/notifications";
import PageTemplate from "./../../components/PageTemplate";
import { TrashIcon } from "@heroicons/react/24/solid";
import notificationsSvgs from "../../dummy_data/notificationsSvgs.jsx";
import {
  dateAndTimeFormatter,
  filterNotifications,
} from "../../utils/formatDate.js";
import Modal from "../../components/modal/Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../features/modal/modalSlice.jsx";
import {
  ActionButton,
  CancelButton,
} from "../../components/modal/ActionsButtons.jsx";

const NotificationItem = ({ notification }) => {
  const { type } = notification;
  const icon =
    notificationsSvgs.find((item) => item.type === type) ??
    notificationsSvgs.find((item) => item.type === "notification");
  const Icon = icon?.svg;
  return Icon ? <Icon className={icon.classes} /> : null;
};

const NotificationCategory = ({ title, notifications }) => {
  const dispatch = useDispatch();

  return (
    <>
      <h3 className="font-semibold text-lg md:text-xl text-gray-600">
        {title}
      </h3>
      <ul className="flex flex-col gap-2  mb-10">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <div className="flex flex-row justify-between items-center border border-gray-700 w-full p-2 rounded-sm">
              <div className="flex flex-row items-center justify-start gap-2">
                <NotificationItem notification={notification} />
                <div className="text-start w-4/5">
                  <h2 className="font-semibold capitalize text-emerald-600">
                    {notification.title}
                  </h2>
                  <h3 className="text-gray-700 font-medium">
                    {dateAndTimeFormatter(notification.timestamp)}
                  </h3>
                  <p className="font-medium text-gray-500 capitalize">
                    {notification.message}
                  </p>
                </div>
              </div>
              <button onClick={() => dispatch(openModal())}>
                <TrashIcon className="bg-gray-50 text-gray-600 hover:text-gray-500 w-[25px] h-[25px]" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default function ViewNotificationsPage() {
  // const isOpen = useSelector(state=>state?.modal.isOpen)
  // console.log(isOpen)
  const notifications = filterNotifications(notificationsItems);
  return (
    <PageTemplate title="View Notifications">
      <Modal
        title="Delete notification"
        bodyContent={
          <h2>
            Hey User <br />
            Are you sure u want to delete this notitification ?
          </h2>
        }
        actionsButtons={[
          <ActionButton key="12" label="Save" />,
          <CancelButton />,
        ]}
      />
      {notifications.thisWeekNotifications.length > 0 && (
        <NotificationCategory
          title="Last 7 Days Notifications"
          notifications={notifications.thisWeekNotifications}
        />
      )}
      {notifications.thisMonthNotifications.length > 0 && (
        <NotificationCategory
          title="This Month's Notifications"
          notifications={notifications.thisMonthNotifications}
        />
      )}
      {notifications.otherDaysNotifications.length > 0 && (
        <NotificationCategory
          title="Older Notifications"
          notifications={notifications.otherDaysNotifications}
        />
      )}
    </PageTemplate>
  );
}
