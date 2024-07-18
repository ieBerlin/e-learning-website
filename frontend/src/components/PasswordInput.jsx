import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function PasswordInput({ placeholder, readOnly, ...props }) {
  const [isShown, setIsShown] = useState(false);
  const handlePasswordInputShow = () => {
    setIsShown((prevState) => !prevState);
  };
  const eyeStyle =
    "w-5 h-5 absolute bg-white bottom-1/2 right-2 translate-y-1/2 text-gray-400 cursor-pointer";
  return (
    <>
      <div className="relative w-full">
        <input
          required
          type={isShown ? "text" : "password"}
          className=" flex w-full py-3 px-4  border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          readOnly={readOnly}
          style={
            readOnly
              ? {
                  borderColor: "#e5e7eb",
                }
              : undefined
          }
          placeholder={placeholder}
          {...props}
        />
        {isShown ? (
          <EyeIcon onClick={handlePasswordInputShow} className={eyeStyle} />
        ) : (
          <EyeSlashIcon
            onClick={handlePasswordInputShow}
            className={eyeStyle}
          />
        )}
      </div>
    </>
  );
}
