import { ThemeType } from '../styles/themes';

export const executeAbout = (args: string[], theme: ThemeType): string => {
  return `
┌─────────────────────────────────────────────────────────┐
│ About Me                                                │
└─────────────────────────────────────────────────────────┘

Namaste! I'm Luv Gupta — a final-year B.Tech Computer Science student
at Vellore Institute of Technology (Class of 2026) with a 9.03 CGPA.

I love building resilient infrastructure and intelligent products that
blend cloud engineering with applied machine learning.

🚀 Recent Experience:
   • Founder’s Office Intern @ Datawise (2025) — designed a highly
     available on-prem network architecture with redundant failover,
     HAProxy load balancing, and scalable Proxmox clusters.
   • AWS System Operations Intern @ Tech Mahindra (2024) — tuned EC2,
     S3, and Lambda workloads, automated AWS CLI runbooks, and deployed
     CloudWatch dashboards that improved response times.

🛠️ Where I Add Value:
   • Cloud architecture & infrastructure resilience (AWS, on-prem HA)
   • Full-stack & API development with Next.js, Flask, Node.js
   • ML-powered solutions leveraging TensorFlow, Scikit-learn, and BERT
   • Technical leadership for student communities and events

📚 Milestones:
   • AWS Cloud Practitioner certified (75.4%)
   • Led workshops like Sapient Synthesis & ML 301 for 100+ students

📫 Want the details? Try 'resume' for experience, 'projects' for builds,
   or 'contact' if you'd like to collaborate.
`;
};
