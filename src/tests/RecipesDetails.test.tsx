import { screen } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';

describe('Testes referentes ao componente RecipesDetails', () => {
  const recipe = RecipeDetails();
  test('Verifica se o componente contém um heading h2', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(recipe).toHaveBeenCalled();
  });
});
