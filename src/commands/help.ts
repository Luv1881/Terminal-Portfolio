import { ThemeType } from '../styles/themes';

type HelpRow = [string, string];

const buildTable = (rows: HelpRow[], headers: HelpRow): string => {
  const [headerLeft, headerRight] = headers;
  const leftWidth = Math.max(headerLeft.length, ...rows.map(([left]) => left.length));
  const rightWidth = Math.max(headerRight.length, ...rows.map(([, right]) => right.length));

  const horizontalBorder = `+${'-'.repeat(leftWidth + 2)}+${'-'.repeat(rightWidth + 2)}+`;
  const headerRow = `| ${headerLeft.padEnd(leftWidth)} | ${headerRight.padEnd(rightWidth)} |`;
  const dataRows = rows.map(
    ([left, right]) => `| ${left.padEnd(leftWidth)} | ${right.padEnd(rightWidth)} |`
  );

  return [horizontalBorder, headerRow, horizontalBorder, ...dataRows, horizontalBorder].join('\n');
};

export const executeHelp = (args: string[], theme: ThemeType): string => {
  const commandRows: HelpRow[] = [
    ['about', 'Snapshot of who I am and what I do'],
    ['resume', 'Internship highlights & condensed CV'],
    ['experience', 'Alias for resume'],
    ['education', 'Academic record & certifications'],
    ['skills', 'Technical toolkit and focus areas'],
    ['projects', 'List featured builds'],
    ['projects show <id>', 'Deep dive into a project'],
    ['achievements', 'Leadership, certifications, milestones'],
    ['contact', 'Ways to reach me'],
    ['welcome', 'Replay the intro banner'],
    ['whoami', 'Display current user'],
    ['pwd', 'Print working directory'],
    ['ls', 'List directory contents'],
    ['cd <dir>', 'Change directory (simulated)'],
    ['cat <file>', 'Display file contents'],
    ['echo <text>', 'Print text to terminal'],
    ['clear', 'Clear terminal screen'],
    ['history', 'Show command history'],
    ['date', 'Display current date and time'],
    ['themes ls', 'List available themes'],
    ['themes set <name>', 'Switch color themes'],
    ['sound on|off', 'Toggle sound effects'],
    ['help', 'Display this help message'],
    ['exit', 'Reload the terminal'],
  ];

  const shortcutRows: HelpRow[] = [
    ['Tab', 'Auto-complete commands'],
    ['↑ / ↓', 'Navigate command history'],
    ['Ctrl + L', 'Clear screen'],
    ['Ctrl + U', 'Clear current line'],
    ['Ctrl + C', 'Cancel current command'],
    ['Ctrl + A', 'Move cursor to start'],
    ['Ctrl + E', 'Move cursor to end'],
  ];

  const commandsTable = buildTable(commandRows, ['Command', 'Description']);
  const shortcutsTable = buildTable(shortcutRows, ['Shortcut', 'Action']);

  return [
    '',
    'Available Commands:',
    commandsTable,
    '',
    'Keyboard Shortcuts:',
    shortcutsTable,
    '',
    "💡 Pro Tip: Try 'projects' to see what I've built!",
  ].join('\n');
};
