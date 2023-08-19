import Header from '../../components/Header';
import { CONTEXT_INITIAL_STATE,
  RecipeContextProvider } from '../../contexts/recipes.context';
import { capitalize } from '../../helpers/capitalize';
import { RecipeScope } from '../../types/recipe';

export type RecipesProps = {
  scope: RecipeScope;
};

function Recipes({ scope }: RecipesProps) {
  return (
    <RecipeContextProvider
      value={ {
        ...CONTEXT_INITIAL_STATE,
        ...{ state: {
          scope,
        } },
      } }
    >
      <Header pageTitle={ `Recipes - ${capitalize(scope)}` } />
    </RecipeContextProvider>
  );
}

export default Recipes;
