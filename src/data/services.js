// ─── SERVICES DATA ──────────────────────────────────────────────────────────
// Add, remove, or edit services here. The UI reads from this file.

export const services = [
  {
    id:          'web',
    icon:        '◻',
    title:       'Web Development',
    short:       'Modern, performant websites and web applications built to convert.',
    description: 'We build responsive, accessible websites and web apps from scratch. No templates, no themes — everything is designed and coded for your specific goals and audience.',
    deliverables: [
      'Landing pages & marketing sites',
      'Web applications & dashboards',
      'E-commerce stores',
      'Portfolio & brand sites',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'active',
  },
  {
    id:          'fullstack',
    icon:        '⬡',
    title:       'Full-Stack Development',
    short:       'Complete frontend + backend solutions, APIs, databases and deployment.',
    description: 'End-to-end development covering the full stack. We architect, build, and deploy complete systems — from the database schema to the user interface.',
    deliverables: [
      'REST & GraphQL APIs',
      'Authentication & user systems',
      'Database design & management',
      'Cloud deployment & DevOps',
    ],
    tech: ['Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'],
    status: 'active',
  },
  {
    id:          '3d',
    icon:        '◈',
    title:       '3D & Blender',
    short:       'Coming soon: 3D modeling, rendering, and visualization for products, spaces and creative work.',
    description: 'From product visualization to architectural walkthroughs and creative 3D content — we handle modeling, lighting, materials, and rendering in Blender.',
    deliverables: [
      'Product visualization & renders',
      'Architectural & interior walkthroughs',
      '3D assets for web & games',
      'Motion graphics & animation',
    ],
    tech: ['Blender', 'Cycles', 'EEVEE', 'Substance Painter'],
    status: 'coming-soon',
  },
  {
    id:          'video',
    icon:        '▶',
    title:       'Video Editing',
    short:       'Coming soon: professional video editing for social content, YouTube, and promotional campaigns.',
    description: 'We edit and produce videos for social media, brand campaigns, YouTube channels, and digital content. From raw footage to polished final cut.',
    deliverables: [
      'Social media content (Reels, Shorts)',
      'YouTube videos & series',
      'Promotional & brand films',
      'Color grading & sound design',
    ],
    tech: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
    status: 'coming-soon',
  },
  {
    id:          'games',
    icon:        '⊞',
    title:       'Game Development',
    short:       'Interactive experiences and game development — coming soon.',
    description: "We're actively building out our game development capability. If you have an interesting game project, reach out — we'd love to talk about it.",
    deliverables: [
      '2D & 3D game prototypes',
      'Browser-based games',
      'Interactive experiences',
    ],
    tech: ['Unity', 'Godot', 'C#', 'GDScript'],
    status: 'coming-soon',
  },
]
