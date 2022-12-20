import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { FC } from 'react';
import { todoVar } from '../cache';

interface Props {}

const LocalStateB: FC<Props> = (props): JSX.Element => {
  const todos = useReactiveVar(todoVar);
  return (
    <>
      {todos?.map((task, index) => (
        <p className="mb-3 py-1" key={index}>
          {task.title}
        </p>
      ))}
      <Link href="/local-state-a">
        <a>Back</a>
      </Link>
    </>
  );
};

export default LocalStateB;
