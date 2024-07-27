import ColoredStarIcon from "./ColoredStarIcon";

export default function StarsRating({ rating }) {
  return (
    <ul className="flex flex-row gap-1 items-center justify-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index}>
          {rating > index ? (
            <ColoredStarIcon fill={Math.min(1, rating - index)} />
          ) : (
            <ColoredStarIcon fill={0} />
          )}
        </li>
      ))}
    </ul>
  );
}

