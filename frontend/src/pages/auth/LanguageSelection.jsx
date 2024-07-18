import { useEffect, useState } from "react";
import languages from "../../data/languages";
import { motion } from "framer-motion";
import ProcessingIndicator from "../../components/ProcessingIndicator";
import Card from "../../components/Card";
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
        className="text-gray-800 font-bold text-center sm:text-lg md:text-xl lg:text:2xl"
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
        className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 "
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
            <Card
              isLoading={isLoading}
              isSelected={currentSelectLanguage.includes(language.name)}
              onSelectLanguage={handleSelectLanguage}
              {...language}
            />
          </motion.li>
        ))}
      </motion.ul>

      <motion.button
        initial={{
          opacity: 0,
          x: 30,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          opacity: 0,
          x: 30,
        }}
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
      </motion.button>
    </div>
  );
}
