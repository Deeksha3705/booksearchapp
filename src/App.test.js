import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders input text', () => {
  render(<App />);
  const searchInput = screen.getByTestId('search-input')
  expect(searchInput).toBeInTheDocument();
});

test('renders button', () => {
  render(<App />);
  const searchButton = screen.getByTestId('search-button')
  expect(searchButton).toBeInTheDocument();
});

test('checking validation', async () => {
  render(<App />);
  const searchButton = screen.getByTestId('search-button')
  fireEvent.click(searchButton)
  const errorText = screen.getByText(/Please enter more than 2 characters/i);
  await expect(errorText).toBeInTheDocument();
});