import { NextPage } from 'next';
import Layout from '../components/Layout';
import LocalStateB from '../components/LocalStateB';

interface Props {}

const LocalStatePageB: NextPage<Props> = () => {
  return (
    <Layout title="Local State B">
      <LocalStateB />
    </Layout>
  );
};

export default LocalStatePageB;
