import React, { useState } from 'react';
import '../styles/components/SearchBar.css'; // optional, falls du Styling trennen willst
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/search/searchSlice';

function SearchBar() {
  const [searchTerm, setSearchTermLocal] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchTerm(searchTerm)); // Dispatch the search term
    setSearchTermLocal(''); // Clear the input field
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTermLocal(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
}

export default SearchBar;

