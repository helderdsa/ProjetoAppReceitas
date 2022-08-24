import PropTypes from 'prop-types';
import React from 'react';

function RecipeCard({ recipeThumb, recipeName, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipeThumb }
        alt={ recipeName }
        width="100px"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ recipeName }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipeName: PropTypes.string,
  recipeThumb: PropTypes.string,
}.isRequired;

export default RecipeCard;
