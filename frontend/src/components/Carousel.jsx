const Carousel = ({ onSlide, children }) => {
  const totalSlides = 5;

  const nextSlide = () => {
    onSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    onSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };
  const CarouselButton = ({ direction, onClick }) => {
    return (
      <button
        type="button"
        className={`absolute top-0 ${
          direction === "prev" ? "-left-[20px]" : "-right-[20px]"
        } z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none`}
        onClick={onClick}
      >
        <span className="bg-gray-300 hover:bg-gray-400 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 ">
          <svg
            className={`w-4 h-4 text-gray-600 hover:text-gray-900 ${
              direction === "prev" ? "" : "rotate-180"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1L1 5l4 4"
            />
          </svg>
          <span className="sr-only">
            {direction === "prev" ? "Previous" : "Next"}
          </span>
        </span>
      </button>
    );
  };

  return (
    <div className="relative border border-gray-500 hover:border-gray-400 rounded-sm bg-gray-50 hover:bg-gray-100">
      {/* Carousel wrapper */}
      {children}
      <CarouselButton direction="prev" onClick={prevSlide} />
      <CarouselButton direction="next" onClick={nextSlide} />
    </div>
  );
};

export default Carousel;
