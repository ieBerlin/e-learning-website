import { StarIcon } from "@heroicons/react/24/solid";

const ColoredStarIcon = ({ fill }) => {
  return (
    <div className="relative w-5 h-5">
      {/* Amber part */}
      <StarIcon
        className="w-5 h-5 absolute text-amber-500"
        style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}
      />
      {/* Gray part */}
      <StarIcon
        className="w-5 h-5 text-gray-500"
        style={{ clipPath: `inset(0 0 0 ${fill * 100}%)` }}
      />
    </div>
  );
};
export default ColoredStarIcon;
