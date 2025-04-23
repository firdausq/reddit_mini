// src/components/Header.js
import React from 'react';
import '../styles/components/Header.css';
import SearchBar from './SearchBar';

function Header({ onSearch }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <img className="logo" src="/assets/reddit-logo.png" alt="Reddit logo" />
        <h1 className="app-title">Reddit Mini</h1>
      </div>
      {/*<div className="header-right">
        <SearchBar onSearch={onSearch} />
      </div>*/}
    </header>
  );
}

export default Header;
