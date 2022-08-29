import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import drinksCarousel from './helpers/drinksCarouselMock';
import {
  avocadoIngredientsMock, avocadoRecipesMock, letterYFoodsMock,
} from './helpers/foodsMocks';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const fetchCalls = 4;
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

    // const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=avocado';
    // await waitFor(() => expect(fetch).toBeCalledWith(url));
    await waitFor(() => expect(fetch).toBeCalledTimes(fetchCalls));
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

    // const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=avocado';
    // await waitFor(() => expect(fetch).toBeCalledWith(url));
    await waitFor(() => expect(fetch).toBeCalledTimes(fetchCalls));
  });
  it('fetches food recipes by first letter', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const urlMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?f=y';

    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url === urlMeal) {
        return Promise.resolve({ json: () => Promise.resolve(letterYFoodsMock) });
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({ json: () => Promise.resolve(drinksCarousel) });
      }
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.type(searchInput, 'y');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    await waitFor(() => expect(fetch).toBeCalledWith(urlMeal));
    expect(history.location.pathname).toBe('/foods/52871');
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
  it('calls alert when api returns', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null }),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.type(searchInput, 'avocadoz');
    userEvent.click(nameSearchRadio);
    userEvent.click(searchBtn);

    global.alert = jest.fn();

    await waitFor(() => expect(alert).toBeCalledTimes(1));
    // TODO verificar erro
  });
  it('search for ingredients', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null }),
    });

    const searchIcon = screen.queryByTestId(searchIconTestId);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputTestId);
    const ingredientsRadio = screen.getByTestId(ingredientsRadioTestId);
    const searchBtn = screen.getByTestId(searchBtnTestId);

    userEvent.type(searchInput, 'avocadoz');
    userEvent.click(ingredientsRadio);
    userEvent.click(searchBtn);

    global.alert = jest.fn();
    // TODO verificar erro
  });
});

// referênica spyOn > https://jestjs.io/docs/jest-object#jestspyonobject-methodname
// referência waitFor > https://testing-library.com/docs/dom-testing-library/api-async/
// referênica alert > https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
