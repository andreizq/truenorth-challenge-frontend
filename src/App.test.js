import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './Login';

test('renders Login', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Arithmetic calculator/i);
  expect(linkElement).toBeInTheDocument();
});
