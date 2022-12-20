import { Dispatch, FC, SetStateAction, memo } from 'react';
import { DeleteUserMutationFn, Users } from '../types/generated/graphql';

interface Props {
  user: { __typename?: 'users' } & Pick<Users, 'id' | 'name' | 'created_at'>;
  delete_users_by_pk: DeleteUserMutationFn;
  setEditedUser: Dispatch<
    SetStateAction<{
      id: string;
      name: string;
    }>
  >;
}

const UserItem: FC<Props> = memo(
  ({ user, delete_users_by_pk, setEditedUser }): JSX.Element => {
    console.log('userItem rendered');

    return (
      <div className="my-1">
        <span className="mr-2">{user.name}</span>
        <span className="mr-2">{user.created_at}</span>
        <button
          onClick={() => setEditedUser(user)}
          data-testid={`edit-${user.id}`}
          className="mr-1 py-1 px-3 text-white bg-green-600 hover:bg-green-700 rounded-2xl"
        >
          Edit
        </button>
        <button
          onClick={async () => {
            await delete_users_by_pk({
              variables: {
                id: user.id,
              },
            });
          }}
          data-testid={`delete-${user.id}`}
          className="py-1 px-3 text-white bg-pink-600 hover:bg-pink-700 rounded-2xl"
        >
          Delete
        </button>
      </div>
    );
  }
);

export default UserItem;
