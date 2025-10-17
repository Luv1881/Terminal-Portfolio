import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SoundService } from '../utils/sound';

describe('SoundService', () => {
  let soundService: SoundService;

  beforeEach(() => {
    soundService = new SoundService();
    // Mock the AudioContext
    (window as any).AudioContext = vi.fn().mockImplementation(() => {
      return {
        createOscillator: vi.fn().mockReturnValue({
          connect: vi.fn(),
          start: vi.fn(),
          stop: vi.fn(),
          frequency: { value: 0 },
          type: 'sine'
        }),
        createGain: vi.fn().mockReturnValue({
          connect: vi.fn(),
          gain: { value: 0, exponentialRampToValueAtTime: vi.fn() }
        }),
        destination: {},
        currentTime: 0
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with sound enabled by default', () => {
    expect(soundService.isEnabled()).toBe(true);
  });

  it('should allow toggling sound', () => {
    soundService.setEnabled(false);
    expect(soundService.isEnabled()).toBe(false);

    soundService.setEnabled(true);
    expect(soundService.isEnabled()).toBe(true);
  });

  it('should play keystroke sound when enabled', () => {
    const result = soundService.playKeystroke();
    // Since AudioContext is mocked, this should not throw an error
    expect(() => soundService.playKeystroke()).not.toThrow();
  });

  it('should play command execution sound when enabled', () => {
    expect(() => soundService.playCommandExecution()).not.toThrow();
  });

  it('should play error sound when enabled', () => {
    expect(() => soundService.playError()).not.toThrow();
  });

  it('should not play sounds when disabled', () => {
    soundService.setEnabled(false);
    // The function should not cause an error but also not play any sound
    expect(() => soundService.playKeystroke()).not.toThrow();
  });
});