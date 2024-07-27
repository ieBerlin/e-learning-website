/* eslint-disable react/prop-types */
export default function TabItem({ label, onTab, isActive }) {
  return (
    <li className="me-2">
      <button
        onClick={() => onTab(1)}
        className="font-semibold inline-block p-4 border-b-2 rounded-t-lg"
        style={
          isActive ? { color: "#1d4ed8", borderColor: "#1d4ed8" } : undefined
        }
      >
        {label}
      </button>
    </li>
  );
}
