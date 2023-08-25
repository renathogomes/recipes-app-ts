import Header from '../../components/Header';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import useFavorites from '../../hooks/useFavorites';

export default function FavoriteRecipes() {
  const favoriteButtons = useFavorites();
  const { setFilter } = favoriteButtons;

  return (
    <>
      <Header
        pageTitle="Favorite Recipes"
        searchIcon={ false }
      />
      <button
        onClick={ () => setFilter('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => setFilter('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => setFilter('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <FavoriteCard />
    </>
  );
}
