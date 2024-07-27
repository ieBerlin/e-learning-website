export default function ProgressBar({ progress }) {
    return (
      <div className="w-full rounded-full bg-gray-700">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    );
  }