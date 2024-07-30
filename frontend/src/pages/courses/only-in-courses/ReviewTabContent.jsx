/* eslint-disable react/prop-types */
import StarsRating from "../../../components/StarsRating";

const ReviewTabContent = (review) => {
  const { reviewerName, reviewerImage, reviewText, rating, reviewDate } =
    review;
  return (
    <main className="px-4 my-5">
      <div className="border border-gray-400 hover:border-gray-300 py-3 px-4">
        <h2 className="text-gray-950 font-semibold text-2xl mb-5">
          Featured Review
        </h2>
        <div className="flex items-center mb-4">
          <img
            className="h-20 w-20 rounded-full object-cover mr-4"
            src={reviewerImage}
            alt={reviewerName}
          />
          <div>
            <h3 className="text-gray-900 font-semibold text-xl">
              {reviewerName}
            </h3>
            <div className="flex flex-row gap-2">
              <StarsRating rating={rating} />
              <h5 className="text-gray-600 text-sm">
                {new Date(reviewDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h5>
            </div>
          </div>
        </div>
        <p className="text-gray-700">{reviewText}</p>
      </div>
    </main>
  );
};

export default ReviewTabContent;
