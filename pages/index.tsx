import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <h1 className="text-3xl font-bold">Next.js + GraphQL</h1>
    </Layout>
  );
};

export default Home;
