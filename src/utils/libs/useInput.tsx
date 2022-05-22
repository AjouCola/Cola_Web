import { Dispatch, SetStateAction, useState } from 'react';

export type UseInputProps = [
  string,
  Dispatch<SetStateAction<string>>,
  (e: React.SyntheticEvent<HTMLInputElement>) => void,
];

export default function useInput(init: string): UseInputProps {
  const [inputValue, setInputValue] = useState(init);

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  return [inputValue, setInputValue, onChange];
}
