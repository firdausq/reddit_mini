// src/tests/PostList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PostList from '../components/PostList';

describe('PostList', () => {
  const mockPosts = [
    {
      id: '1',
      title: 'First post',
      author: 'user1',
      subreddit: 'reactjs',
      thumbnail: '',
      commentsCount: 10,
    },
    {
      id: '2',
      title: 'Second post',
      author: 'user2',
      subreddit: 'frontend',
      thumbnail: '',
      commentsCount: 20,
    },
  ];

  test('renders all posts from list', () => {
    render(<PostList posts={mockPosts} />);
    expect(screen.getByText('First post')).toBeInTheDocument();
    expect(screen.getByText('Second post')).toBeInTheDocument();
  });

  test('renders correct number of PostItems', () => {
    render(<PostList posts={mockPosts} />);
    const items = screen.getAllByTestId('post-item'); // Wir gehen davon aus, dass PostItem ein data-testid hat
    expect(items).toHaveLength(mockPosts.length);
  });

  test('renders message when no posts are available', () => {
    render(<PostList posts={[]} />);
    expect(screen.getByText(/No posts found/i)).toBeInTheDocument();
  });
});
