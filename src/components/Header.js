// src/components/Header.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSubreddit } from '../features/filter/filterSlice';
import { setSearchTerm } from '../features/search/searchSlice'; // <-- Importiert für Search Reset
import '../styles/components/Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleClick = () => {
    dispatch(setSubreddit('popular'));   // Subreddit zurücksetzen
    dispatch(setSearchTerm(''));          // Suchbegriff zurücksetzen
    navigate('/');                        // Zur Startseite navigieren
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <img className="logo" src="/assets/reddit-logo.png" alt="Reddit logo" />
        <h1 className="app-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          Reddit Mini
        </h1>
      </div>
    </header>
  );
}

export default Header;
