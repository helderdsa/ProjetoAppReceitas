import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { lasagnaMock, ABCMock } from './helpers/detailsMocks';

const IMG_ID = 'recipe-photo';
const SHARE_BTN_ID = 'share-btn';
const FAVORITE_BTN_ID = 'favorite-btn';
const TITLE_ID = 'recipe-title';
const CATEGORY_ID = 'recipe-category';
const INSTRUCTIONS_ID = 'instructions';
const MOVIE_ID = 'video';
const BTN_START_ID = 'start-recipe-btn';

describe('RecipeDetails page test', () => {
  it('render elements on page', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods/52844');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(lasagnaMock),
    });
    // screen.logTestingPlaygroundURL();
    const img = screen.getByTestId(IMG_ID);
    const btnShare = screen.getByTestId(SHARE_BTN_ID);
    const btnFavorite = screen.getByTestId(FAVORITE_BTN_ID);
    const title = screen.getByTestId(TITLE_ID);
    const category = screen.getByTestId(CATEGORY_ID);
    const instructions = screen.getByTestId(INSTRUCTIONS_ID);
    const movie = screen.getByTestId(MOVIE_ID);
    const btnStart = screen.getByTestId(BTN_START_ID);

    expect(img).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(movie).toBeInTheDocument();
    expect(btnStart).toBeInTheDocument();
  });
});
