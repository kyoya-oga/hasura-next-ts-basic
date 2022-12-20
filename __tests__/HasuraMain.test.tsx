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

describe('Hasura Fetch test cases', () => {
  it('Should render the fetched data', async () => {
    const { page } = await getPage({
      route: '/hasura-main',
    });

    render(page);

    expect(await screen.findByText('Hasura main page')).toBeInTheDocument();
    expect(await screen.findByText('Test user A')).toBeInTheDocument();
  });
});
