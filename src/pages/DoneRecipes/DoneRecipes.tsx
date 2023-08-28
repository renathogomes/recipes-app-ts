import { useState, useEffect } from 'react';
import { Recipe } from '../../types/recipe';
import Header from '../../components/Header';
import { DoneRecipe } from '../RecipeInProgress/RecipeInProgress';

function DoneRecipes() {
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
      {doneRecipes.map((recipe, index) => (
        <ul key={ recipe.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt="recipe thumbnail"
            src={ recipe.image }
          />
          <h1
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name}
          </h1>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.category}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Share
          </button>
          {recipe.tags.map((tag, tagIndex) => (
            <p
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
        </ul>
      ))}
    </>
  );
}

export default DoneRecipes;
