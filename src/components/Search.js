import React from "react";

function Search({ searchPlant, onSearchChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchPlant}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;