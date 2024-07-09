import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const dotVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};
export default function ProcessingIndicator() {
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start("hidden");
      setTimeout(() => controls.start("visible"), 500);
    }, 2000);
    return () => clearInterval(interval);
  }, [controls]);
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <h1 className="font-bold">
      Processing{" "}
      <motion.span
        transition={{ type: "spring" }}
        initial="hidden"
        exit="hidden"
        animate={controls}
        variants={dotVariants}
        className="font-bold"
      >
        {Array.from({ length: 3 }, (_, index) => (
          <motion.span
            key={`dot-${index}`}
            variants={dotVariants}
            className="inline-block"
          >
            .
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
}
