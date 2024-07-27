/* eslint-disable react/prop-types */
import StarsRating from "../../../components/StarsRating";
import FilterDropdown from "./../../../components/FilterDropDown";

const courseTypes = ["speaking", "listening", "reading", "writing", "grammar"];
const levels = ["beginner", "intermediate", "advanced"];
const prices = ["free", "paid"];

const ratingsData = [
  { rating: 4.5, reviews: 1000 },
  { rating: 3.5, reviews: 750 },
  { rating: 2.5, reviews: 500 },
];
const durationsData = {
  "> 1 Hour": "lessThanOneHour",
  "1 to 5 Hours": "oneToFiveHours",
  "5 to 10 Hours": "fiveToTenHours",
  "10 Hours <": "greaterThanTenHours",
};
const FilterDropdowns = ({ data, handleSubmission }) => {
  const FilterContent = ({ category, items, title, labelStyles }) => {
    return (
      <div className="p-2">
        <h3 className={`font-semibold ${labelStyles}`}>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="flex flex-row gap-1 items-center">
              {category === "videoDurations" ? (
                <input
                  name={category}
                  type="checkbox"
                  id={`${durationsData[item]}`}
                  className="filter-item"
                  defaultChecked={data[category][durationsData[item]]}
                />
              ) : (
                <input
                  name={category}
                  type="checkbox"
                  id={item}
                  className="filter-item"
                  defaultChecked={data[category][item]}
                />
              )}
              <label
                htmlFor={`${title}-${item}`}
                className="font-medium text-base text-gray-800 capitalize"
              >
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const RatingsFilterContent = ({ items }) => (
    <div className="p-2">
      <h3 className="font-semibold text-amber-600">Ratings</h3>
      <ul>
        {items.map(({ rating, reviews }) => (
          <li
            key={rating}
            className="flex flex-row gap-1 items-center justify-start"
          >
            <input
              type="radio"
              className="mr-1"
              name="ratings"
              defaultChecked={data.ratings === rating}
              id={`rating-${rating}`}
            />
            <h3 className="font-medium text-base text-gray-800 text-nowrap">
              {rating} up to 5
            </h3>
            <StarsRating rating={rating} />
            <h3 className="font-medium text-base text-gray-800">({reviews})</h3>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-row gap-1">
      <FilterDropdown
        category="pricing"
        labelStyles="text-red-500"
        onSubmit={handleSubmission}
        label="Price"
        labelButtonClasses="bg-red-600 hover:bg-red-500"
      >
        <FilterContent
          category="pricing"
          items={prices}
          title="Price"
          labelStyles="text-red-600"
        />
      </FilterDropdown>
      <FilterDropdown
        category="proficiencyLevels"
        onSubmit={handleSubmission}
        label="Level"
        labelButtonClasses="bg-emerald-700 hover:bg-emerald-600"
      >
        <FilterContent
          category="proficiencyLevels"
          items={levels}
          title="Level"
          labelStyles="text-emerald-600"
        />
      </FilterDropdown>
      <FilterDropdown
        category="courseTypes"
        onSubmit={handleSubmission}
        label="Course Types"
        labelButtonClasses="bg-blue-800 hover:bg-blue-700"
      >
        <FilterContent
          category="courseTypes"
          items={courseTypes}
          title="Course Types"
          labelStyles="text-blue-700"
        />
      </FilterDropdown>
      <FilterDropdown
        category="videoDurations"
        onSubmit={handleSubmission}
        label="Video Duration"
        labelButtonClasses="bg-purple-600 hover:bg-purple-500"
      >
        <FilterContent
          category="videoDurations"
          items={["> 1 Hour", "1 to 5 Hours", "5 to 10 Hours", "10 Hours <"]}
          title="Video Duration"
          labelStyles="text-purple-600"
        />
      </FilterDropdown>
      <FilterDropdown
        category="ratings"
        onSubmit={handleSubmission}
        label="Ratings"
        labelButtonClasses="bg-amber-500 hover:bg-amber-400"
      >
        <RatingsFilterContent items={ratingsData} />
      </FilterDropdown>
    </div>
  );
};
export default FilterDropdowns;
