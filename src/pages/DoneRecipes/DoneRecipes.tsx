import { useState, useEffect } from 'react';
import { Recipe } from '../../types/recipe';
import Header from '../../components/Header';
import { DoneRecipe } from '../RecipeInProgress/RecipeInProgress';
import DoneRecipeCard from '../../components/DoneRecipeCard/DoneRecipeCard';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  useEffect(() => {
    const doneRecipesJSON = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setDoneRecipes(doneRecipesJSON);
    console.log(doneRecipes);
  }, []);

  return (
    <>
      <Header
        pageTitle="Done Recipes"
        searchIcon={ false }
      />
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <DoneRecipeCard />
    </>
  );
}
