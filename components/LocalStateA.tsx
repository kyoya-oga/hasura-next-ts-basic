import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { todoVar } from '../cache';

interface Props {}

const LocalStateA: FC<Props> = (props): JSX.Element => {
  const [input, setInput] = useState<string>('');
  const todos = useReactiveVar(todoVar);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todoVar([...todoVar(), { title: input }]);
    setInput('');
  };
  return (
    <>
      <p className="mb-3 font-bold">makeVar</p>
      {todos?.map((task, index) => (
        <p className="mb-3 py-1" key={index}>
          {task.title}
        </p>
      ))}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New Task?"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <button
          type="submit"
          disabled={!input}
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl"
        >
          Add new task
        </button>
      </form>

      <Link href="/local-state-b">
        <a>Next</a>
      </Link>
    </>
  );
};

export default LocalStateA;
