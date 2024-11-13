// components/SearchBar.js
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar..."
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: 'white' }}>
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
