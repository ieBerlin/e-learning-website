import Button from "../../components/Button";
import PageTemplate from "../../components/PageTemplate";

const preferences = [
  {
    id: 1,
    title: "Promotions, course suggestions, and educational resources from Quasars.",
    description: "Receive notifications about promotions, course suggestions, and various educational resources provided by Quasars."
  },
  {
    id: 2,
    title: "Instructor announcements for courses I am enrolled in.",
    description: "Stay updated with announcements and updates from instructors for the courses you are currently enrolled in."
  },
  {
    id: 3,
    title: "Unsubscribe from all promotional emails.",
    description: "Opt-out of receiving all promotional emails and marketing communications from Quasars."
  }
];

export default function NotificationSettingsPage() {
  return (
    <PageTemplate title="Notifications Settings">
      <h2 className="text-gray-900 font-semibold text-lg md:text-xl lg:text-2xl mb-2">
        Opt-in to:
      </h2>
      <ul className="flex flex-col gap-3">
        {preferences.map((preference) => (
          <li
            key={preference.id}
            className="border border-gray-700 p-3 flex flex-row items-center gap-2"
          >
            <div className="inline-flex items-center">
              <label className="relative flex items-center p-1 mr-2 rounded-full cursor-pointer">
                <input
                  type="checkbox"
                  className="outline-none before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border border-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-800 checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
            <div>
              <h2 className="text-start text-gray-800 font-semibold text-base md:text-lg">
                {preference.title}
              </h2>
              <p className="text-start text-gray-600 font-light text-sm md:text-base">
                {preference.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Button label="Save" />
    </PageTemplate>
  );
}
