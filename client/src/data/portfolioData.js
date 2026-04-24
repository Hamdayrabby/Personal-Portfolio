// All portfolio content — curated for recruiter-readability
const portfolioData = {
  personal: {
    name: "Hamday Rabby Hossain",
    title: "Full Stack Developer",
    subtitle: "MERN Stack & Applied Machine Learning",
    greeting: "Hello, I'm",
    tagline: "CS Graduate · MERN Stack · Machine Learning",
    summary:
      "Full Stack Developer building scalable MERN applications and solving real-world problems through ML & AI. Strong algorithmic foundation with 1000+ solved problems across multiple platforms.",
    about:
      "I'm a Computer Science graduate who builds clean, production-ready software and applies ML & AI to solve real-life problems. Experienced in full-stack web development with the MERN stack, building ML models for real-world use cases, and integrating generative AI into applications. I focus on turning complex ideas into practical, well-architected solutions — from data preprocessing to deployment.",
    location: "Dhaka, Bangladesh",
    email: "hamdayrabby385@gmail.com",
    phone: "+8801720908856",
    linkedin: "https://www.linkedin.com/in/hamday-rabby-hossain-714990234/",
    github: "https://github.com/Hamdayrabby",
    codeforces: "https://codeforces.com/profile/hamdayrabby385",
    leetcode: "https://leetcode.com/hamdayrabby385",
    resumeLink:
      "https://drive.google.com/drive/folders/1XoXvKh_4OuX0FQK6tvhTnqsYz42Yz8Kd?usp=sharing",
    roles: [
      "Full Stack Developer",
      "Software Engineer",
      "Researcher",
      "AI & ML Enthusiast",
    ],
  },

  services: [
    {
      icon: "🌐",
      title: "Full Stack Development",
      items: [
        "Scalable MERN applications",
        "REST API design & JWT auth",
        "MongoDB/MySQL architecture",
        "Production deployment (Vercel/Render)",
      ],
    },
    {
      icon: "🧠",
      title: "AI & Machine Learning",
      items: [
        "Ensemble Learning & Feature Engineering",
        "Model Evaluation & Explainability (SHAP)",
        "LLM API Integration & Prompt Engineering",
        "Data Analysis & Preprocessing",
      ],
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["C/C++", "Python", "JavaScript", "SQL"],
    },
    {
      category: "Frontend",
      items: ["React", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      category: "Backend & Databases",
      items: ["Node.js", "Express.js", "MongoDB", "MySQL", "Mongoose", "JWT"],
    },
    {
      category: "Machine Learning",
      items: ["Scikit-learn", "TensorFlow", "SHAP", "Pandas", "NumPy", "Streamlit"],
    },
    {
      category: "AI & GenAI",
      items: ["Prompt Engineering", "LLM APIs", "OpenAI API", "Gemini API"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "Vercel", "Render", "Kaggle"],
    },
  ],

  projects: [
    {
      id: 1,
      title: "Knotic-Sense",
      subtitle: "AI-Powered Job Search Tracker",
      type: "software",
      featured: true,
      features: [
        "Stage-based recruitment tracker (Applied/Interview/Offer) with full lifecycle management.",
        "AI-powered semantic resume–job matching with ATS-aware scoring, improving keyword coverage by 15–30%.",
        "Production-deployed MERN app with JWT authentication, role-based authorization, and secure API integration.",
      ],
      tech: ["React", "Express", "MongoDB", "JWT", "Tailwind CSS", "Prompt Engineering"],
      liveUrl: "https://knotic-sense.vercel.app/",
      githubUrl: "https://github.com/Hamdayrabby/knotic_Sense",
      image: null,
    },
    {
      id: 2,
      title: "Let's Cook",
      subtitle: "MERN Full Stack Recipe Platform",
      type: "software",
      featured: true,
      features: [
        "MERN-based recipe platform with role-based user and admin access.",
        "Integrated AI-driven recipe generation for personalized cooking suggestions.",
        "Responsive frontend with reusable components, deployed on Vercel and Render.",
      ],
      tech: ["React", "Express", "MongoDB", "JWT", "HTML", "CSS"],
      liveUrl: "https://let-s-cook-ruddy.vercel.app",
      githubUrl: "https://github.com/Hamdayrabby/Let-s-Cook",
      image: null,
    },
    {
      id: 3,
      title: "GradeSync",
      subtitle: "Java Result Management System",
      type: "software",
      featured: false,
      features: [
        "Result management system with Java Swing GUI for student grade tracking.",
        "MySQL-integrated persistent storage for student records and grade calculations.",
        "Separate student and admin interfaces for streamlined operations.",
      ],
      tech: ["Java", "Java Swing", "MySQL", "JDBC"],
      githubUrl: "https://github.com/Hamdayrabby/GradeSync",
      image: null,
    },
    {
      id: 4,
      title: "Telecom Churn Prediction",
      subtitle: "Machine Learning Thesis Project",
      type: "ml",
      featured: true,
      features: [
        "Churn prediction model achieving 92% recall using ensemble methods and SHAP-based explainability.",
        "Interactive Streamlit app covering data overview, EDA, preprocessing, and real-time prediction.",
        "Comparative performance analysis with standard and advanced model evaluation pipelines.",
      ],
      tech: ["Python", "Streamlit", "Scikit-learn", "SHAP"],
      liveUrl:
        "https://telecom-customer-churn-prediction-webapp.streamlit.app/",
      kaggleUrl:
        "https://www.kaggle.com/code/hamdayrabbyhossain/customer-churn-eda-prediction-ensemble",
      githubUrl:
        "https://github.com/Hamdayrabby/Telecom-Customer-Churn-Prediction-WebApp",
      image: null,
    },
    {
      id: 5,
      title: "AI Concierge Chef",
      subtitle: "Generative AI Agent",
      type: "ml",
      featured: false,
      features: [
        "Generative AI agent transforming leftover ingredients into contextual recipe recommendations.",
        "Agent-based workflows using LLM APIs and prompt engineering for reasoning.",
        "Evaluated for relevance, coherence, and real-world usability.",
      ],
      tech: [
        "Python",
        "LLM APIs",
        "Prompt Engineering",
        "Agent-Based AI",
      ],
      writeupUrl:
        "https://kaggle.com/competitions/agents-intensive-capstone-project/writeups/the-concierge-chef-ai-agent-for-leftover-ingredie",
      kaggleUrl:
        "https://www.kaggle.com/code/hamdayrabbyhossain/pantry-to-plate-google-capstone-project",
      image: null,
    },
  ],

  experience: [
    {
      title: "General Secretary",
      organization: "CSE Club of HSTU",
      location: "Dinajpur, Bangladesh",
      date: "2024 – 2025",
      description:
        "Led the executive committee in organizing tech festivals, programming contests, and workshops. Managed club operations and fostered a collaborative environment for students.",
    },
    {
      title: "Publication & IT Secretary",
      organization: "Programmers Arena, HSTU",
      location: "Dinajpur, Bangladesh",
      date: "2023 – 2025",
      description:
        "Managed digital content, publications, and IT infrastructure. Facilitated competitive programming training sessions and coordinated inter-university events.",
    },
    {
      title: "Assistant IT Secretary",
      organization: "CSE Club of HSTU",
      location: "Dinajpur, Bangladesh",
      date: "2022 – 2023",
      description:
        "Assisted in managing club IT operations, maintaining the club's digital presence, and supporting event organization for tech-related activities.",
    },
    {
      title: "Campus Ambassador",
      organization: "Team Matrix Elite Hackers",
      location: "Remote",
      date: "2021 – 2024",
      description:
        "Represented the organization on campus, promoted cybersecurity awareness, and organized seminars on ethical hacking and network security.",
    },
  ],

  education: [
    {
      degree: "BSc (Engineering)",
      field: "Computer Science and Engineering",
      institution: "Hajee Mohammad Danesh Science & Technology University",
      shortName: "HSTU",
      location: "Dinajpur-5200",
      date: "Jan 2020 – Oct 2025",
      cgpa: "3.399 / 4.00",
      description:
        "Coursework in Data Structures, Algorithms, Artificial Intelligence, and Database Management Systems.",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      field: "Science",
      institution: "Govt. Science College",
      location: "Tejgaon, Dhaka",
      date: "July 2016 – Oct 2018",
      cgpa: "4.33 / 5.00",
      description: "Higher secondary education in Science stream.",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      field: "Science",
      institution: "Dhaka Cantonment Board Adarsha Biddya Niketon",
      location: "Manikdee, Dhaka",
      date: "Jan 2015 – July 2016",
      cgpa: "5.00 / 5.00",
      description: "Secondary education in Science stream with perfect GPA.",
    },
  ],

  research: [
    {
      title:
        "Telecommunication Customer Churn Prediction using Machine Learning",
      venue: "IEEE CS BDC Summer Symposium 2025",
      type: "Research Presentation",
    },
    {
      title:
        "An Interpretable Ensemble Learning Approach for Real-Time Telecom Customer Churn Prediction",
      venue: "Undergraduate Thesis",
      type: "Thesis",
      liveUrl: "#",
    },
  ],

  competitiveProgramming: [
    { event: "ICPC Dhaka Regional Preliminary Contest", years: "2022, 2023, 2024", highlight: false },
    { event: "SUST IUPC", years: "2023", place: "5th", highlight: true },
    { event: "Rangpur Divisional Collegiate Programming Contest", years: "2024", place: "7th", highlight: true },
    { event: "IUPC (Intra University)", years: "2023", place: "5th", highlight: true },
  ],

  certifications: [
    "Database Training (MySQL/Oracle/SQL Server) — 80 Hours (EDGE Project)",
    "Full Stack Web Development with JavaScript (MERN) — Ostad",
    "5-Day AI Agents Intensive Course — Google, Kaggle",
  ],
};

export default portfolioData;
