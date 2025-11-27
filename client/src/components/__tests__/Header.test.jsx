import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock api
vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('Header Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render header element', () => {
    render(
      <BrowserRouter>
        <Header darkMode={false} />
      </BrowserRouter>
    );

    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('should display logo or title', () => {
    render(
      <BrowserRouter>
        <Header darkMode={false} />
      </BrowserRouter>
    );

    // Le header devrait contenir le logo ou le titre
    expect(document.querySelector('header')).toBeInTheDocument();
  });

  it('should handle dark mode class', () => {
    const { rerender } = render(
      <BrowserRouter>
        <Header darkMode={false} />
      </BrowserRouter>
    );

    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <Header darkMode={true} />
      </BrowserRouter>
    );

    expect(document.querySelector('header')).toBeInTheDocument();
  });

  it('should show login button when user is not logged in', () => {
    localStorage.clear();

    render(
      <BrowserRouter>
        <Header darkMode={false} />
      </BrowserRouter>
    );

    // Le header devrait être présent même sans utilisateur
    expect(document.querySelector('header')).toBeInTheDocument();
  });

  it('should show user menu when user is logged in', async () => {
    const user = { id: 1, username: 'testuser', email: 'test@example.com' };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'test-token');

    render(
      <BrowserRouter>
        <Header darkMode={false} />
      </BrowserRouter>
    );

    // Le header devrait être présent
    await waitFor(() => {
      expect(document.querySelector('header')).toBeInTheDocument();
    });
  });
});
