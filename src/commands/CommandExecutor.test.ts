import { describe, it, expect } from 'vitest';
import { executeCommand } from '../commands/CommandExecutor';
import { themes } from '../styles/themes';

describe('CommandExecutor', () => {
  const testTheme = themes.dracula;

  it('should execute help command', () => {
    const result = executeCommand('help', testTheme);
    expect(result).toContain('Available Commands:');
  });

  it('should execute about command', () => {
    const result = executeCommand('about', testTheme);
    expect(result).toContain('About Me');
  });

  it('should execute skills command', () => {
    const result = executeCommand('skills', testTheme);
    expect(result).toContain('Technical Skills');
  });

  it('should execute projects command', () => {
    const result = executeCommand('projects', testTheme);
    expect(result).toContain('Featured Projects');
  });

  it('should execute achievements command', () => {
    const result = executeCommand('achievements', testTheme);
    expect(result).toContain('Notable Achievements');
  });

  it('should execute sound command', () => {
    let result = executeCommand('sound on', testTheme);
    expect(result).toBe('Sound effects enabled.');

    result = executeCommand('sound off', testTheme);
    expect(result).toBe('Sound effects disabled.');
  });

  it('should return error for unknown command', () => {
    const result = executeCommand('unknowncommand', testTheme);
    expect(result).toContain('command not found');
  });

  it('should handle easter eggs', () => {
    const result = executeCommand('sudo make me a sandwich', testTheme);
    expect(result).toContain('Nice try! But you don\'t need sudo here.');
  });
});