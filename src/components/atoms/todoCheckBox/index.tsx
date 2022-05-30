import { RefObject, useEffect, useRef, useState } from 'react';

import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { FlexRow, CheckBoxWrapper, CheckBox, MenuWrapper, DeleteCheckBox } from './styles';

import { todoListState, ITodoFolder } from '@store/index';
import { todoEditMode, todoModal, todoModalContent } from '@store/todo';
import { theme } from '@styles/theme';
import TodoApi, { ITodo } from '@utils/api/Todo';

export interface Props {
  toDoId: number;
  toDoContent: string;
  toDoStatus: 'todo' | 'inProgress' | 'done';
  target: string;
  targetId: number;
  inputRef: RefObject<HTMLInputElement>;
  handleFocus: (key: number, value: string, toDoId?: number) => void;
  index: number;
  deleteMode: boolean;
  checkDelete: (todoArea: number, todoId: number) => void;
}

export const Type = {
  todo: theme.colors.white,
  inProgress: theme.colors.green[600],
  done: theme.colors.red[600],
};

const TodoCheckBox = ({
  toDoId,
  toDoContent,
  toDoStatus,
  target,
  targetId,
  handleFocus,
  inputRef,
  index,
  deleteMode,
  checkDelete,
}: Props) => {
  const setTodoList = useSetRecoilState(todoListState);

  const [inputValue, setInputValue] = useState('');
  const [typeStatus, setTypeStatus] = useState<keyof typeof Type>(toDoStatus);

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
    console.log(targetId);
  }, [deleteMode]);

  useEffect(() => {
    setTodoList((allFolders: ITodoFolder[]) => {
      const currentFolderIndex = allFolders.findIndex((folder: ITodoFolder) => folder.folder_id === targetId);
      const newFolders = JSON.parse(JSON.stringify(allFolders)) as ITodoFolder[];

      const currentFolder = newFolders[currentFolderIndex];
      const currentTodo = currentFolder.todos.find((v: ITodo) => v.id === toDoId) as ITodo;
      currentTodo.status = typeStatus;
      console.log('change todo status', newFolders[currentFolderIndex].todos);
      return newFolders;
    });
  }, [typeStatus]);

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
                  checkDelete(targetId, toDoId);
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
            handleFocus(targetId, inputValue, toDoId);
            setInputValue('');
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleFocus(targetId, inputValue, toDoId);
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
