export const personalInfo = {
  name: "Alfred Tang",
  phone: "470-918-7183",
  email: "atang302@gatech.edu",
  linkedin: {
    label: "linkedin.com/in/alfred-tang",
    url: "https://www.linkedin.com/in/alfred-tang-19a467319/",
  },
  github: {
    label: "github.com/Randemperson",
    url: "https://github.com/Randemperson",
  },
};

export const education = [
  {
    school: "Georgia Institute Of Technology",
    degree: "Bachelor in Computer Engineering",
    gpa: "3.88",
    date: "Expected Summer 2028",
    location: "Atlanta, GA",
    coursework: [
      "Data Structures and Algorithms",
      "Object Oriented Programming",
      "Differential Equations",
      "Physics",
    ],
  },
];

export const projects = [
  {
    id: "chess",
    title: "C.H.E.S.S",
    tech: ["C#", "Unity", "Git"],
    date: "Aug. 2025 – Present",
    bullets: [
      "Contributed to the development of a Unity Based Chess strategy game featuring custom pieces and maps",
      "Developed a Unity Editor tool using ScriptableObjects and a custom asset pipeline for creating new pieces",
      "Engineered a right-click activated GUI system, contributing 350 lines of C# code to enhance player experience by displaying 3 key statistics on each of the 30+ unique new chess pieces",
      "Collaborated with teammates to resolve 5+ merge conflicts and troubleshoot high-impact bugs",
    ],
    demoType: null, // 'image' | 'video' | null
    demoSrc: null,
  },
  {
    id: "led-maze",
    title: "LED Maze Demo",
    tech: ["PCB Fabrication", "MicroPython", "Raspberry Pi", "KiCAD"],
    date: "Sep. 2025 – Present",
    bullets: [
      "Designed and programmed a randomly generated 8×8 matrix maze using a variation of recursive backtracking algorithm",
      "Integrated a MAX7219 LED driver and button interface with Raspberry Pi for a LED maze game on a breadboard",
      "Fabricating and assembling a custom PCB using the LPKF ProtoMat S103 and ProtoLaser U4 based on breadboard prototype",
      "Demonstrated to people in makerspace including Master PI who was doing a similar project",
    ],
    demoType: null,
    demoSrc: null,
  },
  {
    id: "ml-classification",
    title: "ML Classification Workflow",
    tech: ["Python", "scikit-learn", "pandas", "NumPy", "joblib"],
    date: "Nov. 2025 – Jan. 2026",
    bullets: [
      "Implemented a machine learning pipeline in Python to preprocess educational data and train classification models",
      "Identified and corrected majority-class bias in a binary classification task using class-weighted training and probability threshold tuning, improving recall for at-risk students while achieving ~70% accuracy on held-out data",
    ],
    demoType: null,
    demoSrc: null,
  },
];

export const experience = [
  {
    title: "Restaurant General Manager",
    company: "Saigon Cafe",
    date: "June 2021 – Present",
    location: "Woodstock, GA",
    bullets: [
      "Analyzed market challenges during lockdown and implemented new operational workflows for delivery services, maintaining business continuity",
      "Post COVID, co-led and helped mentor a team of 4–5 employees, optimizing shift workflow and contributing to a gradual increase of ~70% in revenue",
      "Ensured accuracy and coordinated meal delivery with 10–20 concurrent orders during rush hour",
    ],
  },
  {
    title: "Academic Tutor – Mathematics (SAT Prep)",
    company: "Schoolhouse.World",
    date: "Aug. 2023 – April 2024",
    location: "Online",
    bullets: [
      "Facilitated student mastery of SAT mathematics by clarifying concepts and guiding problem-solving using official exam materials",
      "Explored information retention methods such as Kahoot and group connection activities",
      "Listened to student feedback and criticism; achieved top 20% helpful reviews of tutors on website",
    ],
  },
  {
    title: "AI Trainer – Generalist",
    company: "Handshake AI Fellowship",
    date: "Nov. 2025 – Present",
    location: "Remote",
    bullets: [
      "Annotated and labeled datasets for AI model training, including image classification, video entity recognition, and instance segmentation tasks",
      "Generated synthetic training scenarios and edge cases to improve model robustness and performance",
      "Maintained 1.8/2 quality accuracy standards across 5–9 tasks weekly for consistent computer vision development",
    ],
  },
];

export const responsibilities = [
  {
    title: "Team Captain",
    org: "Coding Club @ RRHS",
    date: "Aug. 2022 – May 2025",
    bullets: [
      "Helped prepare 5 three-person teams for CodeQuest at Lockheed Martin through mock competitions and discussions",
      "Reviewed Java problem-solving concepts such as tracing and debugging on topics like recursion and sorting",
    ],
  },
  {
    title: "Team Recruiter",
    org: "RRHS Science Olympiad",
    date: "Aug. 2021 – May 2025",
    bullets: [
      "Expanded active team membership from 14 to ~25 through structured outreach and recruitment",
      "Contributed to the school's first state qualification in ~7 years, with 8 total medals and 2 at state; main subjects: Optics and Robot Tour",
    ],
  },
];

export const skills = {
  Languages: ["Java", "C#", "MATLAB", "Python", "HTML/CSS"],
  "Frameworks & Libraries": ["JUnit", "JavaFX", "NumPy", "EntityFramework"],
  "Developer Tools": ["Git", "VS Code", "IntelliJ", "KiCAD", "Unity"],
};

export const achievements = [
  { title: "Appalachian Entrepreneurship Academy – 3rd Place", year: "2024" },
  { title: "Presidential Scholars Candidate", year: "2025" },
];
