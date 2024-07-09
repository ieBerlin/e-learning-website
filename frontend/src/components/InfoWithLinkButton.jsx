export default function InfoWithLinkButton({ label, link, buttonText }) {
  return (
    <h3 className="font-medium text-gray-700">
      {label}
      <a href={`auth?mode=${link}`}>
        <button type="button" className="text-blue-500">
          {buttonText}
        </button>
      </a>
    </h3>
  );
}
