import {
  CheckBadgeIcon,
  PlayIcon,
  StarIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

export default function InstructorTabContent(instructor) {
  return (
    <section className="px-4 my-5">
      <h1 className="text-orange-500 font-bold text-2xl mb-4">
        {instructor.name}
      </h1>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
        <img
          src={instructor.image}
          className="rounded-full w-32 h-32"
          alt={instructor.name}
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <StarIcon className="text-orange-500 h-6 w-6" />
            <p className="text-gray-900 font-light text-base">
              <span className="font-semibold text-orange-500">
                {instructor.rating}
              </span>{" "}
              Instructor Rating
            </p>
          </div>
          <div className="flex items-center gap-3">
            <UsersIcon className="text-blue-800 h-6 w-6" />
            <p className="text-gray-900 font-light text-base">
              <span className="font-semibold text-blue-800">
                {instructor.students}
              </span>{" "}
              Students
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CheckBadgeIcon className="text-purple-600 h-6 w-6" />
            <p className="text-gray-900 font-light text-base">
              <span className="font-semibold text-purple-600">
                {instructor.reviews}
              </span>{" "}
              Reviews
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PlayIcon className="text-emerald-600 h-6 w-6" />
            <p className="text-gray-900 font-light text-base">
              <span className="font-semibold text-emerald-600">
                {instructor.courses}
              </span>{" "}
              Courses
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-light text-gray-700 text-sm leading-relaxed">
          {instructor.description}
        </p>
      </div>
    </section>
  );
}
