// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import PostDetail from './components/PostDetail';
import FilterBar from './components/FilterBar';
import './styles/variables.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <FilterBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
