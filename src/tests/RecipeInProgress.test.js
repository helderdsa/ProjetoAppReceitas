import React from 'react';
import { render } from '@testing-library/react';
import RecipeInProgress from '../pages/RecipeInProgress';

// const recipePhotoTestId = 'recipe-photo';
// const recipeTitleTestId = 'recipe-title';
// const shareBtnTestId = 'share-btn';
// const favoriteBtnTestId = 'favorite-btn';
// const recipeCategoryTestId = 'recipe-category';
// const instructionsTestId = 'instructions';
// const finishBtnTestId = 'finish-recipe-btn';
// to do test id steps

describe('Login page test', () => {
  it('render elements on page', () => {
    render(<RecipeInProgress />);
  });
});
