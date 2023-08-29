import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import mockSearchMeal from './mocks/mockSearchMeal';
import App from '../App';
import mockSearchDrink from './mocks/mockSearchDrink';

const CORBA_IMG = 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg';

const EXPECTED_DONE = [
  {
    id: '52977',
    type: 'meal',
    nationality: '',
    category: 'Dessert',
    alcoholicOrNot: '',
    name: 'Corba',
    image: CORBA_IMG,
    doneDate: '2023-08-28T20:37:12.755Z',
    tags: 'Soup',
  },
];

const EXPECTED_FAV_DRINK = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: CORBA_IMG,
  },
];

const MOCK_FAV = [
  EXPECTED_DONE[0],
  {
    id: '53060',
    type: 'meal',
    nationality: '',
    category: 'Dessert',
    alcoholicOrNot: '',
    name: 'Burek',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  },
];

const MOCK_FAV_WITH_DRINK = [
  EXPECTED_FAV_DRINK[0],
  EXPECTED_DONE[0],
  MOCK_FAV[1],
];

const DONE_RECIPES = 'done-recipes';
const FIRST_CARD_NAME_TEST_ID = '0-horizontal-name';

describe('Testes referentes ao componente DoneRecipes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica se ao abrir a pagina sem nenhuma receita concluída ele não renderiza nenhuma card', async () => {
    renderWithRouter(<App />, { route: DONE_RECIPES });
    expect(screen.queryByTestId(FIRST_CARD_NAME_TEST_ID)).not.toBeInTheDocument();
  });

  test('Verifica se ao abrir a pagina com uma receita concluída ele renderiza um card', async () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(MOCK_FAV));
    renderWithRouter(<App />, { route: DONE_RECIPES });
    // expect(screen.getAllByTestId(/horizontal-name/i)).toHaveLength(2);
    expect(screen.getByTestId(FIRST_CARD_NAME_TEST_ID)).toHaveTextContent('Corba');
  });
});
