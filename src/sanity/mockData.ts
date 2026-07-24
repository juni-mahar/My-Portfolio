export const mockProfile = {
  name: "Muhammad Junaid",
  title: "SaaS Product Engineer & Design Technologist",
  bio: "I bridge the gap between complex software engineering and high-fidelity user experiences. Specializing in building scalable web architectures, design system automation, and secure full-stack applications with mathematical precision.",
  avatar: null,
  resumeUrl: "#",
  stats: [
    { label: "Projects Shipped", value: "24+" },
    { label: "Certifications", value: "8" },
    { label: "Commit Frequency", value: "Daily" },
    { label: "System Uptime", value: "99.9%" }
  ],
  socials: {
    github: "https://github.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

export const mockTechStack = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", level: "Expert" },
      { name: "JavaScript", level: "Expert" },
      { name: "Python", level: "Advanced" },
      { name: "SQL", level: "Advanced" }
    ]
  },
  {
    category: "Frameworks & Core",
    skills: [
      { name: "Next.js", level: "Expert" },
      { name: "React / React Native", level: "Expert" },
      { name: "Node.js", level: "Expert" },
      { name: "Express / NestJS", level: "Advanced" }
    ]
  },
  {
    category: "Databases & CMS",
    skills: [
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MongoDB", level: "Advanced" },
      { name: "Sanity CMS", level: "Expert" },
      { name: "Redis", level: "Intermediate" }
    ]
  },
  {
    category: "DevOps & Cloud",
    skills: [
      { name: "Docker", level: "Advanced" },
      { name: "AWS / Vercel", level: "Advanced" },
      { name: "Git / GitHub Actions", level: "Expert" },
      { name: "Linux Systems", level: "Intermediate" }
    ]
  }
];

export const mockProjects = [
  {
    title: "Noteform Builder",
    slug: { current: "noteform-builder" },
    category: "saas",
    description: "A collaborative SaaS form builder featuring drag-and-drop node canvas, dynamic schema generation, and real-time respondent analytics with rich chart widgets.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "ChartJS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    image: null
  },
  {
    title: "Apollo Telemetry System",
    slug: { current: "apollo-telemetry" },
    category: "system",
    description: "Autonomous robotics diagnostic cockpit plotting joint torque ratios, telemetry curves, battery depletion diagnostics, and spatial 3D radar meshes in real-time.",
    techStack: ["Rust", "React", "WebSockets", "Three.js", "CSS Modules"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    image: null
  },
  {
    title: "Editorial Lookbook ASAP",
    slug: { current: "editorial-lookbook" },
    category: "frontend",
    description: "High-end visual showcase layout focusing on asymmetrical column spacing, card-skew transitions, customized image grids, and fluid smooth-scrolling animations.",
    techStack: ["Next.js", "Framer Motion", "Vanilla CSS", "Google Fonts"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    image: null
  }
];

export const mockCertifications = [
  {
    name: "Advanced Next.js Professional Certification",
    issuer: "Vercel / Next.js Core",
    issueDate: "June 2026",
    verificationUrl: "#"
  },
  {
    name: "Sanity.io Content Developer Specialist",
    issuer: "Sanity CMS",
    issueDate: "April 2026",
    verificationUrl: "#"
  },
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "January 2026",
    verificationUrl: "#"
  }
];
