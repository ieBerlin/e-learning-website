import { useLocation } from "react-router";
import PageTemplate from "../../components/PageTemplate";
import SearchResultsSection from "./../../components/SearchResultsSection";
import dummyCourses from "../../dummy_data/dummyCourses";
import { defaultFilterConfig } from "../../defaults/config";
import { useState } from "react";
import { useFetch } from "../../utils/http";
import LoadingDots from "../../components/LoadingDots";
const initData = [];
export default function SearchPage() {
  const { isFetching, error, data: courses } = useFetch(initData, dummyCourses);
  const [filterConfig, setFilterConfig] = useState(defaultFilterConfig);
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

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  if ((!courses || courses.length === 0 )&&!isFetching) {
    return (
      <div>
        <h2 className="font-semibold text-xl text-gray-700 text-center mt-[200px]">
          No data to display.
        </h2>
      </div>
    );
  }
  if (isFetching) {
    return (
      <PageTemplate title={undefined}>
        <div className="py-20">
          <LoadingDots />
        </div>
      </PageTemplate>
    );
  }
  return (
    <PageTemplate title={`211 Results for "${query}"`}>
      {" "}
      <SearchResultsSection
        type="single-course-view"
        data={courses}
        config={filterConfig}
        onSubmit={handleSubmission}
      />
    </PageTemplate>
  );
}
