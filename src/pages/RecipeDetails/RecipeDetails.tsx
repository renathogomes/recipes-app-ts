import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { recipeId } = useParams<{ recipeId: string }>();

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
