import { ThemeType } from '../styles/themes';

export const executeWhoami = (args: string[], theme: ThemeType): string => {
  return 'visitor';
};

export const executePwd = (args: string[], theme: ThemeType): string => {
  return '~/portfolio';
};

export const executeLs = (args: string[], theme: ThemeType): string => {
  return `total 8
drwxr-xr-x  2 visitor  staff   64 Feb 14 2026 projects/
drwxr-xr-x  2 visitor  staff   64 Feb 14 2026 skills/
-rw-r--r--  1 visitor  staff  12K Feb 14 2026 resume.pdf
-rw-r--r--  1 visitor  staff  8K  Feb 14 2026 about.md
-rw-r--r--  1 visitor  staff  4K  Feb 14 2026 contact.txt
-rw-r--r--  1 visitor  staff  6K  Feb 14 2026 education.md

💡 Try: cat about.md`;
};

export const executeCd = (args: string[], theme: ThemeType): string => {
  if (args.length === 0) {
    return 'cd: missing operand';
  }
  
  const dir = args[0];
  if (['projects', 'skills', 'about', 'contact', 'resume', 'home', '~'].includes(dir)) {
    return `Changed directory to ~/${dir}`;
  } else {
    return `cd: no such file or directory: ${dir}`;
  }
};

export const executeCat = (args: string[], theme: ThemeType): string => {
  if (args.length === 0) {
    return 'cat: missing file operand';
  }
  
  const file = args[0];
  if (file === 'about.md' || file === '~/about.md') {
    return `# About Luv Gupta

Final-year B.Tech Computer Science student @ VIT (CGPA 9.03).
Focused on cloud reliability, automation, and applied machine learning.

Recent internships:
- Datawise (Founder’s Office): designed HA on-prem architectures with
  redundant failover, Proxmox clusters, HAProxy, and ZFS replication.
- Tech Mahindra (AWS SysOps): optimized EC2/S3/Lambda spend, automated
  AWS CLI runbooks, and built CloudWatch dashboards for faster response.

Certified AWS Cloud Practitioner · Community project head · Mentors peers
through ML workshops and campus tech events.`;
  } else if (file === 'contact.txt' || file === '~/contact.txt') {
    return `Contact Information:
Email: luvgupta1805@gmail.com
Phone: +91 99584 93575
LinkedIn: linkedin.com/in/luv-gupta1800
GitHub: github.com/Luv1881
Location: India (open to remote + hybrid roles)`;
  } else if (file === 'education.md' || file === '~/education.md') {
    return `Education:
Vellore Institute of Technology — B.Tech CSE (2022-2026)
CGPA: 9.03 / 10
Key Courses: DSA, OOP, OS, Computer Networks, DBMS, Computer Architecture,
Compiler Design.

Certification:
- AWS Certified Cloud Practitioner (Score 75.4%)`;
  } else if (file === 'resume.pdf' || file === '~/resume.pdf') {
    return `[This would display the content of resume.pdf in a real terminal,
but in this portfolio terminal, you can download the PDF
using the 'resume.pdf' command]`;
  } else {
    return `cat: ${file}: No such file or directory`;
  }
};

export const executeEcho = (args: string[], theme: ThemeType): string => {
  return args.join(' ');
};

export const executeClear = (args: string[], theme: ThemeType): string => {
  // In a real implementation, this would clear the terminal
  // For now, we return an empty string to simulate clearing
  return '';
};

export const executeHistory = (args: string[], theme: ThemeType): string => {
  // This would show the command history
  // For this implementation, we'll return a message
  return `  1  welcome
  2  help
  3  about
  4  resume
  5  projects
  6  projects show 1
  7  education
  8  contact`;
};

export const executeDate = (args: string[], theme: ThemeType): string => {
  const now = new Date();
  return now.toString();
};
