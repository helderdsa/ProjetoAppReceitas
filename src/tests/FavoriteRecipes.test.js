import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const img0TestId = '0-horizontal-image';
const img1TestId = '1-horizontal-image';
const favoriteRecipesMock = [{ id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', alcoholicOrNot: 'Optional alcohol', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' }, { id: '53026', type: 'food', nationality: 'Egyptian', category: 'Vegetarian', alcoholicOrNot: '', name: 'Tamiya', image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg' }];

describe('Favorite Recipes page test', () => {
  it('render elements on page', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWithRouterAndRedux(<FavoriteRecipes />);

    const img0 = await screen.findByTestId(img0TestId);
    const img1 = await screen.findByTestId(img1TestId);

    expect(img0).toBeInTheDocument();
    expect(img1).toBeInTheDocument();
  });
  it('tests buttons', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWithRouterAndRedux(<FavoriteRecipes />);

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const foodBtn = screen.getByTestId('filter-by-food-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');

    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    userEvent.click(foodBtn);
    userEvent.click(drinksBtn);
    userEvent.click(allBtn);

    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(favoriteBtn);
  });
  it('tests redirect drinks', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');

    const img0 = await screen.findByTestId(img0TestId);

    userEvent.click(img0);

    expect(history.location.pathname).toBe('/drinks/15997');
  });
  it('tests redirect foods', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/favorite-recipes');

    const img1 = await screen.findByTestId(img1TestId);

    userEvent.click(img1);

    expect(history.location.pathname).toBe('/foods/53026');
  });
});
