import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';

import { FolderTitleWrapper, BtnAddTodo } from './styles';

import FolderIcon from '@atoms/FolderIcon';
const FolderItem = ({
  id,
  name,
  color,
  edit = false,
  setIsEdit,
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
  edit?: boolean;
  id: number;
  name: string;
  color: string;
  setIsEdit?: Dispatch<SetStateAction<any>>;
}) => {
  useEffect(() => {
    if (inputRef?.current === null || inputRef === undefined) return;
    inputRef.current.value = name;
  }, []);

  return (
    <FolderTitleWrapper
      onClick={() =>
        setIsEdit !== undefined &&
        setIsEdit({
          id,
          name,
          color,
        })
      }
    >
      <div>
        <span>
          <FolderIcon color={color} />
        </span>
        {!edit && <span>{name}</span>}
        {edit && <input ref={inputRef} />}
      </div>
      <BtnAddTodo>{'>'}</BtnAddTodo>
    </FolderTitleWrapper>
  );
};

export default FolderItem;
