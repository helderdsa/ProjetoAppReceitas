const quantity = 6;
export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const drink = data.drinks.slice(0, quantity);
  return drink;
};
export const fetchMeals = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const data = await response.json();
  const meals = data.meals.slice(0, quantity);
  return meals;
};
