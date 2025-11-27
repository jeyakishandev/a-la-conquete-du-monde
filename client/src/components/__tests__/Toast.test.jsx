import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Toast from '../Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should render toast message', () => {
    const onClose = vi.fn();
    render(<Toast message="Test message" type="info" onClose={onClose} />);
    
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should display success toast', () => {
    const onClose = vi.fn();
    render(<Toast message="Success!" type="success" onClose={onClose} />);
    
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('should display error toast', () => {
    const onClose = vi.fn();
    render(<Toast message="Error occurred" type="error" onClose={onClose} />);
    
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('should display warning toast', () => {
    const onClose = vi.fn();
    render(<Toast message="Warning!" type="warning" onClose={onClose} />);
    
    expect(screen.getByText('Warning!')).toBeInTheDocument();
  });

  it('should call onClose after duration', async () => {
    const onClose = vi.fn();
    render(<Toast message="Test" type="info" onClose={onClose} duration={1000} />);
    
    expect(onClose).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('should not auto-close if duration is 0', async () => {
    const onClose = vi.fn();
    render(<Toast message="Test" type="info" onClose={onClose} duration={0} />);
    
    vi.advanceTimersByTime(5000);
    
    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled();
    }, { timeout: 100 });
  });

  it('should have close button', () => {
    const onClose = vi.fn();
    render(<Toast message="Test" type="info" onClose={onClose} />);
    
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
    
    closeButton.click();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

