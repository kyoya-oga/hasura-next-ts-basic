import { FC } from 'react';
import { useCreateForm } from '../hooks/useCreateForm';
import Child from './Child';

const CreateUser: FC = (): JSX.Element => {
  const {
    text,
    handleSubmit,
    username,
    handleTextChange,
    usernameChange,
    printMsg,
  } = useCreateForm();
  console.log('Create User Component');
  return (
    <>
      <p className="mb-3 font-bold">Custom Hook + useCallback + memo</p>
      <div className="mb-3 flex flex-col justify-center items-center">
        <label>Text</label>
        <input
          type="text"
          className="px-3 py-2 border border-gray-300"
          value={text}
          onChange={handleTextChange}
        />

        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <label>Username</label>
          <input
            type="text"
            className="mb-3 px-3 py-2 border border-gray-300"
            placeholder="New User ?"
            value={username}
            onChange={usernameChange}
          />
          <button
            type="submit"
            className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl"
          >
            Submit
          </button>
        </form>

        <Child printMsg={printMsg} />
      </div>
    </>
  );
};

export default CreateUser;
