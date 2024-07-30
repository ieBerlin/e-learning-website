function OverviewTabContent(course) {
  return (
    <main className="px-4 my-5">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-xl text-black">Overview</h2>
        <h4 className="text-gray-800 text-medium">{course.overview}</h4>
      </div>
      <div className="flex flex-col gap-1 mt-5">
        <h2 className="font-bold text-xl text-black">Highlights</h2>
        <ul className="flex flex-col gap-2 mt-4">
          {course.highlights.map((highlight, index) => (
            <li key={index}>
              <h4 className="text-gray-800 text-medium">
                <span className="text-gray-900 font-semibold">
                  &middot; {highlight.split(" - ")[0]} -
                </span>{" "}
                {highlight.split(" - ")[1]}
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
export default OverviewTabContent;
