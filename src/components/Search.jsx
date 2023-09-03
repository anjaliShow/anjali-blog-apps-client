import React, { useState } from "react";

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  return (
    <>
      <input
        type="search"
        placeholder="Searc..."
        className="rounded-pill focus-ring-light p-1"
      />
    </>
  );
};

export default Search;
