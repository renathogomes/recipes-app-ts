import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import RecipesList from '../components/RecipesList/RecipesList';
import { renderWithRouter } from './helpers/renderWith';
import { mockRecipeCategories } from './mocks/mockRecipesList';

afterEach(() => {
  vi.clearAllMocks();
});

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => mockRecipeCategories,
  });
  window.alert = vi.fn();
});

describe('Testes referentes ao componente RecipesList', async () => {
  test('Verificando se existe os botões de categoria', async () => {
    renderWithRouter(<RecipesList />);
    await waitFor(() => {
      const categoryButton = screen.getByTestId('Beef-category-filter');
      expect(categoryButton).toBeInTheDocument();
    });
  });
});
