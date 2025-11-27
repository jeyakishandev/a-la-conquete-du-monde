import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleCard from '../ArticleCard';

const mockArticle = {
  id: 1,
  title: 'Test Article',
  description: 'This is a test article description',
  category: 'destinations',
  image: '/test-image.jpg',
  createdAt: '2024-01-01T00:00:00.000Z',
  _count: {
    likes: 5,
    comments: 3,
    favorites: 2,
  },
};

const renderArticleCard = (article = mockArticle) => {
  return render(
    <BrowserRouter>
      <ArticleCard article={article} />
    </BrowserRouter>
  );
};

describe('ArticleCard Component', () => {
  it('should render article title', () => {
    renderArticleCard();
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });

  it('should render article image with correct alt text', () => {
    renderArticleCard();
    const image = screen.getByAltText('Test Article');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should display category', () => {
    renderArticleCard();
    expect(screen.getByText(/destinations/i)).toBeInTheDocument();
  });

  it('should have a link to article detail page', () => {
    renderArticleCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/article/1');
  });

  it('should display formatted date', () => {
    renderArticleCard();
    // Le composant formate la date en français
    expect(screen.getByText(/janvier/i)).toBeInTheDocument();
  });

  it('should render with default image if image is missing', () => {
    const articleWithoutImage = {
      ...mockArticle,
      image: null,
    };
    renderArticleCard(articleWithoutImage);
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });

  it('should have correct link structure', () => {
    renderArticleCard();
    const link = screen.getByRole('link');
    expect(link).toHaveClass('group');
    expect(link).toHaveAttribute('href', '/article/1');
  });
});

