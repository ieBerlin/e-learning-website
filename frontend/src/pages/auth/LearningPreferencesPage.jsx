import { useState } from "react";
import LanguageSelection from "./LanguageSelection";
import ProficiencyLevel from "./ProficiencyLevel";
import { AnimatePresence } from "framer-motion";

export default function LearningPreferencesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  function handleSelectLanguage(data) {
    console.log(data);
    setCurrentPage(2);
  }
  function handleSubmit(data) {
    console.log(data);
  }
  return (
    <AnimatePresence mode="wait">
      {currentPage === 1 ? (
        <LanguageSelection
          onConfirm={handleSelectLanguage}
          key="LanguageSelection"
        />
      ) : (
        <ProficiencyLevel key="ProficiencyLevel" onConfirm={handleSubmit} />
      )}
    </AnimatePresence>
  );
}
