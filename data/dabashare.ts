import type { CaseShot } from "@/types";

const dabaShot = (name: string, alt: string, caption: string): CaseShot => ({
  src: `/photos/work-daba-${name}.webp`,
  alt,
  caption,
  width: 1600,
  height: 1000,
});

// Every statement here was checked against the DabaShare source code.
export const dabashareCase = {
  title: "DabaShare",
  script: "case study",
  tagline: "Making skill-sharing between students easier.",
  intro: [
    {
      label: "What it does",
      text: "A skill-exchange site where students can browse peer-run courses, list what they can teach and want to learn, message each other and join study sessions.",
    },
    {
      label: "The problem",
      text: "Students who need help with a subject and students who can teach it have no shared place to find each other.",
    },
    {
      label: "Who it's for",
      text: "DabaShare is intended for college students across Davao City, especially those who want to learn something new or share what they already know. Whether someone needs help with a subject, wants to teach a skill, or is simply looking for people to study with, the idea is to give them one place to connect. I wanted the platform to feel useful beyond just finding a tutor. It should also make it easier for students from different universities to discover opportunities to learn from each other.",
    },
  ],
  status: {
    label: "Status:",
    text: "front-end prototype. It runs on sample data with simulated sign-in and no backend, and nothing is saved after a refresh.",
  },
  objectives: [
    "Let students exchange skills and find tutors from other schools.",
    "Offer student-run courses, both free and paid.",
    "Show each student who can teach what they want to learn.",
    "Give students one place for courses, messages and study sessions.",
  ],
  role: "A solo school project, built as my final project for a Human-Computer Interaction class. I built the screens, the styling and the JavaScript.",
  tech: ["HTML", "CSS", "JavaScript (ES modules)"],
  techNote: "It has no framework, build step or backend. It runs as static files from any web server.",
  flow: ["Sign in", "Courses", "Profile & Match", "Messages", "Webinars"],
  flowText:
    "Signing in opens Courses, and the navigation bar moves between the four main screens. The Chat button on a match jumps straight to that person's conversation.",
  structure:
    "One HTML file holds six screens: sign-in, sign-up, courses, profile, webinars and messages, plus two dialogs for posting a course and scheduling a webinar. A single active class decides which screen is showing.",
  decisions: [
    "Sign-in sits beside a short explanation of the product, so a new visitor learns what it is first.",
    "Search, price and university filters share one bar above the course grid.",
    "Profile & Match keeps what you teach, what you want to learn and your matches on one screen.",
    "Messages pairs a fixed conversation list with the open chat.",
    "Colours and greys are defined once as CSS variables.",
  ],
  shots: {
    courses: dabaShot("courses", "DabaShare's course page, with a search bar, price filters and a grid of student-run courses", "Courses: search, filters and the card grid"),
    login: dabaShot("login", "DabaShare's sign-in screen, with a product explanation beside the form", "Sign-in, beside the product explanation"),
    match: dabaShot("match", "DabaShare's profile page, listing what a student can teach and wants to learn beside suggested matches", "Profile & Match, with sample people"),
    messages: dabaShot("messages", "DabaShare's messages screen, with a conversation list beside an open chat", "Messages, with sample conversations"),
    post: dabaShot("post", "DabaShare's dialog for posting a new course", "The post-a-course dialog"),
    webinars: dabaShot("webinars", "DabaShare's webinars page, with cards for upcoming study groups and sessions", "Webinars and study groups"),
    phone: {
      src: "/photos/work-daba-phone.webp",
      alt: "DabaShare's messages screen on a phone, zoomed out because the layout is wider than the screen",
      caption: "On a phone: the two-column layout doesn't stack yet",
      width: 780,
      height: 1688,
    } satisfies CaseShot,
  },
  features: {
    works: {
      title: "Works in the browser",
      note: "Real logic that runs when you use it. Changes last until the page is refreshed.",
      items: [
        "Course search by title or level",
        "Price and university filters, combined with search",
        "Posting a new course, with required-field checks",
        "Adding and removing skill tags",
        "Sending chat messages in a conversation",
        "Opening a conversation from a match",
        "Switching screens and webinar tabs",
      ],
    },
    simulated: {
      title: "Simulated",
      note: "Present in the interface, with nothing real behind it yet.",
      items: [
        "Sign-in accepts any email and password",
        "Sign-up only shows a confirmation",
        "Enroll and Join Session only show a confirmation",
        "Scheduling a webinar only shows a confirmation",
        "Chat replies are picked from five canned lines",
        "Matches are the same four sample people for everyone",
        "Course ratings are sample numbers",
      ],
    },
  },
  implementation: [
    {
      label: "Architecture",
      text: "There are no components in the framework sense. Nine JavaScript files, about 650 lines: App.js wires up events, auth, courses, profile, messages and webinars hold the features, and data, dom and state are shared.",
    },
    {
      label: "State management",
      text: "state.js exports one appState object for the active user, the price filter and the open conversation, plus cached references to common elements.",
    },
    {
      label: "Reusable pieces",
      text: "buildCourseCard, buildMatchCard, buildWebinarCard and buildConvItem each turn a data object into HTML. dom.js holds the shared helpers for selecting elements, switching screens, toasts and closing dialogs.",
    },
    {
      label: "Data handling",
      text: "data.js holds sample arrays: 9 courses, 4 matches, 3 conversations and 6 webinars. A posted course or sent message is pushed into those arrays in memory, then the screen is rendered again.",
    },
    {
      label: "Events",
      text: "Lists use event delegation. The listener sits on the parent grid, so buttons on cards rendered later still work.",
    },
    {
      label: "Responsive behavior",
      text: "Card grids use auto-fill columns and tag rows wrap, so they reflow. There are no media queries, and fixed two-column layouts such as Profile and Messages don't stack on a phone.",
    },
  ],
  code: {
    caption: "courses.js, getFilteredCourses: search, price and university in one pass",
    source: `return courseList.filter(course => {
  const matchesQuery = !query
    || course.title.toLowerCase().includes(query)
    || course.level.toLowerCase().includes(query);

  const matchesPrice = appState.priceFilter === 'all'
    || (appState.priceFilter === 'free' && course.price === 0)
    || (appState.priceFilter === 'paid' && course.price > 0);

  const matchesUni = uniVal === 'all' || course.uni === uniVal;

  return matchesQuery && matchesPrice && matchesUni;
});`,
  },
  learnings: [
    {
      title: "Building interactions without a framework",
      challenge:
        "One of the things I had to figure out was how to keep the different parts of the application working together using plain JavaScript. With multiple screens, dynamically generated cards, and interactive elements, managing event listeners became something I had to pay attention to.",
      learned:
        "I used JavaScript modules to separate the different features and event delegation to handle interactions on dynamically generated elements. It wasn't always the cleanest process, but it helped me understand what happens behind the scenes when working with frontend frameworks.",
    },
    {
      title: "Making the interface feel like a working platform",
      challenge:
        "Since DabaShare doesn't have a backend yet, I had to work with sample data to demonstrate how its features would behave. This includes course listings, student profiles, matches, and conversations.",
      learned:
        "This taught me the difference between making an interface look functional and actually building a system that stores and manages real user data. Some interactions work locally, while others are still demonstrations.",
    },
    {
      title: "Learning where the design falls short",
      challenge:
        "Building the different screens also made me notice things I wouldn't have considered at the beginning. Some layouts work on desktop but still need adjustments on smaller screens, particularly the Profile and Messages sections.",
      learned: "It reminded me that a design isn't finished just because it looks right on one screen size.",
    },
  ],
  keyLearnings: [
    "DabaShare helped me understand how much goes into building an interactive web application, even without using a framework.",
    "I became more familiar with organizing JavaScript modules, managing application state, rendering dynamic content, filtering data, and handling user interactions.",
    "More importantly, I learned to look beyond individual screens and think about how the entire application connects. A course listing, a student profile, and a conversation shouldn't feel like separate features. They should work together as one experience.",
  ],
  futureIntro: "I'd like to take DabaShare beyond its current frontend prototype. Some things I'd like to work on:",
  future: [
    "Implement a proper backend and database.",
    "Add real user registration and authentication.",
    "Allow students to create and manage their own profiles.",
    "Store courses, conversations, and study sessions.",
    "Develop a more meaningful student matching system.",
    "Improve the mobile layouts, especially Profile and Messages.",
    "Add proper input handling and validation throughout the application.",
  ],
  closing:
    "For now, DabaShare is a working frontend prototype and a project that helped me understand the foundations of building interactive web applications.",
  repository: "https://github.com/IsfridLearn/DabaShare-FinalProject",
  linkNote: "No live demo is published yet.",
};
