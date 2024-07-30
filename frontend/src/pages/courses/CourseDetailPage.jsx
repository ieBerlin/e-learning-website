/* eslint-disable react/prop-types */
import FranceFlag from "/france-svgrepo-com.svg";
import TabItem from "./../../components/TabItem";
import { useState } from "react";
import OverviewTabContent from "./only-in-courses/OverviewTabContent";
import LoadingIndicator from "./../../components/LoadingIndicator";
import { useFetch } from "../../utils/http";
import Tabs from "../../components/Tabs";
import OutlineTabContent from "./only-in-courses/OutlineTabContent";
import ReviewTabContent from "./only-in-courses/ReviewTabContent";
import InsturctorTabContent from "./only-in-courses/InsturctorTabContent";
import {
  course,
  courseOutline,
  dummyInstructorData,
  reviewData,
} from "../../dummy_data/courseDetailData.js";

function renderContent(activeTab) {
  switch (activeTab) {
    case 0:
      return course;
    case 1:
      return courseOutline;
    case 2:
      return reviewData;
    case 3:
      return dummyInstructorData;
    default:
      return null;
  }
}
export default function CourseDetailPage() {
  // const { courseTitle } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const { isFetching, data, onRestData } = useFetch(
    undefined,
    renderContent(activeTab)
  );
  const handleTabChange = (index) => {
    onRestData();
    setActiveTab(index);
  };
  let tabContent;
  if (isFetching) {
    tabContent = (
      <div className="flex items-center justify-center w-full py-20">
        <LoadingIndicator
          dimension="w-16 h-16"
          fill="#d1d5db"
          stroke="fill-gray-700"
        />
      </div>
    );
  } else if (data) {
    switch (activeTab) {
      case 0:
        tabContent = <OverviewTabContent {...data} />;
        break;
      case 1:
        tabContent = <OutlineTabContent courseOutline={data} />;
        break;
      case 2:
        tabContent = <ReviewTabContent {...data} />;
        break;
      case 3:
        tabContent = <InsturctorTabContent {...data} />;
        break;
    }
  }
  return (
    <div className="pb-20">
      <div className="w-full relative flex py-16">
        <img
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          src={course.imageUrl}
          alt="Course Background"
        />
        <div
          className="relative px-4 grid items-center gap-2 w-full"
          style={{
            gridTemplateColumns: "4fr 1fr",
          }}
        >
          <div>
            <h3 className="font-semibold text-gray-700 text-lg tracking-wide bg-white inline-block px-2 py-1 rounded-sm">
              Skill Path /{"  "}
              <span className="text-orange-500 font-semibold">
                Learn French
              </span>
            </h3>
            <h2 className="font-[800] text-white text-4xl mt-2">
              {course.title}
            </h2>
            <h3 className="text-gray-200 font-semibold mt-2">
              {course.description}
            </h3>
          </div>
          <div className="flex flex-col items-center h-full justify-between gap-5">
            <img src={FranceFlag} className="h-20" alt="France Flag" />
            <div className="flex flex-row items-center justify-around gap-2">
              <h2 className="font-medium text-white text-sm">{course.hours}</h2>
              <h2 className="font-medium text-white text-sm">{course.level}</h2>
              <h2 className="font-medium text-white text-sm">
                {course.students}
              </h2>
            </div>
            <button className="bg-orange-500 text-white font-semibold w-full text-center py-2 rounded-sm">
              Enroll now
            </button>
          </div>
        </div>
      </div>
      {/* */}
      <div className="px-8">
        <Tabs>
          <ul className="flex flex-wrap justify-start -mb-px border-b border-gray-200">
            <TabItem
              primaryColor="#fb923c"
              label="Overview"
              onTab={() => handleTabChange(0)}
              isActive={activeTab === 0}
            />
            <TabItem
              primaryColor="#fb923c"
              label="Outline"
              onTab={() => handleTabChange(1)}
              isActive={activeTab === 1}
            />
            <TabItem
              primaryColor="#fb923c"
              label="Ratings"
              onTab={() => handleTabChange(2)}
              isActive={activeTab === 2}
            />
            <TabItem
              primaryColor="#fb923c"
              label="Instructor"
              onTab={() => handleTabChange(3)}
              isActive={activeTab === 3}
            />
          </ul>
        </Tabs>

        {tabContent}
      </div>
    </div>
  );
}
