import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  letterYDrinksMock, orangeadeDrinksMock, wineIngredientMock,
} from './helpers/drinksMocks';
import {
  avocadoIngredientsMock, avocadoRecipesMock, letterYFoodsMock,
} from './helpers/foodsMocks';
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

describe('Foods page SearchBar tests', () => {
  it('renders food search bar elements correctly', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const searchIcon = screen.queryByTestId(searchIconTestId);
    expect(searchIcon).not.toBeInTheDocument();

    history.push('/foods');
    const searchIconFoods = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIconFoods);

    const ingredientsRadio = screen.getByTestId(ingredientsRadioTestId);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    expect(ingredientsRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it('fetches food ingredient', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    // Conferir: será que não vai ser confundido com o outro fetch?
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(avocadoIngredientsMock),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const ingredientsRadio = screen.getByTestId(ingredientsRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);
    userEvent.type(searchInput, 'avocado');
    userEvent.click(ingredientsRadio);
    await waitFor(() => expect(ingredientsRadio).toHaveFocus());

    userEvent.click(searchBtn);

    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=avocado';
    await waitFor(() => expect(fetch).toBeCalledWith(url));
  });
  it('fetches food recipes by name', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(avocadoRecipesMock),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const nameSearchRadio = screen.getByRole('radio', { name: /ingredient/i });
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.type(searchInput, 'avocado');
    userEvent.click(nameSearchRadio);
    await waitFor(() => expect(nameSearchRadio).toHaveFocus());
    userEvent.click(searchBtn);

    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=avocado';
    await waitFor(() => expect(fetch).toBeCalledWith(url));
  });
  it('fetches food recipes by first letter', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(letterYFoodsMock),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.type(searchInput, 'y');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=y';
    await waitFor(() => expect(fetch).toBeCalledWith(url));
  });
  it('calls alert', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

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

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(orangeadeDrinksMock),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'orangeade');
    userEvent.click(searchBtn);

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=orangeade';
    await waitFor(() => expect(fetch).toBeCalledWith(url));
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
});

// referênica spyOn > https://jestjs.io/docs/jest-object#jestspyonobject-methodname
// referência waitFor > https://testing-library.com/docs/dom-testing-library/api-async/
// referênica alert > https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
