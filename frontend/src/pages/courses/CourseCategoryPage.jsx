import { useParams } from "react-router";
import PageTemplate from "../../components/PageTemplate";
import Tabs from "../../components/Tabs";
import { useState } from "react";
import CourseItem from "./only-in-courses/CourseItem";
import dummyCourses from "../../dummy_data/dummyCourses";
import CarouselDefault from "../../components/Carousel";
import FilterDropdowns from "./only-in-courses/FilterDropdowns";
import LoadingIndicator from "../../components/LoadingIndicator";
import ColoredStarIcon from "../../components/ColoredStarIcon";
import instructors from "../../dummy_data/instructors";
import { defaultFilterConfig } from "../../defaults/config";
import Pagination from "../../components/Pagination";
import TabItem from "../../components/TabItem";

const CourseCategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;
  const totalResults = 97;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [filterConfig, setFilterConfig] = useState(defaultFilterConfig);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { category } = useParams();
  const isLoadingData = false;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = () => {
    setActiveTab((prevTab) => (prevTab === 0 ? 1 : 0));
  };

  const handleSubmission = (key, formData) => {
    if (key === "ratings") {
      setFilterConfig((prevState) => ({
        ...prevState,
        [key]: +formData.ratings.replace("rating-", "") ?? 2.5,
      }));
    } else {
      setFilterConfig((prevState) => ({
        ...prevState,
        [key]: formData,
      }));
    }
  };
  const instructorsData = instructors;
  const isLoadingInstructorsData = false;
  return (
    <PageTemplate title={category}>
      <div className="my-5">
        <h2 className="text-gray-950 font-semibold text-xl">
          Kickstart Your Learning Journey
        </h2>
        <h4 className="text-gray-600 font-medium text-base">
          Dive into courses led by industry experts and seasoned professionals.
        </h4>
      </div>

      {/* Section: Tabs */}
      <section>
        <Tabs>
          <ul className="flex flex-wrap justify-start -mb-px">
            <TabItem
              label="Most Popular"
              onTab={handleTabChange}
              isActive={activeTab === 0}
            />
            <TabItem
              label="New"
              onTab={handleTabChange}
              isActive={activeTab === 1}
            />
          </ul>
        </Tabs>
        <div className="my-3" />
        <CoursesDisplay
          data={dummyCourses}
          activeTab={activeTab}
          isLoading={isLoadingData}
        />
      </section>

      {/* Section: Instructors */}
      <section>
        <div className="my-5">
          <h2 className="text-gray-950 font-semibold text-xl">
            Top Rated Instructors
          </h2>
          <h4 className="text-gray-600 font-medium text-base">
            Instructors who receive the highest ratings from learners.
          </h4>
        </div>
        <CarouselDefault onSlide={setCurrentSlide}>
          {isLoadingInstructorsData ? (
            <LoadingDataIndicator />
          ) : (
            <div className="py-4 mx-5 flex flex-row items-center gap-3">
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  className="rounded-full w-48 h-48 object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg"
                  alt=""
                />
                <h2 className="font-semibold text-gray-800 text-xl">
                  {instructorsData[currentSlide].name}
                </h2>
              </div>
              <div>
                <h4 className="font-medium text-gray-950 flex flex-row gap-1 items-center">
                  Specialization :
                  <span className="font-semibold text-blue-800">
                    {instructorsData[currentSlide].specialization}
                  </span>
                </h4>
                <h4 className="font-medium text-gray-950 flex flex-row gap-1 items-center">
                  Total Courses :
                  <span className="font-semibold text-blue-800">
                    {instructorsData[currentSlide].totalCourses}
                  </span>
                </h4>
                <div className="flex flex-row items-center gap-1 justify-start">
                  <h2>Average Rating:</h2>
                  <h4 className="font-semibold text-base text-amber-800">
                    {instructorsData[currentSlide].rating}
                  </h4>
                  <ColoredStarIcon
                    fill={(instructorsData[currentSlide].rating / 5).toFixed(2)}
                  />
                  <h4 className="text-sm font-medium text-gray-700">
                    ({instructorsData[currentSlide].ratingCount})
                  </h4>
                </div>
              </div>
            </div>
          )}
        </CarouselDefault>
      </section>

      {/* Section: Filters and Courses */}
      <section>
        <div className="flex justify-between w-full items-center gap-1 mt-20 mb-5">
          <h2 className="text-gray-700 w-fit inline-block font-semibold text-lg">
            10,000 results
          </h2>
          <FilterDropdowns
            handleSubmission={handleSubmission}
            data={filterConfig}
          />
        </div>
        <div>
          <ul
            className="grid gap-4 md:gap-6 lg:gap-8 justify-between"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {dummyCourses.map((course, index) => (
              <CourseItem key={index} {...course} />
            ))}
          </ul>
        </div>
      </section>
      {/* Section: Pagination */}
      <section className="mt-28">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          totalResults={totalResults}
        />
      </section>
    </PageTemplate>
  );
};

export const CoursesDisplay = ({ data, isLoading }) => {
  if (isLoading) {
    return <LoadingDataIndicator />;
  }
  return (
    <ul
      className="grid gap-4 md:gap-6 lg:gap-8 justify-between"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      }}
    >
      {data.map((course, index) => (
        <CourseItem key={index} {...course} />
      ))}
    </ul>
  );
};
const LoadingDataIndicator = () => (
  <div className="flex items-center justify-center py-10 bg-gray-100">
    <LoadingIndicator dimension="h-12 w-12" fill="#9ca3af" />
  </div>
);

export default CourseCategoryPage;
