export const summary = {
  headline: "Welcome — I'm Alfred Tang",
  tagline: "Computer Engineering student at Georgia Tech passionate about systems, software, and solving hard problems.",
  intro: [
    "I'm a first-year Computer Engineering student at Georgia Institute of Technology (GPA: 3.88), building experience across embedded systems, game development, and machine learning.",
    "I thrive at the intersection of hardware and software — from fabricating custom PCBs to shipping Unity games with novel tools.",
    "Outside the lab, I lead teams, mentor peers, and bring the same operational mindset that grew a family restaurant's revenue by 70%.",
  ],
};

export const biography = {
  headline: "About Me",
  paragraphs: [
    "Growing up, I was always the kid who took things apart to see how they worked — and occasionally put them back together. That curiosity became a formal pursuit when I enrolled in Computer Engineering at Georgia Tech, where I'm learning to bridge the worlds of hardware and software.",
    "My journey into tech started in high school where I captained my school's Coding Club and competed in Lockheed Martin's CodeQuest, coaching five three-person teams through mock competitions. I was also a key part of my school's Science Olympiad team, helping recruit members and contribute to our first state qualification in roughly seven years.",
    "At Georgia Tech I've dived straight into hands-on projects: I co-developed a Unity chess strategy game with custom pieces and an editor toolchain built on ScriptableObjects; I designed and programmed an 8×8 LED matrix maze game driven by a Raspberry Pi and a custom PCB I fabricated in the makerspace; and I built a machine-learning pipeline in Python to identify at-risk students in educational data.",
    "Beyond technical work, I bring leadership and business perspective from managing a family restaurant — navigating COVID-era operational pivots, mentoring a team of five, and watching revenue climb 70% on the other side. That experience taught me that technical solutions are only as good as the people and processes behind them.",
    "I am passionate about embedded systems, computer vision, and the intersection of real-world hardware with intelligent software. I'm looking for research opportunities, internships, and teams where I can keep pushing that boundary.",
  ],
};

export const careerGoals = {
  headline: "Career Goals",
  longTerm:
    "My long-term aspiration is to work at the frontier of embedded AI — developing the low-level firmware and silicon architectures that let intelligent algorithms run on resource-constrained devices, whether that's a medical implant, an autonomous rover, or next-generation consumer hardware.",
  steps: [
    {
      phase: "Short-term (1–2 years)",
      actions: [
        "Complete core ECE coursework (Digital Design, Computer Architecture, Circuits) with strong grades to build a rigorous technical foundation.",
        "Secure a research position or internship in embedded systems or computer vision to gain industry-adjacent experience.",
        "Contribute to two additional hands-on projects — one hardware-centric, one software/ML-centric — to broaden my portfolio.",
        "Pursue relevant certifications or workshops (e.g., FPGA design, ROS, CUDA) to accelerate skill growth outside the classroom.",
      ],
    },
    {
      phase: "Mid-term (3–4 years)",
      actions: [
        "Complete an ECE co-op or internship at a company working on embedded AI, autonomous systems, or semiconductor design (target: NVIDIA, Apple Silicon, SpaceX, or a high-impact startup).",
        "Potentially pursue a 5-year BS/MS program at Georgia Tech to deepen expertise in VLSI or machine learning systems.",
        "Develop a capstone project that integrates hardware design with on-device machine learning inference.",
        "Build a professional network through IEEE, hackathons, and campus research labs (e.g., GT's CRNCH or ML@GT).",
      ],
    },
    {
      phase: "Long-term (5+ years)",
      actions: [
        "Join a team designing next-generation embedded AI chips or firmware stacks — contributing to hardware-software co-design.",
        "Consider graduate study (PhD) if a specific research question demands it, focused on energy-efficient neural network accelerators.",
        "Eventually mentor the next generation of engineers, giving back to the same kind of collaborative learning environment that shaped me.",
      ],
    },
  ],
  roadmapNote:
    "This roadmap is intentionally iterative — each phase feeds the next, and I revisit it every semester as new opportunities, courses, and projects reshape my understanding of where I want to go.",
};

export const resumeInfo = {
  downloadPath: "/resume.pdf",
  lastUpdated: "May 2025",
};

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
    isDiscovery: false,
    overview: `C.H.E.S.S (Custom Hardware-Extended Strategy System) is a Unity-based chess strategy game that reimagines classical chess with custom pieces, unique maps, and a fully extensible editor toolchain. The project began as a collaborative team effort to explore what chess could look like if freed from its traditional constraints.

The centerpiece of my contribution was a Unity Editor tool built on ScriptableObjects, allowing designers to create new piece types without touching code. Each piece definition stores movement rules, attack patterns, and three key statistics (Power, Mobility, and Utility) that players can inspect mid-game through a right-click GUI panel I engineered. This system currently supports 30+ unique piece types, with the architecture designed to scale to hundreds.

On the engineering side, I wrote approximately 350 lines of C# to implement the statistics overlay system, integrating smoothly with Unity's existing event model. The project followed a Git-based workflow, and I worked through 5+ merge conflicts alongside teammates — navigating both the technical and communication challenges that come with shared codebases.

The game features multiple custom maps each with different board shapes and terrain rules, encouraging players to adapt their strategy to the environment. Future work includes an AI opponent using minimax with alpha-beta pruning, online multiplayer via Unity Relay, and a piece creation wizard for non-technical users.`,
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
    isDiscovery: true,
    overview: `The LED Maze Demo is my ECE Discovery Project — a self-contained embedded systems game built from the ground up, spanning algorithm design, firmware programming, breadboard prototyping, and professional PCB fabrication.

**Concept & Motivation**
The idea was simple: build a maze game that fits in your pocket. The constraint — only an 8×8 grid of LEDs — made it an interesting engineering challenge. Every pixel counts, so the maze generator had to produce solvable, interesting paths in just 64 cells, and the firmware had to respond to button input fast enough to feel responsive.

**Algorithm Design**
I implemented a variation of recursive backtracking (also known as the "depth-first search" maze algorithm) to generate random, perfect mazes — meaning every cell is reachable and there is exactly one path between any two cells. I modified the classic algorithm to bias toward longer corridors, making the 8×8 grid feel less cramped and more game-like. The maze is regenerated each playthrough, providing endless replayability.

**Hardware & Firmware**
The hardware stack consists of a Raspberry Pi Pico running MicroPython, a MAX7219 LED matrix driver managing the 8×8 display, and a four-button interface (up, down, left, right) with hardware debouncing. The MAX7219 communicates over SPI, allowing the full 64-LED grid to be refreshed in a single transaction. I implemented a lightweight display buffer in MicroPython, updating only changed cells to minimize SPI traffic and keep the interface snappy.

**PCB Design & Fabrication**
After validating the design on a breadboard, I translated it into a custom PCB using KiCAD. The layout prioritizes compactness: the MAX7219 is placed directly beneath the LED matrix footprint, and decoupling capacitors are placed as close as possible to power pins following best practices for mixed-signal boards. I fabricated the board in Georgia Tech's Invention Studio using the LPKF ProtoMat S103 (milling) and ProtoLaser U4 (laser-based trace etching), then hand-soldered all components.

**Results & Reception**
The finished device boots in under two seconds, generates a new maze per power cycle, and has been demonstrated to fellow students and the Invention Studio's Master PI — who was building a similar LED project — sparking a productive conversation about interrupt-driven input handling vs. polling. The project is ongoing; planned additions include a timer display, a high-score EEPROM save, and a 3D-printed enclosure.`,
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
    isDiscovery: false,
    overview: `This project is a machine learning pipeline built in Python to classify students as "at-risk" or "not at-risk" based on behavioral and demographic features from an educational dataset. The goal was to explore how well classical ML models can flag students who may need intervention, with a focus on practical deployment considerations.

**Problem & Dataset**
The dataset contained ~500 student records with features including attendance patterns, assignment submission rates, and engagement metrics. The target label was binary: at-risk or not. A key challenge was that only ~20% of students were labeled at-risk, creating a significant class imbalance that naive models would simply ignore.

**Pipeline Architecture**
I built the pipeline using scikit-learn's Pipeline API, which chains preprocessing and model steps cleanly and prevents data leakage during cross-validation. Preprocessing included median imputation for missing values, standard scaling for numerical features, and one-hot encoding for categorical ones. I evaluated three classifiers — Logistic Regression, Random Forest, and a Gradient Boosting classifier — using stratified 5-fold cross-validation.

**Handling Class Imbalance**
Initial results showed >90% accuracy but near-zero recall for the at-risk class — the model was simply predicting "not at-risk" for everyone. I addressed this with two techniques: class-weighted loss functions (penalizing misclassification of the minority class more heavily) and probability threshold tuning (lowering the decision threshold from 0.5 to ~0.35). After tuning, the best model achieved ~70% overall accuracy with substantially improved recall for at-risk students — a deliberate trade-off prioritizing false-negative reduction over precision.

**Deployment & Serialization**
The final pipeline was serialized with joblib for easy reload in a production-like inference script. I documented the threshold-tuning rationale so that future maintainers understand why the threshold differs from the default.

**Key Takeaway**
This project reinforced that accuracy is a misleading metric for imbalanced classification tasks. The real engineering challenge was deciding what kind of errors were acceptable — missing an at-risk student (false negative) vs. flagging a fine student (false positive) — and tuning the system accordingly.`,
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
