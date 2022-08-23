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
import renderWithRouter from './helpers/RenderWithRouter';

const searchIconTestId = 'search-top-btn';
const searchInputTestId = 'search-input';
const ingredientsRadioTestId = 'ingredient-search-radio';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterRadioTestId = 'first-letter-search-radio';
const searchBtnTestId = 'exec-search-btn';

describe('Foods page SearchBar tests', () => {
  it('renders food search bar elements correctly', () => {
    const { history } = renderWithRouter(<App />);

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
  it('fetches food ingredient', () => {
    const { history } = renderWithRouter(<App />);
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

    userEvent.click(ingredientsRadio);
    userEvent.type('avocado', searchInput);
    userEvent.click(searchBtn);

    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Avocado';
    waitFor(() => expect(fetch).toBeCalledWith(url));

    // screen.logTestingPlaygroundURL();
  });
  it('fetches food recipes by name', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(avocadoRecipesMock),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.click(nameSearchRadio);
    userEvent.type('avocado', searchInput);
    userEvent.click(searchBtn);

    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=avocado';
    waitFor(() => expect(fetch).toBeCalledWith(url));

    // screen.logTestingPlaygroundURL();
  });
  it('fetches food recipes by first letter', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(letterYFoodsMock),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.click(firstLetterRadio);
    userEvent.type('y', searchInput);
    userEvent.click(searchBtn);

    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=y';
    waitFor(() => expect(fetch).toBeCalledWith(url));

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(firstLetterRadio);
    userEvent.type('ya', searchInput);
    userEvent.click(searchBtn);

    expect(alert).toBeCalled();

    // screen.logTestingPlaygroundURL();
  });
});

describe('Drinks page SearchBar tests', () => {
  it('renders drinks search bar elements correctly', () => {
    const { history } = renderWithRouter(<App />);

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
  it('fetches drinks ingredient', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(wineIngredientMock),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const ingredientsRadio = screen.getByTestId(ingredientsRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.click(ingredientsRadio);
    userEvent.type('wine', searchInput);
    userEvent.click(searchBtn);

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=wine';
    waitFor(() => expect(fetch).toBeCalledWith(url));

    // screen.logTestingPlaygroundURL();
  });
  it('fetches drink recipes by name', () => {
    const { history } = renderWithRouter(<App />);
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
    userEvent.type('orangeade', searchInput);
    userEvent.click(searchBtn);

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=orangeade';
    waitFor(() => expect(fetch).toBeCalledWith(url));

    // screen.logTestingPlaygroundURL();
  });

  it('fetches drink recipes by first letter', () => {
    const { history } = renderWithRouter(<App />);
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

    userEvent.click(firstLetterRadio);
    userEvent.type('y', searchInput);
    userEvent.click(searchBtn);

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y';
    waitFor(() => expect(fetch).toBeCalledWith(url));

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(firstLetterRadio);
    userEvent.type('ya', searchInput);
    userEvent.click(searchBtn);

    expect(alert).toBeCalled();

    // screen.logTestingPlaygroundURL();
  });
});

// referênica spyOn > https://jestjs.io/docs/jest-object#jestspyonobject-methodname
// referência waitFor > https://testing-library.com/docs/dom-testing-library/api-async/
// referênica alert > https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
