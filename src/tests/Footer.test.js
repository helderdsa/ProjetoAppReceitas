import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/RenderWithRouter';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const footerTestId = 'footer';
const drinksIconTestId = 'drinks-bottom-btn';
const foodsIconTestId = 'food-bottom-btn';

describe('Footer component test', () => {
  it('renders footer elements on page', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const footerFoods = screen.getByTestId(footerTestId);
    const drinksIcon = screen.getByTestId(drinksIconTestId);
    const foodsIcon = screen.getByTestId(foodsIconTestId);

    expect(footerFoods).toBeInTheDocument();
    expect(drinksIcon).toBeInTheDocument();
    expect(foodsIcon).toBeInTheDocument();
  });
  it('redirects to foods/drinks on click', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const drinksIcon = screen.getByTestId(drinksIconTestId);
    const foodsIcon = screen.getByTestId(foodsIconTestId);

    userEvent.click(drinksIcon);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(foodsIcon);
    expect(history.location.pathname).toBe('/foods');
  });
  it('verifies pages that should not have footer', () => {
    const { history } = renderWithRouter(<App />);

    const footer = screen.queryByTestId(footerTestId);
    expect(footer).not.toBeInTheDocument();

    history.push('/profile');
    const footerProfile = screen.queryByTestId(footerTestId);
    expect(footerProfile).toBeInTheDocument();

    history.push('/done-recipes');
    const footerDoneRecipes = screen.queryByTestId(footerTestId);
    expect(footerDoneRecipes).not.toBeInTheDocument();

    history.push('/favorite-recipes');
    const footerFavoriteRecipes = screen.queryByTestId(footerTestId);
    expect(footerFavoriteRecipes).not.toBeInTheDocument();
  });
});
