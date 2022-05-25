import { Dispatch, SetStateAction, useState } from 'react';

import FolderProperty from '../folderProperty';

import {
  TodoContainer,
  TodoInfoWrapper,
  FolderConrtainer,
  FolderWrapper,
  FolderItemContainer,
  ButtonWrapper,
  Line,
} from './styles';

import FolderItem from '@atoms/folderItem';
import TodoApi from '@utils/api/Todo';

const FolderContent = ({ setIsEdit }: { setIsEdit: Dispatch<SetStateAction<any>> }) => {
  const createFolder = async () => {
    /** dummy */
    const color = '#9779D3';
    const name = '할 일';
    await TodoApi.createFolder(name, color);
  };
  return (
    <>
      <FolderConrtainer>
        <FolderWrapper>
          <p>사용 중인 폴더</p>
          <p onClick={createFolder}>+</p>
        </FolderWrapper>
        <FolderItemContainer>
          {forderExample.map((v, i) => (
            <FolderItem key={i} id={i + ''} color={v} setIsEdit={setIsEdit} />
          ))}
        </FolderItemContainer>
      </FolderConrtainer>
      <Line />
      <FolderConrtainer>
        <FolderWrapper>
          <p>종료된 폴더</p>
          <p>+</p>
        </FolderWrapper>
        <FolderItemContainer>
          {forderExample.map((v, i) => (
            <FolderItem key={i} id={i + ''} color={v} setIsEdit={setIsEdit} />
          ))}
        </FolderItemContainer>
      </FolderConrtainer>
    </>
  );
};

const forderExample = ['#9779D3', '#BEB3E0', '#94ABF2', '#3CBA78', '#4DC4C4', '#F7D546', '#8461C9', '#FCC0C0'];

const EditTodoContent = () => {
  const [isEdit, setIsEdit] = useState({ id: '' });
  return (
    <TodoContainer>
      <TodoInfoWrapper>
        <span>폴더</span>
      </TodoInfoWrapper>
      {isEdit.id === '' && <FolderContent setIsEdit={setIsEdit} />}
      {isEdit.id !== '' && (
        <>
          <FolderProperty data={isEdit} />
          <ButtonWrapper>
            <button onClick={() => setIsEdit({ id: '' })}>취소</button>
            <button onClick={() => setIsEdit({ id: '' })}>확인</button>
          </ButtonWrapper>
        </>
      )}
    </TodoContainer>
  );
};

export default EditTodoContent;
