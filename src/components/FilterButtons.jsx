import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDrinks, fetchMeals } from '../redux/actions';

function FilterButtons({ categories, isFood }) {
  const [isFilterOn, setIsFilterOn] = useState(false);
  const dispatch = useDispatch();
  const maxLenght = 5;
  const formatedCategories = categories
    .map((categorie) => categorie.strCategory)
    .slice(0, maxLenght);

  const requestCategory = (category) => {
    if (isFood) {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      dispatch(fetchMeals(url));
    } else {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      dispatch(fetchDrinks(url));
    }
    setIsFilterOn(true);
  };

  const resetCategory = () => {
    if (isFood) {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      dispatch(fetchMeals(url));
    } else {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      dispatch(fetchDrinks(url));
    }
    setIsFilterOn(false);
  };

  return (
    <div className="fitlerBtns">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ resetCategory }
      >
        All
      </button>
      {formatedCategories
        .map((cat, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${cat}-category-filter` }
            onClick={ isFilterOn ? resetCategory : () => requestCategory(cat) }
          >
            {cat}
          </button>
        ))}
    </div>
  );
}

FilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default FilterButtons;
