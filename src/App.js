// src/App.js
import React from 'react';
import PostList from './components/PostList';
import Header from './components/Header';
import Main from './components/Main';
import './styles/global.css';
import './styles/variables.css';

function App() {
  // Beispiel-Daten (kannst du später mit echten API-Daten ersetzen)
  const demoPosts = [
    {
      id: '1',
      title: 'React vs Vue – What Should You Choose?',
      author: 'frontendgeek',
      subreddit: 'reactjs',
      thumbnail: 'https://placekitten.com/200/200',
      num_comments: 42,
    },
    {
      id: '2',
      title: 'This CSS trick blew my mind 🤯',
      author: 'csswizard',
      subreddit: 'webdev',
      thumbnail: '',
      num_comments: 13,
    },
  ];

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
      <Main />
      </main>
    </>
  );
}

export default App;
