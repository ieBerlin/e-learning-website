import PageTemplate from "../../components/PageTemplate";
import TabItem from "../../components/TabItem";
import Tabs from "../../components/Tabs";
import { useState } from "react";
import dummyCourses from "../../dummy_data/dummyCourses";
import CourseItem from "./only-in-courses/CourseItem";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <div>My Learning Content</div>;
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
                className="object-cover w-full"
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
