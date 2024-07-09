import { useEffect, useRef, useState } from "react";
import heroSectionPic from "../../assets/heroSectionPic.png";
import { AnimatePresence, motion } from "framer-motion";
import "./LandingPage.css";

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

  const features = [
    {
      id: 1,
      title: "Interactive Lessons",
      description:
        "Engage with fun and interactive lessons designed to make learning enjoyable.",
      icon: "/path/to/interactive-lessons-icon.png",
    },
    {
      id: 2,
      title: "Educational Games",
      description:
        "Learn through a variety of educational games that reinforce language skills.",
      icon: "/path/to/educational-games-icon.png",
    },
    {
      id: 3,
      title: "Progress Tracking",
      description:
        "Track your progress and see how much you've improved over time.",
      icon: "/path/to/progress-tracking-icon.png",
    },
    {
      id: 4,
      title: "Voice Recognition",
      description:
        "Practice speaking with voice recognition technology that helps improve pronunciation.",
      icon: "/path/to/voice-recognition-icon.png",
    },
    {
      id: 5,
      title: "Cultural Insights",
      description:
        "Gain cultural insights to better understand the language and its nuances.",
      icon: "/path/to/cultural-insights-icon.png",
    },
    {
      id: 6,
      title: "Rewards and Achievements",
      description:
        "Earn rewards and achievements as you complete lessons and reach milestones.",
      icon: "/path/to/rewards-achievements-icon.png",
    },
  ];

  return (
    <div className="bg-gray-50">
      <header
        className="grid grid-cols-2 fixed top-0 w-full z-10 bg-gray-50"
        id="header"
        style={{
          borderBottom:
            currentScrollY > headerHeight ? "2px solid #d6d3d1" : undefined,
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
            <h1 className="text-center text-2xl font-bold text-gray-700 py-2">
              Explore the world through language adventures!
            </h1>
            <a href="/auth?mode=signup" className="w-2/3">
              <button className="text-nowrap uppercase py-2 w-full rounded-md bg-red-500 text-white text-xl font-semibold hover:bg-coral-red">
                Get Started
              </button>
            </a>
            <a href="/auth?mode=login" className="w-2/3">
              <button
                ref={signupButtonRef}
                className="uppercase py-2 w-full rounded-md border-2 border-gray-300 text-lime-500 hover:text-lime-400 text-md font-semibold"
              >
                I already have an account
              </button>
            </a>
          </div>
        </div>
      </section>
      {/* Feature Section */}
      <section className="my-3">
        <ul>
          {features.map((feature, index) => (
            <li
              key={feature.id}
              className="w-full grid items-center flex-col-reverse grid-cols-2 py-5"
            >
              {index % 2 === 0 ? (
                <>
                  <FeatureText
                    title={feature.title}
                    description={feature.description}
                  />
                  <FeatureImage styles={{ marginRight: "auto" }} />
                </>
              ) : (
                <>
                  <FeatureImage styles={{ marginLeft: "auto" }} />{" "}
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
    </div>
  );
}
function FeatureText({ title, description }) {
  return (
    <div className="">
      <h1 className="mx-auto text-center w-3/5 font-bold text-emerald-700 text-xl tracking-wide ">
        {title}
      </h1>
      <p className="mx-auto text-center w-3/5 text-gray-800 font-semibold">
        {description}
      </p>
    </div>
  );
}
function FeatureImage({ styles }) {
  return (
    <div>
      <img className="w-4/5" style={styles} src={heroSectionPic} alt="" />
    </div>
  );
}
