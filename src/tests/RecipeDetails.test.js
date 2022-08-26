import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { lasagnaMock, ABCMock } from './helpers/detailsMocks';
import drinksCarousel from './helpers/drinksCarouselMock';
import mealsCarouselMock from './helpers/mealsCarouselMock';

const foodsURL = '/foods/52844';
const IMG_ID = 'recipe-photo';
const SHARE_BTN_ID = 'share-btn';
const FAVORITE_BTN_ID = 'favorite-btn';
const TITLE_ID = 'recipe-title';
// const CATEGORY_ID = 'recipe-category';
const INSTRUCTIONS_ID = 'instructions';
const MOVIE_ID = 'video';
const BTN_START_ID = 'start-recipe-btn';
const drinksCarouselURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const lasagnaURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52844';
const doneRecipe = [{
  id: '52844',
  type: 'comida-ou-bebida',
  nationality: 'nacionalidade-da-receita-ou-texto-vazio',
  category: 'categoria-da-receita-ou-texto-vazio',
  alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
  name: 'nome-da-receita',
  image: 'imagem-da-receita',
  doneDate: 'quando-a-receita-foi-concluida',
  tags: 'array-de-tags-da-receita-ou-array-vazio',
}];
const inProgressRecipes = {
  cocktails: {
    // id-da-bebida: [lista-de-ingredientes-utilizados],
  },
  meals: {
    52844: [],
  },
};

describe('RecipeDetails page test', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url === lasagnaURL) {
        return Promise.resolve({ json: () => Promise.resolve(lasagnaMock) });
      }
      if (url === drinksCarouselURL) {
        return Promise.resolve({ json: () => Promise.resolve(drinksCarousel) });
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({ json: () => Promise.resolve(mealsCarouselMock) });
      }
    });
  });

  it('render elements on page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodsURL);

    // jest.spyOn(global, 'fetch');
    // global.fetch.mockImplementation((url) => {
    //   console.log(url);
    //   return {
    //     json: () => {
    //       if (url === drinksCarouselURL) {
    //         return jest.fn().mockResolvedValue(drinksCarousel);
    //       }
    //       if (url === lasagnaURL) {
    //         return jest.fn().mockResolvedValue(lasagnaMock);
    //       }
    //     },
    //   };
    // });
    await waitFor(() => expect(fetch).toBeCalledWith(drinksCarouselURL));
    await waitFor(() => expect(fetch).toBeCalledTimes(2));

    const img = await screen.findByTestId(IMG_ID);
    const btnShare = await screen.findByTestId(SHARE_BTN_ID);
    const btnFavorite = await screen.findByTestId(FAVORITE_BTN_ID);
    const title = await screen.findByTestId(TITLE_ID);
    const category = await screen.findByText(/Pasta/i);
    // const category2 = await screen.findByTestId(CATEGORY_ID);
    const instructions = await screen.findByTestId(INSTRUCTIONS_ID);
    const movie = await screen.findByTestId(MOVIE_ID);
    const btnStart = await screen.findByTestId(BTN_START_ID);

    expect(img.src).toBe('https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg');
    expect(img).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(movie).toBeInTheDocument();
    expect(btnStart).toBeInTheDocument();
  });

  it('redirect to in progress page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodsURL);

    await waitFor(() => expect(fetch).toBeCalledWith(drinksCarouselURL));
    await waitFor(() => expect(fetch).toBeCalledTimes(2));

    const btnStart = await screen.findByTestId(BTN_START_ID);

    userEvent.click(btnStart);
    expect(history.location.pathname).toBe('/foods/52844/in-progress');
  });

  it('change button name to continue button', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    history.push(foodsURL);

    await waitFor(() => expect(fetch).toBeCalledWith(drinksCarouselURL));
    await waitFor(() => expect(fetch).toBeCalledTimes(2));

    const btnStart = await screen.findByTestId(BTN_START_ID);
    expect(btnStart).toHaveTextContent(/continue recipe/i);
  });

  it('start button disabled', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
    history.push(foodsURL);

    await waitFor(() => expect(fetch).toBeCalledWith(drinksCarouselURL));
    await waitFor(() => expect(fetch).toBeCalledTimes(2));

    const btnStart = screen.queryByTestId(BTN_START_ID);
    expect(btnStart).not.toBeInTheDocument();
  });

  it('click on carrousel', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodsURL);

    await waitFor(() => expect(fetch).toBeCalledWith(drinksCarouselURL));
    await waitFor(() => expect(fetch).toBeCalledTimes(2));

    const carrouselItem = await screen.findByTestId('0-card-img');
    userEvent.click(carrouselItem);
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('clicks share button', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodsURL);
    await waitFor(() => expect(fetch).toBeCalledTimes(2));
    // TODO
  });

  it('clicks favorite button', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodsURL);

    await waitFor(() => expect(fetch).toBeCalledTimes(2));
    const favoriteBtn = await screen.findByTestId('favorite-btn');

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
  });

  it('loads favorite recipe', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const favoriteRecipe = [{ id: '52844' }];
    localStorage.clear();

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));

    history.push(foodsURL);

    await waitFor(() => expect(fetch).toBeCalledTimes(2));
  });
});

describe('RecipeDetails page test drinks', () => {
  beforeEach(() => {
    // jest.clearAllMocks();
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13501') {
        return Promise.resolve({ json: () => Promise.resolve(ABCMock) });
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return Promise.resolve({ json: () => Promise.resolve(mealsCarouselMock) });
      }
    });
  });

  it('render elements on page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks/13501');

    await waitFor(() => expect(fetch).toBeCalledTimes(2));
    // screen.logTestingPlaygroundURL();

    const btnStart = await screen.findByTestId('start-recipe-btn');

    userEvent.click(btnStart);
    expect(history.location.pathname).toBe('/drinks/13501/in-progress');
  });

  it('clicks share button', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks/13501');

    // copy = jest.fn();
    // jest.spyOn(global, 'copy').mockImplementation(() => {});
    // jest.mock('clipboard-copy');
    // document.execCommand = jest.fn();

    await waitFor(() => expect(fetch).toBeCalledTimes(2));
    // const shareBtn = await screen.findByTestId('share-btn');

    // userEvent.click(shareBtn);
    // expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('clicks favorite button', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks/13501');

    await waitFor(() => expect(fetch).toBeCalledTimes(2));
    const favoriteBtn = await screen.findByTestId('favorite-btn');

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
  });

  it('loads favorite recipe', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const favoriteRecipe = [{ id: '52977' }];
    localStorage.clear();

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));

    history.push('/drinks/13501');

    await waitFor(() => expect(fetch).toBeCalledTimes(2));
  });
});
