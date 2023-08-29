import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useDoneRecipes from '../../hooks/useDoneRecipes';
import shareIcon from '../../images/shareIcon.svg';
import { GlobalContext } from '../../contexts/global.context';

export default function DoneRecipeCard() {
  const navigate = useNavigate();

  const state = useContext(GlobalContext);
  const { doneRecipes } = state.state;

  const doneRecipesButtons = useDoneRecipes();
  const { handleShare, isShared } = doneRecipesButtons;

  const handleNavigate = (recipeId: string, type: string) => {
    navigate(`/${type}s/${recipeId}`);
  };

  return (
    <div>
      { doneRecipes?.map((recipe, index) => {
        const {
          category,
          image,
          name,
          type,
          nationality,
          alcoholicOrNot,
          id,
          doneDate } = recipe;
        return (
          <div key={ index }>
            <button
              onClick={ () => handleNavigate(id, type) }
            >
              <h3 data-testid={ `${index}-horizontal-name` }>
                { name }
              </h3>
            </button>
            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot }
            </h4>
            <h5
              data-testid={ `${index}-horizontal-done-date` }
            >
              { doneDate }
            </h5>
            {recipe.tags.map((tagName) => (
              <h6
                key={ tagName }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </h6>
            ))}
            <button
              onClick={ () => handleNavigate(id, type) }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
            </button>
            <button
              onClick={ () => handleShare(type, id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share icon"
              />
              { isShared === id && <span>Link copied!</span> }
            </button>
          </div>

        );
      })}
    </div>
  );
}
