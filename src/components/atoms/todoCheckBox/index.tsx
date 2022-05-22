import { RefObject, useEffect, useRef, useState } from 'react';

import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { FlexRow, CheckBoxWrapper, CheckBox, MenuWrapper, DeleteCheckBox } from './styles';

import { IToDo } from '@store/index';
import { todoEditMode, todoModal, todoModalContent } from '@store/todo';
import { theme } from '@styles/theme';

export interface Props {
  toDoId: number;
  toDoContent: string;
  target: string;
  inputRef: RefObject<HTMLInputElement>;
  handleFocus: (key: string, value: string, toDoId?: number) => void;
  index: number;
  deleteMode: boolean;
  checkDelete: (todoArea: string, todoId: number) => void;
}

export const Type = {
  todo: theme.colors.white,
  inProgress: theme.colors.green[600],
  done: theme.colors.red[600],
};

const TodoCheckBox = ({
  toDoId,
  toDoContent,
  target,
  handleFocus,
  inputRef,
  index,
  deleteMode,
  checkDelete,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [typeStatus, setTypeStatus] = useState<keyof typeof Type>('todo');

  const [deleteChecked, setDeleteCheck] = useState(false);

  const editMode = useRecoilValue(todoEditMode);

  const setTodoMenuModal = useSetRecoilState(todoModal);
  const [modalContent, setTodoModalContent] = useRecoilState(todoModalContent);

  useEffect(() => {
    if (editMode === toDoId) {
      setInputValue(modalContent.content);
    }
  }, [editMode]);
  useEffect(() => {
    setDeleteCheck(false);
  }, [deleteMode]);
  const handleChangeType = () =>
    setTypeStatus(typeStatus === 'todo' ? 'inProgress' : typeStatus === 'inProgress' ? 'done' : 'todo');

  const onClickMenu = () => {
    setTodoMenuModal(true);
    setTodoModalContent({ id: toDoId, content: toDoContent });
  };

  return (
    <>
      {toDoContent && toDoId && editMode !== toDoId ? (
        <CheckBoxWrapper>
          {/* <input type="checkbox" /> */}
          <FlexRow>
            <CheckBox onClick={handleChangeType} typeColor={Type[typeStatus]}></CheckBox>
            <div key={toDoId}>{toDoContent}</div>
          </FlexRow>
          <MenuWrapper>
            {!deleteMode && <span onClick={onClickMenu}>...</span>}
            {deleteMode && (
              <DeleteCheckBox
                checked={deleteChecked}
                onClick={() => {
                  setDeleteCheck((prev) => !prev);
                  checkDelete(target, toDoId);
                }}
              />
            )}
          </MenuWrapper>
        </CheckBoxWrapper>
      ) : (
        <input
          style={{ width: '100%', padding: '0.5rem' }}
          // ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onBlur={() => {
            handleFocus(target, inputValue, toDoId);
            setInputValue('');
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleFocus(target, inputValue, toDoId);
              setInputValue('');
            }
          }}
          autoFocus
        />
      )}
    </>
  );
};

export default TodoCheckBox;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext();

  return { props: { data: [] } };
};
