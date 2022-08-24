import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailsDrinks, fetchDetailsMeals } from '../redux/actions';
import Carousel from '../components/Carousel';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [instructions, setInstructions] = useState();
  const [category, setCategory] = useState();
  const [ingredient, setIngredient] = useState();
  const [movie, setMovie] = useState();
  const details = useSelector((state) => state.detailsReducer.details);
  useEffect(() => {
    if (pathname === `/foods/${id}`) {
      dispatch(fetchDetailsMeals(id));
    }
  }, []);

  useEffect(() => {
    if (pathname === `/drinks/${id}`) {
      dispatch(fetchDetailsDrinks(id));
    }
  }, []);

  useEffect(() => {
    if (pathname === `/foods/${id}` && details.length >= 1) {
      const { strMeal, strCategory,
        strInstructions, strMealThumb,
        strYoutube } = details[0];
      const ingredientsKeys = Object.keys(details[0])
        .filter((key) => key.includes('Ingredient'));
      const ingredientsCru = ingredientsKeys.map((keys) => details[0][keys]);
      const ingredients = ingredientsCru.filter((i) => i !== '' && i !== null);
      const MeasuresKeys = Object.keys(details[0])
        .filter((key) => key.includes('Measure'));
      const MeasuresCru = MeasuresKeys.map((keys) => details[0][keys]);
      const Measures = MeasuresCru.filter((i) => i !== '' && i !== null);
      const valueIngredients = ingredients
        .map((value, i) => ({ ingredient: value, measure: Measures[i] }));
      console.log(ingredients, Measures, details[0], valueIngredients);
      const linkMovie = strYoutube.replace('https://www.youtube.com/watch?v=', '');
      setTitle(strMeal);
      setCategory(strCategory);
      setInstructions(strInstructions);
      setImg(strMealThumb);
      setMovie(linkMovie);
      setIngredient(valueIngredients);
    }
  }, [details]);

  useEffect(() => {
    if (pathname === `/drinks/${id}` && details.length >= 1) {
      const { strDrink, strCategory,
        strInstructions, strDrinkThumb } = details[0];
      const ingredientsKeys = Object.keys(details[0])
        .filter((key) => key.includes('Ingredient'));
      const ingredientsCru = ingredientsKeys.map((keys) => details[0][keys]);
      const ingredients = ingredientsCru.filter((i) => i !== '' && i !== null);
      const MeasuresKeys = Object.keys(details[0])
        .filter((key) => key.includes('Measure'));
      const MeasuresCru = MeasuresKeys.map((keys) => details[0][keys]);
      const Measures = MeasuresCru.filter((i) => i !== '' && i !== null);
      const valueIngredients = ingredients
        .map((value, i) => ({ ingre: value, measure: Measures[i] }));
      // console.log(ingredients, Measures, details[0], valueIngredients);
      setTitle(strDrink);
      setCategory(strCategory);
      setInstructions(strInstructions);
      setImg(strDrinkThumb);
      setIngredient(valueIngredients);
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
          .map(({ ingre, measure }, i) => (
            <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
              {`${ingre} - ${measure}`}
            </li>))}
      </ul>
      {pathname === `/foods/${id}` && <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${movie}` }
        frameBorder="0"
        title="YouTube video player"
        allowFullScreen
      />}
      <Carousel isFood={ pathname === `/foods/${id}` } />
    </div>
  );
}

export default RecipeDetails;
