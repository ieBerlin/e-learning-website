import PageTemplate from "../../components/PageTemplate";
import TabItem from "../../components/TabItem";
import Tabs from "../../components/Tabs";
import { useState } from "react";
import dummyCourses from "../../dummy_data/dummyCourses";
import CourseItem from "./only-in-courses/CourseItem";
import { Link } from "react-router-dom";
import {
  EllipsisVerticalIcon,
  FolderIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import StarsRating from "../../components/StarsRating";
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu";
import { openModal } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <MyLearningContent courses={dummyCourses} />;
      case 1:
        return <WishlistContent />;
      case 2:
        return <ArchiveContent />;
      default:
        return null;
    }
  };

  return (
    <PageTemplate title="My Library">
      <section>
        <Tabs currentTab={activeTab} onTabChange={handleTabChange}>
          <ul className="flex flex-wrap justify-start -mb-px border-b border-gray-200">
            <TabItem
              label="My Learning"
              onTab={() => handleTabChange(0)}
              isActive={activeTab === 0}
            />
            <TabItem
              label="Wishlist"
              onTab={() => handleTabChange(1)}
              isActive={activeTab === 1}
            />
            <TabItem
              label="Archive"
              onTab={() => handleTabChange(2)}
              isActive={activeTab === 2}
            />
          </ul>
        </Tabs>
        <div className="mt-4">{renderContent()}</div>
      </section>
    </PageTemplate>
  );
}
function WishlistContent() {
  return (
    <div className="w-5/6 mx-auto">
      <ul
        className="grid gap-1 md:gap-2 lg:gap-3 justify-between"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {dummyCourses.map((course, index) => (
          <CourseItem
            descriptionVisibility
            key={index}
            index={index}
            imageUrl={course.imageUrl}
            title={course.title}
            description={course.description}
            price={course.price}
            rating={course.rating}
            ratingCount={course.ratingCount}
            instructor={course.instructor}
            instructorEmail={course.instructorEmail}
            instructorSpecialization={course.instructorSpecialization}
            instructorTotalCourses={course.instructorTotalCourses}
            instructorTotalStudents={course.instructorTotalStudents}
            instructorBio={course.instructorBio}
          />
        ))}
      </ul>
    </div>
  );
}
function ArchiveContent() {
  return (
    <div className="w-5/6 mx-auto">
      <ul
        className="grid gap-1 md:gap-2 lg:gap-3 justify-between "
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {dummyCourses.map((course, index) => (
          <li key={course + index}>
            <div className="border border-gray-300 hover:border-gray-400">
              <img
                src={course.imageUrl}
                className="object-cover h-[250px] w-full"
                alt={course.title}
              />
              <hr className="my-1" />
              <div className="p-2">
                <h3 className="font-semibold text-base text-gray-800">
                  {" "}
                  {course.title}
                </h3>
                <h3 className="font-medium text-sm text-gray-700">
                  {" "}
                  {course.instructor}
                </h3>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-400 text-white py-1 w-full text-center font-semibold text-lg">
              Unarchive
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MyLearningContent({ courses }) {
  const dispatch = useDispatch();
  function handleOpenMenuDropDown(e) {
    e.preventDefault();
  }
  function handleArchiveCourse(courseId) {
    dispatch(openModal({ type: "archive-course", data: { courseId } }));
  }

  function handleAddToList(courseId) {
    dispatch(openModal({ type: "show-my-lists", data: { courseId } }));
  }

  function handleShareCourse(courseId) {
    dispatch(openModal({ type: "share-course", data: { courseId } }));
  }
  return (
    <div className="w-5/6 mx-auto">
      <ul
        className="grid gap-1 md:gap-2 lg:gap-3 justify-between"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {courses.map((course, index) => (
          <li key={course.id || index}>
            <Link to={`/course/${course.id}`}>
              <div className="border border-gray-300 hover:border-gray-400">
                <div className="relative">
                  <img
                    src={course.imageUrl}
                    className="object-cover h-[200px] w-full"
                    alt={course.title}
                  />

                  <div
                    onClick={handleOpenMenuDropDown}
                    className="absolute top-2 right-2"
                  >
                    <DropdownMenu
                      label={
                        <EllipsisVerticalIcon className="w-8 h-8 p-1 text-gray-800 bg-gray-100 " />
                      }
                      content={
                        <div className="flex flex-col">
                          <button
                            type="button"
                            className="bg-white hover:bg-gray-200 py-2 rounded-t-md"
                            onClick={() => handleArchiveCourse(index)}
                          >
                            <div className="flex flex-row gap-3 items-center px-4">
                              <FolderIcon className="w-4 h-4 text-gray-800" />
                              <h3 className="text-xs text-gray-800">Archive</h3>
                            </div>
                          </button>
                          <hr />
                          <button
                            type="button"
                            className="bg-white hover:bg-gray-200 py-2"
                            onClick={() => handleAddToList(index)}
                          >
                            <div className="flex flex-row gap-3 items-center px-4">
                              <PlusIcon className="w-4 h-4 text-gray-800" />
                              <h3 className="text-xs text-gray-800">
                                Add to my list
                              </h3>
                            </div>
                          </button>
                          <hr />
                          <button
                            type="button"
                            className="bg-white hover:bg-gray-200 py-2  rounded-b-md"
                            onClick={() => handleShareCourse(index)}
                          >
                            <div className="flex flex-row gap-3 items-center px-4">
                              <ShareIcon className="w-4 h-4 text-gray-800" />
                              <h3 className="text-xs text-gray-800">Share</h3>
                            </div>
                          </button>
                        </div>
                      }
                    />
                  </div>
                </div>
                <hr className="my-1" />
                <div className="p-2">
                  <h3 className="font-semibold text-base text-gray-800">
                    {course.title}
                  </h3>
                  <div className="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden my-2">
                    <div
                      className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-xs text-gray-700">
                      {course.progress}% complete
                    </h3>
                    <StarsRating rating={course.rating} />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
