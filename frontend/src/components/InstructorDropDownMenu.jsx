import { useEffect, useRef, useState } from "react";
import FranceFlag from "/france-svgrepo-com.svg";
import GermanyFlag from "/germany-svgrepo-com.svg";
import SaudiArabiaFlag from "/saudi-arabia-svgrepo-com.svg";
import UKFlag from "/united-kingdom-uk-svgrepo-com.svg";
import SpainFlag from "/spain-svgrepo-com.svg";
import { BookOpenIcon, UsersIcon } from "@heroicons/react/24/solid";

const flags = {
  france: FranceFlag,
  germany: GermanyFlag,
  "saudi-arabia": SaudiArabiaFlag,
  "united-kingdom": UKFlag,
  spain: SpainFlag,
};

function getFlag(country) {
  return flags[country.toLowerCase()] || null;
}

export default function InstructorDropDownMenu({
  name = "Donald Trump",
  email = "DonaldTrump@gmail.com",
  specialization = "France",
  totalCourses = 10,
  totalStudents = 1200,
  bio = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias tenetur voluptas eius, eos dolor ducimus delectus temporibus ipsa odio quibusdam autem nam blanditiis praesentium voluptatibus nostrum deleniti pariatur. Eaque, fugiat.",
  triggerRef,
}) {
  const flagImage = getFlag(specialization);
  const menuRef = useRef(null);
  const [position, setPosition] = useState({
    top: "100%",
    left: "auto",
    right: "0",
  });

  useEffect(() => {
    if (triggerRef.current && menuRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();

      let newTop = "100%";
      let newLeft = "auto";
      let newRight = "0";

      if (triggerRect.top + menuRect.height > window.innerHeight) {
        newTop = `-${menuRect.height}px`;
      }

      if (triggerRect.left + menuRect.width > window.innerWidth) {
        newLeft = "auto";
        newRight = "0";
      } else {
        newLeft = "0";
        newRight = "auto";
      }

      setPosition({ top: newTop, left: newLeft, right: newRight });
    }
  }, [triggerRef]);

  return (
    <div
      ref={menuRef}
      style={{ top: "100%", left: position.left, right: position.right }}
      className="absolute z-50 border border-blue-500 bg-white p-4 rounded-md shadow-lg max-w-xs"
    >
      {/* Profile Section */}
      <section className="flex flex-row items-start gap-4 bg-blue-300 p-4 rounded-md mb-4">
        <div className="w-24 h-24">
          <img
            className="rounded-full border-4 border-white shadow-md"
            src="https://i.natgeofe.com/k/5e4ea67e-2219-4de4-9240-2992faef0cb6/trump-portrait.jpg?wp=1&w=1084.125&h=1068.375"
            alt="Instructor"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-xl text-gray-900 font-semibold relaxed-leading overflow-hidden overflow-ellipsis whitespace-normal">
            {name}
          </h3>
          <h4 className="text-sm text-gray-700 mt-1 truncate">{email}</h4>
          <div className="flex flex-row gap-2 items-center mt-2">
            <h3 className="text-blue-900 text-sm font-semibold">
              Specializes in:
            </h3>
            {flagImage && (
              <img src={flagImage} className="w-8 h-8" alt="Country Flag" />
            )}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <main className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <BookOpenIcon className="text-amber-500 w-6 h-6" />
            <h3 className="text-gray-800 text-sm font-medium">
              Total Courses:{" "}
              <span className="text-amber-500 font-semibold">
                {totalCourses}
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <UsersIcon className="text-indigo-500 w-6 h-6" />
            <h3 className="text-gray-800 text-sm font-medium">
              Total Students:{" "}
              <span className="text-indigo-500 font-semibold">
                {totalStudents.toLocaleString()}
              </span>
            </h3>
          </div>
        </div>
        <div className="bg-gray-900 rounded-md p-3">
          <h3 className="text-sm font-medium text-gray-300 mb-2 overflow-hidden overflow-ellipsis whitespace-normal">
            Biography
          </h3>
          <p className="text-white text-sm leading-relaxed overflow-hidden overflow-ellipsis whitespace-normal">
            {bio}
          </p>
        </div>
      </main>
    </div>
  );
}
