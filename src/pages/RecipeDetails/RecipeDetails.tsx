import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { recipeId } = useParams<{ recipeId: string }>();

  return (
    <>
      <div>Recipe details works!</div>
      <div>
        Recipe ID:
        { recipeId }
      </div>
    </>
  );
}

export default RecipeDetails;
