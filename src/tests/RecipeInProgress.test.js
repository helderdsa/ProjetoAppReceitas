import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

// const recipePhotoTestId = 'recipe-photo';
// const recipeTitleTestId = 'recipe-title';
// const shareBtnTestId = 'share-btn';
// const favoriteBtnTestId = 'favorite-btn';
// const recipeCategoryTestId = 'recipe-category';
// const instructionsTestId = 'instructions';
// const finishBtnTestId = 'finish-recipe-btn';
// to do test id steps
const recipesInProgress = { cocktails: { 12668: [] }, meals: { 52977: [] } };
const drinkRecipe = {
  idDrink: '12668',
  strDrink: 'Egg Cream',
  strDrinkAlternate: null,
  strTags: null,
  strVideo: null,
  strCategory: 'Other/Unknown',
  strIBA: null,
  strAlcoholic: 'Non alcoholic',
  strGlass: 'Coffee mug',
  strInstructions: 'Mix syrup and milk in a fountain glass.',
  strInstructionsES: null,
  strInstructionsDE: 'Sirup und Milch in einem Fontänenglas mischen.',
  strInstructionsFR: null,
  strInstructionsIT: 'Mescolare lo sciroppo e il latte in un bicchiere da fontana.',
  'strInstructionsZH-HANS': null,
  'strInstructionsZH-HANT': null,
  strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/mvis731484430445.jpg',
  strIngredient1: 'Chocolate syrup',
  strIngredient2: 'Milk',
  strIngredient3: 'Soda water',
  strMeasure1: '2 tblsp ',
  strMeasure2: '6 oz whole ',
  strMeasure3: '6 oz ',
  strCreativeCommonsConfirmed: 'No',
  dateModified: '2017-01-14 21:47:26',
};
const foodRecipe = {
  idMeal: '53060',
  strMeal: 'Burek',
  strDrinkAlternate: null,
  strCategory: 'Side',
  strArea: 'Croatian',
  strInstructions: 'Fry the finely chopped onions and minced meat in oil.',
  strTags: 'Streetfood, Onthego',
  strYoutube: 'https://www.youtube.com/watch?v=YsJXZwE5pdY',
  strIngredient1: 'Filo Pastry',
  strIngredient2: 'Minced Beef',
  strIngredient3: 'Onion',
  strIngredient4: 'Oil',
  strIngredient5: 'Salt',
  strIngredient6: 'Pepper',
  strMeasure1: '1 Packet',
  strMeasure2: '150g',
  strMeasure3: '150g',
  strMeasure4: '40g',
  strMeasure5: 'Dash',
  strMeasure6: 'Dash',
  strSource: 'https://www.visit-croatia.co.uk/croatian-cuisine/croatian-recipes/',
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

describe('Login page test', () => {
  it('checks localStorage', async () => {
    // localStorage.setItem('inProgressRecipes',
    //   JSON.stringify({ cocktails: { 12668: [] }, meals: { 52977: [] } }));
    const { history } = renderWithRouterAndRedux(<App />, {
      initialState: {
        detailsReducer: {
          details: [drinkRecipe],
        },
      },
    });
    history.push('/drinks/12668/in-progress');
  });

  it('checks localStorage for foods', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialState: {
        detailsReducer: {
          details: [foodRecipe],
        },
      },
    });
    history.push('/foods/52977/in-progress');
  });

  it('render elements on page', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    const { history } = renderWithRouterAndRedux(<App />, {
      initialState: {
        detailsReducer: {
          details: [drinkRecipe],
        },
      },
    });
    history.push('/drinks/12668/in-progress');

    const img = await screen.findByTestId('recipe-photo');
    expect(img).toBeInTheDocument();

    const check0 = screen.getByTestId('0-ingredient-step');
    const check1 = screen.getByTestId('1-ingredient-step');
    const check2 = screen.getByTestId('2-ingredient-step');

    userEvent.click(check0);
    userEvent.click(check1);
    userEvent.click(check2);

    const finishBtn = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishBtn);

    screen.logTestingPlaygroundURL();
  });
});
