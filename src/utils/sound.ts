// Sound effects service for the terminal portfolio
export class SoundService {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialize audio context on first user interaction
    this.initAudioContext();
  }

  private initAudioContext() {
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playKeystroke() {
    if (!this.enabled || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = 'square';
      oscillator.frequency.value = 600;
      gainNode.gain.value = 0.01;

      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.02);

      setTimeout(() => {
        oscillator.stop();
      }, 20);
    } catch (e) {
      console.log('Could not play sound:', e);
    }
  }

  public playCommandExecution() {
    if (!this.enabled || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.02;

      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.05);

      setTimeout(() => {
        oscillator.stop();
      }, 50);
    } catch (e) {
      console.log('Could not play sound:', e);
    }
  }

  public playError() {
    if (!this.enabled || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = 'sawtooth';
      oscillator.frequency.value = 200;
      gainNode.gain.value = 0.02;

      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.15);

      setTimeout(() => {
        oscillator.stop();
      }, 150);
    } catch (e) {
      console.log('Could not play sound:', e);
    }
  }
}

// Create a singleton instance
export const soundService = new SoundService();