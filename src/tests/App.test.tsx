import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/renderWithRouter';
import Login from '../pages/Login/Login';

describe('Testes referentes à página Login.tsx', () => {
  test('Verifica se o Heading e os Inputs existem na página', () => {
    renderWithRouter(<Login />);
    const heading = screen.getByRole('heading', { name: /login/i });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonEnter = screen.getByRole('button', { name: /enter/i });

    expect(heading).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });
});
