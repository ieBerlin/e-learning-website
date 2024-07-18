import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
export default function NavigationLayout() {
  return (
    <div className="flex flex-row w-full ">
      <div className=" w-[250px] bg-gray-100 min-h-screen mr-3 flex flex-col py-4 items-center gap-2 ">
        <img
          src="https://www.pluggedin.com/wp-content/uploads/2019/12/man-on-fire-1024x575.jpg"
          className="w-40 h-40 object-cover rounded-full"
          alt=""
        />
        {/* Nav links */}

        <CustomNavLink to="/user/profile" label="Profile" />
        <CustomNavLink to="/user/settings" label="Settings" />
        <CustomNavLink to="/user/upload-image" label="Upload Image" />
        <CustomNavLink to="/user/notifications" label="Notifications" />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
const CustomNavLink = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      style={{ width: "100%" }}
      className={({ isActive }) =>
        isActive
          ? "text-white bg-gray-400"
          : "bg-gray-200 hover:bg-gray-400 text-gray-800 hover:text-white "
      }
    >
      <h2 className="font-semibold capitalize text-center">{label}</h2>
    </NavLink>
  );
};
