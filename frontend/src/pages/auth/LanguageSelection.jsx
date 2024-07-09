import { useEffect, useState } from "react";
import languages from "../../data/languages";
import { motion } from "framer-motion";
import ProcessingIndicator from "../../components/ProcessingIndicator";
export default function LanguageSelection({ onConfirm }) {
  const [currentSelectLanguage, setCurrentSelectLanguage] = useState([]);
  const isLoading = false;
  function handleSelectLanguage(language) {
    setCurrentSelectLanguage((prevState) => {
      if (prevState.includes(language)) {
        return prevState.filter((item) => item !== language);
      } else {
        return [...prevState, language];
      }
    });
  }
  useEffect(() => {
    return () => {
      console.log("destroyed");
    };
  }, []);
  const buttonStyles =
    currentSelectLanguage.length > 0
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
          duration: 1,
        }}
        className="text-gray-800 font-bold text-center text-3xl"
      >
        I want to learn ...
      </motion.h2>
      <motion.ul
        initial="hidden"
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
        {languages.map((language) => (
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
            key={`language-${language.id}`}
          >
            <LanguageCard
              isLoading={isLoading}
              isSelected={currentSelectLanguage.includes(language.name)}
              onSelectLanguage={handleSelectLanguage}
              {...language}
            />
          </motion.li>
        ))}
      </motion.ul>

      <button
        onClick={() => onConfirm(currentSelectLanguage)}
        disabled={isLoading}
        style={buttonStyles}
        className="fixed bottom-8 right-8 py-2 px-4 text-sm font-semibold rounded-lg border"
      >
        {!currentSelectLanguage.length > 0 ? (
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

function LanguageCard({ name, icon, isLoading, isSelected, onSelectLanguage }) {
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
