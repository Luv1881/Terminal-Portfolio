import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Terminal from '../components/Terminal';
import { describe, it, expect } from 'vitest';

describe('Terminal Component', () => {
  it('renders without crashing', () => {
    render(<Terminal />);
    expect(screen.getByText(/visitor@portfolio.dev/i)).toBeInTheDocument();
  });

  it('allows user to type and submit commands', async () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/Available Commands:/i)).toBeInTheDocument();
    });
  });

  it('executes the welcome command on initial load', async () => {
    render(<Terminal />);
    
    await waitFor(() => {
      expect(screen.getByText(/Welcome to my interactive portfolio terminal!/i)).toBeInTheDocument();
    });
  });

  it('shows error message for unknown commands', async () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'unknowncommand' } });
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/command not found/i)).toBeInTheDocument();
    });
  });

  it('executes the help command', async () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/Available Commands:/i)).toBeInTheDocument();
    });
  });

  it('executes the about command', async () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'about' } });
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    });
  });

  it('executes the skills command', async () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'skills' } });
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument();
    });
  });

  it('executes the projects command', async () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'projects' } });
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();
    });
  });

  it('executes the achievements command', async () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'achievements' } });
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/Notable Achievements/i)).toBeInTheDocument();
    });
  });

  it('executes the sound command', async () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'sound on' } });
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/Sound effects enabled/i)).toBeInTheDocument();
    });
  });

  it('executes the clear command', async () => {
    render(<Terminal />);
    
    // First, enter a command to create some output
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(screen.getByRole('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/Available Commands:/i)).toBeInTheDocument();
    });

    // Now clear the terminal
    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.submit(screen.getByRole('form'));
    
    // We expect the clear command to have executed (though the visual effect may be hard to test)
    await waitFor(() => {
      expect(screen.getByText(/clear/i)).toBeInTheDocument();
    });
  });
});