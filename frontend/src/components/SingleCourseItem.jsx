import { Link } from "react-router-dom";
import StarsRating from "./StarsRating";
import FranceFlag from "/france-svgrepo-com.svg";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import LoadingIndicator from "./LoadingIndicator";
export default function SingleCourseItem({
  descriptionVisibility = false,
  index,
  imageUrl,
  title,
  description,
  price,
  rating,
  ratingCount,
  instructor,
  totalCourses,
  totalStudents,
}) {
  const isSelected = false;
  const isLoading = true;
  return (
    <>
      <Link to="">
        <div className="flex flex-row gap-4">
          <div className="relative border border-gray-300 hover:border-gray-400 rounded-lg overflow-hidden h-[250px] w-[400px]">
            <div className="absolute inset-0 bg-gray-300 opacity-0 hover:opacity-30 transition-opacity duration-300" />
            <img
              src={imageUrl}
              className="object-cover w-full h-full"
              alt={title}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-gray-800 font-semibold text-xl line-clamp-2">
              {title}
            </h2>
            <h3 className="text-gray-700 font-light text-base line-clamp-2">
              {description}
            </h3>
            <div className="flex gap-2 items-center">
              <h3 className="text-gray-600 font-light text-base">Language:</h3>
              <img src={FranceFlag} className="h-6" alt="French Flag" />
            </div>
            <h4 className="text-blue-700 font-semibold text-lg truncate">
              {instructor}
            </h4>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base text-amber-800">
                {rating}
              </span>
              <StarsRating rating={rating} />
              <span className="text-sm font-medium text-gray-700">
                ({ratingCount})
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>18.5 Total Hours</span>
              <span>|</span>
              <span>120 Lectures</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between pt-2 pr-2">
            <h2 className="text-gray-800 font-bold text-lg">${price}</h2>
            <div>
              {isLoading ? (
                <LoadingIndicator fill="#d1d5db" />
              ) : isSelected ? (
                <SolidHeartIcon className="h-8 w-8 text-gray-600 bg-white" />
              ) : (
                <OutlineHeartIcon className="h-8 w-8 text-gray-600" />
              )}
            </div>
          </div>
        </div>
      </Link>
      <hr className="my-4 border-gray-300" />
    </>
  );
}
