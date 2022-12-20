import { FC, memo } from 'react';

interface Props {
  printMsg: () => void;
}

const Child: FC<Props> = memo(({ printMsg }): JSX.Element => {
  console.log('Child Component');

  return (
    <>
      <p>Child Component</p>
      <button
        onClick={printMsg}
        className="my-3 py-1 px-3 text-white bg-green-600 hover:bg-green-700 rounded-2xl"
      >
        Click Me!
      </button>
    </>
  );
});

export default Child;
