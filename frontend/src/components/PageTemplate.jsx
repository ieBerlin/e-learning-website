export default function PageTemplate({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-10 py-4 md:py-6">
      {title && (
        <h1 className="text-gray-800 font-semibold text-xl md:text-2xl lg:text-3xl mb-3 ml-3">
          {title}
        </h1>
      )}

      {children}
    </div>
  );
}
