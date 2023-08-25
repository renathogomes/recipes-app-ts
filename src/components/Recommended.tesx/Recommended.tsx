import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe, RecipeScope } from '../../types/recipe';
import { FoodService } from '../../services/services';

import style from './Recommended.module.css';

type DetailsRecipe = {
  type: RecipeScope,
  term: string,
};

export function Recommended({ type, term }: DetailsRecipe) {
  console.log(term);
  const navigate = useNavigate();

  const [data, setData] = useState<Recipe[]>([]);
  useEffect(() => {
    const getRecommended = async () => {
      const item = FoodService(type === 'meals' ? 'drinks' : 'meals');
      const searchRecommended = await item.recommended();
      setData(searchRecommended);
    };
    getRecommended();
  }, []);

  const handleClick = () => {
    navigate(`/${type}/:recipeId/in-progress`);
  };

  console.log(type);

  return (
    <div>
      <h2>Recommended</h2>
      <div
        id="carouselDrinks"
        className={ style.carousel }
      >
        {type === 'meals' ? (
          data.slice(0, 6).map((drink, index) => (
            <article
              key={ index }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrinkThumb }
                className={ style.image }
                data-testid={ `${index}-recommendation-card` }
              />
              <ul>
                { drink.strAlcoholic && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strAlcoholic}
                  </li>)}
                {drink.strArea && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strArea}
                  </li>)}
                {drink.strCategory && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strCategory}
                  </li>)}
                {drink.strDrink && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strDrink}
                  </li>)}
                {drink.strInstructions && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strInstructions}
                  </li>)}
                {drink.strMeal && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strMeal}

                  </li>)}
                {drink.strMealThumb && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strMealThumb}

                  </li>)}
                {drink.strTags && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strTags}

                  </li>)}
              </ul>
            </article>
          ))) : (
          data.slice(0, 6).map((meal, index) => (
            <article
              key={ index }
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMealThumb }
                className={ style.image }
                data-testid={ `${index}-recommendation-card` }
              />
              <ul>
                {meal.strCategory && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {meal.strCategory}
                  </li>)}
                {meal.strMeal && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {meal.strMeal}
                  </li>)}
                {meal.strInstructions && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {meal.strInstructions}
                  </li>)}
                {meal.strTags && (
                  <li
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {meal.strTags}

                  </li>)}
              </ul>
            </article>
          )))}
        <button
          className={ style.startRecipe }
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}
