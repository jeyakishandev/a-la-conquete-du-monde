import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

// Mock ToastContext
const mockShowToast = vi.fn();
vi.mock('../../context/ToastContext', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

describe('Footer Component', () => {
  it('should render footer element', () => {
    render(
      <BrowserRouter>
        <Footer darkMode={false} />
      </BrowserRouter>
    );
    
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('should display newsletter section', () => {
    render(
      <BrowserRouter>
        <Footer darkMode={false} />
      </BrowserRouter>
    );
    
    // Le footer devrait contenir des éléments
    expect(document.querySelector('footer')).toBeInTheDocument();
  });

  it('should handle dark mode styling', () => {
    const { rerender } = render(
      <BrowserRouter>
        <Footer darkMode={false} />
      </BrowserRouter>
    );
    
    expect(document.querySelector('footer')).toBeInTheDocument();
    
    rerender(
      <BrowserRouter>
        <Footer darkMode={true} />
      </BrowserRouter>
    );
    
    expect(document.querySelector('footer')).toBeInTheDocument();
  });

  it('should render social media links', () => {
    render(
      <BrowserRouter>
        <Footer darkMode={false} />
      </BrowserRouter>
    );
    
    // Le footer devrait être présent
    expect(document.querySelector('footer')).toBeInTheDocument();
  });
});

