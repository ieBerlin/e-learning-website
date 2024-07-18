import { useEffect, useRef, useState } from "react";
export default function DropdownMenu({ label, content }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownMenuRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        dropdownMenuRef.current?.contains(event.target) ||
        buttonRef.current?.contains(event.target)
      ) {
        return;
      }
      setIsOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleMenu}
      >
        {label}
      </button>

      {isOpen && (
        <div
          ref={dropdownMenuRef}
          className="rounded-lg absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {" "}
          {content}
        </div>
      )}
    </div>
  );
}
