// src/components/Main.js
import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import PostList from './PostList';
import '../styles/components/Main.css';

function Main() {
  const searchTerm = useSelector((state) => state.search.term);
  const header = searchTerm ? `Search results for "${searchTerm}"` : 'Popular Posts';

  return (
    <div className="main-content">
      <div className="header-row">
        <h2 className="main-heading">{header}</h2>
        <SearchBar />
      </div>
      <PostList searchTerm={searchTerm} />
    </div>
  );
}

export default Main;
