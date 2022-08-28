import React, { useEffect, useState } from 'react';
import FavoriteCards from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [allFavoriteRecipes, setAllFavoriteRecipes] = useState();
  const [filteredRecipes, setfilteredRecipes] = useState();

  const getFavorites = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    const favoriteRecipes = getFavorites();
    setAllFavoriteRecipes(favoriteRecipes);
    setfilteredRecipes(favoriteRecipes);
  }, []);

  const allFilter = () => {
    setfilteredRecipes(allFavoriteRecipes);
  };

  const filterDrinks = () => {
    const favoriteRecipes = allFavoriteRecipes && allFavoriteRecipes
      .filter((recipe) => recipe.type === 'drink');
    setfilteredRecipes(favoriteRecipes);
    console.log('drinks', favoriteRecipes);
  };

  const filterMeals = () => {
    const favoriteRecipes = allFavoriteRecipes && allFavoriteRecipes
      .filter((recipe) => recipe.type === 'food');
    setfilteredRecipes(favoriteRecipes);
    console.log('food', favoriteRecipes);
  };

  const removeFromFavorites = (id) => {
    const favoriteRecipes = getFavorites();
    const favoriteIndex = favoriteRecipes.indexOf(favoriteRecipes
      .find((recipe) => recipe.id === id));
    favoriteRecipes.splice(favoriteIndex, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const updatedFavorites = getFavorites();
    setAllFavoriteRecipes(updatedFavorites);
    setfilteredRecipes(updatedFavorites);
  };

  return (
    <>
      <Header />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ allFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterMeals }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrinks }
        >
          Drinks
        </button>

        {
          filteredRecipes && filteredRecipes.map((recipe, index) => (
            <FavoriteCards
              index={ index }
              name={ recipe.name }
              image={ recipe.image }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              category={ recipe.category }
              nationality={ recipe.nationality }
              type={ recipe.type }
              key={ recipe.id }
              id={ recipe.id }
              removeFavorite={ () => removeFromFavorites(recipe.id) }
            />
          ))
        }

      </section>

    </>
  );
}

export default FavoriteRecipes;
