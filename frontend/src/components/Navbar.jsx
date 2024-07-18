import { forwardRef } from "react";
import logoImage from "/icon.png";
import {
  BellIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import DropdownMenu from "./dropdown-menu/DropdownMenu";
import DropdownItem from "./dropdown-menu/DropdownItem";
import { Cart, NotificationDropDown } from "./dropdown-menu/user-dropdowns";
// eslint-disable-next-line react/display-name
const Navbar = forwardRef((props, ref) => {
  return (
    <nav
      ref={ref}
      className="w-full fixed top-0 bg-blue-200 flex flex-row justify-between items-center shadow-md"
    >
      <Link to="/">
        <img className="w-14 ml-4" src={logoImage} alt="" />
      </Link>
      <div className="flex flex-row gap-3 items-center p-4">
        <DropdownMenu
          label={<HeartIcon className="w-6" />}
          content={<Cart label="Go to wishlist" />}
        />
        <DropdownMenu
          label={<ShoppingCartIcon className="w-6" />}
          content={<Cart label="Checkout" />}
        />
        <DropdownMenu
          label={<BellIcon className="w-6" />}
          content={<NotificationDropDown />}
        />
        <DropdownMenu
          label=<div className="w-6 h-6 bg-red-400 rounded-full" />
          content={
            <>
              <DropdownItem label="Profile" href="/user/profile" />
              <DropdownItem label="Settings" href="/user/settings" />
              <DropdownItem label="Notifications settings" href="/user/notifications" />
              <DropdownItem label="My Learning" href="/courses/all-courses" />
              <hr />
              <form
                method="POST"
                action="#"
                onSubmit={(e) => e.preventDefault()}
              >
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 font-medium hover:text-white hover:bg-indigo-500 rounded-md"
                  role="menuitem"
                  id="menu-item-3"
                >
                  Logout
                </button>
              </form>
            </>
          }
        />
      </div>
    </nav>
  );
});
export default Navbar;
