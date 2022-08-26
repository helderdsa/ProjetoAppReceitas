import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeStep({ ingredientValue, measure, checked, i }) {
  const { id } = useParams();
  const [inputChecked, setInputChecked] = useState();

  const checkIngredient = ({ target }) => {
    setInputChecked(!inputChecked);
    if (target.checked) {
      const inProgressLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      const { cocktails, meals } = inProgressLocalStorage;
      meals[id].push(target.name);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
    } else {
      const inProgressLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      const { cocktails, meals } = inProgressLocalStorage;
      meals[id].splice(meals[id].indexOf(target.name), 1);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails, meals }));
    }
  };
  return (
    <label
      className="check-ingredient"
      htmlFor={ i }
      data-testid={ `${i}-ingredient-step` }
    >
      <input
        onChange={ checkIngredient }
        type="checkbox"
        name={ ingredientValue }
        id={ i }
        checked={ inputChecked }
      />
      {` ${ingredientValue} - ${measure}`}
    </label>
  );
}

RecipeStep.propTypes = {
  checkIngredient: PropTypes.func,
  checked: PropTypes.bool,
  i: PropTypes.number,
  ingredientValue: PropTypes.string,
  measure: PropTypes.string,
}.isRequired;

export default RecipeStep;
