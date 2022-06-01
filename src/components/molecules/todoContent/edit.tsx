import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

// import { useRecoilValueLoadable } from 'recoil';

import FolderProperty from '../folderProperty';

import {
  TodoContainer,
  TodoInfoWrapper,
  FolderConrtainer,
  FolderWrapper,
  FolderItemContainer,
  Warpper,
  Input,
} from './styles';

import FolderItem from '@atoms/folderItem';
// import { IUserInfo, useUserSelector } from '@store/selector/user';
import Api from '@utils/api/core';
import TodoApi from '@utils/api/Todo';

const FolderContent = ({ setIsEdit }: { setIsEdit: Dispatch<SetStateAction<any>> }) => {
  // const { contents: user } = useRecoilValueLoadable(useUserSelector({}));
  const [isLoading, setIsLoading] = useState(true);
  const [editState, setEditState] = useState(false);
  const [folders, setfolders] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getfolders() {
      const data = await Api.get('/api/v1/folder');
      setfolders(data);
      setIsLoading(false);
    }
    getfolders();
  }, []);

  const createFolder = async () => {
    /** dummy */
    const color = '#9779D3';
    const name = inputRef.current?.value;
    if (name !== '' && name !== undefined) {
      const id = await TodoApi.createFolder(name, color);
      setfolders((prev: { folderId: number; color: string; name: string }[]) => [
        ...prev,
        {
          folderId: id,
          color,
          name,
        },
      ]);
    } else alert('입력해주세요!');
    setEditState(false);
  };
  return (
    <FolderConrtainer>
      <FolderWrapper>
        {!editState && <p onClick={() => setEditState(true)}>+</p>}
        {editState && (
          <Warpper>
            <Input ref={inputRef} />
            <button onClick={createFolder}>확인</button>
          </Warpper>
        )}
      </FolderWrapper>
      <FolderItemContainer>
        {isLoading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {!isLoading &&
          folders.length > 0 &&
          folders.map(({ color, folderId, name }: any) => (
            <FolderItem key={folderId} name={name} id={folderId} color={color} setIsEdit={setIsEdit} />
          ))}
      </FolderItemContainer>
    </FolderConrtainer>
  );
};

// const forderExample = ['#9779D3', '#BEB3E0', '#94ABF2', '#3CBA78', '#4DC4C4', '#F7D546', '#8461C9', '#FCC0C0'];

const EditTodoContent = () => {
  const [isEdit, setIsEdit] = useState({ id: -1 });
  return (
    <TodoContainer>
      <TodoInfoWrapper>
        <span>폴더</span>
      </TodoInfoWrapper>
      {isEdit.id === -1 && <FolderContent setIsEdit={setIsEdit} />}
      {isEdit.id !== -1 && <FolderProperty data={isEdit} setIsEdit={setIsEdit} />}
    </TodoContainer>
  );
};

export default EditTodoContent;
