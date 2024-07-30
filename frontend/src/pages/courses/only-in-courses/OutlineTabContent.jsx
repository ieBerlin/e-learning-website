import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function OutlineTabContent({ courseOutline }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <main className="px-4 my-5">
      <h2 className="text-lg font-semibold text-black my-1">Learn</h2>
      <h5 className="text-base text-gray-600 font-light mt-1 mb-5">
        Learn core concepts and get hands-on with key skills.
      </h5>
      {courseOutline.map((section, index) => (
        <div key={index}>
          <button
            type="button"
            className="w-full"
            onClick={() => toggleExpand(index)}
          >
            <div
              className={`grid bg-gray-50 border-gray-200 hover:border-gray-300 ${
                index === 0 && expandedIndex !== 0
                  ? "border border-b-transparent"
                  : "border"
              }`}
              style={{
                gridTemplateColumns: "5fr 2fr",
              }}
            >
              <div className="p-2 flex gap-4 items-center">
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-900 transform transition-transform ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                />
                <h2 className="text-gray-800 text-lg font-medium tracking-wide">
                  {section.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <h2 className="text-gray-700 text-sm font-light">
                  {section.lectures} Lectures |
                </h2>
                <h2 className="text-gray-700 text-sm font-light">
                  {section.duration}
                </h2>
              </div>
            </div>
          </button>
          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                className="flex flex-col gap-2 px-8 border-gray-200 hover:border-gray-300 border "
              >
                <ul className="py-4 flex flex-col gap-1">
                  {section.details.map((detail, i) => (
                    <li key={i}>
                      <div className="bg-white flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-4 justify-start">
                          <VideoCameraIcon className="text-gray-900 w-5 h-5" />
                          <h2 className="text-base font-light text-gray-800">
                            {detail.description}
                          </h2>
                        </div>
                        <h3 className="text-sm font-medium text-gray-800">
                          {detail.duration}
                        </h3>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </main>
  );
}
