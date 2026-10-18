export const summary = {
  headline: "Welcome - I'm Alfred Tang",
  tagline: "Computer Engineering student at Georgia Tech working on autonomous driving research, computer vision, and the software that connects to real hardware.",
  intro: [
    "I'm a Computer Engineering student at Georgia Tech (GPA: 3.92, graduating Spring 2028) and an undergraduate research assistant at IVALab under Prof. Patricio Vela.",
    "My research is autonomous driving: benchmarking lane-change planners, adding safety filters that keep trajectories physically feasible, and prototyping behavior prediction for surrounding vehicles.",
    "Outside the lab I build end to end - an AR game that won ImmerseGT, a vision-controlled robotic gripper, Unity editor tooling, and a Django storefront running in production.",
  ],
};

export const biography = {
  headline: "About Me",
  paragraphs: [
    "Growing up, I was always the kid who took things apart to see how they worked - and occasionally put them back together. That curiosity became a formal pursuit when I enrolled in Computer Engineering at Georgia Tech, where I'm learning to bridge the worlds of hardware and software.",
    "My journey into tech started in high school where I captained my school's Coding Club and competed in Lockheed Martin's CodeQuest, coaching five three-person teams through mock competitions. I was also a key part of my school's Science Olympiad team, helping recruit members and contribute to our first state qualification in roughly seven years.",
    "Most of my time now goes to autonomous driving research. At IVALab, under Prof. Patricio Vela, I built a seeded evaluation harness that benchmarks 8 driving planners on crash, merge, and runtime metrics, added a CBF-QP safety filter that keeps lane-change trajectories physically feasible, and ported an offline MATLAB gap-based planner into a real-time Python controller for HighwayEnv. I also prototyped acceleration-aware behavior prediction for surrounding vehicles, which cut crash rate 22% across 500 paired episodes.",
    "I also work with the Autonomous and Connected Transport Lab VIP, where I trained a PPO reinforcement learning agent for driving in HighwayEnv and fine-tuned transformer language models with Hugging Face Transformers and PyTorch for text comprehension.",
    "I build plenty outside of research. My team took 1st place in Spatial Design at ImmerseGT with Brain3D, an AR game for Snap Spectacles; I built a computer-vision-controlled robotic gripper that turns MediaPipe hand tracking into servo commands; I wrote the Unity editor tooling behind C.H.E.S.S., a strategy game with 60+ custom pieces; and I shipped a Django movie storefront to production for CS 2340.",
    "Beyond technical work, I bring leadership and business perspective from four years helping run a family restaurant - navigating COVID-era operational pivots, mentoring a team of five, and watching revenue climb 70% on the other side. That experience taught me that technical solutions are only as good as the people and processes behind them.",
    "I am passionate about autonomous systems, computer vision, and the point where real hardware meets intelligent software. I'm looking for internships and teams where I can keep pushing that boundary.",
  ],
};

export const careerGoals = {
  headline: "Career Goals",
  longTerm:
    "My long-term goal is to build AI systems that perceive and act in the real world - autonomous vehicles, computer vision, and the ML infrastructure underneath them. I want to be the engineer who ships the system, not just studies it.",
  steps: [
    {
      phase: "Short-term (1-2 years)",
      actions: [
        "Go deep on the math under my research - optimization, control, probability, and deep learning - so I can design methods instead of only tuning them.",
        "Keep pushing the IVALab work toward results that hold up: stronger planner benchmarks, safety filters, and behavior prediction evaluated honestly.",
        "Ship at least one serious personal project in computer vision or autonomy with a real write-up and clean code.",
        "Get comfortable with the full ML stack: PyTorch, experiment tracking, evaluation pipelines, and deployment basics.",
      ],
    },
    {
      phase: "Mid-term (2-3 years)",
      actions: [
        "Secure an internship at a company doing serious autonomy or AI work - self-driving, robotics, or ML infrastructure.",
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
  lastUpdated: "October 2026",
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
    degree: "Bachelor of Science in Computer Engineering",
    gpa: "3.92",
    date: "Expected Spring 2028",
    location: "Atlanta, GA",
    coursework: [
      "Intro to AI",
      "Data Structures and Algorithms",
      "Design and Analysis of Algorithms",
      "Object-Oriented Programming",
    ],
  },
];

export const projects = [
  {
    id: "movies-store",
    title: "Movies Store",
    tech: ["Python", "Django", "MySQL", "Bootstrap", "PythonAnywhere"],
    date: "Sep. 2026 - Present",
    isDiscovery: false,
    isFeatured: true,
    course: "CS 2340 - Objects and Design",
    liveUrl: "https://at10507.pythonanywhere.com/",
    overview: `Movies Store is a Django web application I am building for my CS 2340 (Objects and Design) class at Georgia Tech, deployed live at at10507.pythonanywhere.com. It is a full movie storefront: visitors browse and search a catalog, add titles to a cart, check out, and review the movies they buy.

**Course Context**
CS 2340 is the object-oriented design course, so the emphasis is on structuring an application cleanly rather than just making it work. The project is split into four Django apps - home, movies, cart, and accounts - each owning its own models, views, URLs, and templates, with shared page chrome living in a single base template that every page extends.

**What It Does**
- Catalog browsing with case-insensitive search across movie titles
- A session-backed shopping cart that works before a visitor ever creates an account
- Checkout that turns the session cart into an Order plus one Item row per title, then shows each user their own order history
- Django auth signup, login, and logout, with login-required guards on reviews, checkout, and orders
- Reviews users can create, edit, and delete, with ownership checks so nobody can touch someone else's review

**Review Reporting and Moderation**
The feature I designed on top of the base storefront is community moderation of reviews. A Report model records who flagged which review and why, with a database-level unique constraint so the same user cannot report a review twice. Once a review collects REPORT_THRESHOLD distinct reports (currently 3), it is marked hidden and drops off the movie page automatically. That threshold is a single named constant, so moderation gets stricter or looser by changing one value instead of rewriting the view.

Users cannot report their own reviews, a review someone has already flagged shows a Reported badge instead of the form, and every outcome comes back through Django's messages framework. Admins get a moderation console on top of that: review rows show a live report count, individual reports appear inline on the review they belong to, and bulk hide and unhide actions let a human override the automatic decision.

**Deployment**
The app runs on PythonAnywhere against MySQL through PyMySQL. Getting it deployable meant pulling the secret key, debug flag, allowed hosts, and database credentials out of settings.py and into environment variables, so the same codebase runs locally and in production without edits.`,
    bullets: [
      "Built and deployed a Django movie storefront for CS 2340, live on PythonAnywhere with catalog search, a session-based cart, checkout, and per-user order history",
      "Designed a review reporting system with a Report model, a one-report-per-user-per-review database constraint, and a single REPORT_THRESHOLD constant that auto-hides a review after 3 distinct reports",
      "Added a Django admin moderation console with live report counts, reports shown inline on each review, and bulk hide/unhide actions to override automatic decisions",
      "Moved the secret key, debug flag, allowed hosts, and MySQL credentials into environment variables so one codebase runs both locally and on PythonAnywhere",
    ],
    demoType: "image",
    demoSrc: "/projects/moviesstore/media/home-page.png",
    media: [
      {
        type: "image",
        src: "/projects/moviesstore/media/home-page.png",
        alt: "Movies Store home page with navigation, hero banner, and footer",
        caption: "Live home page at at10507.pythonanywhere.com",
      },
      {
        type: "image",
        src: "/projects/moviesstore/media/review-moderation-code.svg",
        alt: "Django Report model and report_review view source code",
        caption: "Report model and report_review view: three distinct reports hide a review",
      },
      {
        type: "image",
        src: "/projects/moviesstore/media/about-page.png",
        alt: "Movies Store about page",
        caption: "About page rendered from the shared base template",
      },
      {
        type: "image",
        src: "/projects/moviesstore/media/catalog-jurassic-park.jpg",
        alt: "Jurassic Park catalog entry artwork",
        caption: "Catalog artwork uploaded through the Movie image field",
      },
      {
        type: "image",
        src: "/projects/moviesstore/media/catalog-spider-man.jpg",
        alt: "Spider-Man catalog entry artwork",
        caption: "Catalog artwork uploaded through the Movie image field",
      },
      {
        type: "image",
        src: "/projects/moviesstore/media/store-logo.png",
        alt: "Movies Store logo",
        caption: "Store logo served from Django static files",
      },
    ],
  },
  {
    id: "brain3d",
    title: "Brain3D",
    tech: ["TypeScript", "Snap Lens Studio", "Snap Spectacles"],
    date: "Apr. 2026",
    isDiscovery: false,
    award: "ImmerseGT - 1st Place, Spatial Design",
    overview: `Brain3D is an augmented reality game prototype for Snap Spectacles, built at the ImmerseGT hackathon and awarded 1st Place in the Spatial Design track.

**The Build**
The game runs on Snap Spectacles through Snap Lens Studio. Hand tracking drives the input, surface placement anchors the board to a real table or floor, and the pieces move under real-time physics rather than scripted animation. I scripted 7 colored tetromino objects with compound colliders on a procedurally generated 5x5 playfield.

**Learning an SDK Under a Deadline**
I had never used Snap Lens Studio before the event. Most of the time went into learning a spatial-computing SDK from scratch while building on top of it - physics, rendering, SpectaclesInteractionKit, and SpectaclesUIKit - with a working demo due by the end of the hackathon.

**Why It Stuck With Me**
Designing for a headset is a different problem from designing for a screen. Pieces have to sit where a person expects them in real space, respond to hands instead of a mouse, and stay readable while the player moves around them. That is what the Spatial Design track was judging, and it is the part of the project I would most like to keep working on.`,
    bullets: [
      "Built an interactive AR game prototype for Snap Spectacles featuring hand tracking, surface placement, and real-time physics-based gameplay",
      "Independently learned Snap Lens Studio, a spatial-computing SDK, within the hackathon timeframe; implemented features using physics, rendering, SpectaclesInteractionKit, and SpectaclesUIKit APIs",
      "Scripted 7 colored tetromino objects with compound colliders for a procedurally generated 5x5 AR playfield",
      "Took 1st Place in Spatial Design at ImmerseGT",
    ],
    demoType: "image",
    demoSrc: "/projects/brain3d/media/brain3d-gameplay.jpg",
    media: [
      {
        type: "image",
        src: "/projects/brain3d/media/brain3d-gameplay.jpg",
        alt: "Colored tetromino blocks stacked above a 5x5 grid playfield, seen through Snap Spectacles in a hallway",
        caption: "In-headset view: tetrominoes falling onto the procedurally generated 5x5 playfield",
      },
    ],
  },
  {
    id: "chess",
    title: "C.H.E.S.S.",
    tech: ["C#", "Unity", "Git"],
    date: "Aug. 2025 - May 2026",
    isDiscovery: false,
    overview: `C.H.E.S.S. (Chess However Everything is Super Strange) is a Unity-based chess strategy game that reimagines classical chess with custom pieces, unique maps, and a fully extensible editor toolchain. The project began as a collaborative team effort to explore what chess could look like if freed from its traditional constraints.

The centerpiece of my contribution was a Unity Editor tool built on ScriptableObjects, allowing designers to create new piece types without touching code. Each piece definition stores movement rules, attack patterns, and three key statistics (Power, Mobility, and Utility) that players can inspect mid-game through a right-click GUI panel I engineered. This system supports 60+ unique piece types, letting the team define pieces as data and drive a dynamic GUI without code changes.

On the engineering side, I wrote approximately 350 lines of C# to implement the statistics overlay system, integrating smoothly with Unity's existing event model. The project followed a Git-based workflow, and I worked through 5+ merge conflicts alongside teammates - navigating both the technical and communication challenges that come with shared codebases.

The game features multiple custom maps each with different board shapes and terrain rules, encouraging players to adapt their strategy to the environment. Future work includes an AI opponent using minimax with alpha-beta pruning, online multiplayer via Unity Relay, and a piece creation wizard for non-technical users.`,
    bullets: [
      "Developed a Unity chess strategy game with custom piece behaviors and map layouts in a team Git workflow",
      "Built Unity Editor tooling with ScriptableObjects and a custom asset pipeline, letting the team define 60+ pieces as data and drive a dynamic GUI without code changes",
      "Engineered a right-click activated GUI system, contributing 350 lines of C# to display 3 key statistics on each custom piece",
      "Collaborated with teammates to resolve 5+ merge conflicts and troubleshoot high-impact bugs",
    ],
    demoType: null,
    demoSrc: null,
  },
  {
    id: "cv-gripper",
    title: "CV-Controlled Robotic Gripper",
    tech: ["Python", "C++", "MediaPipe", "Arduino Nano", "CAD"],
    date: "Feb. 2026 - Apr. 2026",
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
      "Developed a computer-vision-controlled robotic gripper integrating MediaPipe hand tracking, Arduino servo control, and a custom mechanical assembly",
      "Processed continuous ~30 FPS MediaPipe hand landmark streams to estimate finger angles and translate gestures into low-latency actuator commands",
      "Streamed the tracked angle over USB serial to an Arduino Nano at 9600 baud, with a hardware-free test mode so the vision side could be built and debugged without the board attached",
      "Modified and fabricated silicone-joint gripper components from existing CAD designs, iterating on flexibility and mechanical tolerances for reliable grasping",
    ],
    demoType: "image",
    demoSrc: "/projects/discovery/media/IMG_7604.jpg",
    media: [
      {
        type: "image",
        src: "/projects/discovery/media/IMG_7604.jpg",
        alt: "Assembled gripper finger and servo housing wired to an Arduino Nano on a breadboard",
        caption: "Assembled finger and servo housing, wired to the Arduino Nano",
      },
      {
        type: "image",
        src: "/projects/discovery/media/IMG_7592.jpg",
        alt: "A single 3D-printed gripper segment held between two fingers",
        caption: "Checking tolerances on a printed finger segment before assembly",
      },
      {
        type: "image",
        src: "/projects/discovery/media/IMG_7601.jpg",
        alt: "Resin parts curing under UV light in a Form Cure station",
        caption: "Curing the resin-printed joint parts at the Invention Studio",
      },
      {
        type: "image",
        src: "/projects/discovery/media/arduino-servo-code.svg",
        alt: "Arduino servo control code screenshot",
        caption: "Arduino firmware: read the serial angle, constrain it, drive the servo",
      },
      {
        type: "video",
        src: "/projects/discovery/media/IMG_7520.mov",
        caption: "Live MediaPipe hand tracking with the finger-state readout at ~31 FPS",
      },
      {
        type: "video",
        src: "/projects/discovery/media/IMG_7603.mov",
        caption: "Tracker running on the bench during gripper testing",
      },
      {
        type: "video",
        src: "/projects/discovery/media/IMG_7594.mov",
        caption: "Washing a resin print in the isopropyl bath before curing",
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
    title: "Undergraduate Research Assistant",
    company: "IVALab (Prof. Patricio Vela), Georgia Tech",
    date: "Jun. 2026 - Present",
    location: "Atlanta, GA",
    bullets: [
      "Built a seeded evaluation harness benchmarking 8 autonomous driving planners and tracking crash, merge, and runtime metrics; parallelized batch runs across 8 workers with ProcessPoolExecutor for 6.7x faster execution (5 min to 45 s)",
      "Added a CBF-QP safety filter keeping lane-change trajectories physically feasible and enabling continuous merges, while porting an offline MATLAB gap-based planner to a real-time closed-loop Python controller for HighwayEnv; runs a 12 s space-time pipeline in under 4 ms per decision, about 7x faster than an MPC baseline",
      "Prototyped acceleration-aware behavior prediction for surrounding vehicles, cutting crash rate 22% and prediction error 55-74% with 8% more merges per episode across 500 paired episodes (p < 0.0001)",
      "Built a shared JSON scenario format so the MATLAB and Python planners run identical test cases, exposing and fixing a bug in the Python port that dropped valid merge options below the theoretical n+1 bound",
    ],
  },
  {
    title: "Student Researcher",
    company: "Autonomous and Connected Transport Lab VIP, Georgia Tech",
    date: "Dec. 2025 - Present",
    location: "Atlanta, GA",
    bullets: [
      "Built a PPO reinforcement learning agent for autonomous driving in HighwayEnv with Stable-Baselines3, doubling reward from 9 to 19 over 20k timesteps; used for CARLA integration and policy generation",
      "Fine-tuned transformer language models with Hugging Face Transformers and PyTorch for text comprehension; optimized prompting and preprocessing pipelines, improving ROUGE scores by about 90% over baseline",
    ],
  },
  {
    title: "AI Trainer - Generalist",
    company: "Handshake AI Fellowship",
    date: "Nov. 2025 - May 2026",
    location: "Remote",
    bullets: [
      "Annotated and labeled datasets for AI model training, including image classification, video entity recognition, and instance segmentation tasks",
      "Generated synthetic training scenarios and edge cases to improve model robustness and performance",
      "Maintained 1.8/2 quality accuracy standards across 5-9 tasks weekly for consistent computer vision development",
    ],
  },
  {
    title: "Restaurant Assistant Manager",
    company: "Saigon Cafe",
    date: "Jun. 2021 - Aug. 2025",
    location: "Woodstock, GA",
    bullets: [
      "Mentored and coordinated 4-5 employees through post-pandemic scaling and the return to full dine-in service",
      "Analyzed market challenges during lockdown and implemented new operational workflows for delivery services, maintaining business continuity",
      "Optimized shift workflow with the team, contributing to a gradual increase of ~70% in revenue",
      "Ensured accuracy and coordinated meal delivery with 10-20 concurrent orders during rush hour",
    ],
  },
  {
    title: "Academic Tutor - Mathematics (SAT Prep)",
    company: "Schoolhouse.World",
    date: "Aug. 2023 - Apr. 2024",
    location: "Online",
    bullets: [
      "Facilitated student mastery of SAT mathematics by clarifying concepts and guiding problem-solving using official exam materials",
      "Explored information retention methods such as Kahoot and group connection activities",
      "Listened to student feedback and criticism; achieved top 20% helpful reviews of tutors on website",
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
  Languages: ["Python", "C++", "C", "C#", "Java", "JavaScript/TypeScript", "MATLAB"],
  "Frameworks & Libraries": [
    "PyTorch",
    "Hugging Face Transformers",
    "Stable-Baselines3",
    "pandas",
    "NumPy",
    "Pytest",
  ],
  "Developer Tools": [
    "Git",
    "Linux",
    "Unity",
    "Arduino",
    "Jupyter",
    "Google Colab",
    "Claude Code",
    "GitHub Actions",
  ],
};

export const achievements = [
  { title: "ImmerseGT Hackathon - 1st Place, Spatial Design", year: "2026" },
  { title: "Presidential Scholars Candidate", year: "2025" },
  { title: "Appalachian Entrepreneurship Academy - 3rd Place", year: "2024" },
];
