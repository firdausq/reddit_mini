import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
    test('renders input field', () => {
        render (<SearchBar />);
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });
    
    test('calls onSearch when button is clicked', () => {
        const handleSearch = jest.fn();
        render(<SearchBar onSearch={handleSearch} />);
      
        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'React' } });
      
        const button = screen.getByRole('button');
        fireEvent.click(button);
      
        expect(handleSearch).toHaveBeenCalledWith('React');
      });      

});