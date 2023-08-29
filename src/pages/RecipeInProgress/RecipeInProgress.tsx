import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../../contexts/recipes.context';
import { FoodService } from '../../services/services';
import { Recipe, RecipeScope } from '../../types/recipe';
import emptyHeart from '../../images/whiteHeartIcon.svg';
import heart from '../../images/blackHeartIcon.svg';
import style from './RecipeInProgress.module.css';

export type RecipesProps = { scope: RecipeScope };

type Ingredients = { measure: string, ingredient: string, checked: boolean };

type Favorite = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
};

function RecipeInProgress({ scope }: RecipesProps) {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [isShared, setIsShared] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favChanged, setFavChanged] = useState(false);
  const [allCheckboxesChecked, setAllCheckboxesChecked] = useState(false);
  const navigate = useNavigate();

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
            checked: false,
          } as Ingredients;
          newIngredients.push(newObj);
        }
      });
      setIngredients(newIngredients);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      const isFav = favoriteRecipes.some((el: any) => el.id === newRecipe?.idMeal
        || el.id === newRecipe?.idDrink);
      setIsFavorite(isFav);
      const inProgressRecipes = JSON
        .parse(localStorage.getItem('inProgressRecipes') || '{}');
      if (inProgressRecipes[recipeId]) {
        const savedCheckboxStates = inProgressRecipes[recipeId].checkboxes;
        newIngredients.forEach((ingredient, index) => {
          ingredient.checked = savedCheckboxStates[index];
        });
      }

      setIngredients(newIngredients);
    };

    getRecipe();
  }, [recipeId]);

  const handleShare = () => {
    const { location: { origin } } = window;
    const typeRecipe = recipe?.idMeal ? 'meals' : 'drinks';
    const url = `${origin}/${typeRecipe}/${recipeId}`;
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

  const handleCheckboxChange = (index: any) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].checked = !updatedIngredients[index].checked;
    setIngredients(updatedIngredients);

    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '{}');
    inProgressRecipes[recipeId] = {
      checkboxes: updatedIngredients.map((ingredient) => ingredient.checked),
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  useEffect(() => {
    const isAllChecked = ingredients.every((ingredient) => ingredient.checked);
    setAllCheckboxesChecked(isAllChecked);
  }, [ingredients]);

  const handleFinishRecipe = () => {
    navigate('/done-recipes');
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    if (!doneRecipes.some((element:any) => element.id === recipeId)) {
      const newDoneRecipe = {
        id: recipe?.idMeal || recipe?.idDrink,
        type: recipe?.idMeal ? 'meal' : 'drink',
        nationality: recipe?.strArea || '',
        category: recipe?.strCategory,
        alcoholicOrNot: recipe?.strAlcoholic || '',
        name: recipe?.strMeal || recipe?.strDrink,
        image: recipe?.strMealThumb || recipe?.strDrinkThumb,
        doneDate: new Date().toISOString(),
        tags: recipe?.strTags === null ? [] : recipe?.strTags.split(','),
      };
      doneRecipes.push(newDoneRecipe);
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
  };

  return (
    <>
      <img
        style={ { width: '100%' } }
        data-testid="recipe-photo"
        src={ recipe?.strDrinkThumb || recipe?.strMealThumb }
        alt="recipe thumbnail"
        className={ style.recipeImg }
      />
      <button
        onClick={ () => handleShare() }
        data-testid="share-btn"
        className={ style.btnShare }
      >
        <img src="src/images/Share.svg" alt="" className={ style.iconShare } />
      </button>
      { isShared && <p>Link copied!</p> }
      { isFavorite
        ? (
          <button onClick={ () => handleFavorite() } className={ style.btnFav }>
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
              alt="favorite"
              className={ style.iconFav }
            />
          </button>) }
      <div className={ style.titlesContainer }>
        <h1 data-testid="recipe-title" className={ style.recipeTitle }>
          { recipe?.strMeal || recipe?.strDrink }
        </h1>
        <h2 data-testid="recipe-category" className={ style.recipeCategory }>
          { recipe?.strCategory }
        </h2>
      </div>
      {
        recipe?.strAlcoholic
        && (
          <h5 data-testid="recipe-category">
            { recipe?.strAlcoholic }
          </h5>)
      }
      <h2 className={ style.heading }>Ingredients</h2>
      <ul className={ style.ingredientContainer }>
        { ingredients.map((el, index) => (
          <label
            htmlFor="ingredient"
            data-testid={ `${index}-ingredient-step` }
            key={ index }
            className={ style.label }
            id="ingredient"
            style={
              el.checked
                ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                : undefined
            }
          >
            <input
              type="checkbox"
              id="ingredient"
              onChange={ () => handleCheckboxChange(index) }
              checked={ el.checked }
              className={ style.input }
            />
            { `${el.measure} ${el.ingredient}` }
          </label>
        )) }
      </ul>
      <h2 className={ style.heading }>Instructions</h2>
      <p data-testid="instructions" className={ style.instructions }>
        { recipe?.strInstructions }
      </p>
      <div className={ style.centralize }>
        { recipe?.strMeal && <iframe title="recipe video" data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${recipe?.strYoutube.split('=')[1]}` } /> }
        <button
          data-testid="finish-recipe-btn"
          disabled={ !allCheckboxesChecked }
          onClick={ handleFinishRecipe }
          className={ style.btnFinish }
        >
          Finish Recipe
        </button>
      </div>
    </>
  );
}

export default RecipeInProgress;
