import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { getPage, initTestHelpers } from 'next-page-tester';
import { handlers } from '../mock/handlers';

initTestHelpers();

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe('Navigation Test Case', () => {
  it('Should route to selected pages in navbar', async () => {
    const { page } = await getPage({
      route: '/',
    });
    render(page);
    expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('makevar-nav'));
    expect(screen.getByText('makeVar')).toBeInTheDocument();
  });
});
