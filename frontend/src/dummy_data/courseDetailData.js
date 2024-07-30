const course = {
  title: "Advanced French Grammar and Composition",
  description:
    "This comprehensive course is designed to enhance your French grammar and writing skills. Dive deep into advanced grammatical structures, improve your writing techniques, and master the art of effective communication. Ideal for students, professionals, and anyone looking to elevate their French proficiency.",
  imageUrl:
    "https://t3.ftcdn.net/jpg/06/63/23/70/360_F_663237000_JnHQ5v10ZzMMUswHJJP9MEzDbiCSu3Ln.jpg",
  hours: "25 Hours",
  level: "Beginner",
  students: "12,345 Students",
  overview: `Embark on your journey to master the French language with our comprehensive French course, designed to equip you with the foundational skills and vocabulary needed for fluency. This course is perfect for anyone looking to learn French, whether for travel, work, or personal enrichment. Throughout 20+ interactive modules, you will delve into French Grammar, Vocabulary, Pronunciation, and Cultural Insights, all crafted to enhance your language proficiency. Completing this course and engaging with the interactive exercises and assessments will prepare you for advanced French studies and provide a solid foundation for achieving fluency.`,
  highlights: [
    "Measure Your Progress - Track your language development from module to module using our progress tracking tools.",
    "Learn, Practice, Prove - Develop and refine your French language skills through a complete curriculum of lessons, exercises, and assessments.",
    "Get Hands-On - Practice speaking and listening with interactive audio-visual materials and live conversation sessions.",
  ],
};
const courseOutline = [
  {
    title: "Introduction to French Language and Culture",
    lectures: 20,
    duration: "48 min",
    details: [
      {
        description:
          "Overview of the French language and its global significance",
        duration: "30 min",
      },
      {
        description: "Introduction to French-speaking countries and cultures",
        duration: "18 min",
      },
    ],
  },
  {
    title: "Basic Grammar and Sentence Structure",
    lectures: 15,
    duration: "35 min",
    details: [
      {
        description: "Understanding nouns, articles, and gender",
        duration: "20 min",
      },
      {
        description: "Basic sentence structure (subject-verb-object)",
        duration: "15 min",
      },
    ],
  },
];
const reviewData = {
  reviewerName: "John Doe",
  reviewerImage: "https://img-c.udemycdn.com/user/200_H/9931418_bedc.jpg",
  reviewText:
    "This course was fantastic! I learned so much and the instructor was amazing.",
  rating: 4.5,
  reviewDate: "2024-07-29T12:34:56Z",
};
const dummyInstructorData = {
  name: "Academind by Maximilian Schwarzmüller",
  image: "https://img-c.udemycdn.com/user/200_H/31926668_94e7_6.jpg",
  rating: 4.6,
  students: 3007620,
  reviews: 534534,
  courses: 43,
  description: `Bundling the courses and know-how of successful instructors, Academind
    strives to deliver high-quality online education. 
    Online Education, Real-Life Success - that's what Academind stands for.
    Learn topics like web development, data analysis, and more in a fun
    and engaging way. We've taught more than 2,000,000 students on a broad variety of
    topics. We'd love to teach you as well! :) Keep learning!`,
};
export { course, courseOutline, dummyInstructorData, reviewData };
