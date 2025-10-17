import { ThemeType } from '../styles/themes';
import { executeHelp } from './help';
import { executeAbout } from './about';
import { executeSkills } from './skills';
import { executeProjects } from './projects';
import { executeResume } from './resume';
import { executeContact } from './contact';
import { executeThemes } from './themes';
import { executeWelcome } from './welcome';
import { executeWhoami, executePwd, executeLs, executeCd, executeCat, executeEcho, executeClear, executeHistory, executeDate } from './system';
import { executeAchievements } from './achievements';
import { executeSound } from './sound';
import { executeEducation } from './education';

export const executeCommand = (command: string, currentTheme: ThemeType): string => {
  const [cmd, ...args] = command.trim().split(' ');
  
  // Handle special easter eggs and commands
  if (cmd === 'sudo' && args[0] === 'make' && args[1] === 'me' && args[2] === 'a' && args[3] === 'sandwich') {
    return `Nice try! But you don't need sudo here.\nType 'contact' if you want to work together though! 😊`;
  }
  
  if (cmd === 'vim' || cmd === 'vi') {
    return `You: Starting vim...\nMe: I see you're a developer of culture!\n(Psst... there's no vim here, but checkout my GitHub!)`;
  }
  
  if (cmd === 'emacs') {
    return `Really? Emacs? I'm impressed you still use that!\nTry 'projects' to see what I've built instead!`;
  }
  
  if (cmd === 'npm' && args[0] === 'install' && args[1] === 'happiness') {
    return `Installing happiness... ✓\nhappiness@1.0.0\n✨ Done! Type 'about' to see what makes me happy!`;
  }
  
  if (cmd === 'top' || cmd === 'htop') {
    return `CPU: 5%  MEM: 12%  DISK: 23%\n\nThat's your system performance if I were a real terminal!`;
  }
  
  // Add more easter eggs
  if (cmd === 'matrix') {
    return `Entering the matrix...\n01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100`;
  }
  
  if (cmd === 'hack' || cmd === 'hacktheplanet') {
    return `Accessing mainframe... 10%\nBypassing security... 35%\nDecrypting files... 60%\nWait, this is just a portfolio terminal 😅\nTry 'projects' to see what I actually built!`;
  }
  
  if (cmd === '42') {
    return `The answer to life, the universe, and everything is 42.\nBut the answer to all your development needs might be in my 'projects'!`;
  }
  
  if (cmd === 'yo') {
    return `Yo! This is a terminal, not a chat app 😄\nTry 'help' to see what you can do here!`;
  }
  
  if (cmd === 'hello' || cmd === 'hi') {
    return `Hello there! 👋\nWelcome to my interactive portfolio terminal!\nType 'help' to see what I can do!`;
  }
  
  if (cmd === 'time') {
    return `What do you think this is, a clock?\nTry 'date' for time or 'projects' for my work!`;
  }
  
  if (cmd === 'aliens') {
    return `Error 418: I'm a teapot.\nJust kidding! No aliens here, just a developer passionate about code 😄`;
  }
  
  // Map commands to their execution functions
  const commandMap: Record<string, (args: string[], theme: ThemeType) => string> = {
    'help': executeHelp,
    'about': executeAbout,
    'skills': executeSkills,
    'projects': executeProjects,
    'resume': executeResume,
    'experience': executeResume, // Alias for resume
    'contact': executeContact,
    'education': executeEducation,
    'themes': executeThemes,
    'welcome': executeWelcome,
    'achievements': executeAchievements,
    'sound': executeSound,
    'whoami': executeWhoami,
    'pwd': executePwd,
    'ls': executeLs,
    'cd': executeCd,
    'cat': executeCat,
    'echo': executeEcho,
    'clear': executeClear,
    'history': executeHistory,
    'date': executeDate,
    '': () => '', // Empty command
  };

  // Check if the command exists in our map
  if (commandMap[cmd]) {
    return commandMap[cmd](args, currentTheme);
  }

  // Check for aliases or special cases
  if (cmd === 'exit' || cmd === 'quit') {
    // In a real terminal, this would close the window, but here we'll just return a message
    return 'Type "reload" to refresh the page and close the terminal.';
  }

  if (cmd === 'reload' || cmd === 'restart') {
    // Reload the page
    window.location.reload();
    return '';
  }

  // If command is not found, show error
  return `${cmd}: command not found\n\n💡 Did you mean: help, about, skills, projects, contact, or themes?\nType 'help' to see all available commands.`;
};
