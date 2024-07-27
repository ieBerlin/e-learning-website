import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import InstructorDropDownMenu from "../../../components/InstructorDropDownMenu";
import LoadingIndicator from "./../../../components/LoadingIndicator";
import StarsRating from "./../../../components/StarsRating";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const initialState = {
  button: false,
  div: false,
  dropDownMenu: false,
};

export default function CourseItem({
  descriptionVisibility = false,
  index,
  imageUrl,
  title,
  description,
  price,
  rating,
  ratingCount,
  instructor,
  instructorEmail,
  instructorSpecialization,
  instructorBio,
  totalCourses,
  totalStudents,
}) {
  const [isHover, setIsHover] = useState(initialState);
  const [isInstructorDataLoading, setIsInstructorDataLoading] = useState(false);
  const dropDownTriggerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInstructorDataLoading(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const dropDownContent = useMemo(
    () => (
      <AnimatePresence mode="wait">
        {isHover.dropDownMenu &&
          (!isInstructorDataLoading ? (
            <motion.div
              key="loading"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.4, type: "spring" }}
              initial="hidden"
              exit="hidden"
              animate="visible"
              className="flex items-center justify-center py-3 rounded bg-blue-300"
            >
              <LoadingIndicator />
            </motion.div>
          ) : (
            <InstructorDropDownMenu
              key="menu"
              triggerRef={dropDownTriggerRef}
              name={instructor}
              email={instructorEmail}
              specialization={instructorSpecialization}
              bio={instructorBio}
              totalCourses={totalCourses}
              totalStudents={totalStudents}
            />
          ))}
      </AnimatePresence>
    ),
    [
      isHover.dropDownMenu,
      isInstructorDataLoading,
      instructor,
      instructorEmail,
      instructorSpecialization,
      instructorBio,
      totalCourses,
      totalStudents,
    ]
  );

  const handleMouseOver = useCallback((key) => {
    setIsHover((prev) => ({ ...prev, [key]: true }));
  }, []);

  const handleMouseLeave = useCallback((key) => {
    setIsHover((prev) => ({ ...prev, [key]: false }));
  }, []);

  const purchasedButton = useMemo(
    () => (
      <button
        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 w-full rounded-b-md"
        onMouseOver={() => handleMouseOver("button")}
        onMouseLeave={() => handleMouseLeave("button")}
      >
        {isHover.button ? "Get Now" : `$${price}`}
      </button>
    ),
    [handleMouseLeave, handleMouseOver, isHover.button, price]
  );
  return (
    <Link to="">
      <li className="flex h-full flex-col relative">
        <div
          onMouseOver={() => handleMouseOver("div")}
          onMouseLeave={() => handleMouseLeave("div")}
          className="bg-white border border-gray-300 hover:border-gray-400 rounded-t-md flex flex-col gap-2"
        >
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              className="object-cover w-full h-full rounded-md"
              alt={title}
            />
            <div className="absolute inset-0 flex items-center justify-center duration-300 group">
              <div className="absolute inset-0 bg-gray-300 rounded-md opacity-0 group-hover:opacity-30 transition-opacity" />
              <ShoppingCartIcon className="bg-gray-500 rounded-full text-white w-8 h-8 p-1 absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="p-2">
            <h2
              style={
                !isHover.div
                  ? {
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }
                  : undefined
              }
              className="text-gray-800 font-semibold capitalize text-lg line-clamp-2"
            >
              {title}
            </h2>
            <div className="relative">
              <h3 className="font-medium text-sm truncate">
                By{" "}
                <span
                  ref={dropDownTriggerRef}
                  className="font-semibold text-sm text-blue-600 cursor-pointer"
                  onMouseOver={() => handleMouseOver("dropDownMenu")}
                  onMouseLeave={() => handleMouseLeave("dropDownMenu")}
                  aria-haspopup="true"
                  aria-expanded={isHover.dropDownMenu}
                >
                  {instructor}
                  {dropDownContent}
                </span>
              </h3>
            </div>
            <div className="flex flex-row items-center gap-1 justify-center">
              <h2 className="font-semibold text-base text-amber-800">
                {rating}
              </h2>
              <StarsRating rating={rating} />
              <h4 className="text-sm font-medium text-gray-700">
                ({ratingCount})
              </h4>
            </div>
            {!descriptionVisibility && (
              <AnimatePresence key={index}>
                {isHover.div && (
                  <motion.div
                    variants={{
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1 },
                      },
                      hidden: {
                        opacity: 0.4,
                        y: -30,
                        transition: { duration: 0.3 },
                      },
                    }}
                    transition={{
                      type: "spring",
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="bg-gray-100 p-2 rounded-md"
                  >
                    <h3 className="font-semibold text-gray-800">
                      Course Description
                    </h3>
                    <p className="text-gray-600 font-medium whitespace-pre-line">
                      {description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
        {purchasedButton}
      </li>
    </Link>
  );
}
