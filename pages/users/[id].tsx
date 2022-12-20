import { ChevronLeftIcon } from '@heroicons/react/solid';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_USERBY_ID, GET_USERIDS } from '../../queries/queries';
import {
  GetUserByIdQuery,
  GetUserIdsQuery,
} from '../../types/generated/graphql';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const UserDetail: NextPage<Props> = ({ user }) => {
  if (!user)
    return (
      <Layout title="loading">
        <p>Loading...</p>
      </Layout>
    );

  return (
    <Layout title={user.name}>
      <>
        <p className="text-xl font-bold">User detail</p>
        <div className="m-4">
          {'ID : '}
          {user.id}
        </div>
        <p className="mb-4 text-xl font-bold">{user.name}</p>
        <p className="mb-12">{user.created_at}</p>

        <Link href="/hasura-ssg">
          <a className="flex cursor-pointer mt-12">
            <ChevronLeftIcon
              data-testid="auth-to-main"
              className="h-5 w-5 mr-3 text-blue-500"
            />
            <span data-testid="back-to-main">Back to main-ssg-page</span>
          </a>
        </Link>
      </>
    </Layout>
  );
};

export default UserDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USERIDS,
  });

  const paths = data.users.map((user) => ({
    params: {
      id: user.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USERBY_ID,
    variables: {
      id: params.id,
    },
  });

  return {
    props: {
      user: data.users_by_pk,
    },
    revalidate: 1,
  };
};
