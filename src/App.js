import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Food } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/foods/:id-da-receita" component={ FoodRecipe } />
      <Route path="/drinks/:id-da-receita" component={ DrinkRecipe } />
      <Route path="/foods/{id-da-receita}/in-progress" component={ FoodsInProgress } />
      <Route path="/drinks/{id-da-receita}/in-progress" component={ DrinksInProgress } />
      <Route path="/done-recipes" component={ RecipesDone } />
      <Route path="/favorite-recipes" component={ Favorites } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
