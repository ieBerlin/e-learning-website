import { motion } from "framer-motion";

export default function LoadingDots({ title = "Data" }) {
  return (
    <div className="w-full h-[50px] flex justify-center items-center flex-col gap-3 pt-[50px]">
      <motion.ul className="flex flex-row gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.li
            key={`dot-${index}`}
            animate={{
              y: ["0%", "-100%", "0%"]
            }}
            transition={{
              ease: "easeInOut",
              repeatType: "mirror",
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-gray-600"></div>
          </motion.li>
        ))}
      </motion.ul>
      <h2 className="font-semibold text-gray-600 text-center mt-3">
        Your {title} is being Loaded ...
      </h2>
    </div>
  );
}
