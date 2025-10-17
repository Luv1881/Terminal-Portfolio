import { ThemeType } from '../styles/themes';
import { soundService } from '../utils/sound';

export const executeSound = (args: string[], theme: ThemeType): string => {
  if (args.length === 0) {
    // No arguments - show current status
    const status = soundService.isEnabled() ? 'on' : 'off';
    return `Sound effects are currently ${status}.\n\nUsage: sound on | off\nExample: sound off`;
  }

  const action = args[0].toLowerCase();
  
  if (action === 'on' || action === 'enable') {
    soundService.setEnabled(true);
    return 'Sound effects enabled.';
  } else if (action === 'off' || action === 'disable') {
    soundService.setEnabled(false);
    return 'Sound effects disabled.';
  } else {
    return `Invalid sound command.\n\nUsage: sound on | off\nExample: sound off`;
  }
};