import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../redux/actions';

function SearchBar({ currentPath }) {
  const [searchValue, setSearchValue] = useState('');
  const meals = useSelector((state) => state.mealsReducer.meals);
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  const dispatch = useDispatch();
  const history = useHistory();
  const errorRecipes = 'Sorry, we haven\'t found any recipes for these filters.';

  useEffect(() => {
    if (meals === null) {
      global.alert(errorRecipes);
    } else if (meals.length === 1) {
      const { idMeal } = meals[0];
      history.push(`/foods/${idMeal}`);
    }
  }, [meals]);

  useEffect(() => {
    if (drinks === null) {
      global.alert(errorRecipes);
    } else if (drinks.length === 1) {
      const { idDrink } = drinks[0];
      history.push(`/drinks/${idDrink}`);
    }
  }, [drinks]);

  const createApiUrl = (path) => {
    const filter = document.querySelector('input[name="search-filter"]:checked').value;
    if (path === '/foods') {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/${filter === 'i' ? 'filter' : 'search'}.php?${filter}=${searchValue}`;
      dispatch(fetchMeals(endpoint));
      if (filter === 'f' && searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      // if (meals.length === 1)
    } else {
      const endpointDrinks = `https://www.thecocktaildb.com/api/json/v1/1/${filter === 'i' ? 'filter' : 'search'}.php?${filter}=${searchValue}`;
      dispatch(fetchDrinks(endpointDrinks));
      if (filter === 'f' && searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const handleClick = () => {
    createApiUrl(currentPath);
    if (drinks === null) {
      global.alert(errorRecipes);
    }
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
        onClick={ handleClick }
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
