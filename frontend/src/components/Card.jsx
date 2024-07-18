import { useState } from "react";

export default function Card({
  name,
  icon,
  isLoading,
  isSelected,
  onSelectLanguage,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyles = isLoading
    ? {
        borderColor: "#d1d5db",
        backgroundColor: "#f3f4f6",
      }
    : isSelected
    ? {
        borderColor: "#4ade80",
        backgroundColor: "#d1fae5",
      }
    : isHovered
    ? {
        borderColor: "#d1d5db",
        backgroundColor: "#f3f4f6",
      }
    : {
        borderColor: "#e5e7eb",
        backgroundColor: "#f9fafb",
      };

  return (
    <button
      type="button"
      onClick={(e) => {
        if (isLoading) {
          return e.preventDefault();
        }
        onSelectLanguage(name);
      }}
      onMouseEnter={(e) => {
        if (isLoading) {
          return e.preventDefault();
        }
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        if (isLoading) {
          return e.preventDefault();
        }
        setIsHovered(false);
      }}
      className="w-20 md:w-24 lg:w-28 border-2 rounded-lg flex flex-col items-center justify-center px-6 py-2"
      style={cardStyles}
    >
      <img src={icon} alt={`${name} flag`} />
      <h3 className="text-gray-600 mt-1 font-medium text-sm md:text-md ">
        {name}
      </h3>
    </button>
  );
}
