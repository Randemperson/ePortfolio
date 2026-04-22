export const summary = {
  headline: "Welcome - I'm Alfred Tang",
  tagline: "Computer Engineering student at Georgia Tech passionate about systems, software, and solving hard problems.",
  intro: [
    "I'm a first-year Computer Engineering student at Georgia Institute of Technology (GPA: 3.88), building experience across embedded systems, game development, and machine learning.",
    "I thrive at the intersection of hardware and software - from fabricating custom PCBs to shipping Unity games with novel tools.",
    "Outside the lab, I lead teams, mentor peers, and bring the same operational mindset that grew a family restaurant's revenue by 70%.",
  ],
};

export const biography = {
  headline: "About Me",
  paragraphs: [
    "Growing up, I was always the kid who took things apart to see how they worked - and occasionally put them back together. That curiosity became a formal pursuit when I enrolled in Computer Engineering at Georgia Tech, where I'm learning to bridge the worlds of hardware and software.",
    "My journey into tech started in high school where I captained my school's Coding Club and competed in Lockheed Martin's CodeQuest, coaching five three-person teams through mock competitions. I was also a key part of my school's Science Olympiad team, helping recruit members and contribute to our first state qualification in roughly seven years.",
    "At Georgia Tech I've dived straight into hands-on projects: I co-developed a Unity chess strategy game with custom pieces and an editor toolchain built on ScriptableObjects; I designed and programmed an 8x8 LED matrix maze game driven by a Raspberry Pi and a custom PCB I fabricated in the makerspace; and I built a machine-learning pipeline in Python to identify at-risk students in educational data.",
    "Beyond technical work, I bring leadership and business perspective from managing a family restaurant - navigating COVID-era operational pivots, mentoring a team of five, and watching revenue climb 70% on the other side. That experience taught me that technical solutions are only as good as the people and processes behind them.",
    "I am passionate about embedded systems, computer vision, and the intersection of real-world hardware with intelligent software. I'm looking for research opportunities, internships, and teams where I can keep pushing that boundary.",
  ],
};

export const careerGoals = {
  headline: "Career Goals",
  longTerm:
    "My long-term goal is to build AI systems that can actually see and understand the world - working on computer vision and ML infrastructure at the scale that companies like Google, Meta, or OpenAI operate at. I want to be the engineer who ships the model, not just studies it.",
  steps: [
    {
      phase: "Short-term (1-2 years)",
      actions: [
        "Build a strong foundation in ML through coursework and self-study - linear algebra, probability, deep learning fundamentals - so I can contribute meaningfully, not just run existing code.",
        "Ship at least one serious personal project in computer vision or ML (object detection, image segmentation, or a generative model) with a real write-up and clean code.",
        "Land a research position or internship where I'm working alongside engineers on real AI/ML problems.",
        "Get comfortable with the full ML stack: PyTorch or JAX, experiment tracking, evaluation pipelines, and deployment basics.",
      ],
    },
    {
      phase: "Mid-term (2-3 years)",
      actions: [
        "Secure an internship at a company doing meaningful AI work - ideally in computer vision, multimodal models, or ML infrastructure.",
        "Evaluate whether an MS makes sense: if there's a research question I'm burning to answer, I'll pursue it - otherwise, strong industry experience matters more.",
        "Build a portfolio of projects and contributions that speak for themselves, not just a GPA.",
        "Engage with the broader ML community through papers, open source, or writing about what I'm learning.",
      ],
    },
    {
      phase: "Long-term (4+ years)",
      actions: [
        "Work as a software or AI engineer at a company pushing the frontier - contributing to the models and systems people actually use.",
        "Specialize deeply in computer vision or ML systems, with enough breadth to understand the full stack around my work.",
        "Eventually take on technical leadership - not to manage, but to help teams build better AI faster.",
      ],
    },
  ],
  roadmapNote:
    "This isn't set in stone - I update it every semester as I learn more about what I actually like building. The constant is the direction: shipping real AI, at scale, with great engineers.",
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
    date: "Aug. 2025 - Present",
    isDiscovery: false,
    overview: `C.H.E.S.S (Custom Hardware-Extended Strategy System) is a Unity-based chess strategy game that reimagines classical chess with custom pieces, unique maps, and a fully extensible editor toolchain. The project began as a collaborative team effort to explore what chess could look like if freed from its traditional constraints.

The centerpiece of my contribution was a Unity Editor tool built on ScriptableObjects, allowing designers to create new piece types without touching code. Each piece definition stores movement rules, attack patterns, and three key statistics (Power, Mobility, and Utility) that players can inspect mid-game through a right-click GUI panel I engineered. This system currently supports 30+ unique piece types, with the architecture designed to scale to hundreds.

On the engineering side, I wrote approximately 350 lines of C# to implement the statistics overlay system, integrating smoothly with Unity's existing event model. The project followed a Git-based workflow, and I worked through 5+ merge conflicts alongside teammates - navigating both the technical and communication challenges that come with shared codebases.

The game features multiple custom maps each with different board shapes and terrain rules, encouraging players to adapt their strategy to the environment. Future work includes an AI opponent using minimax with alpha-beta pruning, online multiplayer via Unity Relay, and a piece creation wizard for non-technical users.`,
    bullets: [
      "Contributed to the development of a Unity Based Chess strategy game featuring custom pieces and maps",
      "Developed a Unity Editor tool using ScriptableObjects and a custom asset pipeline for creating new pieces",
      "Engineered a right-click activated GUI system, contributing 350 lines of C# code to enhance player experience by displaying 3 key statistics on each of the 30+ unique new chess pieces",
      "Collaborated with teammates to resolve 5+ merge conflicts and troubleshoot high-impact bugs",
    ],
    demoType: null,
    demoSrc: null,
  },
  {
    id: "led-maze",
    title: "Real-Time Finger Tracking System",
    tech: ["MediaPipe", "Python", "Arduino Nano", "90g Micro Servo"],
    date: "Sep. 2025 - Present",
    isDiscovery: true,
    overview: `**Discovery Project Idea**
This project ended up being completely different from my original Discovery Project idea. Over time, I shifted toward a system that felt more personal and more technically interesting: a real-time finger-tracking pipeline that could eventually connect computer vision to music-related hand analysis. The final project uses Python, OpenCV, and MediaPipe to detect a hand from a live webcam feed, visualize the hand skeleton, and calculate the bend angle of the index finger in real time. That angle can then be sent through a USB connection to an Arduino Nano, which can drive a 90g micro servo. In other words, the project takes visual hand motion, converts it into numerical data, and then uses that data to control hardware. I liked this idea because it combined software, signal processing, and physical prototyping in one system.

**Project Progress**
The project developed in clear stages throughout the semester. By February 10, I had built the main computer-vision pipeline and gotten the hand tracking working well enough to detect landmarks and calculate finger bend data in real time. After that, I moved into the hardware stage by getting the Arduino and servo working as the output side of the system. Once the software-to-hardware connection was more stable, I started prototyping the physical mechanism and 3D printed the gripper parts that would connect the motion output to a usable device. Each stage depended on the previous one, so the semester felt like a gradual transition from proof-of-concept software into a more complete electromechanical prototype.

**Project Successes and Failures**
The biggest successes came from getting the major subsystems to work together. MediaPipe was especially useful because it gave me consistent hand landmark data that I could turn into a real-time control signal instead of just a visual demo. At the same time, the project included a lot of challenges. I had to learn how to wire and control a micro servo with an Arduino Nano, which meant figuring out power, wiring, and serial communication details that were new to me. Physical prototyping was also harder than I first expected, because 3D printed parts rarely worked perfectly on the first try. One of the most time-consuming parts was experimenting with resin printing the silicone connectors in Georgia Tech's Invention Studio. Since the material cost was around $30, I first discussed the process with two Master PIs before moving forward. After printing, I had to wash the part in the sonication bath and then cure it before it was usable. That whole process showed me that hardware iteration can be slow, expensive, and detail-heavy compared to software.

**ECE Skills Gained**
- 3D printing and iterative physical prototyping for gripper parts and connector components
- Connected systems design, especially communication between a Python computer-vision application and an Arduino
- C++ microcontroller programming for Arduino-based control of the servo hardware
- Arduino wiring, including power, signal connections, and hardware debugging
- OpenCV for real-time webcam processing and integration with the MediaPipe hand-tracking pipeline

**Final Thoughts**
Overall, this project made me more interested in the intersection of embedded systems, physical computing, and intelligent sensing. It was one of the first times I worked on something that connected computer vision, microcontrollers, and fabrication in a single workflow, and that made the project feel much closer to real engineering than a purely software assignment. It also showed me how much persistence matters when a project involves both code and hardware. I would like to continue developing this idea, especially by improving the physical mechanism and expanding the vision system so it can analyze more hand posture details for beginning violinists.`,
    bullets: [
      "Built a real-time finger-tracking pipeline with Python, OpenCV, and MediaPipe using live webcam hand landmark detection",
      "Calculated index finger bend angle in real time and sent the tracked value over USB serial to an Arduino Nano at 9600 baud",
      "Added a hardware-free test mode so the software could be developed and debugged without the Arduino connected",
      "Iterated on a 3D-printed gripper, a 90g micro servo setup, and resin-printed silicone components through repeated prototyping",
    ],
    demoType: "image",
    demoSrc: "/projects/discovery/media/IMG_7604.jpg",
    media: [
      {
        type: "image",
        src: "/projects/discovery/media/IMG_7604.jpg",
        alt: "Real-Time Finger Tracking System photo IMG 7604",
        caption: "Project photo: IMG_7604",
      },
      {
        type: "image",
        src: "/projects/discovery/media/IMG_7601.jpg",
        alt: "Real-Time Finger Tracking System photo IMG 7601",
        caption: "Project photo: IMG_7601",
      },
      {
        type: "image",
        src: "/projects/discovery/media/IMG_7592.jpg",
        alt: "Real-Time Finger Tracking System photo IMG 7592",
        caption: "Project photo: IMG_7592",
      },
      {
        type: "image",
        src: "/projects/discovery/media/arduino-servo-code.svg",
        alt: "Arduino servo control code screenshot",
        caption: "Arduino servo control code",
      },
      {
        type: "video",
        src: "/projects/discovery/media/IMG_7520.mov",
        caption: "Project video: IMG_7520",
      },
      {
        type: "video",
        src: "/projects/discovery/media/IMG_7594.mov",
        caption: "Project video: IMG_7594",
      },
      {
        type: "video",
        src: "/projects/discovery/media/IMG_7603.mov",
        caption: "Project video: IMG_7603",
      },
    ],
  },
  {
    id: "ml-classification",
    title: "ML Classification Workflow",
    tech: ["Python", "scikit-learn", "pandas", "NumPy", "joblib"],
    date: "Nov. 2025 - Jan. 2026",
    isDiscovery: false,
    overview: `This project is a machine learning pipeline built in Python to classify students as "at-risk" or "not at-risk" based on behavioral and demographic features from an educational dataset. The goal was to explore how well classical ML models can flag students who may need intervention, with a focus on practical deployment considerations.

**Problem & Dataset**
The dataset contained ~500 student records with features including attendance patterns, assignment submission rates, and engagement metrics. The target label was binary: at-risk or not. A key challenge was that only ~20% of students were labeled at-risk, creating a significant class imbalance that naive models would simply ignore.

**Pipeline Architecture**
I built the pipeline using scikit-learn's Pipeline API, which chains preprocessing and model steps cleanly and prevents data leakage during cross-validation. Preprocessing included median imputation for missing values, standard scaling for numerical features, and one-hot encoding for categorical ones. I evaluated three classifiers - Logistic Regression, Random Forest, and a Gradient Boosting classifier - using stratified 5-fold cross-validation.

**Handling Class Imbalance**
Initial results showed >90% accuracy but near-zero recall for the at-risk class - the model was simply predicting "not at-risk" for everyone. I addressed this with two techniques: class-weighted loss functions (penalizing misclassification of the minority class more heavily) and probability threshold tuning (lowering the decision threshold from 0.5 to ~0.35). After tuning, the best model achieved ~70% overall accuracy with substantially improved recall for at-risk students - a deliberate trade-off prioritizing false-negative reduction over precision.

**Deployment & Serialization**
The final pipeline was serialized with joblib for easy reload in a production-like inference script. I documented the threshold-tuning rationale so that future maintainers understand why the threshold differs from the default.

**Key Takeaway**
This project reinforced that accuracy is a misleading metric for imbalanced classification tasks. The real engineering challenge was deciding what kind of errors were acceptable - missing an at-risk student (false negative) vs. flagging a fine student (false positive) - and tuning the system accordingly.`,
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
    date: "June 2021 - Present",
    location: "Woodstock, GA",
    bullets: [
      "Analyzed market challenges during lockdown and implemented new operational workflows for delivery services, maintaining business continuity",
      "Post COVID, co-led and helped mentor a team of 4-5 employees, optimizing shift workflow and contributing to a gradual increase of ~70% in revenue",
      "Ensured accuracy and coordinated meal delivery with 10-20 concurrent orders during rush hour",
    ],
  },
  {
    title: "Academic Tutor - Mathematics (SAT Prep)",
    company: "Schoolhouse.World",
    date: "Aug. 2023 - April 2024",
    location: "Online",
    bullets: [
      "Facilitated student mastery of SAT mathematics by clarifying concepts and guiding problem-solving using official exam materials",
      "Explored information retention methods such as Kahoot and group connection activities",
      "Listened to student feedback and criticism; achieved top 20% helpful reviews of tutors on website",
    ],
  },
  {
    title: "AI Trainer - Generalist",
    company: "Handshake AI Fellowship",
    date: "Nov. 2025 - Present",
    location: "Remote",
    bullets: [
      "Annotated and labeled datasets for AI model training, including image classification, video entity recognition, and instance segmentation tasks",
      "Generated synthetic training scenarios and edge cases to improve model robustness and performance",
      "Maintained 1.8/2 quality accuracy standards across 5-9 tasks weekly for consistent computer vision development",
    ],
  },
];

export const responsibilities = [
  {
    title: "Team Captain",
    org: "Coding Club @ RRHS",
    date: "Aug. 2022 - May 2025",
    bullets: [
      "Helped prepare 5 three-person teams for CodeQuest at Lockheed Martin through mock competitions and discussions",
      "Reviewed Java problem-solving concepts such as tracing and debugging on topics like recursion and sorting",
    ],
  },
  {
    title: "Team Recruiter",
    org: "RRHS Science Olympiad",
    date: "Aug. 2021 - May 2025",
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
  { title: "Appalachian Entrepreneurship Academy - 3rd Place", year: "2024" },
  { title: "Presidential Scholars Candidate", year: "2025" },
];
