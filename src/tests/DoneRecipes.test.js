import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const allBtnId = 'filter-by-all-btn';
const foodBtnId = 'filter-by-food-btn';
const drinkBtnId = 'filter-by-drink-btn';
const doneRecipesPage = '/done-recipes';

const doneRecipes = [{ id: '53060', type: 'food', nationality: 'Croatian', category: 'Side', alcoholicOrNot: '', name: 'Burek', image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg', doneDate: '08/29/2022', tags: ['Streetfood', ' Onthego'] }, { id: '17222', type: 'drink', nationality: '', category: 'Cocktail', alcoholicOrNot: 'Alcoholic', name: 'A1', image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg', doneDate: '08/29/2022', tags: '' }];

describe('Done Recipes tests', () => {
  it('render elements on screen', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);

    history.push(doneRecipesPage);

    const allBtn = await screen.findByTestId(allBtnId);
    const foodBtn = await screen.findByTestId(foodBtnId);
    const drinkBtn = await screen.findByTestId(drinkBtnId);

    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();

    userEvent.click(foodBtn);
    userEvent.click(drinkBtn);
    userEvent.click(allBtn);
  });

  it('redirect to food', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);

    history.push(doneRecipesPage);

    const img0 = await screen.findByTestId('0-horizontal-image');

    userEvent.click(img0);

    expect(history.location.pathname).toBe('/foods/53060');
  });

  it('redirect to food', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);

    history.push(doneRecipesPage);

    const img1 = await screen.findByTestId('1-horizontal-image');

    userEvent.click(img1);

    expect(history.location.pathname).toBe('/drinks/17222');
  });
});
