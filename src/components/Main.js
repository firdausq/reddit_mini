// src/components/Main.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import PostList from './PostList';
import '../styles/components/Main.css'; // falls du getrenntes Styling willst

function Main() {
  const [searchTerm, setSearchTerm] = useState('');
  const header = searchTerm ? `Search results for "${searchTerm}"` : 'Popular Posts';

  return (
    <div className="main-content">
      <div className="header-row">
        <h2 className="main-heading">{header}</h2>
        <SearchBar onSearch={setSearchTerm} />
      </div>
      <PostList searchTerm={searchTerm} />
    </div>
  );
}

export default Main;
