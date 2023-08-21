import { screen } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes referentes ao componente RecipesDetails', () => {
  renderWithRouter(<RecipeDetails scope="meals" />);
  test('Verifica se o componente contém um heading h2', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
