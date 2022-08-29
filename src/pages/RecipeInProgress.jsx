import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useDate from 'usedate';
import { fetchDetailsMeals, fetchDetailsDrinks } from '../redux/actions';
import RecipeStep from '../components/RecipeStep';
import FavoriteandShareButton from '../components/FavoriteandShareButton';

function RecipeInProgress() {
  const { id } = useParams();

  const date = useDate('mm/dd/yyyy');

  // console.log(date, 'date');

  const dispatch = useDispatch();

  const history = useHistory();
  const { location: { pathname } } = history;

  const details = useSelector((state) => state.detailsReducer.details);

  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [instructions, setInstructions] = useState();
  const [categoryOrAlcoholic, setcategoryOrAlcoholic] = useState();
  const [ingredient, setIngredient] = useState();
  const [disabledValue, setdisabledValue] = useState();
  const [updateChecked, setUpdateChecked] = useState(true);

  const verify = (value) => {
    const inProgressLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressLocalStorage) {
      if (pathname.includes('foods')) {
        const { meals } = inProgressLocalStorage;
        return ((meals[id].includes(value)));
      }
      const { cocktails } = inProgressLocalStorage;
      return ((cocktails[id].includes(value)));
    }
  };

  const checkedUpdate = () => {
    setUpdateChecked(!updateChecked);
  };

  const onClick = () => {
    history.push('/done-recipes');
    const doneRecipes = JSON
      .parse(localStorage.getItem('doneRecipes'));
    if (pathname.includes('foods')) {
      const { strMeal, strCategory, strMealThumb, strArea, strTags } = details[0];
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, {
        id,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: date,
        tags: strTags.split(','),
      },
      ]));
    } else {
      const { strDrink, strCategory, strDrinkThumb, strAlcoholic, strTags } = details[0];
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, {
        id,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: date,
        tags: strTags.split(','),
      },
      ]));
    }
  };

  const verifyChecked = () => {
    if (details.length >= 1) {
      const ingredientsKeys = Object.keys(details[0])
        .filter((key) => key.includes('Ingredient'));

      const ingredientsNofilter = ingredientsKeys.map((keys) => details[0][keys]);

      const ingredientsList = ingredientsNofilter.filter((i) => i !== '' && i !== null);

      const ingredientsChecked = ingredientsList.map((value) => verify(value));

      console.log(ingredientsList, ingredientsChecked);
      setdisabledValue(!ingredientsChecked.every((value) => value === true));
    }
  };

  useEffect(() => {
    verifyChecked();
  }, [updateChecked]);

  useEffect(() => {
    verifyChecked();
  }, [details]);

  useEffect(() => {
    if (pathname.includes('foods')) {
      dispatch(fetchDetailsMeals(id));
    } else {
      dispatch(fetchDetailsDrinks(id));
    }
  }, []);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      if (pathname.includes('foods')) {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify({ cocktails: {}, meals: { [id]: [] } }));
      } else {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify({ cocktails: { [id]: [] }, meals: {} }));
      }
    }
  }, []);

  useEffect(() => {
    if (details.length >= 1) {
      const ingredientsKeys = Object.keys(details[0])
        .filter((key) => key.includes('Ingredient'));

      const ingredientsNofilter = ingredientsKeys.map((keys) => details[0][keys]);

      const ingredientsList = ingredientsNofilter.filter((i) => i !== '' && i !== null);

      const measuresKeys = Object.keys(details[0])
        .filter((key) => key.includes('Measure'));

      const measuresNoFilter = measuresKeys.map((keys) => details[0][keys]);

      const measuresList = measuresNoFilter.filter((i) => i !== ' ' && i !== null);

      const ingredients = ingredientsList
        .map((value, i) => ({
          ingredientValue: value,
          measure: measuresList[i],
          checked: verify(value),
        }));
      if (pathname.includes('foods')) {
        const { strMeal, strCategory,
          strInstructions, strMealThumb } = details[0];

        setTitle(strMeal);
        setcategoryOrAlcoholic(strCategory);
        setInstructions(strInstructions);
        setImg(strMealThumb);
        setIngredient(ingredients);
      } else {
        const { strDrink,
          strInstructions, strDrinkThumb,
          strAlcoholic } = details[0];

        setTitle(strDrink);
        setInstructions(strInstructions);
        setImg(strDrinkThumb);
        setIngredient(ingredients);
        setcategoryOrAlcoholic(strAlcoholic);
      }
    }
  }, [details]);

  return (
    <div>
      <h1>Progresso</h1>
      <img src={ img } alt={ title } data-testid="recipe-photo" width="300px" />
      <FavoriteandShareButton />
      <h1 data-testid="recipe-title">{title}</h1>
      <h3 data-testid="recipe-category">{categoryOrAlcoholic}</h3>
      <p data-testid="instructions">{instructions}</p>
      <div>
        {ingredient && ingredient
          .map(({ ingredientValue, measure, checked }, i) => (
            <RecipeStep
              key={ i }
              ingredientValue={ ingredientValue }
              measure={ measure }
              checked={ checked }
              updateChecked={ checkedUpdate }
              i={ i }
            />
          ))}
      </div>
      <button
        onClick={ onClick }
        type="button"
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        disabled={ disabledValue }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
