import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { initializeApollo } from '../lib/apolloClient';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const client = initializeApollo();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
