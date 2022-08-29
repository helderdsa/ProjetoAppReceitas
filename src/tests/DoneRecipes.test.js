import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const allBtnId = 'filter-by-all-btn';
const foodBtnId = 'filter-by-food-btn';
const drinkBtnId = 'filter-by-drink-btn';
// const img0Id = "0-horizontal-image";

describe('Done Recipes tests', () => {
  it('render elements on screen', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/done-recipes');

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
});
