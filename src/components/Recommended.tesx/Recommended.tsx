import { useEffect, useState } from 'react';
import { Recipe, RecipeScope } from '../../types/recipe';
import { FoodService } from '../../services/services';

import style from './Recommended.module.css';

type DetailsRecipe = {
  type: RecipeScope,
  term: string,
};

export function Recommended({ type, term }: DetailsRecipe) {
  console.log(term);

  const [data, setData] = useState<Recipe[]>([]);
  useEffect(() => {
    const getRecommended = async () => {
      const item = FoodService(type === 'meals' ? 'drinks' : 'meals');
      const searchRecommended = await item.recommended();
      setData(searchRecommended);
    };
    getRecommended();
  }, []);

  console.log(data);

  return (
    <div>
      <h2>Recommended</h2>
      <div id="carouselDrinks" className="carousel slide">
        {
       (data) ? (
         data.map((drink, index) => (
           <article
             key={ index }
           >
             <img
               src={ drink.strDrinkThumb }
               alt={ drink.strDrinkThumb }
               className={ `${'d-block w-100'}` }
             />
             <ul>
               { drink.strAlcoholic && (<li>{drink.strAlcoholic}</li>)}
               {drink.strArea && (<li>{drink.strArea}</li>)}
               {drink.strCategory && (<li>{drink.strCategory}</li>)}
               {drink.strDrink && (<li>{drink.strDrink}</li>)}
               {drink.strInstructions && (<li>{drink.strInstructions}</li>)}
               {drink.strMeal && (<li>{drink.strMeal}</li>)}
               {drink.strMealThumb && (<li>{drink.strMealThumb}</li>)}
               {drink.strTags && (<li>{drink.strTags}</li>)}
             </ul>
           </article>
         ))) : (<p>Loading...</p>)
       }
        <button
          className={ style.startRecipe }
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}
