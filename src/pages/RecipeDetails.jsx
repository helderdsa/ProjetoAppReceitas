import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchDetailsMeals, fetchDetailsDrinks } from '../redux/actions';
import FavoriteandShareButton from '../components/FavoriteandShareButton';
import StartOrContinueButton from '../components/StartOrContinueButton';
import Carousel from '../components/Carousel';
import '../style/recipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();

  const history = useHistory();
  const { location: { pathname } } = history;

  const details = useSelector((state) => state.detailsReducer.details);

  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [instructions, setInstructions] = useState();
  const [categoryOrAlcoholic, setCategoryOrAlcoholic] = useState();
  const [ingredient, setIngredient] = useState();
  const [movie, setMovie] = useState();

  useEffect(() => {
    if (pathname.includes('foods')) {
      dispatch(fetchDetailsMeals(id));
    } else {
      dispatch(fetchDetailsDrinks(id));
    }
  }, [pathname]);

  useEffect(() => {
    if (details.length >= 1) {
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

      if (pathname.includes('foods')) {
        const { strMeal, strCategory,
          strInstructions, strMealThumb,
          strYoutube } = details[0];

        const linkMovie = strYoutube && strYoutube.replace('https://www.youtube.com/watch?v=', '');

        setTitle(strMeal);
        setCategoryOrAlcoholic(strCategory);
        setInstructions(strInstructions);
        setImg(strMealThumb);
        setMovie(linkMovie);
        setIngredient(ingredients);
      } else {
        const { strDrink,
          strInstructions, strDrinkThumb,
          strAlcoholic } = details[0];

        setTitle(strDrink);
        setInstructions(strInstructions);
        setImg(strDrinkThumb);
        setIngredient(ingredients);
        setCategoryOrAlcoholic(strAlcoholic);
      }
    }
  }, [details]);

  return (
    <div className="detailsContainer">
      <img src={ img } alt={ title } data-testid="recipe-photo" />
      <div className="instructionsContainer">
        <div className="detailTitle">
          <h1 data-testid="recipe-title">{title}</h1>
          <FavoriteandShareButton />
        </div>
        <p data-testid="recipe-category">{categoryOrAlcoholic}</p>
        <h4>Ingredients</h4>
        <ul>
          {ingredient && ingredient
            .map(({ ingredientValue, measure }, i) => (
              <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {`${ingredientValue} - ${measure}`}
              </li>))}
        </ul>
        <h4>Instructions</h4>
        <p data-testid="instructions" className="instructions">{instructions}</p>
        {pathname.includes('foods') && <iframe
          data-testid="video"
          width="230"
          height="160"
          src={ `https://www.youtube.com/embed/${movie}` }
          frameBorder="0"
          title="YouTube video player"
          allowFullScreen
        />}
        <Carousel />
        <StartOrContinueButton />
      </div>
    </div>
  );
}

export default RecipeDetails;
