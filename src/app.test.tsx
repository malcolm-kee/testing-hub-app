import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { App } from './app';

test('renders learn react link', () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = getByText(/testing hub/i);
  expect(linkElement).toBeVisible();
});
