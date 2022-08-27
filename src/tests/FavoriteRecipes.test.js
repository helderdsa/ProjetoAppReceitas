import { screen } from '@testing-library/react';
import React from 'react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

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
});
