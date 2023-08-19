import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

test('verificar se o componente Header é renderizado corretamente conforme os argumentos passados', () => {
  renderWithRouter(<App />, { initialEntries: ['/meals'] });

  expect(screen.getByText('Meals')).toBeInTheDocument();
  expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
});

test('verificar se ao clilcar no botão de perfil, a rota muda para a página de perfil', async () => {
  renderWithRouter(<App />, { initialEntries: ['/meals'] });

  const profileButton = screen.getByTestId('profile-top-btn');

  await userEvent.click(profileButton);

  expect(screen.getByText('Profile')).toBeInTheDocument();
});

test('verificar se ao clicar no botão de pesquisa, a barra de pesquisa aparece', async () => {
  renderWithRouter(<App />, { initialEntries: ['/meals'] });

  const searchButton = screen.getByTestId('search-top-btn');

  await userEvent.click(searchButton);

  expect(screen.getByTestId('search-input')).toBeInTheDocument();
});
