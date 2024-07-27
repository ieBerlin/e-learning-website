export default function Tabs({ currentTab, children }) {
  return (
    <div
      className="text-sm font-medium text-center text-gray-500 border-b border-gray-200"
      style={{ currentTab }}
    >
      {children}
    </div>
  );
}
