import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
// import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteCards({
  name, image, alcoholicOrNot, index, type, nationality, category, removeFavorite, id,
}) {
  const [hasCopied, setHasCopied] = useState(false);
  const history = useHistory();

  const shareRecipe = () => {
    const num = 3000;
    if (type === 'food') {
      copy(`http://localhost:3000/foods/${id}`);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
    }
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), num);
  };

  const redirectToDetails = () => {
    if (type === 'food') {
      history.push(`/foods/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <div>
      <div
        onClick={ redirectToDetails }
        onKeyPress={ () => {} }
        role="button"
        tabIndex={ 0 }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          width="200px"
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          {
            type === 'drink' ? alcoholicOrNot : `${nationality} - ${category}`
          }
        </p>
        <h3 data-testid={ `${index}-horizontal-name` }>
          {name}
        </h3>
      </div>

      <button
        type="button"
        onClick={ shareRecipe }
      >
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
        {hasCopied && <p>Link copied!</p>}
      </button>
      <button
        type="button"
        onClick={ removeFavorite }
      >
        <img
          // src={ favoritado ? blackFavoriteIcon : whiteFavoriteIcon }
          src={ blackFavoriteIcon }
          alt="favorite icon"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>

    </div>
  );
}

FavoriteCards.propTypes = {
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.string,
  nacionality: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default FavoriteCards;
