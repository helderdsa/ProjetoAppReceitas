import PropTypes from 'prop-types';
import React from 'react';

function FilterButtons({ categories }) {
  const maxLenght = 5;
  const formatedCategories = categories
    .map((categorie) => categorie.strCategory)
    .slice(0, maxLenght);
  return (
    <div>
      <button
        type="button"
        data-testid="all-category-filter"
      >
        All
      </button>
      {formatedCategories
        .map((cat, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${cat}-category-filter` }
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
