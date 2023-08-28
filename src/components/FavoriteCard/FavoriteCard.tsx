import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';
import useFavorites from '../../hooks/useFavorites';
import { GlobalContext } from '../../contexts/global.context';
import style from './FavoriteCard.module.css';

export default function FavoriteCard() {
  const navigate = useNavigate();

  const state = useContext(GlobalContext);
  const { favoriteRecipes } = state.state;

  const favoriteButtons = useFavorites();
  const { handleShare, isShared, handleUnfavorite } = favoriteButtons;

  const handleNavigate = (recipeId: string, type: string) => {
    navigate(`/${type}s/${recipeId}`);
  };

  return (
    <div>
      { favoriteRecipes?.map((recipe, index) => {
        const { category, image, name, type, nationality, alcoholicOrNot, id } = recipe;
        return (
          <div key={ index } className={ style.container }>
            <button
              className={ style.navigateBtn }
              onClick={ () => handleNavigate(id, type) }
            >
              <h3
                data-testid={ `${index}-horizontal-name` }
              >
                { name }
              </h3>
            </button>
            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot }
            </h4>
            <button
              className={ style.navigateBtn }
              onClick={ () => handleNavigate(id, type) }
            >
              <img
                className={ style.recipeImg }
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
            <button
              onClick={ () => handleUnfavorite(id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ favoriteIcon }
                alt="favorite icon"
              />
            </button>
          </div>
        );
      }) }
    </div>
  );
}
