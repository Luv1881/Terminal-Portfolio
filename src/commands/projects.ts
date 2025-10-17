import { ThemeType } from '../styles/themes';

const projectSummaries = [
  {
    id: 1,
    title: 'PillBox',
    stack: 'Next.js · Firebase · Flask · Git',
    highlight: 'Medication delivery platform improving elderly access by 30%.',
  },
  {
    id: 2,
    title: 'FAQ-ChatBot',
    stack: 'BERT · NLTK · Flask · Scikit-learn',
    highlight: 'Intelligent FAQ assistant with 40% better answer accuracy.',
  },
];

export const executeProjects = (args: string[], theme: ThemeType): string => {
  if (args.length === 0) {
    const summaryLines = projectSummaries
      .map(
        (project) => `
[${project.id}] ${project.title}
    ⚙️  Tech: ${project.stack}
    🚀 ${project.highlight}`
      )
      .join('\n');

    return `
┌─────────────────────────────────────────────────────────┐
│ Featured Projects                                       │
└─────────────────────────────────────────────────────────┘
${summaryLines}

Usage:
  projects show <id>    View detailed breakdown
  projects back         Return to this list

💡 Try: projects show 1
`;
  }

  if (args[0] === 'back') {
    return executeProjects([], theme);
  }

  if (args[0] === 'show' && args[1]) {
    const projectId = parseInt(args[1], 10);

    if (projectId === 1) {
      return `
┌─────────────────────────────────────────────────────────┐
│ PillBox — Medication Delivery Platform                  │
└─────────────────────────────────────────────────────────┘

🧠 Overview
  Designed a patient-friendly platform that coordinates medication
  deliveries for senior citizens, boosting accessibility by 30%.

⚙️ Architecture
  • Next.js front-end for responsive, accessible UI
  • Firebase for auth, real-time updates, and cloud storage
  • Flask microservice powering secure backend communication

✨ Highlights
  • Streamlined onboarding with intuitive scheduling flows
  • Real-time updates keep caregivers synced with deliveries
  • Git-driven workflow for rapid iteration and collaboration

🔗 Links
  • Demo / code available on request — drop me a note via 'contact'

Type 'projects back' to return to the project list.
`;
    }

    if (projectId === 2) {
      return `
┌─────────────────────────────────────────────────────────┐
│ FAQ-ChatBot — Intelligent Support Assistant             │
└─────────────────────────────────────────────────────────┘

🧠 Overview
  Built a conversational agent that answers FAQs with context-aware
  responses, improving accuracy by 40% and reducing manual support.

⚙️ Architecture
  • BERT embeddings for semantic understanding
  • TF-IDF & Scikit-learn pipelines for ranking relevant answers
  • NLTK for sentiment analysis and entity recognition
  • Flask API for deployment and integration

✨ Highlights
  • Handles user sessions, feedback capture, and continuous learning
  • NLP-driven responses deliver faster, more reliable answers
  • Deployable in existing support workflows with minimal overhead

🔗 Links
  • Demo / code available on request — reach out through 'contact'

Type 'projects back' to return to the project list.
`;
    }

    return `Project ${args[1]} not found. Try 'projects' to see all available projects.`;
  }

  return `Invalid command. Usage: projects show <id> or projects back.`;
};
