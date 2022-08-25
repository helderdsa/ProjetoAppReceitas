import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function RecipeCard({ recipeThumb, recipeName, index, url }) {
  const history = useHistory();
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(url) }
      onKeyPress={ () => {} }
      role="button"
      tabIndex={ 0 }
    >
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
  url: PropTypes.string,
}.isRequired;

export default RecipeCard;
