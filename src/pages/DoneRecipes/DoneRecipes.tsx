import { useState, useEffect } from 'react';
import useDoneRecipes from '../../hooks/useDoneRecipes';
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

  const doneRecipeButtons = useDoneRecipes();
  const { setFilter } = doneRecipeButtons;

  return (
    <>
      <Header
        pageTitle="Done Recipes"
        searchIcon={ false }
      />
      <button
        onClick={ () => setFilter('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => setFilter('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => setFilter('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <DoneRecipeCard />
    </>
  );
}
