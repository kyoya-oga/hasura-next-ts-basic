import { NextPage } from 'next';
import CreateUser from '../components/CreateUser';
import Layout from '../components/Layout';

interface Props {}

const HooksMemo: NextPage<Props> = () => {
  return (
    <Layout title="Hooks Memo">
      <CreateUser />
    </Layout>
  );
};

export default HooksMemo;
