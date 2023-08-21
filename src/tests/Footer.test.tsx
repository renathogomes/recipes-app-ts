import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import { Footer } from '../components/Footer/Footer';

test('verificar se os botões de drinks e meals estão sendo renderizados', () => {
  renderWithRouter(<Footer />);

  const drinksButton = screen.getByTestId('drinks-bottom-btn');
  const mealsButton = screen.getByTestId('meals-bottom-btn');

  expect(drinksButton).toBeInTheDocument();
  expect(mealsButton).toBeInTheDocument();
});

test('verificar se ao clicar no botão de drinks, a rota muda para a página de drinks', async () => {
  renderWithRouter(<App />, { initialEntries: ['/meals'] });

  const drinksButton = screen.getByTestId('drinks-bottom-btn');

  await userEvent.click(drinksButton);
});
test('verificar se ao clicar no botão de meals, a rota muda para a página de meals', async () => {
  renderWithRouter(<App />, { initialEntries: ['/drinks'] });

  const mealsButton = screen.getByTestId('meals-bottom-btn');

  await userEvent.click(mealsButton);
});
