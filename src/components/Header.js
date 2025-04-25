// src/components/Header.js
import React from 'react';
import '../styles/components/Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <img className="logo" src="/assets/reddit-logo.png" alt="Reddit logo" />
        <h1 className="app-title">Reddit Mini</h1>
      </div>
    </header>
  );
}

export default Header;
