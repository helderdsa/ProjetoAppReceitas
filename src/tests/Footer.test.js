import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/RenderWithRouter';

const footerTestId = 'footer';
const drinksIconTestId = 'drinks-bottom-btn';
const foodsIconTestId = 'food-bottom-btn';

describe('Footer component test', () => {
  it('renders footer elements on page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const footer = screen.getByTestId(footerTestId);
    const drinksIcon = screen.getByTestId(drinksIconTestId);
    const foodsIcon = screen.getByTestId(foodsIconTestId);

    expect(footer).toBeInTheDocument();
    expect(drinksIcon).toBeInTheDocument();
    expect(foodsIcon).toBeInTheDocument();
  });
  it('redirects to foods/drinks on click', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const drinksIcon = screen.getByTestId(drinksIconTestId);
    const foodsIcon = screen.getByTestId(foodsIconTestId);

    userEvent.click(drinksIcon);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(foodsIcon);
    expect(history.location.pathname).toBe('/foods');
  });
});
