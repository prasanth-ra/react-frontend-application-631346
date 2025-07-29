import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('Theme Toggle Feature', () => {
  test('renders theme toggle button with initial light theme', () => {
    render(<App />);
    const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('🌙 Dark');
  });

  test('toggles theme when button is clicked', () => {
    render(<App />);
    const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
    
    // Initial state check
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    
    // Click button to toggle to dark theme
    fireEvent.click(toggleButton);
    
    // Check if theme was updated to dark
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(toggleButton).toHaveTextContent('☀️ Light');
    expect(toggleButton).toHaveAttribute('aria-label', 'Switch to light mode');
    
    // Click button again to toggle back to light theme
    fireEvent.click(toggleButton);
    
    // Check if theme was updated back to light
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(toggleButton).toHaveTextContent('🌙 Dark');
    expect(toggleButton).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  test('theme persists in document after component updates', () => {
    render(<App />);
    const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
    
    // Toggle to dark theme
    fireEvent.click(toggleButton);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    
    // Force a re-render by clicking again
    fireEvent.click(toggleButton);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
