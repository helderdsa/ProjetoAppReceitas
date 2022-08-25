import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { fetchDetailsDrinks } from '../redux/actions';
import CarouselMeals from './CarouselMeals';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinksDetails({ id }) {
  const details = useSelector((state) => state.detailsReducer.details);
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [instructions, setInstructions] = useState();
  const [alcoholic, setAlcoholic] = useState();
  const [ingredient, setIngredient] = useState();
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    dispatch(fetchDetailsDrinks(id));
  }, []);

  useEffect(() => {
    if (details.length >= 1) {
      const { strDrink,
        strInstructions, strDrinkThumb,
        strAlcoholic } = details[0];

      const ingredientsKeys = Object.keys(details[0])
        .filter((key) => key.includes('Ingredient'));

      const ingredientsNofilter = ingredientsKeys.map((keys) => details[0][keys]);

      const ingredientsList = ingredientsNofilter.filter((i) => i !== '' && i !== null);

      const measuresKeys = Object.keys(details[0])
        .filter((key) => key.includes('Measure'));

      const measuresNoFilter = measuresKeys.map((keys) => details[0][keys]);

      const measuresList = measuresNoFilter.filter((i) => i !== ' ' && i !== null);

      const ingredients = ingredientsList
        .map((value, i) => ({ ingredientValue: value, measure: measuresList[i] }));

      //   console.log(ingredients, measuresList, ingredientsList);

      setTitle(strDrink);
      setInstructions(strInstructions);
      setImg(strDrinkThumb);
      setIngredient(ingredients);
      setAlcoholic(strAlcoholic);
    }
  }, [details]);

  const history = useHistory();
  const { location: { pathname } } = history;

  const shareRecipe = () => {
    const num = 3000;
    copy(`http://localhost:3000${pathname}`);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), num);
  };

  return (
    <div>
      <img src={ img } alt={ title } data-testid="recipe-photo" />
      <button
        type="button"
        onClick={ () => { shareRecipe(); } }
      >
        <img
          src={ shareIcon }
          alt="search icon"
          data-testid="share-btn"
        />
        {hasCopied && <p>Link copied!</p>}
      </button>
      <button
        type="button"
        onClick={ () => {} }
      >
        <img
          src={ favoriteIcon }
          alt="search icon"
          data-testid="favorite-btn"
        />
      </button>
      <h1 data-testid="recipe-title">{title}</h1>
      <h3 data-testid="recipe-category">{alcoholic}</h3>
      <p data-testid="instructions">{instructions}</p>
      <ul>
        {ingredient && ingredient
          .map(({ ingredientValue, measure }, i) => (
            <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
              {`${ingredientValue} - ${measure}`}
            </li>))}
      </ul>
      <CarouselMeals />
    </div>
  );
}

DrinksDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default DrinksDetails;
