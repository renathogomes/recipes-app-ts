import { useContext } from 'react';
import { RecipeContext } from '../../contexts/recipes.context';
import RecipeCard from '../RecipeCard/RecipeCard';

function RecipesList() {
  const { state } = useContext(RecipeContext);

  return (
    <div>
      { state.recipes.map((recipe, index) => (
        <div key={ recipe.idDrink || recipe.idMeal }>
          <RecipeCard recipe={ recipe } index={ index } />
        </div>
      )) }
    </div>
  );
}

export default RecipesList;
