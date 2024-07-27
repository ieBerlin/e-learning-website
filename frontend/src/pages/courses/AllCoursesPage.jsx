import PageTemplate from "../../components/PageTemplate";
import dummyCourses from "../../dummy_data/dummyCourses";
import businessManImage from "/business-man.png";
import languages from "../../data/languages";
import { Link } from "react-router-dom";
import purchasedCourses from "../../dummy_data/purchasedCourses";
import CourseItem from "./only-in-courses/CourseItem";
import PurchasedCourse from "./only-in-courses/PurchasedCourse";
import { BookOpenIcon, StarIcon } from "@heroicons/react/24/solid";
import FranceFlag from "/france-svgrepo-com.svg";
import Footer from "./../../components/Footer";
const date = new Date().getHours();
const greetingMessage = date > 12 ? "Good Afternoon" : "Good Morning";
export default function AllCoursesPage() {
  return (
    <>
      <PageTemplate title="All Courses">
        {/* heading */}
        <header className="bg-gray-300 rounded-md py-2 mb-3">
          <h2 className="w-4/5 px-5 font-semibold text-gray-800 text-lg lg:text-xl">
            {greetingMessage},{" "}
            <span className="text-amber-500 font-semibold">User</span>
          </h2>
          <div className="px-5 flex flex-row items-center gap-4">
            <div className="text-end">
              <h4 className="text-md text-gray-500 font-semibold">
                Languages you are interested in learning :
              </h4>
              <Link to="/user/profile">
                <h2 className="text-purple-700 font-medium text-sm">
                  Edit interests
                </h2>
              </Link>
            </div>
            <ul className="flex flex-row items-start gap-3">
              {languages.map((language) => (
                <li key={language}>
                  <div className="rounded-sm">
                    <img
                      src={language.icon}
                      className="w-7 h-7 mx-auto"
                      alt=""
                    />
                  </div>
                  <h5 className="text-sm text-gray-700 mx-auto font-medium">
                    {language.name}
                  </h5>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Thumbnail */}
        <section className="w-full bg-gray-200 py-3 rounded-md mb-2">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr auto",
            }}
          >
            <div>
              <div className="p-4 bg-white rounded-sm w-[300px] mx-auto">
                <h1 className="text-2xl text-gray-800 font-semibold">
                  Begin your journey with us.
                </h1>
                <p className="text-lg font-medium text-gray-700">
                  Empower your present and future with our skills.
                </p>
              </div>
            </div>
            <img className="h-[300px]" src={businessManImage} alt="" />
          </div>
        </section>
        {/* Section: Unlock Your Learning Path */}
        <section className="text-xl font-semibold capitalize text-gray-800 my-5">
          <h2 className="font-semibold text-xl text-gray-950 mb-3">
            Unlock Your Learning Path
          </h2>
          <ul
            className="grid gap-1 md:gap-2 lg:gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {purchasedCourses.map((course) => (
              <PurchasedCourse key={course.id} course={course} />
            ))}
          </ul>
        </section>
        {/* Section: Top Course Recommended for You*/}
        <section className="my-5">
          <Link to="">
            <h2 className="font-semibold text-xl text-gray-950 mb-3">
              Top Course Recommended for You
            </h2>
            <div className="flex-grow shadow-md rounded-md p-3 bg-white hover:bg-gray-50 border border-transparent hover:border-gray-300 flex flex-row gap-3">
              <img
                src={course.imageUrl}
                className="w-[400px] border border-gray-500 object-cover max-h-[500px]"
                alt=""
              />
              <div className="flex flex-col flex-grow">
                <h2 className="font-bold text-2xl line-clamp-2 text-gray-900">
                  {course.title}
                </h2>
                <p className="font-medium text-lg text-gray-600 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex gap-2 items-center">
                  <h2 className="text-gray-800 font-semibold text-lg">
                    Language:
                  </h2>
                  <img src={FranceFlag} className="h-6" alt="" />
                </div>
                <div className="bg-yellow-200 inline-block p-2 w-fit rounded-md my-2">
                  <div className="flex items-center gap-2 ">
                    <StarIcon className="text-amber-500 h-5 w-5" />
                    <p className="text-base font-medium">
                      Total Ratings:{" "}
                      <span className="text-black font-bold">
                        {course.rating}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BookOpenIcon className="text-blue-500 h-5 w-5" />
                    <p className="text-base font-medium">
                      Total Lectures:{" "}
                      <span className="text-black font-bold">
                        {course.numLectures}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="my-4 flex flex-grow items-end justify-start">
                  <h3 className="text-gray-950 font-bold text-2xl">
                    ${course.price}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        </section>
        {/* Section: Recommended for you */}
        <section className="my-5">
          <h2 className="font-semibold text-xl text-gray-950 mb-3">
            Recommended for you
          </h2>
          <ul
            className="grid gap-1 md:gap-2 lg:gap-3 justify-between"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            }}
          >
            {dummyCourses.map((course, index) => (
              <CourseItem
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
        </section>
        <hr />
        {/* Section :Explore Our X Courses */}
        <ul>
          {languages.map((language) => (
            <li key={language}>
              <section className="my-5">
                <h2 className="font-semibold text-xl text-gray-950 mb-3">
                  Explore Our{" "}
                  <span>
                    <Link
                      className="font-semibold text-purple-700 underline"
                      to=""
                    >
                      {language.name}
                    </Link>
                  </span>{" "}
                  Courses
                </h2>
                <ul
                  className="grid gap-1 md:gap-2 lg:gap-3 justify-between"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                  }}
                >
                  {dummyCourses.map((course, index) => (
                    <CourseItem
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
              </section>
              <hr />
            </li>
          ))}
        </ul>
        {/* Section: New Courses on Quasars*/}
        <section className="my-5">
          <h2 className="font-semibold text-xl text-gray-950 mb-3">
            New Courses on Quasars
          </h2>
          <ul
            className="grid gap-1 md:gap-2 lg:gap-3 justify-between"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            }}
          >
            {dummyCourses.map((course, index) => (
              <CourseItem
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
        </section>
        {/* Footer */}
      </PageTemplate>
      <Footer />
    </>
  );
}
const course = {
  id: "course_002",
  title: "Advanced JavaScript",
  imageUrl: "https://i.ytimg.com/vi/e8xreU6Aa-o/sddefault.jpg",
  description:
    "Deep dive into advanced JavaScript concepts including closures, prototypal inheritance, and asynchronous programming. Enhance your skills to become a proficient JavaScript developer.",
  price: 79.99,
  rating: 4.5,
  numLectures: 25,
  language: "English",
};
