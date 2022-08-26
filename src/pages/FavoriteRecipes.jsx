import React from 'react';
import FavoriteCards from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <>
      <Header />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {} }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {} }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {} }
        >
          Drinks
        </button>

        {
          favoriteRecipes.map((recipe, index) => (
            <FavoriteCards
              index={ index }
              name={ recipe.name }
              image={ recipe.image }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              category={ recipe.category }
              nationality={ recipe.nationality }
              type={ recipe.type }
              key={ recipe.id }
            />
          ))
        }

      </section>

    </>
  );
}

export default FavoriteRecipes;
