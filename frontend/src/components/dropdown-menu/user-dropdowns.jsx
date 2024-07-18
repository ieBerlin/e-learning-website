import { cartCourses } from "../../dummy_data/cartCourses";
import { notifications } from "./../../dummy_data/notfiications";
import { formatDate } from "./../../utils/formatDate";

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
    <div className="bg-white py-2 rounded-md">
      <h2 className="text-gray-800 font-medium px-2 pb-1">Notifications</h2>
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
            { index!== 3 && <hr />}
          </>
        ))}
      </ul>
    </div>
  );
}
