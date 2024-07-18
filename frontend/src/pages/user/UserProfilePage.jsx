import { useRef, useState } from "react";
import Input from "../../components/Input";
import PageTemplate from "../../components/PageTemplate";
import proficiencyLevels from "../../data/proficiencyLevels";
import languages from "../../data/languages";
import Card from "./../../components/Card";
import Button from "../../components/Button";
export default function UserProfilePage() {
  const isSubmitting = false;
  const [currentSelectLanguages, setCurrentSelectLanguages] = useState([]);
  const [currentSelectProficiencyLevel, setCurrentSelectProficiencyLevel] =
    useState(null);
  const submitRef = useRef();
  function handleSelectProficiencyLevel(proficiencyLevel) {
    setCurrentSelectProficiencyLevel((prevState) => {
      if (prevState === proficiencyLevel) {
        return null;
      } else {
        return proficiencyLevel;
      }
    });
  }
  function handleSelectLanguage(language) {
    setCurrentSelectLanguages((prevState) => {
      if (prevState.includes(language)) {
        return prevState.filter((item) => item !== language);
      } else {
        return [...prevState, language];
      }
    });
  }
  function handleSubmitForm(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    let userData = {};
    userData.first_name = fd.get("first-name");
    userData.last_name = fd.get("last-name");
    userData.proficiencyLevel = currentSelectProficiencyLevel;
    userData.languages = currentSelectLanguages;
    console.log(userData);
  }
  return (
    <PageTemplate title="Personal Credentials">
      {/* Personal Info Section */}
      <div className="flex flex-col border border-gray-300 px-6 py-2 rounded-lg bg-white">
        {/* Section Header with Update Password Link */}
        <h1 className="font-bold text-gray-700 text-lg">
          Personal infomations
        </h1>
        {/* Form Inputs */}
        <div className="flex w-full h-full flex-col mt-2 px-5 py-2">
          <form onSubmit={handleSubmitForm} className="flex gap-2 flex-col">
            <Input
              name="first-name"
              // defaultValue={userData?.first_name || ""}
              label="First Name"
              placeholder="Enter Your First Name"
              readOnly={isSubmitting}
            />
            <Input
              name="last-name"
              // defaultValue={userData?.last_name || ""}
              label="Last Name"
              placeholder="Enter Your Last Name"
              readOnly={isSubmitting}
            />
            <label className="block my-2 font-semibold text-sm text-gray-700">
              Proficiency Level
            </label>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {proficiencyLevels.map((item) => (
                <li
                  key={item.id}
                  className="p-2 rounded-lg border-2"
                  style={{
                    backgroundColor: item.color,
                    borderColor:
                      currentSelectProficiencyLevel === item.name &&
                      !isSubmitting
                        ? "#4b5563"
                        : "#d1d5db",
                  }}
                >
                  <button
                    className="w-full"
                    type="button"
                    onClick={
                      !isSubmitting
                        ? () => handleSelectProficiencyLevel(item.name)
                        : undefined
                    }
                  >
                    <h2 className="text-center text-white font-bold tracking-normal text-sm md:text-md lg:text-lg">
                      {item.name}
                    </h2>
                  </button>
                </li>
              ))}
            </ul>
            <label className="block my-2 font-semibold text-sm text-gray-700">
              Selected Languages
            </label>
            <ul
              className="grid gap-3"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(140px , 1fr))",
              }}
            >
              {/* Your grid items */}

              {languages.map((language) => (
                <li key={`language-${language.id}`} className="mx-auto ">
                  <Card
                    isLoading={isSubmitting}
                    isSelected={currentSelectLanguages.includes(language.name)}
                    onSelectLanguage={handleSelectLanguage}
                    {...language}
                  />
                </li>
              ))}
            </ul>
            <input type="submit" value="" ref={submitRef} />
          </form>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          isLoading={isSubmitting}
          label="Submit"
          onClick={() => {
            submitRef.current.click();
          }}
        />
      </div>
    </PageTemplate>
  );
}
