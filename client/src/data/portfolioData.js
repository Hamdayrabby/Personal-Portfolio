// All portfolio content — curated for recruiter-readability
const portfolioData = {
  personal: {
    name: "Hamday Rabby Hossain",
    title: "AI Engineer & Software Developer",
    subtitle: "Applied Machine Learning & MERN Stack",
    greeting: "Hello, I'm",
    tagline: "CS Graduate · AI Engineer · Software Developer",
    summary:
      "Aspiring AI Engineer and Software Developer building scalable MERN applications and solving real-world problems through ML & AI. Strong algorithmic foundation with 1000+ solved problems across multiple platforms.",
    about:
      "I'm a Computer Science graduate who builds clean, production-ready software and applies ML & AI to solve real-life problems. Experienced in research, full-stack web development with the MERN stack, building ML models, and integrating generative AI into applications (RAG, multi-agent workflows). I focus on turning complex ideas into practical, well-architected solutions — from data preprocessing to deployment.",
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
      "AI Engineer",
      "Software Developer",
      "Full Stack Developer",
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
      category: "Programming",
      items: ["Python", "JavaScript", "C++"],
    },
    {
      category: "Machine Learning & AI",
      items: ["Supervised Learning", "Ensemble Learning", "Model Evaluation", "Transformer Models", "Explainable AI"],
    },
    {
      category: "Generative AI",
      items: ["LLM Integration", "AI Agents", "Prompt Engineering", "RAG", "Multi-Agent Workflows", "AWS PartyRock"],
    },
    {
      category: "Software Development",
      items: ["React", "Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "Streamlit", "Vercel", "Render", "Kaggle", "AWS Bedrock"],
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
        "Built a stage-based job tracker to manage the recruitment lifecycle across Applied, Interview, and Offer stages.",
        "Developed AI-powered semantic resume matching and ATS scoring to generate targeted improvement suggestions.",
        "Designed and implemented secure RESTful APIs with JWT authentication and role-based access control.",
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
        "Built a MERN-based recipe platform with role-based user and admin access.",
        "Integrated AI-driven recipe generation for personalized cooking suggestions.",
        "Developed secure backend APIs supporting authentication and moderation workflows.",
      ],
      tech: ["React", "Express", "MongoDB", "JWT", "HTML", "CSS"],
      liveUrl: "https://let-s-cook-ruddy.vercel.app",
      githubUrl: "https://github.com/Hamdayrabby/Let-s-Cook",
      image: null,
    },
    {
      id: 3,
      title: "Spendly",
      subtitle: "Personal Finance & Expense Tracker",
      type: "software",
      featured: true,
      features: [
        "Developed a MERN-stack personal finance application for tracking expenses and financial goals.",
        "Built interactive analytics dashboards using MongoDB aggregation and Recharts for spending insights.",
        "Implemented robust security featuring JWT refresh token flows, bcrypt, Helmet, and API rate limiting.",
      ],
      tech: ["React", "Express", "MongoDB", "Tailwind CSS", "Recharts", "JWT", "Helmet"],
      liveUrl: "https://spendly.vercel.app/",
      githubUrl: "https://github.com/Hamdayrabby/Spendly",
      image: null,
    },
    {
      id: 4,
      title: "Smart Study Assistant Pro",
      subtitle: "AI-Powered Personalized Study Planner",
      type: "ml",
      featured: true,
      features: [
        "Developed an interactive personalized study planner leveraging AWS PartyRock (Bedrock) GenAI playgrounds.",
        "Configured custom prompt templates and generative chat assistants to adapt study modules based on user schedule and academic focus.",
        "Built automated course syllabus break-downs and quiz generation workflows.",
      ],
      tech: ["AWS PartyRock", "Amazon Bedrock", "Prompt Engineering", "Generative AI"],
      liveUrl: "https://partyrock.aws/u/hamdayrabby385/Z_BZNL4hm/Smart-Study-Assistant-Pro",
      githubUrl: null,
      image: null,
    },
    {
      id: 5,
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
      id: 6,
      title: "Telecom Churn Prediction",
      subtitle: "Machine Learning Thesis Project",
      type: "ml",
      featured: true,
      features: [
        "Developed machine learning models for telecom customer churn analysis using feature engineering, ensemble learning, and explainable AI techniques.",
        "Designed an interpretable ensemble framework for real-time churn prediction with a deployed web application for interactive prediction and analysis.",
        "Presented research at the IEEE CS BDC Summer Symposium 2025.",
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
      id: 7,
      title: "AI Concierge Chef",
      subtitle: "Generative AI Agent",
      type: "ml",
      featured: false,
      features: [
        "Built a generative AI agent transforming leftover ingredients into contextual recipe recommendations.",
        "Designed agent workflows using LLM APIs and prompt engineering for reasoning and generation.",
        "Evaluated agent outputs for relevance, coherence, and production usability.",
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
      title: "Research Assistant",
      organization: "Humach Lab",
      location: "Remote",
      date: "Feb 2026 – June 2026",
      description:
        "Contributed to transformer-based NLP research involving dataset preprocessing, model experimentation, evaluation workflows, and AI/ML pipeline development.",
    },
    {
      title: "General Secretary",
      organization: "CSE Club of HSTU",
      location: "Dinajpur, Bangladesh",
      date: "Jan 2025 – Aug 2025",
      description:
        "Led the executive committee in organizing tech festivals, programming contests, and workshops. Managed club operations and fostered a collaborative environment for students.",
    },
    {
      title: "Publication & IT Secretary",
      organization: "Programmers Arena, HSTU",
      location: "Dinajpur, Bangladesh",
      date: "Jan 2024 – Aug 2025",
      description:
        "Managed digital content, publications, and IT infrastructure. Facilitated competitive programming training sessions and coordinated inter-university events.",
    },
    {
      title: "Assistant IT Secretary",
      organization: "CSE Club of HSTU",
      location: "Dinajpur, Bangladesh",
      date: "Jan 2022 – Dec 2022",
      description:
        "Assisted in managing club IT operations, maintaining the club's digital presence, and supporting event organization for tech-related activities.",
    },
    {
      title: "Campus Ambassador",
      organization: "Team Matrix Elite Hackers",
      location: "Remote",
      date: "May 2021 – Dec 2024",
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
      date: "Jan 2020 – Dec 2023",
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
        "Synthetic Evolution and Adversarial Resilience in Bangla Fake News Detection",
      venue: "Ongoing Research Project",
      type: "AI & NLP Research",
      description:
        "Studied AI-generated Bangla misinformation using Zero/Few-Shot prompting and developed an AI-polishing framework with LLMs to evaluate detector robustness against AI-laundered fake news.",
    },
    {
      title:
        "Telecommunication Customer Churn Prediction using Machine Learning",
      venue: "IEEE CS BDC Summer Symposium 2025",
      type: "Research Presentation",
      description:
        "Developed machine learning models for telecom customer churn analysis using feature engineering, ensemble learning, and explainable AI techniques.",
    },
    {
      title:
        "An Interpretable Ensemble Learning Approach for Real-Time Telecom Customer Churn Prediction",
      venue: "Undergraduate Thesis",
      type: "Thesis",
      liveUrl: "https://telecom-customer-churn-prediction-webapp.streamlit.app/",
      description:
        "Designed an interpretable ensemble framework for real-time churn prediction with a deployed web application for interactive prediction and analysis.",
    },
  ],

  competitiveProgramming: [
    { event: "ICPC Dhaka Regional Preliminary Contest", years: "2022, 2023, 2024", highlight: false },
    { event: "NCPC Preliminary", years: "2024", highlight: false },
    { event: "Rangpur Divisional Programming Contest", years: "2024", place: "7th", highlight: true },
    { event: "SUST IUPC", years: "2024", place: "108th", highlight: true },
    { event: "Intra University Programming Contest", years: "2023", place: "5th", highlight: true },
    { event: "Intra University Programming Contest", years: "2022", place: "9th", highlight: false },
    { event: "HSTU CSE Fest Project Exhibition", years: "2025", highlight: true }
  ],

  certifications: [
    {
      name: "AWS AI Practitioner Challenge — Udacity (Part of Accenture) 2026",
      image: "/assets/aws_ai_practitioner_cert.png"
    },
    {
      name: "5-Day AI Agents Intensive Course — Kaggle — Google 2025",
    },
    {
      name: "Full Stack Web Development with JavaScript (MERN) — Ostad 2024",
    },
    {
      name: "Database Training (MySQL/Oracle/SQL Server) — 80 Hours (EDGE Project) 2024",
    },
  ],
};

export default portfolioData;
