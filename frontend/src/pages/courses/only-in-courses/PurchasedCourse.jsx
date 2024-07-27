import { PlayIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PurchasedCourse({ course }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link to="">
      <li
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="border border-transparent hover:border-gray-400 relative bg-white shadow-md cursor-pointer rounded-md overflow-hidden flex flex-col"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        <div className="relative flex-grow">
          <AnimatePresence>
            {isHover && (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                initial="hidden"
                exit="hidden"
                animate="visible"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gray-400 opacity-40"></div>
                <PlayIcon className="w-10 h-10 text-gray-700" />
              </motion.div>
            )}
          </AnimatePresence>
          <img
            src={course.imageUrl}
            alt={course.title}
            className="object-cover max-h-[150px] w-full"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-gray-700 font-light text-sm mb-1">
            {course.title}
          </h3>
          <h2 className="font-semibold text-base text-gray-900 line-clamp-2 mb-2">
            121. {course.currentLesson.title}
          </h2>
          <div className="mt-auto">
            {" "}
            {/* Push the progress bar to the bottom */}
            <ProgressBar progress={course.currentLesson.progress} />
            <p className="text-sm text-purple-700 font-semibold text-center mt-2">
              Finish the course to get your certification
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}
