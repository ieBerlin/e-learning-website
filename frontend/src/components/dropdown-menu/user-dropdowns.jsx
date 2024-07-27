import { useDispatch } from "react-redux";
import { cartCourses } from "../../dummy_data/cartCourses";
import { openModal } from "../../features/modal/modalSlice";
import Modal from "../modal/Modal";
import { LogoutBodyContent } from "../modal/ModalContents";
import { notifications } from "./../../dummy_data/notifications";
import { formatDate } from "./../../utils/formatDate";
import DropdownItem from "./DropdownItem";

export function Cart({ label }) {
  return (
    <div className="relative">
      <ul className="flex flex-col gap-2 h-[300px] overflow-auto">
        {cartCourses.map((course, index) => (
          <li key={course}>
            <button className="flex flex-row gap-2 text-start outline-none">
              <img
                src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                className="h-10 w-10 object-cover rounded-sm"
                alt=""
              />
              <div className=" overflow-hidden">
                <h2 className="font-medium text-gray-800 text-nowrap text-ellipsis">
                  {course.name}
                </h2>
                <p className="text-gray-700 text-sm truncate">
                  {course.instructor}
                </p>
                <h2 className="text-gray-800 font-semibold">${course.price}</h2>
              </div>
            </button>
            {index !== 3 && <hr className="" />}
          </li>
        ))}
      </ul>
      <div className="w-full bottom-0 absolute z-10 bg-white text-center px-2 py-1 shadow-md">
        <button className="text-lg text-white font-semibold bg-gray-800 px-2 py-1 hover:bg-gray-700">
          {label}
        </button>
      </div>
    </div>
  );
}
export function NotificationDropDown() {
  return (
    <div className="bg-white rounded-md">
      <h2 className="text-indigo-700 px-2 py-1 bg-gray-300 font-semibold rounded-t-md">
        Notifications
      </h2>
      <ul className="bg-gray-50 p-2">
        {notifications.slice(0, 4).map((notification, index) => (
          <>
            <li key={notification.id}>
              <div
                className="grid gap-2 justify-between"
                style={{
                  gridTemplateColumns: "auto auto",
                }}
              >
                <h2 className="truncate text-gray-700 font-medium">
                  {notification.title}
                </h2>

                <h2 className="text-gray-700 font-medium">
                  {formatDate(notification.timestamp)}
                </h2>
              </div>
              <p className="truncate text-gray-500 font-light text-md">
                {notification.message}
              </p>
            </li>
            {index !== 3 && <hr />}
          </>
        ))}
      </ul>
      <hr />
      <a href="/user/view-notifications">
        <button className="w-full text-center font-semibold text-gray-800 hover:text-gray-900 py-1 bg-gray-300 hover:bg-gray-200">
          All Notifications
        </button>
      </a>
    </div>
  );
}
export function UserDropDownMenu() {
  const dispatch = useDispatch()
  return (
    <>
      <DropdownItem label="Profile" href="/user/profile" />
      <DropdownItem label="Settings" href="/user/settings" />
      <DropdownItem label="Notifications settings" href="/user/notifications" />
      <DropdownItem label="My Learning" href="/courses/all-courses" />
      <hr />
        <button
        onClick={()=>dispatch(openModal())}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 font-medium hover:text-white hover:bg-indigo-500 rounded-md"
          role="menuitem"
          id="menu-item-3"
        >
          Logout
        </button>
    </>
  );
}
