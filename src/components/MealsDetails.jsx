import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchDetailsMeals } from '../redux/actions';
import CarouselDrinks from './CarouselDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
// const copy = require('clipboard-copy');

function MealsDetails({ id }) {
  const details = useSelector((state) => state.detailsReducer.details);
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [instructions, setInstructions] = useState();
  const [category, setCategory] = useState();
  const [ingredient, setIngredient] = useState();
  const [movie, setMovie] = useState();
  const [hasCopied, setHasCopied] = useState(false);
  const [favoritado, setFavoritado] = useState(false);

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

      const linkMovie = strYoutube && strYoutube.replace('https://www.youtube.com/watch?v=', '');

      setTitle(strMeal);
      setCategory(strCategory);
      setInstructions(strInstructions);
      setImg(strMealThumb);
      setMovie(linkMovie);
      setIngredient(ingredients);
    }
  }, [details]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavoritado(favoriteRecipes
        .some((recipe) => recipe.id === id));
    }
  }, []);

  const history = useHistory();
  const { location: { pathname } } = history;

  const shareRecipe = () => {
    const num = 3000;
    copy(`http://localhost:3000${pathname}`);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), num);
  };

  const favoriteRecipe = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (details.length >= 1) {
      const { strMeal, strCategory, strMealThumb, strArea } = details[0];
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...favoriteRecipes,
        {
          id,
          type: 'food',
          nationality: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ]));
    }
    setFavoritado(!favoritado);
  };

  const removeFromFavorites = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const index = favoriteRecipes.indexOf(favoriteRecipes
      .find((recipe) => recipe.id === id));
    favoriteRecipes.splice(index, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFavoritado(!favoritado);
  };

  const handleFavorite = () => {
    if (!favoritado) {
      favoriteRecipe();
    } else {
      removeFromFavorites();
    }
  };

  return (
    <div>
      <img src={ img } alt={ title } data-testid="recipe-photo" width="300px" />
      <button
        type="button"
        onClick={ () => shareRecipe() }
      >
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
        />
        {hasCopied && <p>Link copied!</p>}
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          src={ favoritado ? blackFavoriteIcon : whiteFavoriteIcon }
          alt="favorite icon"
          data-testid="favorite-btn"
        />
      </button>
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
        width="230"
        height="160"
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
