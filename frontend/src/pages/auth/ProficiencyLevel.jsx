import { useState } from "react";
import proficiencyLevels from "../../data/proficiencyLevels";

import { motion } from "framer-motion";
import ProcessingIndicator from "../../components/ProcessingIndicator";
export default function ProficiencyLevel({ onConfirm }) {
  const [currentSelectProficiencyLevel, setCurrentSelectProficiencyLevel] =
    useState(null);
  const isLoading = false;
  function handleSelectProficiencyLevel(proficiencyLevel) {
    setCurrentSelectProficiencyLevel((prevState) => {
      if (prevState === proficiencyLevel) {
        return null;
      } else {
        return proficiencyLevel;
      }
    });
  }

  const buttonStyles = currentSelectProficiencyLevel
    ? {
        borderColor: "#a7f3d0",
        backgroundColor: "#d1fae5",
        color: "#10b981",
      }
    : {
        borderColor: "#d1d5db",
        backgroundColor: "#f3f4f6",
        color: "#6b7280",
      };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-5 bg-gray-50 relative">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{
          type: "spring",
        }}
        className="text-gray-800 font-bold text-center text-3xl"
      >
        My Proficiency is ...
      </motion.h2>
      <motion.ul
        initial="hiddenn"
        animate="visible"
        exit="hidden"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
              duration: 0.3,
            },
          },
        }}
        className="grid grid-cols-3 gap-3"
      >
        {proficiencyLevels.map((proficiencyLevel) => (
          <motion.li
            transition={{
              type: "spring",
            }}
            variants={{
              visible: {
                opacity: 1,
              },
              hidden: {
                opacity: 0,
              },
            }}
            key={proficiencyLevel.id}
          >
            <ProficiencyLevelComponent
              isLoading={isLoading}
              isSelected={
                currentSelectProficiencyLevel === proficiencyLevel.name
              }
              onSelectProficiencyLevel={handleSelectProficiencyLevel}
              {...proficiencyLevel}
            />
          </motion.li>
        ))}
      </motion.ul>

      <button
        onClick={() => onConfirm(currentSelectProficiencyLevel)}
        disabled={isLoading}
        style={buttonStyles}
        className="fixed bottom-8 right-8 py-2 px-4 text-sm font-semibold rounded-lg border"
      >
        {!currentSelectProficiencyLevel ? (
          "Skip"
        ) : isLoading ? (
          <ProcessingIndicator />
        ) : (
          "Next"
        )}
      </button>
    </div>
  );
}

function ProficiencyLevelComponent({
  name,
  icon,
  isLoading,
  isSelected,
  onSelectProficiencyLevel,
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
        onSelectProficiencyLevel(name);
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
      className="h-40 w-40 border-2 rounded-lg flex flex-col items-center justify-center"
      style={cardStyles}
    >
      <img
        src={icon}
        alt={`${name} flag`}
        className="h-20 w-20 object-contain rounded-md"
      />
      <h1 className="text-gray-600 mt-2 font-medium">{name}</h1>
    </button>
  );
}
