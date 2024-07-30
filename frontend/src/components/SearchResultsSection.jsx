import { useState } from "react";
import CourseItem from "../pages/courses/only-in-courses/CourseItem";
import FilterDropdowns from "../pages/courses/only-in-courses/FilterDropdowns";
import Pagination from "./Pagination";
import SingleCourseItem from "./SingleCourseItem";

export default function SearchResultsSection({
  type = "grid-course-view",
  onSubmit,
  config,
  data,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;
  const totalResults = 97;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Section: Filters and Courses */}
      <section>
        <div className="flex justify-between w-full items-center gap-1 mt-20 mb-5">
          <h2 className="text-gray-700 w-fit inline-block font-semibold text-lg">
            10,000 results
          </h2>
          <FilterDropdowns handleSubmission={onSubmit} data={config} />
        </div>
        <div>
          <ul
            className={
              type === "grid-course-view"
                ? "grid gap-4 md:gap-6 lg:gap-8 justify-between"
                : "flex flex-col w-full gap-4 md:gap-6 lg:gap-8"
            }
            style={
              type === "grid-course-view"
                ? {
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                  }
                : undefined
            }
          >
            {data.map((course, index) => {
              const CourseComponent =
                type === "single-course-view" ? SingleCourseItem : CourseItem;
              return <CourseComponent key={course.id || index} {...course} />;
            })}
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
    </div>
  );
}
