import React from 'react';

function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="search recipe" data-testid="search-input" />
      <label htmlFor="radio-ingredient">
        Ingredient
        <input
          id="radio-ingredient"
          type="radio"
          name="search-filter"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="radio-name">
        Name
        <input
          id="radio-name"
          type="radio"
          name="search-filter"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-radio">
        First letter
        <input
          id="first-letter-radio"
          type="radio"
          name="search-filter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
