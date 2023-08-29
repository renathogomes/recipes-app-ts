import useDoneRecipes from '../../hooks/useDoneRecipes';
import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard/DoneRecipeCard';

export default function DoneRecipes() {
  const doneRecipeButtons = useDoneRecipes();
  const { setFilter } = doneRecipeButtons;

  return (
    <>
      <Header
        pageTitle="Done Recipes"
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
      <DoneRecipeCard />
    </>
  );
}
