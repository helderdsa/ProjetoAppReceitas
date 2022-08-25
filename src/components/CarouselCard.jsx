import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Carousel.css';

function CarouselCard({ recipeThumb, recipeName, index, url, category }) {
  const history = useHistory();
  return (
    <div
      className="carousel-card"
      data-testid={ `${index}-recomendation-card` }
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
      <p data-testid="recipe-category">{ category }</p>
      <p data-testid={ `${index}-recomendation-title` }>{ recipeName }</p>
    </div>
  );
}

CarouselCard.propTypes = {
  index: PropTypes.number,
  recipeName: PropTypes.string,
  recipeThumb: PropTypes.string,
  url: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

export default CarouselCard;
