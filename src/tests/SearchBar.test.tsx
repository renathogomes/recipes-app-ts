/* eslint-disable no-restricted-globals */
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SearchBar from '../components/SearchBar';
import { renderWithRouter } from '../helpers/renderWithRouter';
import Recipes from '../pages/Recipes';

const expectUrlReturn = {
  meals: [{ idMeals: '123', idDrinks: '123' }],
  drinks: [{ idMeals: '123', idDrinks: '123' }],
};

global.fetch = vi.fn().mockResolvedValue({
  json: async () => expectUrlReturn,
});

describe('Testando o componente SearchBar', async () => {
  const EXEC_SEARCH_BTN = 'exec-search-btn';
  const SEARCH_INPUT = 'search-input';
  const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
  renderWithRouter(<SearchBar />);
  test('Verifica se a página contém um input de texto', async () => {
    const inputText = screen.getByTestId(SEARCH_INPUT);
    await userEvent.type(inputText, SEARCH_INPUT);
    expect(inputText).toBeInTheDocument();
  });

  test('Verifica se a página contém um botão', () => {
    const button = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(button).toBeInTheDocument();
  });

  test('Verifica se a página contém um input do tipo radio', () => {
    const radio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    expect(radio).toBeInTheDocument();
  });
  test('Verifica se o botão está desabilitado caso o input esteja vazio', () => {
    const button = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(button).toBeDisabled();
  });
  test('Verifica se o botão está habilitado caso o input esteja preenchido', async () => {
    const inputText = screen.getByTestId(SEARCH_INPUT);
    const button = screen.getByTestId(EXEC_SEARCH_BTN);
    await userEvent.type(inputText, 'teste');
    expect(button).toBeEnabled();
  });
  test('Verifica se o botão está desabilitado caso o input esteja preenchido com apenas um caractere', async () => {
    const inputText = screen.getByTestId(SEARCH_INPUT);
    const button = screen.getByTestId(EXEC_SEARCH_BTN);
    await userEvent.type(inputText, 't');
    expect(button).toBeDisabled();
  });
  test('Verifica se o botão botão de busca dispara a busca', async () => {
    const comp = render(<Recipes scope="meals" />);
    const button = comp.getByTestId(EXEC_SEARCH_BTN);
    fireEvent.click(button);
    const element = await waitFor(() => comp.getByTestId('0-recipe-card'));
    expect(element).toBeInTheDocument();
  });
});
