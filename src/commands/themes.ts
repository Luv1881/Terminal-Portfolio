import { ThemeType } from '../styles/themes';

export const executeThemes = (args: string[], theme: ThemeType): string => {
  if (args.length === 0) {
    return `
Available themes:
  • dracula          [Currently active: ${theme.name}]
  • github-light
  • monokai-pro
  • nord
  • tokyo-night
  • solarized-dark
  • gruvbox
  • one-dark

Usage: themes set <theme-name>
Example: themes set nord
`;
  } else if (args[0] === 'set' && args[1]) {
    // In a real implementation, this would change the theme
    // For now, we just return a message since theme changing is handled in the component
    return `Theme set command received. In a full implementation, this would change to the "${args[1]}" theme.`;
  } else {
    return `Invalid themes command. Usage: themes or themes set <theme-name>`;
  }
};