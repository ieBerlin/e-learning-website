import { useEffect, useRef, useState } from "react";
import heroSectionPic from "../../assets/heroSectionPic.png";
import { AnimatePresence, motion } from "framer-motion";
import "./LandingPage.css";
import { features } from "./../../data/features";

export default function LandingPage() {
  const [currentScrollY, setCurrentScrollY] = useState(window.scrollY);
  const [headerHeight, setHeaderHeight] = useState(0);

  const signupButtonRef = useRef();
  let isPassedBy = false;
  if (signupButtonRef.current) {
    const rect = signupButtonRef.current.getBoundingClientRect();
    const elementBottom =
      rect.top + window.scrollY + rect.height - headerHeight;
    if (window.scrollY > elementBottom) {
      isPassedBy = true;
    } else {
      isPassedBy = false;
    }
  }
  useEffect(() => {
    const header = document.getElementById("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(isPassedBy);

  return (
    <div className="bg-gray-50">
      <header
        className="grid grid-cols-2 fixed top-0 w-full z-10 bg-gray-50"
        id="header"
        style={{
          borderBottom:
            currentScrollY > headerHeight ? "1px solid #d6d3d1" : undefined,
        }}
      >
        <div className="py-2">
          <h1 className="text-3xl font-bold capitalize text-red-500 text-center">
            Quasars
          </h1>
        </div>
        <AnimatePresence>
          {isPassedBy && (
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              transition={{ duration: 1, type: "spring" }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex gap-4 pr-4 items-center justify-end h-full"
            >
              <div className="flex gap-4  items-center">
                <a href="/auth?mode=login" className="flex-1">
                  <button className="p-2 rounded-md bg-red-500 text-white text-md font-semibold hover:bg-coral-red">
                    Login
                  </button>
                </a>
                <a href="/auth?mode=signup" className="flex-1">
                  <button className="text-coral-red text-md font-semibold">
                    Signup
                  </button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Hero Section */}
      <section
        className="grid grid-cols-2 items-center justify-center gap-3"
        style={{ marginTop: `${headerHeight}px` }}
      >
        <div className="flex justify-end">
          <img
            className="w-3/5"
            src={heroSectionPic}
            alt="Hero Section"
            id="hero-section-pic"
          />
        </div>
        <div className="w-full">
          <div className="w-4/5 flex flex-col items-center justify-start gap-3 p-2">
            <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 py-2">
              Explore the world through language adventures!
            </h1>
            <div
              ref={signupButtonRef}
              className="flex flex-col items-center justify-center gap-2"
            >
              <a href="/auth?mode=signup" className="w-full">
                <button className="uppercase py-3 w-full rounded-md bg-red-500 text-white text-md md:text-lg font-semibold hover:bg-coral-red">
                  Get Started
                </button>
              </a>
              <a
                href="/auth?mode=login"
                className="w-full"
              >
                <button className="uppercase p-2 w-full rounded-md border-2 border-gray-200 hover:border-gray-300 text-center text-lime-500 hover:text-lime-400 text-md md:text-lg font-semibold">
                  I already have an account
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/**/}
      <section className="my-10 bg-gray-800 py-2 md:py-4 lg:py-6 ">
        <h2 className="text-white text-center text-2xl md:text-3xl lg:text-5xl font-semibold">
          Learn, Practice, Proof.
        </h2>
      </section>
      {/* Feature Section */}
      <section className="my-10">
        <ul>
          {features.map((feature, index) => (
            <li
              key={feature.id}
              className="w-full grid items-center grid-cols-2 py-5"
            >
              {index % 2 === 0 ? (
                <>
                  <FeatureText
                    title={feature.title}
                    description={feature.description}
                  />
                  <FeatureImage
                    styles={{ marginRight: "auto", marginLeft: "auto" }}
                    imageSrc={feature.icon}
                  />
                </>
              ) : (
                <>
                  <FeatureImage
                    styles={{ marginLeft: "auto" }}
                    imageSrc={feature.icon}
                  />{" "}
                  <FeatureText
                    title={feature.title}
                    description={feature.description}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
      {/*Courses */}
      <section className="my-10 px-10">
        <h2 className="text-gray-700 text-xl font-semibold mb-6">
          Popular Quasars Courses & Training
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Replace 'md:grid-cols-4' with the number of columns you desire for larger screens */}
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </section>
      <section className="my-20 px-10">
        <h2 className="text-gray-700 text-xl font-semibold mb-6">
          New Quasars Courses & Training
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Adjust 'md:grid-cols-3' based on the number of columns for larger screens */}
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-950 py-4">
        <h2 className="font-semibold text-xl text-white text-center">
          Quasars, Inc. &#169; 2024
        </h2>
      </footer>
    </div>
  );
}
function FeatureText({ title, description }) {
  return (
    <div className="w-4/5 lg:w-3/5  mx-auto">
      <h1 className="text-center font-bold text-emerald-700 text-xl tracking-wide mb-4">
        {title}
      </h1>
      <p className="text-center text-gray-800 font-semibold">{description}</p>
    </div>
  );
}

function FeatureImage({ styles, imageSrc }) {
  return (
    <div>
      <img className="w-3/5" style={styles} src={imageSrc} alt="" />
    </div>
  );
}
function CourseCard() {
  return (
    <div className="rounded-md border border-gray-300 hover:border-gray-500 overflow-hidden">
      <img
        className="object-cover rounded-t-md w-full h-48 sm:h-56 md:h-64"
        src="https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg"
        alt=""
      />
      <div className="bg-gray-800 p-3">
        <div className="flex flex-row gap-2 justify-center items-center mb-2">
          <h2 className="inline-block rounded-lg px-2 py-1 text-white bg-black text-sm sm:text-base">
            12:30
          </h2>
          <h2 className="inline-block rounded-lg px-2 py-1 text-white bg-black text-sm sm:text-base">
            8 Sections
          </h2>
        </div>
        <h1 className="text-white text-xl sm:text-2xl font-semibold">
          Learn English in 3 basics ways
        </h1>
        <p className="text-gray-400 font-medium line-clamp-3 text-sm sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum,
          voluptatibus consequatur quae possimus suscipit quo accusamus enim
          commodi aliquid velit ipsam rerum reiciendis accusantium provident
          ducimus repellendus eos vitae. Vitae!
        </p>
      </div>
    </div>
  );
}
