import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import { renderWithRouter } from './helpers/renderWith';
import mockSearchMeal from './mocks/mockSearchMeal';
import { mockRecipeCategories } from './mocks/mockRecipesList';

describe('Testes referentes ao componente RecipesDetails', () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    json: async () => mockSearchMeal,
  })
    .mockResolvedValueOnce({
      json: async () => mockRecipeCategories,
    });
  renderWithRouter(<RecipeDetails scope="meals" />);
  test('Verifica se o componente contém um heading h2', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
