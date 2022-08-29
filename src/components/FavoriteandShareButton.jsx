import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteandShareButton() {
  const { id } = useParams();

  const history = useHistory();
  const { location: { pathname } } = history;

  const details = useSelector((state) => state.detailsReducer.details);

  const [hasCopied, setHasCopied] = useState(false);
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavoritado(favoriteRecipes
        .some((recipe) => recipe.id === id));
    }
  }, [pathname]);

  const shareRecipe = () => {
    const num = 3000;
    if (pathname.includes('foods')) {
      copy(`http://localhost:3000/foods/${id}`);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
    }
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), num);
  };

  const favoriteRecipe = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (details.length >= 1) {
      if (pathname.includes('foods')) {
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
        setFavoritado(!favoritado);
      } else {
        const { strDrink, strCategory, strDrinkThumb, strAlcoholic } = details[0];
        localStorage.setItem('favoriteRecipes', JSON.stringify([
          ...favoriteRecipes,
          {
            id,
            type: 'drink',
            nationality: '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic,
            name: strDrink,
            image: strDrinkThumb,
          },
        ]));
        setFavoritado(!favoritado);
      }
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

  return (
    <div>
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
    </div>
  );
}

export default FavoriteandShareButton;
