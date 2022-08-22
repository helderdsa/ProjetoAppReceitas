import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/foods/:id-da-receita" component={ RecipeDetails } />
      <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
      <Route path="/foods/{id-da-receita}/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/{id-da-receita}/in-progress" component={ RecipeInProgress } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
