import { NextPage } from 'next';
import Layout from '../components/Layout';
import LocalStateA from '../components/LocalStateA';

interface Props {}

const LocalStatePageA: NextPage<Props> = () => {
  return (
    <Layout title="Local State A">
      <LocalStateA />
    </Layout>
  );
};

export default LocalStatePageA;
