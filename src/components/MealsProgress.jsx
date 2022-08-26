import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchDetailsMeals } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';

function MealsProgress({ id }) {
  const details = useSelector((state) => state.detailsReducer.details);
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [instructions, setInstructions] = useState();
  const [category, setCategory] = useState();
  const [ingredient, setIngredient] = useState();
  const [hasCopied, setHasCopied] = useState(false);
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    dispatch(fetchDetailsMeals(id));
  }, []);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: { [id]: [] } }));
    }
  }, []);

  useEffect(() => {
    if (details.length >= 1) {
      const { strMeal, strCategory,
        strInstructions, strMealThumb } = details[0];

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

      setTitle(strMeal);
      setCategory(strCategory);
      setInstructions(strInstructions);
      setImg(strMealThumb);
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

  useEffect(() => {
    const inProgressLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    const { meals } = inProgressLocalStorage;
    if (ingredient) {
      document.querySelectorAll('input').forEach((checkbox) => {
        if (meals[id].includes(checkbox.name)) checkbox.checked = true;
      });
    } else {
      console.log('error ');
    }
  }, [ingredient]);

  const shareRecipe = () => {
    const num = 3000;
    copy(`http://localhost:3000/foods/${id}`);
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

  const checkIngredient = ({ target }) => {
    if (target.checked) {
      const inProgressLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      const { cocktails, meals } = inProgressLocalStorage;
      meals[id].push(target.name);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
    } else {
      const inProgressLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      const { cocktails, meals } = inProgressLocalStorage;
      meals[id].splice(meals[id].indexOf(target.name), 1);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
    }
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

  const verify = (value) => {
    const inProgressLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    const { meals } = inProgressLocalStorage;
    return !!((ingredient && meals[id].includes(value)));
  };

  return (
    <div>
      <h1>Progresso</h1>
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
      <div>
        {ingredient && ingredient
          .map(({ ingredientValue, measure }, i) => (
            <label
              className="check-ingredient"
              key={ i }
              htmlFor={ i }
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                onClick={ checkIngredient }
                type="checkbox"
                name={ ingredientValue }
                id={ i }
                checked={ () => verify(ingredientValue) }
              />
              {` ${ingredientValue} - ${measure}`}
            </label>
          ))}
      </div>
      <button
        type="button"
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}

MealsProgress.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default MealsProgress;
