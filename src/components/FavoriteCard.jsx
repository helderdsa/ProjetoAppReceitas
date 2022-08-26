import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';
// import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';

function FavoriteCards({
  name, image, alcoholicOrNot, index, type, nationality, category,
}) {
  return (
    <div>
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

      <button
        type="button"
        onClick={ () => {} }
      >
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
        {/* {hasCopied && <p>Link copied!</p>} */}
      </button>
      <button
        type="button"
        onClick={ () => {} }
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
