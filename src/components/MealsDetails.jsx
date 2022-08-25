import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDetailsMeals } from '../redux/actions';
import CarouselDrinks from './CarouselDrinks';

function MealsDetails({ id }) {
  const details = useSelector((state) => state.detailsReducer.details);
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [instructions, setInstructions] = useState();
  const [category, setCategory] = useState();
  const [ingredient, setIngredient] = useState();
  const [movie, setMovie] = useState();

  useEffect(() => {
    dispatch(fetchDetailsMeals(id));
  }, []);

  useEffect(() => {
    if (details.length >= 1) {
      const { strMeal, strCategory,
        strInstructions, strMealThumb,
        strYoutube } = details[0];

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

      const linkMovie = strYoutube.replace('https://www.youtube.com/watch?v=', '');

      setTitle(strMeal);
      setCategory(strCategory);
      setInstructions(strInstructions);
      setImg(strMealThumb);
      setMovie(linkMovie);
      setIngredient(ingredients);
    }
  }, [details]);

  return (
    <div>
      <img src={ img } alt={ title } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{title}</h1>
      <h3 data-testid="recipe-category">{category}</h3>
      <p data-testid="instructions">{instructions}</p>
      <ul>
        {ingredient && ingredient
          .map(({ ingredientValue, measure }, i) => (
            <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
              {`${ingredientValue} - ${measure}`}
            </li>))}
      </ul>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${movie}` }
        frameBorder="0"
        title="YouTube video player"
        allowFullScreen
      />
      <CarouselDrinks />
    </div>
  );
}

MealsDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default MealsDetails;
