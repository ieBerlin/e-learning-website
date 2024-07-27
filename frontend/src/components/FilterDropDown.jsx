import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function FilterDropdown({
  category,
  labelButtonClasses,
  label = "Filter",
  onSubmit,
  children,
}) {
  const dropdownMenuRef = useRef(null);
  const buttonRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !buttonRef.current ||
        buttonRef.current.contains(event.target) ||
        !dropdownMenuRef.current ||
        dropdownMenuRef.current.contains(event.target)
      ) {
        return;
      }
      setIsDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const htmlEvent = dropdownMenuRef.current;
    return () => {
      if (isDropdownOpen) {
        const formElements = htmlEvent.querySelectorAll("input");
        const formData = Array.from(formElements).reduce((acc, element) => {
          if (element.type === "checkbox") {
            acc[element.id] = element.checked;
          } else if (element.type === "radio") {
            if (element.checked) {
              acc[element.name] = element.id;
            }
          }
          return acc;
        }, {});
        onSubmit(category, formData);
      }
    };
  }, [category, isDropdownOpen, onSubmit]);
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="relative" ref={dropdownMenuRef}>
      <button
        className={` text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${labelButtonClasses}`}
        type="button"
        ref={buttonRef}
        onClick={toggleDropdown}
      >
        <h3 className="text-white font-semibold">{label}</h3>
        <svg
          className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            transition={{ duration: 0.8, type: "spring" }}
            variants={{
              hidden: {
                opacity: 0,
                height: 0,
              },
              visible: {
                opacity: 1,
                height: "auto",
              },
            }}
            initial="hidden"
            exit="hidden"
            animate="visible"
            className="min-w-[200px] ring-1 ring-inset ring-gray-300 z-10 absolute right-0 mt-1 w-fit bg-white divide-y divide-gray-100 rounded-sm shadow"
            style={{ top: "calc(100% + 5px)" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FilterDropdown;
