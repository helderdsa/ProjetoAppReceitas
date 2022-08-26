import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  letterYDrinksMock, orangeadeDrinksMock, wineIngredientMock,
} from './helpers/drinksMocks';
import mealsCarouselMock from './helpers/mealsCarouselMock';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const searchIconTestId = 'search-top-btn';
const searchInputTestId = 'search-input';
const ingredientsRadioTestId = 'ingredient-search-radio';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterRadioTestId = 'first-letter-search-radio';
const searchBtnTestId = 'exec-search-btn';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Drinks page SearchBar tests', () => {
  it('renders drinks search bar elements correctly', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/drinks');
    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const ingredientsRadio = screen.getByTestId(ingredientsRadioTestId);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    expect(ingredientsRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it('fetches drinks ingredient', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(wineIngredientMock),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const ingredientsRadio = screen.getByRole('radio', { name: /ingredient/i });
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.type(searchInput, 'wine');
    userEvent.click(ingredientsRadio);
    await waitFor(() => expect(ingredientsRadio).toHaveFocus());
    userEvent.click(searchBtn);

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=wine';
    await waitFor(() => expect(fetch).toBeCalledWith(url));
  });
  it('fetches drink recipes by name', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');

    const urlCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=orangeade';

    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url === urlCocktail) {
        return Promise.resolve({ json: () => Promise.resolve(orangeadeDrinksMock) });
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({ json: () => Promise.resolve(mealsCarouselMock) });
      }
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'orangeade');
    userEvent.click(searchBtn);

    await waitFor(() => expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s='));
    expect(history.location.pathname).toBe('/drinks/12618');
  });

  it('fetches drink recipes by first letter', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(letterYDrinksMock),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.type(searchInput, 'y');
    userEvent.click(firstLetterRadio);
    await waitFor(() => expect(firstLetterRadio).toHaveFocus());
    userEvent.click(searchBtn);

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y';
    await waitFor(() => expect(fetch).toBeCalledWith(url));
  });
  it('calls alert', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    const searchBtn = screen.getByTestId(searchBtnTestId);

    global.alert = jest.fn();

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'ya');
    userEvent.click(searchBtn);

    expect(alert).toBeCalledTimes(1);
  });
  it('calls alert', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.type(searchInput, 'nullDrink');
    userEvent.click(nameSearchRadio);
    userEvent.click(searchBtn);

    global.alert = jest.fn();

    await waitFor(() => expect(alert).toBeCalledTimes(1));
    // TODO verificar erro
  });
});
