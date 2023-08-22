import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../../contexts/recipes.context';
import { FoodService } from '../../services/services';
import { Recipe, RecipeScope } from '../../types/recipe';

export type RecipesProps = {
  scope: RecipeScope;
};

type Ingredients = {
  measure: string;
  ingredient: string;
};

function RecipeDetails({ scope }: RecipesProps) {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

  useEffect(() => {
    const getRecipe = async () => {
      const [newRecipe] = await FoodService(scope)
        .getById(recipeId);
      console.log(newRecipe);
      setRecipe(newRecipe);
      const newIngredients = [] as Ingredients[];
      Object.entries(newRecipe).forEach((entry) => {
        if (entry[0].includes('strIngredient') && entry[1]) {
          const newObj = {
            measure: newRecipe[`strMeasure${entry[0].split('strIngredient')[1]}`],
            ingredient: entry[1],
          } as Ingredients;
          newIngredients.push(newObj);
        }
      });
      console.log(newIngredients);
      setIngredients(newIngredients);
    };

    getRecipe();
  }, [recipeId]);

  return (
    <>
      <h1 data-testid="recipe-title">{ recipe?.strMeal || recipe?.strDrink }</h1>
      <h2 data-testid="recipe-category">{ recipe?.strCategory }</h2>
      {
        recipe?.strAlcoholic
        && (
          <h5 data-testid="recipe-category">
            { recipe?.strAlcoholic }
          </h5>)
      }
      <img
        style={ { width: '200px' } }
        data-testid="recipe-photo"
        src={ recipe?.strDrinkThumb || recipe?.strMealThumb }
        alt="recipe thumbnail"
      />
      <ul>
        { ingredients.map((el, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${el.measure} ${el.ingredient}` }
          </li>
        )) }
      </ul>
      <p data-testid="instructions">{ recipe?.strInstructions }</p>
      { recipe?.strMeal && <iframe title="recipe video" data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${recipe?.strYoutube.split('=')[1]}` } /> }
    </>
  );
}

export default RecipeDetails;
