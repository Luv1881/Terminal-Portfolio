import { ThemeType } from '../styles/themes';

export const executeResume = (args: string[], theme: ThemeType): string => {
  return `
┌─────────────────────────────────────────────────────────┐
│ Professional Experience                                 │
└─────────────────────────────────────────────────────────┘

[May 2025 – Jul 2025] Intern, Founder’s Office
📍 Datawise (Hybrid)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Designed a fault-tolerant on-prem network with redundant failover,
  Proxmox clusters, and HAProxy load balancing — cutting downtime risk
  by 40% and future-proofing for scale.
• Evaluated 10+ enterprise routers, firewalls, and redundancy protocols
  to recommend cost-effective infrastructure upgrades.
• Delivered production-ready architecture diagrams covering ZFS
  replication, dual-ISP failover, and secure scalability.

[May 2024 – Jul 2024] AWS System Operations Intern
📍 Tech Mahindra (Remote)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Optimized EC2, S3, and Lambda usage by ~15% through code refactors
  and architecture improvements aligned with AWS best practices.
• Automated 10+ operational runbooks with AWS CLI, reducing manual
  deployment time by 30%.
• Built CloudWatch dashboards & alerting that improved incident
  response times and enabled proactive monitoring.

┌─────────────────────────────────────────────────────────┐
│ Education                                               │
└─────────────────────────────────────────────────────────┘

Vellore Institute of Technology — B.Tech, Computer Science
Sept 2022 – May 2026 | CGPA: 9.03 / 10
Relevant Coursework: Data Structures & Algorithms, Operating Systems,
Computer Networks, DBMS, Compiler Design, Computer Architecture.

Commands:
  education            View academic & certification details
  achievements         See certifications and leadership work
  resume.pdf           Download the PDF version
`;
};
