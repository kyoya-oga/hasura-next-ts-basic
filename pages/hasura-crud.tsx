import { useMutation, useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import Layout from '../components/Layout';
import UserItem from '../components/UserItem';
import {
  CREATE_USER,
  DELETE_USER,
  GET_USERS,
  UPDATE_USER,
} from '../queries/queries';
import {
  CreateUserMutation,
  DeleteUserMutation,
  GetUsersQuery,
  UpdateUserMutation,
  Users,
} from '../types/generated/graphql';

const CrudPage: NextPage = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' });
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER);

  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one);
      if (cacheId) {
        cache.modify({
          fields: {
            users(existingUsers, { toReference }) {
              return [toReference(cacheId), ...existingUsers];
            },
          },
        });
      }
    },
  });

  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user: Pick<Users, 'id' | 'name' | 'created_at'>) =>
                delete_users_by_pk.id !== readField('id', user)
            );
          },
        },
      });
    },
  });

  const clearForm = () => {
    setEditedUser({ id: '', name: '' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        });
      } catch (error: any) {
        alert(error.message);
      }
      clearForm();
    } else {
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        });
      } catch (error: any) {
        alert(error.message);
      }
      clearForm();
    }
  };

  if (error) {
    return (
      <Layout title="Hasura CRUD">
        <p>Error: {error.message}</p>
      </Layout>
    );
  }

  return (
    <Layout title="Hasura CRUD">
      <>
        <p className="mb-3 font-bold">Hasura CRUD</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <input
            type="text"
            className="mb-3 px-3 py-2 border border-gray-300"
            placeholder="New User ?"
            value={editedUser.name}
            onChange={(e) =>
              setEditedUser({ ...editedUser, name: e.target.value })
            }
          />
          <button
            data-testid="new"
            type="submit"
            disabled={!editedUser.name}
            className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl"
          >
            {editedUser.id ? 'Update' : 'Create'}
          </button>
        </form>

        {data?.users?.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            setEditedUser={setEditedUser}
            delete_users_by_pk={delete_users_by_pk}
          />
        ))}
      </>
    </Layout>
  );
};

export default CrudPage;
