import { NavLink } from "react-router-dom";
export default function CoursesTabs() {
  return (
    <main>
      <div className=" flex flex-row gap-2 items-center">
        <Tab label="All Courses" href="/courses/" />
        <Tab label="Wishlist" href="/courses/wishlist" />
        <Tab label="Archive" href="/courses/archive" />
      </div>
    </main>
  );
}

function Tab({ href, label }) {
  return (
    <div>
      <NavLink to={href} end>
        {({ isActive }) => {
          return (
            <>
              <h1
                className={`inline-block ${isActive ? "font-bold" : undefined}`}
              >
                {label}
              </h1>{" "}
              {isActive && (
                <div className="border-[3px] border-gray-800 rounded-[8px]" />
              )}
            </>
          );
        }}
      </NavLink>
    </div>
  );
}
