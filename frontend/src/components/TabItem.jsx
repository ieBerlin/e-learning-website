/* eslint-disable react/prop-types */
export default function TabItem({
  label,
  onTab,
  isActive,
  primaryColor = "#1d4ed8",
}) {
  return (
    <li className="me-2">
      <button
        onClick={() => onTab(1)}
        className="font-semibold text-gray-800 tracking-wide text-sm inline-block p-4 border-b-2 rounded-t-lg"
        style={
          isActive
            ? { color: primaryColor, borderColor: primaryColor }
            : undefined
        }
      >
        {label}
      </button>
    </li>
  );
}
