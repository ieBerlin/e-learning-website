import { forwardRef } from "react";
import logoImage from "/icon.png";
import {
  BellIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import DropdownMenu from "./dropdown-menu/DropdownMenu";
import {
  Cart,
  NotificationDropDown,
  UserDropDownMenu,
} from "./dropdown-menu/user-dropdowns";
import SearchInput from "./SearchInput";
// eslint-disable-next-line react/display-name
const Navbar = forwardRef((props, ref) => {
  return (
    <nav
      ref={ref}
      className="gap-3 w-full fixed top-0 bg-blue-600 flex flex-row justify-between items-center shadow-md z-[9999]"
    >
      <Link to="/">
        <div className=" w-14 ml-4">
          <img className="" src={logoImage} alt="" />
        </div>
      </Link>
      <Link to="">
        <h2 className="text-gray-900 font-semibold text-base">Categories</h2>
      </Link>
      <SearchInput />
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
          content={<UserDropDownMenu />}
        />
      </div>
    </nav>
  );
});
export default Navbar;
