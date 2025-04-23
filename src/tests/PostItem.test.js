// src/tests/PostItem.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PostItem from '../components/PostItem';

describe('PostItem', () => {
  const mockPost = {
    title: 'Cool post title',
    author: 'testuser',
    subreddit: 'reactjs',
    thumbnail: 'https://placekitten.com/80/80',
    commentsCount: 5,
  };

  test('renders post title', () => {
    render(<PostItem {...mockPost} />);
    expect(screen.getByText('Cool post title')).toBeInTheDocument();
  });

  test('renders author and subreddit', () => {
    render(<PostItem {...mockPost} />);
    expect(screen.getByText(/Posted by u\/testuser/)).toBeInTheDocument();
    expect(screen.getByText(/r\/reactjs/)).toBeInTheDocument();
  });

  test('renders comments count', () => {
    render(<PostItem {...mockPost} />);
    expect(screen.getByText(/5 Comments/)).toBeInTheDocument();
  });
});
