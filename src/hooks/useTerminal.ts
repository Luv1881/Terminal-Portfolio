import { useReducer, useEffect, useRef } from 'react';
import { themes, ThemeType } from '../styles/themes';
import { executeCommand } from '../commands/CommandExecutor';
import { CommandHistory } from '../contexts/CommandContext';
import { soundService } from '../utils/sound';

const commandList = {
  help: 'Show all commands',
  about: 'Learn about my background and expertise',
  skills: 'Technical skills and proficiency levels',
  projects: 'Showcase of my featured builds',
  resume: 'View my internship experience',
  experience: 'Alias for resume',
  education: 'Academic background and certifications',
  contact: 'Get in touch - email, phone, social links',
  achievements: 'Recognition, leadership, and certifications',
  whoami: 'Display current user',
  pwd: 'Print working directory',
  ls: 'List directory contents',
  cd: 'Change directory (simulated)',
  cat: 'Display file contents',
  echo: 'Print text to terminal',
  clear: 'Clear terminal screen',
  history: 'Show command history',
  date: 'Display current date and time',
  themes: 'Manage terminal themes (themes ls, themes set <name>)',
  sound: 'Toggle sound effects (sound on/off)',
  exit: 'Close terminal (reload page)',
  welcome: 'Display the welcome message'
};

// State
interface TerminalState {
  commandHistory: CommandHistory[];
  inputValue: string;
  currentCommandIndex: number;
  theme: ThemeType;
  soundEnabled: boolean;
}

// Actions
type TerminalAction =
  | { type: 'SET_INPUT_VALUE'; payload: string }
  | { type: 'ADD_TO_HISTORY'; payload: CommandHistory }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'SET_THEME'; payload: ThemeType }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SET_COMMAND_INDEX'; payload: number };

// Reducer
const terminalReducer = (state: TerminalState, action: TerminalAction): TerminalState => {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return { ...state, inputValue: action.payload };
    case 'ADD_TO_HISTORY':
      return { ...state, commandHistory: [...state.commandHistory, action.payload] };
    case 'CLEAR_HISTORY':
      return { ...state, commandHistory: [] };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
    case 'SET_COMMAND_INDEX':
      return { ...state, currentCommandIndex: action.payload };
    default:
      return state;
  }
};

// Hook
export const useTerminal = (initialTheme: ThemeType = themes.dracula) => {
  const initialState: TerminalState = {
    commandHistory: [],
    inputValue: '',
    currentCommandIndex: -1,
    theme: initialTheme,
    soundEnabled: false,
  };

  const [state, dispatch] = useReducer(terminalReducer, initialState);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasBootSequenceRun = useRef(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && themes[storedTheme as keyof typeof themes]) {
      dispatch({ type: 'SET_THEME', payload: themes[storedTheme as keyof typeof themes] });
    }

    const storedSoundPreference = localStorage.getItem('soundEnabled');
    if (storedSoundPreference && JSON.parse(storedSoundPreference)) {
      dispatch({ type: 'TOGGLE_SOUND' });
    }
  }, []);

  useEffect(() => {
    const themeKey =
      Object.keys(themes).find((key) => themes[key as keyof typeof themes] === state.theme) || 'dracula';
    localStorage.setItem('theme', themeKey);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(state.soundEnabled));
  }, [state.soundEnabled]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [state.commandHistory]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (hasBootSequenceRun.current) {
      return;
    }
    hasBootSequenceRun.current = true;

    const init = async () => {
      const theme = state.theme;
      const bootMessages = [
        'Initializing terminal...',
        'Loading system modules... ✓',
        'Establishing connection... ✓',
        'Loading user profile... ✓',
      ];

      for (const message of bootMessages) {
        dispatch({
          type: 'ADD_TO_HISTORY',
          payload: { output: message, isSystem: true, theme, timestamp: new Date() },
        });
        await new Promise((resolve) => setTimeout(resolve, 250));
      }

      dispatch({
        type: 'ADD_TO_HISTORY',
        payload: {
          command: 'welcome',
          timestamp: new Date(),
          output: executeCommand('welcome', theme),
          theme,
        },
      });
    };

    void init();
  }, [state.theme]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = state.inputValue.trim();
    if (!trimmedInput) {
      return;
    }

    if (state.soundEnabled) soundService.playCommandExecution();
    const [cmd, ...args] = trimmedInput.split(' ');

    if (cmd === 'sound') {
      dispatch({ type: 'TOGGLE_SOUND' });
      dispatch({
        type: 'ADD_TO_HISTORY',
        payload: {
          command: trimmedInput,
          timestamp: new Date(),
          output: `Sound is now ${!state.soundEnabled ? 'ON' : 'OFF'}`,
          theme: state.theme,
        },
      });
      dispatch({ type: 'SET_INPUT_VALUE', payload: '' });
      dispatch({ type: 'SET_COMMAND_INDEX', payload: -1 });
      return;
    }

    if (cmd === 'clear') {
      dispatch({ type: 'CLEAR_HISTORY' });
      dispatch({ type: 'SET_INPUT_VALUE', payload: '' });
      dispatch({ type: 'SET_COMMAND_INDEX', payload: -1 });
      return;
    }

    let newTheme = state.theme;
    if (cmd === 'themes' && args[0] === 'set' && args[1] && themes[args[1] as keyof typeof themes]) {
      newTheme = themes[args[1] as keyof typeof themes];
      dispatch({ type: 'SET_THEME', payload: newTheme });
    }

    dispatch({
      type: 'ADD_TO_HISTORY',
      payload: {
        command: trimmedInput,
        timestamp: new Date(),
        output: executeCommand(trimmedInput, newTheme),
        theme: newTheme,
      },
    });
    dispatch({ type: 'SET_INPUT_VALUE', payload: '' });
    dispatch({ type: 'SET_COMMAND_INDEX', payload: -1 });
  };

  const handleTabCompletion = () => {
    const parts = state.inputValue.trim().split(' ');
    const currentCommand = parts[0];
    const lastPart = parts[parts.length - 1];

    let suggestions: string[] = [];

    if (parts.length === 1) {
      suggestions = Object.keys(commandList).filter((cmd) => cmd.startsWith(lastPart));
    } else if (currentCommand === 'themes' && parts.length === 2) {
      suggestions = ['ls', 'set'].filter((sub) => sub.startsWith(lastPart));
    } else if (currentCommand === 'themes' && parts.length === 3 && parts[1] === 'set') {
      suggestions = Object.keys(themes).filter((themeKey) => themeKey.startsWith(lastPart));
    }

    if (suggestions.length === 1) {
      const prefixLength = state.inputValue.lastIndexOf(lastPart);
      const newInputValue =
        state.inputValue.slice(0, prefixLength >= 0 ? prefixLength : 0) + suggestions[0] + ' ';
      dispatch({ type: 'SET_INPUT_VALUE', payload: newInputValue });
    } else if (suggestions.length > 1) {
      const hintMessage = suggestions.join('    ');
      dispatch({
        type: 'ADD_TO_HISTORY',
        payload: {
          output: hintMessage,
          isSystem: true,
          theme: state.theme,
          timestamp: new Date(),
        },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commandOnlyHistory = state.commandHistory.filter((entry) => entry.command && !entry.isSystem);
      if (commandOnlyHistory.length > 0) {
        const newIndex =
          state.currentCommandIndex < commandOnlyHistory.length - 1
            ? state.currentCommandIndex + 1
            : commandOnlyHistory.length - 1;
        dispatch({ type: 'SET_COMMAND_INDEX', payload: newIndex });
        const historyCommand = commandOnlyHistory[commandOnlyHistory.length - 1 - newIndex].command || '';
        dispatch({ type: 'SET_INPUT_VALUE', payload: historyCommand });
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const commandOnlyHistory = state.commandHistory.filter((entry) => entry.command && !entry.isSystem);
      if (state.currentCommandIndex > 0 && commandOnlyHistory.length > 0) {
        const newIndex = state.currentCommandIndex - 1;
        dispatch({ type: 'SET_COMMAND_INDEX', payload: newIndex });
        const historyCommand = commandOnlyHistory[commandOnlyHistory.length - 1 - newIndex].command || '';
        dispatch({ type: 'SET_INPUT_VALUE', payload: historyCommand });
      } else if (state.currentCommandIndex === 0) {
        dispatch({ type: 'SET_COMMAND_INDEX', payload: -1 });
        dispatch({ type: 'SET_INPUT_VALUE', payload: '' });
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.ctrlKey) {
      switch (e.key) {
        case 'l':
          e.preventDefault();
          dispatch({ type: 'CLEAR_HISTORY' });
          if (state.soundEnabled) soundService.playCommandExecution();
          break;
        case 'c':
          e.preventDefault();
          dispatch({ type: 'SET_INPUT_VALUE', payload: '' });
          dispatch({
            type: 'ADD_TO_HISTORY',
            payload: { output: '^C', isSystem: true, theme: state.theme, timestamp: new Date() },
          });
          if (state.soundEnabled) soundService.playCommandExecution();
          break;
        case 'u':
          e.preventDefault();
          dispatch({ type: 'SET_INPUT_VALUE', payload: '' });
          if (state.soundEnabled) soundService.playCommandExecution();
          break;
        case 'a':
          e.preventDefault();
          if (inputRef.current) {
            inputRef.current.setSelectionRange(0, 0);
          }
          if (state.soundEnabled) soundService.playCommandExecution();
          break;
        case 'e':
          e.preventDefault();
          if (inputRef.current) {
            const len = inputRef.current.value.length;
            inputRef.current.setSelectionRange(len, len);
          }
          if (state.soundEnabled) soundService.playCommandExecution();
          break;
        default:
          break;
      }
    }
  };

  return { state, dispatch, terminalBodyRef, inputRef, focusInput, handleFormSubmit, handleKeyDown };
};
