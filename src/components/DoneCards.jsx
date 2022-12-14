import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneCards({
  name, image, alcoholicOrNot, index, type, nationality, category, id, date, tags,
}) {
  const [hasCopied, setHasCopied] = useState(false);
  const history = useHistory();

  // const tagsList = tags && tags.includes(',') ? tags.split(',') : [tags];
  // console.log('tagslist', tagsList);

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
    <div className="done-recipe-card">
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
        <p data-testid={ `${index}-horizontal-name` }>
          <p data-testid={ `${index}-horizontal-done-date` }>
            done in:
            {date}
          </p>
          {
            tags && tags.map((element, i) => (
              <p
                key={ `${element}${i}` }
                data-testid={ `${index}-${element}-horizontal-tag` }
              >
                {element}
              </p>
            ))
          }
          {name}
        </p>
      </div>

      <button
        type="button"
        onClick={ shareRecipe }
        className="share-done-recipe"
      >
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
        {hasCopied && <p>Link copied!</p>}
      </button>
    </div>
  );
}

DoneCards.propTypes = {
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.string,
  nacionality: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default DoneCards;
