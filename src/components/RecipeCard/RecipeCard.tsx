import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../../contexts/recipes.context';
import { Recipe } from '../../types/recipe';
import style from './RecipeCard.module.css';

export type RecipeCardProps = {
  recipe: Recipe;
  index: number;
};

function RecipeCard({ recipe, index }: RecipeCardProps) {
  const { state } = useContext(RecipeContext);
  const navigate = useNavigate();

  const cardClick = () => {
    navigate(`/${state.scope}/${recipe.idMeal || recipe.idDrink}`);
  };

  return (
    <button
      onClick={ cardClick }
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
  );
}

export default RecipeCard;
