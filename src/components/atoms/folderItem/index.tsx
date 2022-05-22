import { Dispatch, SetStateAction } from 'react';

import { FolderTitleWrapper, BtnAddTodo } from './styles';

import FolderIcon from '@atoms/FolderIcon';
const FolderItem = ({
  id,
  color,
  setIsEdit,
}: {
  id: string;
  color: string;
  setIsEdit?: Dispatch<SetStateAction<any>>;
}) => {
  return (
    <FolderTitleWrapper
      onClick={() =>
        setIsEdit !== undefined &&
        setIsEdit({
          id,
          color,
        })
      }
    >
      <div>
        <span>
          <FolderIcon color={color} />
        </span>
        <span>{'폴더명'}</span>
      </div>
      <BtnAddTodo>{'>'}</BtnAddTodo>
    </FolderTitleWrapper>
  );
};

export default FolderItem;
