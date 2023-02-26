import React from "react";

const SearchBar = ({ placeholder, data }) => {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" />
        <div className="searchIcon"></div>
      </div>
      <div className="dataResults"></div>
    </div>
  );
};

export default SearchBar;
