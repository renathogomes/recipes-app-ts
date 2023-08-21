import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../../contexts/recipes.context';
import { FoodService } from '../../services/services';
import { Recipe, RecipeScope } from '../../types/recipe';

export type RecipesProps = {
  scope: RecipeScope;
};

function RecipeDetails({ scope }: RecipesProps) {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const getRecipe = async () => {
      const newRecipe = await FoodService(scope)
        .getById(recipeId);
      setRecipe(newRecipe);
      console.log(newRecipe);
    };
    getRecipe();
  }, [recipeId]);
  return (
    <>
      <div>Recipe details works!</div>
      <h2>
        Recipe ID:
        { recipeId }
      </h2>
    </>
  );
}

export default RecipeDetails;
