import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../../contexts/recipes.context';
import { FoodService } from '../../services/services';
import { Category, Recipe } from '../../types/recipe';
import style from './RecipesList.module.css';

function RecipesList() {
  const { state, update } = useContext(RecipeContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadDefault = async () => {
      let recipes = await FoodService(state.scope)
        .search('s', '') as Recipe[];

      if (recipes.length > 12) {
        recipes = recipes.slice(0, 12);
      }
      let categoriesTemp = await FoodService(state.scope)
        .getCategories();
      if (categoriesTemp.length > 5) {
        categoriesTemp = categoriesTemp.slice(0, 5);
      }
      setCategories(categoriesTemp);
      update({ ...state, recipes });
    };
    loadDefault();
  }, []);

  const cardClick = (recipe: Recipe) => {
    navigate(`/${state.scope}/${recipe.idMeal || recipe.idDrink}`);
  };

  return (
    <div>
      <div>
        { categories.map((category) => (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))}
      </div>
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
    </div>
  );
}

export default RecipesList;
