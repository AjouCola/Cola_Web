import { ReactNode, useRef, useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { Container, Wrapper, FolderTitleWrapper, BtnAddTodo } from './styles';

import FolderIcon from '@atoms/FolderIcon';
import DraggableTodo from '@components/atoms/todoCheckBox/draggable';
import TodoCheckBox from '@components/atoms/todoCheckBox/index';
import { todoModalContent } from '@store/todo';
import TodoApi, { ITodo } from '@utils/api/Todo';
import { ITodoFolder, todoListState } from 'src/store';

export interface ITodoAreaProps {
  date: string;
  area: string;
  areaId: number;
  idx: number;
  folderColor: string;
  todoItems: ITodo[];
  dragMode?: boolean;
  deleteMode: boolean;
  checkDelete: (todoAre: number, todoId: number) => void;
  children: ReactNode;
}

const TodoArea = ({
  date, // '2022-05-29'
  todoItems,
  area,
  areaId,
  folderColor,
  dragMode = false,
  deleteMode,
  checkDelete,
  children,
}: ITodoAreaProps) => {
  const setTodoList = useSetRecoilState(todoListState);
  const [editValue, setEditValue] = useRecoilState(todoModalContent);

  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = async (key: number, value: string, todoId?: number) => {
    setFocus(false);
    if (editValue.id) {
      const modified: ITodo = {
        id: Date.now(),
        content: value + '',
        status: 'todo',
      };

      setTodoList((currentFolders) => {
        const currentFolderIndex = currentFolders.findIndex((v) => v.folder_id === key);
        const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;
        const currentTodoIndex = currentFolder.todos.findIndex((v) => v.id === todoId);

        currentFolder.todos.splice(currentTodoIndex, 1, modified);

        const newFolders = [...currentFolders];
        newFolders.splice(currentFolderIndex, 1, currentFolder);

        (async function () {
          await TodoApi.saveTodoList(date, newFolders);
        })();
        return newFolders;
      });
      setEditValue({
        id: null,
        content: null,
      });
    } else {
      if (value.trim().length === 0) {
        setTodoList((currentFolders) => {
          const currentFolderIndex = currentFolders.findIndex((v) => v.folder_id === key);
          const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;

          currentFolder.todos.splice(-1, 1);

          const newFolders: ITodoFolder[] = [...currentFolders];
          newFolders[currentFolderIndex] = currentFolder;

          return newFolders;
        });
      } else {
        const newToDo: ITodo = {
          id: Date.now(),
          content: value + '',
          status: 'todo',
        };
        console.log('add new todo ', newToDo);
        setTodoList((currentFolders) => {
          const currentFolderIndex = currentFolders.findIndex((v) => v.folder_id === key);
          const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;
          currentFolder.todos = [...currentFolder.todos.slice(0, -1), newToDo];

          const newFolders = [...currentFolders];
          newFolders.splice(currentFolderIndex, 1, currentFolder);

          (async function () {
            await TodoApi.saveTodoList(date, newFolders);
          })();

          return newFolders;
        });
      }
    }
  };

  const addTodo = (key: number) => {
    const newToDo: ITodo = {
      id: Date.now(),
      content: '',
      status: 'todo',
    };
    setTodoList((currentFolders) => {
      const currentFolderIndex = currentFolders.findIndex((v) => v.folder_id === key);
      const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;
      currentFolder.todos.push(newToDo);

      const newFolders: ITodoFolder[] = [...currentFolders];
      newFolders[currentFolderIndex] = currentFolder;

      return newFolders;
    });
    setFocus(true);
  };

  const handleAddTodo = () => {
    if (focus) {
      return;
    }
    addTodo(areaId);
  };

  return (
    <Container>
      <FolderTitleWrapper>
        <div>
          <span>
            <FolderIcon color={folderColor} />
          </span>
          <span>{area}</span>
        </div>
        <BtnAddTodo onClick={handleAddTodo}>+</BtnAddTodo>
      </FolderTitleWrapper>
      <Wrapper>
        {todoItems?.map(({ id, content, status }, index) => {
          const props = {
            toDoId: id,
            toDoContent: content,
            toDoStatus: status,
            target: area,
            targetId: areaId,
            handleFocus: handleFocus,
            inputRef: inputRef,
            index: index,
            deleteMode: deleteMode,
            checkDelete: checkDelete,
            date: date,
          };
          return dragMode ? <DraggableTodo key={id} {...props} /> : <TodoCheckBox key={id} {...props} />;
        })}
        {dragMode && children}
      </Wrapper>
    </Container>
  );
};
export default TodoArea;
