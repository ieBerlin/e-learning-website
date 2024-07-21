import Button from "../../components/Button";
import PageTemplate from "../../components/PageTemplate";
import RadioGroup from "../../components/RadioGroup"; // Adjust the import path as necessary

export default function SettingsPage() {
  return (
    <PageTemplate title="Settings">
      <div className="border border-gray-700">
        <RadioGroup
          title="Set your account visibility to:"
          name="visibility"
          options={[
            { label: "Public", defaultChecked: true },
            { label: "Private", defaultChecked: false },
          ]}
        />
        <hr className="border-gray-300" />
        <RadioGroup
          title="Show Courses You're Taking:"
          name="courses-visibility"
          options={[
            { label: "Yes", defaultChecked: true },
            { label: "No", defaultChecked: false },
          ]}
        />
      </div>
      <Button label="Save" />
    </PageTemplate>
  );
}
