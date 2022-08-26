import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { avocadoIngredientsMock } from './helpers/foodsMocks';
import { wineIngredientMock } from './helpers/drinksMocks';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { mealsCategoriesMock, drinksCategoriesMock } from './helpers/categoriesMock';

const allTestId = 'All-category-filter';
const beefTestId = 'Beef-category-filter';
const cocktailTestId = 'Cocktail-category-filter';

afterEach(() => {
  jest.clearAllMocks();
});

describe('FilterButtons Meals component test', () => {
  it('renders all button on page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(avocadoIngredientsMock),
    });

    const allBtn = await screen.findByTestId(allTestId);

    userEvent.click(allBtn);
  });
  it('renders all button on page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({ json: () => Promise.resolve(mealsCategoriesMock) });
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=beef') {
        return Promise.resolve({ json: () => Promise.resolve(avocadoIngredientsMock) });
      }
    });

    const beefBtn = await screen.findByTestId(beefTestId);
    userEvent.click(beefBtn);
  });
});

describe('FilterButtons Drinks component test', () => {
  it('renders all button on page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(wineIngredientMock),
    });

    const allBtn = await screen.findByTestId(allTestId);

    userEvent.click(allBtn);
  });
  it('renders all button on page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');

    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
        return Promise.resolve({ json: () => Promise.resolve(drinksCategoriesMock) });
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=cocktail') {
        return Promise.resolve({ json: () => Promise.resolve(wineIngredientMock) });
      }
    });

    const cocktailBtn = await screen.findByTestId(cocktailTestId);
    userEvent.click(cocktailBtn);
  });
});
