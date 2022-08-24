import React from 'react';

function RecipeCard({ recipe }) {
  return (
    <div>
      <img src={ recipe.strMealThumb } alt={recipe.strMeal} />
      <p />
    </div>
  );
}
