import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../../contexts/recipes.context';
import { FoodService } from '../../services/services';
import { Recipe, RecipeScope } from '../../types/recipe';
import heart from '../../images/blackHeartIcon.svg';
import emptyHeart from '../../images/emptyHeart.svg';
import style from './RecipeDetails.module.css';
import share from '../../images/Share.svg';

export type RecipesProps = {
  scope: RecipeScope;
};

type Ingredients = {
  measure: string;
  ingredient: string;
};

type Favorite = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
};

function RecipeDetails({ scope }: RecipesProps) {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [isShared, setIsShared] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favChanged, setFavChanged] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      const [newRecipe] = await FoodService(scope)
        .getById(recipeId);
      setRecipe(newRecipe);
      const newIngredients = [] as Ingredients[];
      Object.entries(newRecipe).forEach((entry) => {
        if (entry[0].includes('strIngredient') && entry[1]) {
          const newObj = {
            measure: newRecipe[`strMeasure${entry[0].split('strIngredient')[1]}`],
            ingredient: entry[1],
          } as Ingredients;
          newIngredients.push(newObj);
        }
      });
      setIngredients(newIngredients);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      const isFav = favoriteRecipes.some((el: any) => el.id === newRecipe?.idMeal
        || el.id === newRecipe?.idDrink);
      setIsFavorite(isFav);
    };

    getRecipe();
  }, [recipeId]);

  const handleShare = () => {
    const { location: { origin, pathname } } = window;
    const url = `${origin}${pathname}`;
    navigator.clipboard.writeText(url);
    setIsShared(true);
  };

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (favoriteRecipes.some((el: any) => el.id === recipe?.idMeal
      || el.id === recipe?.idDrink)) {
      const newFavorites = [] as Favorite[];
      favoriteRecipes.forEach((el: any) => {
        if (el.id !== recipe?.idMeal && el.id !== recipe?.idDrink) {
          newFavorites.push(el);
        }
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFavorite = {
        id: recipe?.idMeal || recipe?.idDrink,
        type: recipe?.idMeal ? 'meal' : 'drink',
        nationality: recipe?.strArea || '',
        category: recipe?.strCategory,
        alcoholicOrNot: recipe?.strAlcoholic || '',
        name: recipe?.strMeal || recipe?.strDrink,
        image: recipe?.strMealThumb || recipe?.strDrinkThumb,
      };
      favoriteRecipes.push(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
    setFavChanged(!favChanged);
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isFav = favoriteRecipes.some((el: any) => el.id === recipe?.idMeal
      || el.id === recipe?.idDrink);
    setIsFavorite(isFav);
  }, [favChanged]);

  return (
    <>
      <button
        onClick={ () => handleShare() }
        data-testid="share-btn"
        className={ style.btnShare }
      >
        <img
          src={ share }
          alt=""
          className={ style.iconShare }
        />
      </button>
      { isShared && <p>Link copied!</p> }
      { isFavorite
        ? (
          <button
            onClick={ () => handleFavorite() }
            className={ style.btnFav }
          >
            <img
              data-testid="favorite-btn"
              src={ heart }
              alt="favorite"
              className={ style.iconFav }
            />
          </button>)
        : (
          <button
            onClick={ () => handleFavorite() }
            className={ style.btnFav }
          >
            <img
              data-testid="favorite-btn"
              src={ emptyHeart }
              alt=""
              className={ style.iconFav }
            />
          </button>) }
      <img
        className={ style.recipeImg }
        data-testid="recipe-photo"
        src={ recipe?.strDrinkThumb || recipe?.strMealThumb }
        alt="recipe thumbnail"
      />
      <div className={ style.titlesContainer }>
        <h1
          data-testid="recipe-title"
          className={ style.recipeTitle }
        >
          { recipe?.strMeal || recipe?.strDrink }
        </h1>
        <h2
          data-testid="recipe-category"
          className={ style.recipeCategory }
        >
          { recipe?.strCategory }
        </h2>
      </div>
      {
        recipe?.strAlcoholic
        && (
          <h5 data-testid="recipe-category" className={ style.spanAlcohol }>
            { recipe?.strAlcoholic }
          </h5>)
      }
      <h2 className={ style.heading }>Ingredients</h2>
      <ul className={ style.ingredientsList }>
        { ingredients.map((el, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${el.measure} ${el.ingredient}` }
          </li>
        )) }
      </ul>
      <h2 className={ style.heading }>Instructions</h2>
      <p
        data-testid="instructions"
        className={ style.instructions }
      >
        { recipe?.strInstructions }
      </p>
      <h2 className={ style.heading }>Video</h2>
      { recipe?.strMeal && <iframe title="recipe video" data-testid="video" width="340" height="315" src={ `https://www.youtube.com/embed/${recipe?.strYoutube.split('=')[1]}` } /> }
    </>
  );
}

export default RecipeDetails;
