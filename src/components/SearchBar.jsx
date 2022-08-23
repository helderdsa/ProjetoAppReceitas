import PropTypes from 'prop-types';
import React, { useState } from 'react';

function SearchBar({ currentPath }) {
  const [searchValue, setSearchValue] = useState('');
  const createApiUrl = (path) => {
    let endpoint = '';
    const filter = document.querySelector('input[name="search-filter"]:checked').value;
    if (path === '/foods') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/${filter === 'i' ? 'filter' : 'search'}.php?${filter}=${searchValue}`;
    } else {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/${filter === 'i' ? 'filter' : 'search'}.php?${filter}=${searchValue}`;
    }
    console.log(endpoint);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="search recipe"
        value={ searchValue }
        onChange={ ({ target }) => setSearchValue(target.value) }
        data-testid="search-input"
      />
      <label htmlFor="radio-ingredient">
        Ingredient
        <input
          id="radio-ingredient"
          type="radio"
          name="search-filter"
          value="i"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="radio-name">
        Name
        <input
          id="radio-name"
          type="radio"
          name="search-filter"
          value="s"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-radio">
        First letter
        <input
          id="first-letter-radio"
          type="radio"
          name="search-filter"
          value="f"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        onClick={ () => createApiUrl(currentPath) }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  currentPath: PropTypes.string,
}.isRequired;

export default SearchBar;
