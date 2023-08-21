import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../../contexts/recipes.context';
import { FoodService } from '../../services/services';
import { Recipe } from '../../types/recipe';
import style from './RecipesList.module.css';

function RecipesList() {
  const { state, update } = useContext(RecipeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDefault = async () => {
      let recipes = await FoodService(state.scope)
        .search('s', '') as Recipe[];

      if (recipes.length > 12) {
        recipes = recipes.slice(0, 12);
      }

      update({ ...state, recipes });
    };
    loadDefault();
  }, []);

  const cardClick = (recipe: Recipe) => {
    navigate(`/${state.scope}/${recipe.idMeal || recipe.idDrink}`);
  };

  return (
    <div>
      { state.recipes.map((recipe, index) => (
        <div key={ recipe.idDrink || recipe.idMeal }>
          <button
            onClick={ () => cardClick(recipe) }
            className={ style.wrapper }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className={ style.thumbnail }
              src={ recipe.strDrinkThumb || recipe.strMealThumb }
              alt={ recipe.strDrink || recipe.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <div className={ style.name } data-testid={ `${index}-card-name` }>
              { recipe.strDrink || recipe.strMeal }
            </div>
          </button>
        </div>
      )) }
    </div>
  );
}

export default RecipesList;
