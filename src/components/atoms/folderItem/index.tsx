import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

import { FolderTitleWrapper, BtnAddTodo } from './styles';

import FolderIcon from '@atoms/FolderIcon';

type EditType = {
  id: number;
  name: string;
  color: string;
};

interface Props {
  inputRef?: RefObject<HTMLInputElement>;
  edit?: boolean;
  id: number;
  name: string;
  color: string;
  setIsEdit?: Dispatch<SetStateAction<EditType>>;
}

const FolderItem = ({ id, name, color, edit = false, setIsEdit, inputRef }: Props) => {
  useEffect(() => {
    if (inputRef?.current === null || inputRef === undefined) {
      return;
    }

    inputRef.current.value = name;
  }, []);

  const editFolder = () => {
    if (!setIsEdit) {
      return;
    }
    setIsEdit({ id, name, color });
  };

  return (
    <FolderTitleWrapper onClick={editFolder}>
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
