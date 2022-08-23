import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Recipes from '../pages/Recipes';
import {
  avocadoIngredientsMock, avocadoRecipesMock, letterYMock } from './helpers/recipesMocks';
import renderWithRouter from './helpers/RenderWithRouter';

const searchIconTestId = 'search-top-btn';
const searchInputTestId = 'search-input';
const ingredientsRadioTestId = 'ingredient-search-radio';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterRadioTestId = 'first-letter-search-radio';
const searchBtnTestId = 'exec-search-btn';

describe('search bar tests', () => {
  it('renders search bar elements correctly', () => {
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
  it('fetches ingredient', () => {
    render(<Recipes />);

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
  it('fetches recipes by name', () => {
    render(<Recipes />);

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
  it('fetches recipes by first letter', () => {
    render(<Recipes />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(letterYMock),
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

// referênica spyOn > https://jestjs.io/docs/jest-object#jestspyonobject-methodname
// referência waitFor > https://testing-library.com/docs/dom-testing-library/api-async/
// referênica alert > https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
