import { useEffect, useState } from 'react';
import { Recipe, RecipeScope } from '../../types/recipe';
import { FoodService } from '../../services/services';

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
      {
       (data) ? (
         data.map((drink, index) => {
           return (
             <article key={ index }>
               <img src={ drink.strDrinkThumb } alt={ drink.strDrinkThumb } />
               <ul>
                 <li>{drink.strAlcoholic}</li>
                 <li>{drink.strArea}</li>
                 <li>{drink.strCategory}</li>
                 <li>{drink.strDrink}</li>
                 <li>{drink.strInstructions}</li>
                 <li>{drink.strMeal}</li>
                 <li>{drink.strMealThumb}</li>
                 <li>{drink.strTags}</li>
               </ul>
             </article>
           );
         })

       ) : (
         <p>Loading...</p>
       )
}
    </div>
  );
}
