import React, { useState } from 'react';
import DoneCards from '../components/DoneCards';
import Header from '../components/Header';

function DoneRecipes() {
  const getDone = () => JSON.parse(localStorage.getItem('doneRecipes'));

  const [allDoneRecipes] = useState(getDone);
  const [filteredRecipes, setfilteredRecipes] = useState(getDone);

  const allFilter = () => {
    setfilteredRecipes(allDoneRecipes);
  };

  const filterDrinks = () => {
    const DoneRecipesFilter = allDoneRecipes && allDoneRecipes
      .filter((recipe) => recipe.type === 'drink');
    setfilteredRecipes(DoneRecipesFilter);
    console.log('drinks', DoneRecipesFilter);
  };

  const filterMeals = () => {
    const DoneRecipesFilter = allDoneRecipes && allDoneRecipes
      .filter((recipe) => recipe.type === 'food');
    setfilteredRecipes(DoneRecipesFilter);
    console.log('food', DoneRecipesFilter);
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
            <DoneCards
              index={ index }
              name={ recipe.name }
              image={ recipe.image }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              category={ recipe.category }
              nationality={ recipe.nationality }
              type={ recipe.type }
              key={ recipe.id }
              id={ recipe.id }
              date={ recipe.doneDate }
              tags={ recipe.tags }
            />
          ))
        }

      </section>

    </>
  );
}

export default DoneRecipes;
